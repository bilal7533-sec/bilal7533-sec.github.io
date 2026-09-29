# Enterprise Rootkit Detection & Host Integrity Monitoring Lab

A practical, enterprise-style Linux threat detection and host integrity monitoring lab built around **chkrootkit, rkhunter and OSSEC**.

> **Safety boundary:** This lab does not deploy or install a real rootkit. Detection capability is validated with controlled, harmless suspicious artifacts, integrity changes, persistence indicators and test events.

## Repository structure

```text
enterprise-rootkit-detection/
├── README.md
├── architecture/
│   └── architecture.md
├── scripts/
│   ├── rootkit-chkrootkit-scan.sh
│   ├── safe-detection-simulation.sh
│   └── investigation-collection.sh
├── ossec/
│   ├── syscheck-example.conf
│   └── rootcheck-example.conf
├── investigation/
│   └── investigation-checklist.md
├── reports/
│   └── incident-report-template.md
└── evidence/
    └── README.md
```

The configuration files under `ossec/` are **reference fragments**, not blind drop-in replacements. Validate them against the exact OSSEC release and existing manager/agent configuration before deployment.

## Objectives

- Understand rootkit concepts and detection limitations.
- Build a four-VM enterprise-style monitoring architecture.
- Establish a known-good baseline before integrity testing.
- Run and automate chkrootkit and rkhunter scans.
- Deploy OSSEC Manager + Agents for centralized host monitoring.
- Implement file integrity monitoring and rootcheck.
- Correlate host alerts with SSH, sudo, process and network telemetry.
- Practice SOC triage, investigation timelines, remediation and verification.
- Produce evidence suitable for security engineering documentation.

## Lab Architecture

| Server | Hostname | IP | Role |
|---|---|---|---|
| SERVER-01 | WEB01 | 192.168.149.128 | Linux target + scanners + OSSEC agent |
| SERVER-02 | SEC-MON01 | 192.168.149.129 | OSSEC Manager + centralized alerts |
| SERVER-03 | APP01 | 192.168.149.130 | Second Linux target + scanners + OSSEC agent |
| SERVER-04 | SOC01 | 192.168.149.131 | Analyst workstation / investigation |

### Detection flow

```text
Suspicious activity
       |
       v
   WEB01 / APP01
       |
   +---+--------------------+
   |                        |
chkrootkit                rkhunter
   |                        |
   +-----------+------------+
               |
          OSSEC Agent
               |
               v
          SEC-MON01
               |
        Alert / Event
               |
               v
             SOC01
               |
        Investigation
               |
        Remediation
               |
          Verification
```

## Tool roles

| Tool | Role |
|---|---|
| chkrootkit | Rootkit-oriented signature/check based detection |
| rkhunter | Rootkit, hidden-file, suspicious-binary and integrity checks |
| OSSEC | HIDS, log analysis, rootcheck, file integrity monitoring and centralized alerting |

These tools provide **defence-in-depth**. No individual scanner should be treated as proof that a host is clean or compromised.

## Phases

### Phase 1 — Rootkit fundamentals
Study user-space and kernel-level rootkits, persistence, hiding techniques, modified binaries, hidden files and detection limitations.

### Phase 2 — Tool roles
Understand what each tool detects and where its visibility ends.

### Phase 3 — Lab preparation
Configure hostnames, IP addressing and internal name resolution.

### Phase 4 — chkrootkit
Install, baseline the environment, perform a manual scan and save repeatable scan output.

### Phase 5 — chkrootkit automation
Create a controlled shell wrapper that records timestamped scan results under `/var/log/security/`.

### Phase 6 — rkhunter
Install, update signatures and establish the property baseline only after confirming the system is known-good.

### Phase 7 — rkhunter detection
Run normal and report-only scans, inspect warnings and validate findings rather than blindly declaring compromise.

### Phase 8 — Safe detection simulation
Create harmless hidden files and lab-only configuration artifacts under dedicated paths. Do not modify production binaries or deploy malware.

### Phase 9 — OSSEC Manager
Deploy the centralized manager on SEC-MON01 using a pinned, documented OSSEC release and its official deployment procedure.

### Phase 10 — OSSEC Agents
Enroll WEB01 and APP01 as monitored agents and validate agent-to-manager communication.

### Phase 11 — File Integrity Monitoring
Monitor security-relevant paths such as `/etc`, selected application directories and lab-controlled files. Avoid blindly monitoring the entire filesystem.

### Phase 12 — Rootcheck
Enable and validate OSSEC rootcheck capabilities alongside the standalone scanners.

### Phase 13 — Central alerting
Confirm that host events reach SEC-MON01 with hostname, timestamp, rule/severity and affected file/event details.

### Phase 14 — SOC investigation
Correlate alerts with:
- SSH authentication
- source IP
- user
- sudo activity
- process execution
- network listeners/connections
- persistence mechanisms
- sensitive file changes

### Phase 15 — Timeline
Build the investigation chain:

```text
Source IP
   -> User
   -> SSH login
   -> Success / Failure
   -> Process
   -> sudo
   -> Sensitive file access/modify
   -> Detection alert
```

