# Enterprise Rootkit Detection & Host Integrity Monitoring — Architecture

## Lab topology

| Server | Hostname | IP | Role |
|---|---|---|---|
| SERVER-01 | WEB01 | 192.168.149.128 | Linux target, chkrootkit, rkhunter, OSSEC Agent |
| SERVER-02 | SEC-MON01 | 192.168.149.129 | OSSEC Manager, centralized alerts |
| SERVER-03 | APP01 | 192.168.149.130 | Linux target, chkrootkit, rkhunter, OSSEC Agent |
| SERVER-04 | SOC01 | 192.168.149.131 | Analyst workstation |

## Trust and data flow

```text
                        SOC01
                   Analyst Workstation
                         |
                  Investigation / SSH
                         |
                         v
                  +---------------+
                  |   SEC-MON01   |
                  | OSSEC Manager |
                  +-------+-------+
                          ^
                    Agent telemetry
                 +--------+--------+
                 |                 |
                 |                 |
             +---+---+         +---+---+
             | WEB01 |         | APP01 |
             | Agent |         | Agent |
             +---+---+         +---+---+
                 |                 |
          +------+------+    +-----+------+
          |             |    |            |
     chkrootkit     rkhunter chkrootkit rkhunter
          |             |    |            |
          +-------------+----+------------+
                        |
                  Host telemetry
                  logs + FIM + rootcheck
```

## Detection layers

1. **On-demand scanning:** chkrootkit and rkhunter.
2. **Host telemetry:** authentication, sudo, process and network state.
3. **Integrity monitoring:** OSSEC syscheck/FIM.
4. **Rootcheck:** OSSEC rootcheck capabilities.
5. **Centralized alerting:** SEC-MON01.
6. **Human validation:** SOC01 investigation and false-positive analysis.

## Security boundaries

- No real rootkit is installed.
- No production system binaries are modified.
- Suspicious artifacts are created only under lab-controlled paths.
- Baselines are established only after the host state is reviewed.
- Investigation evidence is retained separately from temporary test artifacts.
