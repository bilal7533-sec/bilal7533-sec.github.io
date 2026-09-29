# IAM / PAM Security Test Matrix

| ID | Scenario | Expected result | Evidence |
|---|---|---|---|
| T01 | LDAP identity lookup | bilal resolves on both clients | getent/id |
| T02 | Authorized LDAP SSH | login succeeds | SSH + auth log |
| T03 | Wrong password | authentication denied | auth log |
| T04 | Five failed attempts | faillock threshold reached | faillock output |
| T05 | Unlock | authorized user can authenticate after reset/window | faillock + SSH |
| T06 | Unauthorized LDAP group | SSH denied | sshd log |
| T07 | Linux admin role | only documented sudo commands succeed | sudo -l + sudo log |
| T08 | Unauthorized sudo command | denied | sudo output/log |
| T09 | Joiner | new identity receives intended group/access | LDAP + getent |
| T10 | Mover | old group removed, new role applied | LDAP + id |
| T11 | Leaver | login/access revoked | LDAP + SSH |
| T12 | TLS | trusted certificate connection succeeds | ldapwhoami/SSSD |
| T13 | Bad certificate trust | validation fails | client error/log |
| T14 | Home directory | directory created for LDAP user | ls/stat |
| T15 | PAM troubleshooting | failure isolated to correct layer | troubleshooting notes |

Always retain the command, timestamp, host, expected result and observed result.