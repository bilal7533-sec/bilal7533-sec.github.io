# Linux Host Integrity Incident Report

## 1. Incident metadata

| Field | Value |
|---|---|
| Incident ID | |
| Host | |
| Date / Time (UTC) | |
| Analyst | |
| Severity | |
| Detection source | |

## 2. Executive summary

Describe what was detected, where it was detected, and the current classification.

## 3. Detection evidence

Record:

- OSSEC alert/rule
- chkrootkit output
- rkhunter warnings
- FIM path and change
- relevant timestamps

## 4. Identity and access

Document:

- source IP
- authenticated account
- SSH result
- sudo activity
- relevant login history

## 5. Process and network analysis

Document:

- suspicious process
- executable path
- parent process
- listening sockets
- related network connections

## 6. Persistence analysis

Review:

- systemd enabled services
- cron
- SSH authorized_keys locations
- startup scripts
- suspicious files

## 7. False-positive validation

Record package ownership, expected maintenance, hashes, change authorization and other corroborating evidence.

## 8. Timeline

```text
[time] Source IP -> user -> SSH -> process -> sudo -> file change -> alert
```

## 9. Containment / remediation

Record actions performed and why they were safe.

## 10. Verification

Document:

- artifact removed
- repeated scans
- OSSEC state
- no unexpected residual persistence
- final analyst validation

## 11. NCA ECC evidence

Map only to the exact control identifiers used by the target ECC 2:2024 control matrix.

## 12. Lessons learned

Record detection gaps, false-positive causes, monitoring improvements and hardening actions.
