# Bilal Ahmad — Cyber Security Portfolio

Live site: https://bilal7533-sec.github.io/

A responsive, evidence-focused cybersecurity portfolio covering SOC operations, Linux security, IAM/PAM, vulnerability management, cloud security, application security and OT/ICS.

## Website features

- Recruiter-focused profile and capability overview.
- Featured cybersecurity projects presented as interactive case studies.
- Project search and category filters.
- Automatic discovery of new public GitHub repositories.
- Interview Room with technical discussion prompts.
- Security control → implementation → evidence view.
- Attack → Detect → Investigate → Respond workflow.
- Responsive design for desktop and mobile.

## Project experience

- Enterprise Linux IAM / PAM / OpenLDAP Security Engineering
- Enterprise Rootkit Detection & Host Integrity Monitoring
- SOC / Threat Hunting
- Linux Hardening
- Vulnerability Assessment / Reporting
- SCADA / ICS Security
- Sigma Detection Engineering
- Apache / Linux Server Security
- rsyslog mTLS security work

## Website architecture

index.html
style.css
app.js
data/projects.js
projects/<project documentation>

data/projects.js contains curated case-study metadata. app.js also queries the public GitHub API so future public repositories can appear automatically.

## Adding a new project

Create a public repository under bilal7533-sec. Add a clear repository description and useful GitHub topics. The portfolio will discover the repository automatically.

For a deeper recruiter/interviewer experience, add the project as a curated entry in data/projects.js with:

- Security problem
- Architecture / stack
- Validation
- Evidence
- Tags
- Production considerations
- Case-study details

## Existing project documentation

The repository contains detailed lab documentation under projects/, including the Enterprise Linux IAM/PAM lab and Enterprise Rootkit Detection lab.

## Safety and evidence

Do not commit passwords, private keys, tokens, bind credentials or sensitive production data.

Claims in project pages should distinguish between:

- Demonstrated in the lab
- Documented procedure
- Production consideration
- Not implemented / future extension

## Portfolio methodology

Concept → Architecture → Implementation → Validation → Troubleshooting → Evidence → Security reasoning → Control mapping

## GitHub

https://github.com/bilal7533-sec