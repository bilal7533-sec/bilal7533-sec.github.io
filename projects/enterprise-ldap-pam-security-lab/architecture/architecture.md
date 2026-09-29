# Architecture — Enterprise Linux IAM / PAM

SERVER-02 / LDAP01 is the central directory and password-policy authority.
SERVER-01 / linux-client01 is a centralized authentication client and also carries a controlled local break-glass identity.
SERVER-03 / linux-client02 is a second centralized authentication client.

Network flow:

SERVER-01 <-> LDAP/TLS <-> SERVER-02 <-> LDAP/TLS <-> SERVER-03

Remote access flow:

User -> SSH -> PAM -> pam_sss -> SSSD -> LDAP -> User/Groups -> PAM account rules -> AllowGroups / sudo-RBAC -> Linux resource

Control planes:

Identity: OpenLDAP
Integration: SSSD
Identity lookup: NSS
Authentication policy: PAM
Remote access: OpenSSH
Privilege authorization: sudo
Password policy: LDAP ppolicy target
Failed-login protection: pam_faillock
Transport protection: TLS
Audit evidence: local auth/journal/syslog and configuration evidence

Failure boundary:

LDAP outage should not automatically become a privilege escalation path. Maintain a controlled break-glass account and test its use.