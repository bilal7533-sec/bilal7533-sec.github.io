const PROJECTS = [
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
  },
  {
    id: "rsyslog",
    title: "rsyslog mTLS Infrastructure",
    category: "Secure Logging",
    description: "Secure centralized logging architecture using TCP/TLS, X.509 certificates and protected transport.",
    problem: "Move infrastructure logs centrally without exposing log transport to passive interception or unauthenticated endpoints.",
    stack: "rsyslog • TCP 6514 • TLS 1.3 • X.509 • CA",
    validation: "Certificate trust, transport, queue behavior and receiver validation.",
    evidence: "TLS configuration, certificate workflow and troubleshooting evidence.",
    tags: ["rsyslog","mTLS","TLS 1.3","X.509"],
    link: "https://github.com/bilal7533-sec/bilal7533-sec.github.io/tree/main/projects/enterprise-rootkit-detection"
  }
];
