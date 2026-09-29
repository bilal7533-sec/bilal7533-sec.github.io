// Enable enhanced reveal animation while keeping a non-JavaScript fallback visible.
document.documentElement.classList.add("js-ready");

// ============================================================
// Bilal Ahmad — Cyber Security Portfolio v2
// Interactive case studies + search/filter + GitHub discovery.
// ============================================================

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const OWNER = "bilal7533-sec";
const REPO_API = `https://api.github.com/users/${OWNER}/repos?per_page=100&sort=updated`;

let activeCategory = "All";
let query = "";
let allProjects = [...PROJECTS];

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function prettyName(name) {
  return String(name || "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function classify(repo) {
  const text = [
    repo.name,
    repo.title,
    repo.description,
    ...(repo.topics || [])
  ].join(" ").toLowerCase();

  if (/iam|pam|openldap|sssd|rbac|identity|access management/.test(text)) return "IAM / PAM";
  if (/soc|sigma|siem|threat|hunt|detection|incident|rootkit|integrity/.test(text)) return "SOC / Detection";
  if (/scada|ics|ot|industrial/.test(text)) return "OT / ICS";
  if (/vulnerab|qualys|cve|security.?report/.test(text)) return "Vulnerability";
  if (/appsec|owasp|application|web.?security/.test(text)) return "Application Security";
  if (/rsyslog|logging|mtls|x\.509/.test(text)) return "Secure Logging";
  if (/linux|hardening|rhel|ubuntu|apache|server|ssh/.test(text)) return "Linux Security";
  return "Security Engineering";
}

function normalizeGithubRepo(repo) {
  return {
    id: `github-${repo.id}`,
    title: prettyName(repo.name),
    category: classify(repo),
    description: repo.description || "Cybersecurity project and hands-on engineering work.",
    problem: "Practical security engineering work documented as a public GitHub repository.",
    stack: [repo.language, ...(repo.topics || [])].filter(Boolean).slice(0, 8).join(" • ") || "GitHub repository • Security engineering",
    validation: "Review the repository for implementation details, configuration, testing and documented verification.",
    evidence: "README, source/configuration files, commits and documented implementation evidence.",
    tags: (repo.topics || []).slice(0, 6),
    link: repo.html_url,
    stars: repo.stargazers_count || 0,
    forks: repo.forks_count || 0,
    updatedAt: repo.updated_at,
    githubAuto: true
  };
}

function mergeProjects(githubRepos) {
  const curatedLinks = new Set(PROJECTS.map((item) => item.link));
  const curatedNames = new Set(PROJECTS.map((item) => item.title.toLowerCase()));

  const autoProjects = githubRepos
    .filter((repo) => !repo.fork && !repo.archived && repo.name !== `${OWNER}.github.io`)
    .filter((repo) => !curatedLinks.has(repo.html_url))
    .filter((repo) => !curatedNames.has(prettyName(repo.name).toLowerCase()))
    .map(normalizeGithubRepo);

  return [...PROJECTS, ...autoProjects]
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.updatedAt || "1970-01-01") - new Date(a.updatedAt || "1970-01-01");
    });
}

function renderFilters() {
  const root = $("#filters");
  if (!root) return;

  const categories = ["All", ...new Set(allProjects.map((project) => project.category))];

  root.innerHTML = categories.map((category) => `
    <button class="filter ${category === activeCategory ? "active" : ""}" type="button"
      data-category="${esc(category)}">
      <span class="filter-name">${esc(category)}</span>
    </button>
  `).join("");

  $(".filter", root).forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category || "All";
      renderFilters();
      renderProjects();
    });
  });
}

function matches(project) {
  const haystack = [
    project.title,
    project.category,
    project.description,
    project.problem,
    project.stack,
    project.validation,
    project.evidence,
    ...(project.tags || [])
  ].join(" ").toLowerCase();

  const categoryMatch = activeCategory === "All" || project.category === activeCategory;
  return categoryMatch && haystack.includes(query);
}

function projectCard(project, index) {
  const id = esc(project.id);
  const stars = project.stars ?? 0;
  const forks = project.forks ?? 0;
  const updated = project.updatedAt ? new Date(project.updatedAt).toLocaleDateString() : "Lab";

  return `
    <article class="project ${project.featured ? "featured" : ""} reveal" data-project-id="${id}">
      <div class="project-top">
        <span class="project-code">${String(index + 1).padStart(2, "0")} / ${project.githubAuto ? "GITHUB" : "CASE STUDY"}</span>
        <span class="project-category">${esc(project.category)}</span>
      </div>
      <h3>${esc(project.title)}</h3>
      <p>${esc(project.description)}</p>
      <div class="tag-list">
        ${(project.tags || []).slice(0, 6).map((tag) => `<span>${esc(tag)}</span>`).join("")}
      </div>
      <div class="project-bottom">
        <button class="text-btn" type="button" data-case="${id}">View case study <span>→</span></button>
        <a class="repo-link" href="${esc(project.link)}">GitHub ↗</a>
      </div>
    </article>
  `;
}

