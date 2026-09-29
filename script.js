// =========================================================
// Bilal Ahmad — Cybersecurity Portfolio
// GitHub-powered project discovery + lightweight interactions.
// =========================================================

const GITHUB_OWNER = "bilal7533-sec";
const GITHUB_API = `https://api.github.com/users/${GITHUB_OWNER}/repos?per_page=100&sort=updated`;

const featuredPortfolioProjects = [
  {
    id: "host-integrity-monitoring",
    name: "Enterprise Host Integrity Monitoring Lab",
    title: "Enterprise Rootkit Detection & Host Integrity Monitoring",
    category: "Threat Detection",
    description:
      "Enterprise-style Linux detection lab covering baseline integrity, chkrootkit, rkhunter, OSSEC, simulated suspicious indicators, alert triage, investigation, remediation and verification.",
    tags: ["Linux", "chkrootkit", "rkhunter", "OSSEC", "HIDS", "Threat Detection"],
    html_url: "https://github.com/bilal7533-sec/bilal7533-sec.github.io#projects",
    updated_at: new Date().toISOString(),
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    archived: false,
    isPortfolioProject: true
  }
];

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function prettyName(name) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function classify(repo) {
  const text = [
    repo.name,
    repo.description,
    ...(repo.topics || [])
  ].join(" ").toLowerCase();

  if (/soc|sigma|siem|threat|hunt|detection|incident/.test(text)) return "SOC / Detection";
  if (/scada|ics|ot|industrial/.test(text)) return "OT / ICS";
  if (/vulnerab|qualys|cve|security.?report/.test(text)) return "Vulnerability";
  if (/appsec|owasp|application|web.?security/.test(text)) return "Application Security";
  if (/linux|hardening|rhel|ubuntu|apache|server|ssh|pam|ldap/.test(text)) return "Linux Security";
  return "Security Engineering";
}

function repoTags(repo) {
  const topics = Array.isArray(repo.topics) ? repo.topics : [];
  if (topics.length) return topics.slice(0, 5);

  const category = classify(repo);
  return category.split(" / ").slice(0, 3);
}

function projectCard(repo, index) {
  const category = classify(repo);
  const title = prettyName(repo.name);
  const description = repo.description || "Cybersecurity project and hands-on engineering work.";
  const tags = repoTags(repo);

  return `
    <article class="project-card reveal ${index === 0 ? "featured" : ""}">
      <div class="project-top">
        <span class="project-number">GITHUB ${String(index + 1).padStart(2, "0")}</span>
        <span class="status">${escapeHtml(category)}</span>
      </div>

      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(description)}</p>

      <div class="tag-list">
        ${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
      </div>

      <div class="project-meta">
        <span>★ ${repo.stargazers_count}</span>
        <span>⑂ ${repo.forks_count}</span>
        <span>Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>

      <a class="project-link" href="${escapeHtml(repo.html_url)}" target="_blank" rel="noopener noreferrer">
        View on GitHub <span>↗</span>
      </a>
    </article>
  `;
}

function renderFilters(repos) {
  const container = document.querySelector("#project-filters");
  if (!container) return;

  const categories = ["All", ...new Set(repos.map(classify))];

  container.innerHTML = categories.map((category, index) => `
    <button class="filter-btn ${index === 0 ? "active" : ""}" type="button"
      data-filter="${escapeHtml(category)}">${escapeHtml(category)}</button>
  `).join("");

  container.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      container.querySelectorAll(".filter-btn").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderProjects(repos, button.dataset.filter);
    });
  });
}

function renderProjects(repos, filter = "All") {
  const grid = document.querySelector("#project-grid");
  const count = document.querySelector("#project-count");
  if (!grid) return;

  const filtered = filter === "All" ? repos : repos.filter((repo) => classify(repo) === filter);

  if (count) {
    count.textContent = `${filtered.length} project${filtered.length === 1 ? "" : "s"}`;
  }

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="project-state">
        <p>No repositories found in this category.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(projectCard).join("");
  observeReveals(grid);
}

function renderError() {
  const grid = document.querySelector("#project-grid");
  const count = document.querySelector("#project-count");
  if (count) count.textContent = "GitHub unavailable";

  if (grid) {
    grid.innerHTML = `
      <div class="project-state project-error">
        <strong>Could not load GitHub repositories.</strong>
        <p>Open the GitHub profile directly or refresh the page later.</p>
        <a class="project-link" href="https://github.com/${GITHUB_OWNER}" target="_blank" rel="noopener noreferrer">
          Open GitHub profile ↗
        </a>
      </div>
    `;
  }
}

async function loadGitHubProjects() {
  const response = await fetch(GITHUB_API, {
    headers: { Accept: "application/vnd.github+json" }
  });

  if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);

  const repos = await response.json();

  const visibleRepos = repos
    .filter((repo) => !repo.fork && !repo.archived)
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  renderFilters(visibleRepos);
  renderProjects(visibleRepos);
}

function observeReveals(root = document) {
  const items = root.querySelectorAll(".reveal:not(.observed)");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible", "observed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible", "observed");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  items.forEach((item) => observer.observe(item));
}

observeReveals();

const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navAnchors.forEach((anchor) => {
          anchor.classList.toggle(
            "active",
            anchor.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

loadGitHubProjects().catch((error) => {
  console.error("GitHub project loading failed:", error);
  renderError();
});