### Phase 16 — False-positive validation
Check package ownership, authorized change records, hashes, timestamps and expected maintenance before classifying a warning.

### Phase 17 — Incident response
Classify the finding, contain where appropriate, collect evidence, remove the lab artifact and rescan.

### Phase 18 — Verification
Repeat scanners, review OSSEC state and verify that the controlled artifact is gone and no unexpected alert remains.

### Phase 19 — Evidence mapping
Capture architecture, configurations, scan reports, integrity alerts, investigation notes, remediation evidence and final verification.

### Phase 20 — Resume evidence
Demonstrate end-to-end defensive engineering rather than simple tool installation.

## Core Linux investigation commands

```bash
# SSH authentication
sudo grep -Ei "Accepted|Failed|Invalid" /var/log/auth.log

# sudo activity
sudo grep -i sudo /var/log/auth.log

# Recent logins
last -ai

# Current users
who

# Process tree
ps auxf
pstree -ap

# Listening sockets
sudo ss -lntup

# Enabled services
sudo systemctl list-unit-files --state=enabled

# Cron locations
sudo ls -la /etc/cron.d/
sudo ls -la /etc/cron.daily/

# SSH key persistence review
sudo find /home /root -name authorized_keys -type f -exec ls -l {} \;

# Recently changed files
sudo find /etc /usr/local /opt -xdev -type f -mtime -1 -ls 2>/dev/null
```

## Safe simulation

Use dedicated lab artifacts instead of a real rootkit:

```bash
sudo mkdir -p /opt/lab-suspicious

sudo touch /opt/lab-suspicious/.hidden-backdoor-test
sudo touch /opt/lab-suspicious/.rootkit-test

sudo tee /etc/security/lab-rootkit-test.conf >/dev/null <<'EOF'
# LAB ONLY
# Harmless simulated suspicious configuration artifact.
LAB_ROOTKIT_DETECTION_TEST=yes
EOF
```

The purpose is to exercise **detection and investigation workflows**, not malware execution.

## Investigation matrix

| Indicator | chkrootkit | rkhunter | OSSEC | Manual |
|---|---|---|---|---|
| Known rootkit indicators | Yes | Yes | Partial / rule dependent | Yes |
| Hidden files | Limited | Yes | Yes | Yes |
| File integrity | Limited | Yes | Yes | Yes |
| SSH activity | No | No | Yes | Yes |
| sudo activity | No | No | Yes | Yes |
| Centralized alerts | No | No | Yes | No |
| Persistence review | Limited | Yes | Rule dependent | Yes |

## Incident scenario

Example alert:

```text
HOST: WEB01
EVENT: Suspicious file modification
PATH: /etc/security/lab-rootkit-test.conf
```

Analyst questions:

1. Which host changed?
2. What file changed?
3. When did it change?
4. Which account was active?
5. Was there a related SSH session?
6. Was sudo used?
7. What process created or modified the artifact?
8. What network connections were active?
9. Were other files modified?
10. Do chkrootkit and rkhunter show supporting evidence?
11. Is the change authorized or a lab simulation?

## Remediation and verification

Remove only the controlled lab artifacts:

```bash
sudo rm -f /etc/security/lab-rootkit-test.conf
sudo rm -rf /opt/lab-suspicious
sudo rm -rf /opt/lab-integrity
```

Then repeat:

```bash
sudo chkrootkit
sudo rkhunter --check --skip-keypress --report-warnings-only
```

For OSSEC, confirm the final state through manager/agent status and review that no unexpected integrity event remains.

## Evidence checklist

- Architecture diagram
- Host inventory
- chkrootkit baseline and scan report
- rkhunter baseline and warning report
- OSSEC Manager configuration
- OSSEC Agent enrollment evidence
- File-integrity alert
- Rootcheck output
- Authentication and sudo logs
- Process and network investigation
- Incident timeline
- False-positive validation notes
- Remediation evidence
- Final verification
- Final incident report

## NCA ECC alignment

Map this lab to the exact control identifiers in the **NCA ECC 2:2024 matrix adopted for the target environment**. Do not invent control IDs in the lab documentation. Evidence can support areas such as security monitoring, logging, threat detection, incident handling, host hardening and access control depending on the implemented control scope.

## Interview talking points

### Why multiple tools?
Because each has different visibility. Standalone scanners provide on-demand checks while OSSEC adds continuous host telemetry, file integrity monitoring and centralized alerting.

### Does a warning prove compromise?
No. Validate package state, expected changes, hashes, timestamps, process activity, authentication history and other telemetry.

### Is a clean scanner result proof the host is safe?
No. Rootkits and advanced malware can evade host-based checks. Detection therefore relies on layered telemetry and investigation.

## Resume achievement

> Engineered a multi-host Linux rootkit detection and host-integrity monitoring lab using chkrootkit, rkhunter and OSSEC, implementing centralized file-integrity monitoring, rootcheck, authentication-log analysis, suspicious-artifact detection, investigation timelines, false-positive validation, remediation workflows and security-control evidence.

## Portfolio

This project is published inside the portfolio repository under:

`projects/enterprise-rootkit-detection/`

The portfolio also contains a dedicated featured card for this lab.