function updateProjectTotal() {
  const total = $("#projectTotal");
  if (!total) return;
  total.textContent = allProjects.length;
}

function renderProjects() {
  const root = $("#projectsGrid");
  const empty = $("#projectEmpty");
  if (!root) return;

  updateProjectTotal();
  const filtered = allProjects.filter(matches);

  root.innerHTML = filtered.map(projectCard).join("");
  if (empty) empty.hidden = filtered.length !== 0;

  $$(".text-btn", root).forEach((button) => {
    button.addEventListener("click", () => openCase(button.dataset.case));
  });

  observeReveal(root);
}

function projectById(id) {
  return allProjects.find((project) => project.id === id);
}

function openCase(id) {
  const project = projectById(id);
  const modal = $("#caseModal");
  if (!project || !modal) return;

  $("#modalCategory").textContent = project.category;
  $("#modalTitle").textContent = project.title;
  $("#modalSummary").textContent = project.description;
  $("#modalProblem").textContent = project.problem || "Documented security problem / objective.";
  $("#modalStack").textContent = project.stack || "Security technologies and architecture are documented in the repository.";
  $("#modalValidation").textContent = project.validation || "Validation and test methodology are documented in the repository.";
  $("#modalEvidence").textContent = project.evidence || "Repository documentation and implementation artifacts provide the evidence.";

  $("#modalBody").innerHTML = `
    <div class="case-expanded">
      <div class="case-expanded-head">
        <div>
          <span class="modal-label">Engineering view</span>
          <h3>How this work is structured</h3>
        </div>
        <span class="case-badge">${project.featured ? "Featured" : "Project"}</span>
      </div>

      ${project.details ? `
        <div class="case-section">
          <span class="modal-label">Objective</span>
          <p>${esc(project.details.objective)}</p>
        </div>
        <div class="case-section">
          <span class="modal-label">Architecture</span>
          <p>${esc(project.details.architecture)}</p>
        </div>
        <div class="case-section case-highlights">
          <span class="modal-label">Controls / technologies</span>
          <div class="case-chips">
            ${(project.details.controls || project.tags || []).map((item) => `<span>${esc(item)}</span>`).join("")}
          </div>
        </div>
        <div class="case-section">
          <span class="modal-label">Implementation depth</span>
          <p>${esc(project.details.phases || "Problem → Architecture → Implementation → Validation → Troubleshooting → Evidence")}</p>
        </div>
        <div class="case-section">
          <span class="modal-label">Production perspective</span>
          <p>${esc(project.details.production || "Production considerations and limitations are documented alongside the implementation.")}</p>
        </div>
      ` : `
        <div class="case-section">
          <span class="modal-label">Reviewer path</span>
          <p>Open the GitHub repository to inspect implementation notes, source files, tests, configuration and evidence.</p>
        </div>
      `}
    </div>
  `;

  $("#modalActions").innerHTML = `
    <button class="btn btn-primary" type="button" id="expandCase">Show full case study ↗</button>
    <a class="btn btn-ghost" href="${esc(project.link)}">GitHub repository ↗</a>
  `;

  $("#expandCase").addEventListener("click", () => showFullCase(project));

  modal.hidden = false;
  document.body.classList.add("modal-open");
  $(".modal-close", modal)?.focus();
}

