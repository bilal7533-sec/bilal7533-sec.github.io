# Evidence Index

| Evidence ID | Evidence | Purpose |
|---|---|---|
| E01 | Architecture diagram | role/trust/data flow |
| E02 | Server inventory | asset identification |
| E03 | OpenLDAP service/query | identity authority |
| E04 | LDAP OUs/groups/user | centralized identity |
| E05 | SSSD config check | client integration |
| E06 | getent/id | identity resolution |
| E07 | PAM stack | authentication policy |
| E08 | Password policy | password control |
| E09 | faillock test | failed-login protection |
| E10 | SSH config/test | remote access authorization |
| E11 | sudo -l / audit log | privileged access |
| E12 | JML evidence | lifecycle/access review |
| E13 | SSH/PAM/SSSD/sudo logs | authentication evidence |
| E14 | TLS certificate/ldapwhoami | encrypted transport |
| E15 | Test matrix | control validation |
| E16 | NCA matrix | compliance evidence mapping |

Never commit passwords, private keys, bind secrets, tokens or unredacted sensitive data.