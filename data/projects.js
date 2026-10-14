const PROJECTS = [
  {
    id: "enterprise-linux-user-access-management",
    title: "Enterprise Linux User, Group & Access Management Automation with Ansible — Heterogeneous Architecture",
    category: "Infrastructure Automation",
    featured: true,
    description: "Enterprise-style Ansible architecture for repeatable user and group lifecycle management across a heterogeneous Linux environment, with centralized desired-state data, controlled account attributes, group membership, shell and home-directory management, and independent verification.",
    problem: "Standardize Linux identity and local access administration across mixed Linux hosts while reducing configuration drift and making account changes reviewable, repeatable and verifiable.",
    stack: "Ansible • Ubuntu / RHEL concepts • Linux users and groups • UID/GID • SSH/sudo • YAML • getent • id • stat • Ansible Lint",
    validation: "Playbook syntax checks, check-mode preview, CI linting, repeat-run idempotency review, user/group lookups, group-membership checks and home-directory ownership/mode assertions.",
    evidence: "Seven user-management playbooks, shared vars/users.yml data, inventory, project README, architecture and operations notes, security-control context, test matrix and GitHub Actions workflow.",
    tags: ["Ansible", "Linux", "Heterogeneous Architecture", "IAM", "User Management", "Group Management"],
    link: "https://github.com/bilal7533-sec/bilal-sec/tree/main/projects/enterprise-linux-user-access-management",
    details: {
      objective: "Demonstrate data-driven and verifiable Linux user/group lifecycle operations through Ansible rather than unmanaged manual commands.",
      architecture: "Ansible control node → inventory and SSH/sudo → Ubuntu/RHEL-oriented heterogeneous Linux targets → managed groups → user attributes → supplementary memberships → shell/home state → verification evidence.",
      controls: ["Least-access home permissions", "Declared group membership", "Shell path validation", "Idempotent provisioning", "Check-mode preview", "Post-change assertions", "Credential hygiene", "CI syntax/lint checks"],
      phases: "Seven playbooks / shared desired-state data / independent verification / operations and security documentation",
      production: "The included inventory defaults to localhost for safety. Before multi-host production use, validate host-specific UID/GID availability, identity-provider integration, approvals, secrets management, staged rollout and audit logging."
    }
  }
  {
    id: "enterprise-linux-user-access-management",
    title: "Enterprise Linux User, Group & Access Management Automation with Ansible",
    category: "Infrastructure Automation",
    featured: true,
    description: "Data-driven Ansible lab for local Linux account provisioning, group lifecycle, shell and home-directory changes, least-access permissions, idempotency and independent verification.",
    problem: "Make account and group changes consistent and auditable while reducing manual configuration drift and catching access-related errors.",
    stack: "Ansible • YAML • Linux users/groups • UID/GID • SSH/sudo • getent • id • stat • Ansible Lint",
    validation: "Playbook syntax checks, check mode, repeat-run idempotency review, getent lookups, effective group membership, home ownership/mode assertions and GitHub Actions validation.",
    evidence: "Seven requested playbooks, central vars/users.yml, safe localhost inventory, runbook, architecture notes, security-control context, test matrix and CI workflow.",
    tags: ["Ansible", "Linux", "IAM", "User Management", "Group Management", "Verification"],
    link: "https://github.com/bilal7533-sec/bilal-sec/tree/main/projects/enterprise-linux-user-access-management",
    details: {
      objective: "Demonstrate repeatable local Linux account and group management as reviewable configuration rather than a series of manual shell commands.",
      architecture: "Ansible control node → inventory target → become/sudo → managed Unix groups → users/private primary groups → supplementary membership → shell/home state → verification evidence.",
      controls: ["Least-access home permissions", "Declared group membership", "Shell path validation", "Idempotent provisioning", "Check-mode preview", "Post-change assertions", "Credential hygiene", "CI syntax/lint checks"],
      phases: "7 playbooks / shared user-and-group data / architecture and operations documentation / independent verification",
      production: "Before enterprise rollout, integrate approved identity governance, UID/GID allocation, centralized identity (where required), secret management, change approval, audit logging and staged testing. The sample inventory is localhost-only."
    }
  },
  {
    id: "iam-pam",
    title: "Enterprise Linux IAM / PAM / OpenLDAP",
    category: "IAM / PAM",
    featured: true,
    description: "Three-server enterprise identity lab covering OpenLDAP, SSSD, NSS, PAM, password security, pam_faillock, SSH authorization, sudo/RBAC, JML lifecycle, LDAP TLS, troubleshooting and NCA ECC evidence.",
    problem: "Centralize Linux identity and apply consistent authentication and authorization controls across multiple Linux clients.",
    stack: "SERVER-01 + SERVER-02 + SERVER-03 • OpenLDAP → SSSD → NSS → PAM → SSH → sudo/RBAC",
    validation: "LDAP lookup, normal login, wrong password, lockout, unauthorized SSH, privileged sudo, Joiner/Mover/Leaver and TLS tests.",
    evidence: "Architecture, LDIF, SSSD examples, PAM model, test matrix, troubleshooting guide, NCA matrix and final-report template.",
    tags: ["OpenLDAP","SSSD","NSS","PAM","RBAC","LDAP TLS"],
    link: "https://github.com/bilal7533-sec/bilal7533-sec.github.io/tree/main/projects/enterprise-ldap-pam-security-lab",
    details: {
      objective: "Build a centralized Linux identity and access-control model that separates identity, authentication, authorization, privilege and transport security.",
      architecture: "User → SSH → PAM → pam_sss → SSSD → LDAP → Identity/Groups → PAM account rules → AllowGroups → sudo/RBAC → Linux resource.",
      controls: ["Centralized identity","Password policy","pam_faillock","SSH group authorization","Least privilege","JML lifecycle","LDAP TLS"],
      phases: "18 phases / 70 master activities",
      production: "MFA for applicable remote/privileged access, directory redundancy, enterprise secrets management and formal change workflow remain production extensions."
    }
  },
  {
    id: "rootkit",
    title: "Enterprise Rootkit Detection & Host Integrity",
    category: "SOC / Detection",
    featured: true,
    description: "Linux threat-detection lab combining chkrootkit, rkhunter, OSSEC, file-integrity monitoring, rootcheck, controlled suspicious artifacts and SOC investigation.",
    problem: "Detect and investigate suspicious host activity without deploying a real rootkit.",
    stack: "WEB01 + APP01 → chkrootkit + rkhunter + OSSEC → SEC-MON01 → SOC workflow",
    validation: "Controlled hidden artifacts, integrity changes, scanner checks, OSSEC alerts, timeline creation, remediation and verification.",
    evidence: "Architecture, scan automation, safe simulation, OSSEC examples, investigation checklist and incident-report template.",
    tags: ["chkrootkit","rkhunter","OSSEC","HIDS","FIM","Threat Detection"],
    link: "https://github.com/bilal7533-sec/bilal7533-sec.github.io/tree/main/projects/enterprise-rootkit-detection",
    details: {
      objective: "Demonstrate layered host detection rather than relying on a single rootkit scanner.",
      architecture: "Host scanners + OSSEC agent → centralized manager → SOC investigation.",
      controls: ["Rootkit-oriented scanning","File integrity monitoring","Rootcheck","Authentication-log analysis","Process/network investigation"],
      phases: "Detection → Validation → Scope → Response → Remediation → Verification",
      production: "Advanced EDR/SIEM correlation and additional endpoint telemetry are production extensions."
    }
  },
  {
    id: "soc-labs",
    title: "SOC Labs & Threat Hunting",
    category: "SOC / Detection",
    description: "Practical SOC investigation and threat-hunting exercises focused on authentication, logs, process execution and attack timelines.",
    problem: "Turn raw security telemetry into an investigation narrative and defensible response.",
    stack: "Linux telemetry • SIEM-oriented investigation • threat-hunting workflow",
    validation: "Alert triage, source-IP identification, user attribution, process and privilege correlation.",
    evidence: "Investigation notes, queries, findings and response workflow.",
    tags: ["SOC","Threat Hunting","SIEM","Incident Response"],
    link: "https://github.com/bilal7533-sec/Soc-Labs"
  },
  {
    id: "linux-hardening",
    title: "Linux Hardening",
    category: "Linux Security",
    description: "Practical Linux security hardening covering secure services, access control, firewalling and baseline validation.",
    problem: "Reduce host attack surface while preserving required operational functionality.",
    stack: "RHEL / Ubuntu • SSH • systemd • nftables • CIS / OpenSCAP",
    validation: "Configuration checks, service review, hardening verification and baseline-oriented testing.",
    evidence: "Hardening commands, configuration snapshots, validation results and troubleshooting notes.",
    tags: ["Linux","Hardening","CIS","OpenSCAP"],
    link: "https://github.com/bilal7533-sec/linux-hardening"
  },
  {
    id: "vulnerability",
    title: "Vulnerability Assessment & Reporting",
    category: "Vulnerability",
    description: "Vulnerability-management work focused on findings, validation, remediation tracking and security reporting.",
    problem: "Convert vulnerability findings into prioritized, actionable remediation evidence.",
    stack: "Qualys-oriented workflows • CVE analysis • remediation validation",
    validation: "Finding review, risk context, remediation state and verification.",
    evidence: "Assessment/report examples, remediation tracking and verification notes.",
    tags: ["Qualys","CVE","Vulnerability Management","Remediation"],
    link: "https://github.com/bilal7533-sec/vulnerability-reports"
  },
  {
    id: "scada",
    title: "SCADA / ICS Security Notes",
    category: "OT / ICS",
    description: "Security engineering notes and assessment thinking for industrial/SCADA environments, with attention to segmentation and operational constraints.",
    problem: "Apply defensive security thinking where availability and safety constraints change the security approach.",
    stack: "SCADA / ICS • OT security • segmentation • IEC 62443 concepts",
    validation: "Architecture review, control identification and operational-security analysis.",
    evidence: "OT security notes, control considerations and assessment material.",
    tags: ["SCADA","ICS","OT Security","IEC 62443"],
    link: "https://github.com/bilal7533-sec/scada-security-notes"
  },
  {
    id: "sigma",
    title: "Sigma Detection Engineering",
    category: "SOC / Detection",
    description: "Detection-engineering practice using Sigma-style rules and investigation logic.",
    problem: "Translate suspicious behavior into portable, reviewable detection logic.",
    stack: "Sigma • detection logic • SOC investigation workflow",
    validation: "Rule structure, detection intent and investigation mapping.",
    evidence: "Detection rules and analyst-oriented reasoning.",
    tags: ["Sigma","Detection Engineering","SOC"],
    link: "https://github.com/bilal7533-sec/sigma-rules"
  },
  {
    id: "apache",
    title: "Apache / Linux Server Security",
    category: "Linux Security",
    description: "Linux web-server administration and security practice around Apache service operation and secure configuration.",
    problem: "Operate a Linux web service while keeping configuration and access controls security-aware.",
    stack: "Ubuntu / Apache / systemd / logs / SSH",
    validation: "Service state, configuration validation and log review.",
    evidence: "Server configuration and operational notes.",
    tags: ["Apache","Linux","Web Server","systemd"],
    link: "https://github.com/bilal7533-sec/Apache-Server"
  }
];