function showFullCase(project) {
  const body = $("#modalBody");
  if (!body) return;

  const phaseCount = project.id === "iam-pam" ? "18 phases / 70 master activities" :
    project.id === "rootkit" ? "Detection → Validation → Scope → Response → Remediation → Verification" :
    "Problem → Architecture → Implementation → Validation → Evidence";

  body.innerHTML = `
    <div class="case-expanded">
      <div class="case-expanded-head">
        <div>
          <span class="modal-label">Full case study</span>
          <h3>${esc(project.title)}</h3>
        </div>
        <span class="case-badge">${esc(phaseCount)}</span>
      </div>

      <div class="case-section">
        <span class="modal-label">Security problem</span>
        <p>${esc(project.problem || "Security problem and objective documented in the project repository.")}</p>
      </div>

      <div class="case-section">
        <span class="modal-label">Architecture / stack</span>
        <p>${esc(project.stack || "Architecture and technology decisions documented in the project repository.")}</p>
      </div>

      <div class="case-section">
        <span class="modal-label">Validation</span>
        <p>${esc(project.validation || "Negative, positive and verification scenarios are documented in the project repository.")}</p>
      </div>

      <div class="case-section">
        <span class="modal-label">Evidence</span>
        <p>${esc(project.evidence || "Implementation and verification evidence is maintained with the project.")}</p>
      </div>

      <div class="case-section case-highlights">
        <span class="modal-label">Technologies / controls</span>
        <div class="case-chips">
          ${(project.tags || []).map((tag) => `<span>${esc(tag)}</span>`).join("")}
        </div>
      </div>
    </div>
  `;

  const expand = $("#expandCase");
  if (expand) {
    expand.textContent = "Case study expanded";
    expand.disabled = true;
  }
}

function closeCase() {
  const modal = $("#caseModal");
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

function setupModal() {
  const modal = $("#caseModal");
  if (!modal) return;

  $$("[data-close-modal]", modal).forEach((node) => node.addEventListener("click", closeCase));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeCase();
  });
}

function setupNavigation() {
  const toggle = $("#menuToggle");
  const links = $("#navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  $$("a", links).forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function observeReveal(root = document) {
  const items = $$(".reveal:not(.observed)", root);

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("seen", "observed"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("seen", "observed");
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  items.forEach((item) => observer.observe(item));
}

function setupSearch() {
  const input = $("#projectSearch");
  if (!input) return;

  input.addEventListener("input", () => {
    query = input.value.trim().toLowerCase();
    renderProjects();
  });
}

function setupInterviewRoom() {
  const root = $("#interviewGrid");
  if (!root) return;

  const questions = [
    ["01", "How do you troubleshoot LDAP/PAM authentication?", "Network → LDAP → SSSD → NSS → PAM → SSH → Authorization."],
    ["02", "Why use SSSD instead of direct LDAP integration?", "SSSD provides a Linux integration layer for identity, authentication, caching and policy-aware access."],
    ["03", "Authentication vs authorization?", "Authentication proves identity; authorization determines what that identity can access or execute."],
    ["04", "Why centralize password policy?", "To maintain consistent password lifecycle controls across clients and reduce fragmented local administration."],
    ["05", "Why use AllowGroups?", "Valid credentials alone should not automatically grant remote-login authorization."],
    ["06", "What does least privilege mean here?", "Map roles to only the Linux resources and sudo commands required for the role."],
    ["07", "What is the break-glass account?", "A controlled local recovery identity used if centralized authentication is unavailable or misconfigured."],
    ["08", "What is the production extension for MFA?", "Add an MFA-capable remote/privileged authentication architecture where required; this lab does not claim MFA is implemented."]
  ];

  root.innerHTML = questions.map(([num, q, a]) => `
    <button class="interview-card" type="button">
      <span>${num} / QUESTION</span>
      <strong>${esc(q)}</strong>
      <em>Click to reveal answer</em>
      <p class="interview-answer" hidden>${esc(a)}</p>
    </button>
  `).join("");

  $$(".interview-card", root).forEach((card) => {
    card.addEventListener("click", () => {
      const answer = $(".interview-answer", card);
      const isHidden = answer.hidden;
      answer.hidden = !isHidden;
      card.classList.toggle("open", isHidden);
    });
  });
}

async function loadGithubProjects() {
  try {
    const response = await fetch(REPO_API, {
      headers: { Accept: "application/vnd.github+json" }
    });
    if (!response.ok) throw new Error(`GitHub API ${response.status}`);
    const repos = await response.json();
    allProjects = mergeProjects(repos);
  } catch (error) {
    console.warn("GitHub project sync unavailable; using curated projects.", error);
    allProjects = [...PROJECTS];
  }

  renderFilters();
  renderProjects();
}

function setupSectionNavigation() {
  const sections = $$("main section[id]");
  const nav = $$("#navLinks a");

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      nav.forEach((anchor) => {
        anchor.classList.toggle("active", anchor.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-28% 0px -58% 0px" });

  sections.forEach((section) => observer.observe(section));
}

const year = $("#year");
if (year) year.textContent = new Date().getFullYear();

setupNavigation();
setupModal();
setupSearch();
setupInterviewRoom();
setupSectionNavigation();
observeReveal();
loadGithubProjects();