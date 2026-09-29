# Enterprise Linux IAM / PAM / OpenLDAP Security Engineering Lab

A complete three-server Linux identity and access management laboratory covering centralized identity, authentication, authorization, privileged access, password security, failed-login protection, SSH controls, Joiner-Mover-Leaver lifecycle, TLS, troubleshooting, validation and NCA ECC evidence mapping.

## What this project demonstrates

1. Central identity with OpenLDAP.
2. Linux identity integration through SSSD and NSS.
3. PAM authentication, account, password and session control.
4. Automatic home-directory creation with pam_mkhomedir.
5. Central password-policy design.
6. Failed-login protection with pam_faillock.
7. SSH root-login restriction and group-based authorization.
8. LDAP group-based RBAC and least-privilege sudo.
9. Joiner-Mover-Leaver lifecycle.
10. Authentication and privileged-activity logging.
11. LDAP TLS / certificate validation.
12. Layered troubleshooting from network to authorization.
13. Security test matrix and evidence collection.
14. NCA ECC 2:2024 IAM control mapping.

## Architecture

| Server | Hostname | IP | Responsibility |
|---|---|---|---|
| SERVER-01 | linux-client01 | 192.168.149.128 | Local break-glass identity + LDAP/SSSD/PAM client + SSH |
| SERVER-02 | LDAP01 | 192.168.149.129 | OpenLDAP central identity and password-policy authority |
| SERVER-03 | linux-client02 | 192.168.149.130 | Second LDAP/SSSD/PAM Linux client + SSH |

Three-server decision: SERVER-01 intentionally supports both a local recovery identity and centralized LDAP identities, SERVER-02 remains the directory authority, and SERVER-03 provides a second client so centralized authentication can be demonstrated across more than one host.

## End-to-end flow

User -> SSH -> PAM -> pam_sss -> SSSD -> LDAP -> identity/groups -> PAM account rules -> SSH AllowGroups / sudo-RBAC -> Linux resource

SSSD is the Linux integration layer for directory-backed identity, authentication and authorization; NSS exposes directory users/groups to Linux; PAM applies service-specific authentication, account, password and session controls. Ubuntu documents SSSD with LDAP as a supported enterprise integration model. [Ubuntu SSSD with LDAP](https://documentation.ubuntu.com/server/how-to/sssd/with-ldap/) [Ubuntu SSSD overview](https://ubuntu.com/server/docs/explanation/intro-to/sssd/)

## Directory model

Base DN: dc=corp,dc=example

Admin DN: cn=admin,dc=corp,dc=example

Organizational units: ou=People, ou=Groups, ou=Admins, ou=Policies

Groups: linux-users (GID 20000), linux-admins (GID 20001), security-admins (GID 20002)

Example LDAP identity: uid=bilal, cn=Bilal Ahmad, uidNumber=20001, gidNumber=20000, home=/home/bilal, shell=/bin/bash

## Master phase list

### Phase 1 — Infrastructure & Architecture
1. Server utilization and role separation.
2. SERVER-02 as central identity server.
3. SERVER-03 as enterprise Linux client.
4. Enterprise network architecture.
5. Authentication flow.
6. PAM auth/account/password/session model.

### Phase 2 — Basic Preparation
7. Update all servers.
8. Set hostnames.
9. Configure /etc/hosts.
10. Create local break-glass/test identity on SERVER-01.

### Phase 3 — Central Identity / OpenLDAP
11. Install OpenLDAP.
12. Verify slapd and LDAP queries.
13. Build dc=corp,dc=example.
14. Create People, Groups, Admins and Policies OUs.
15. Create Linux groups.
16. Create bilal identity.
17. Assign group membership.

### Phase 4 — SSSD / LDAP Client Integration
18. Install SSSD/NSS/LDAP packages on SERVER-01 and SERVER-03.
19. Configure LDAP URI, base DN and RFC2307 identity mapping.
20. Configure /etc/sssd/sssd.conf with least exposure and permissions.
21. Start and validate SSSD.
22. Validate getent, id and group resolution.

### Phase 5 — PAM Authentication
23. Enable PAM and automatic home-directory creation.
24. Test LDAP login.
25. Understand common-auth/account/password/session stacks.
26. Understand pam_sss.so forwarding into SSSD.

### Phase 6 — Password Security
27. Define and implement LDAP password policy.
28. Explain why centralized password policy provides consistency.

### Phase 7 — Failed Login Protection
29. Design failure protection.
30. Configure pam_faillock.
31. Trigger controlled failures and verify lockout/reset.

### Phase 8 — SSH Security
32. Harden SSH and prohibit direct root login.
33. Use AllowGroups for approved LDAP groups.

### Phase 9 — Sudo / Privileged Access
34. Define least-privilege sudo.
35. Implement privileged LDAP role/group.
36. Replace broad sudo with role-based scopes.
37. Restrict administrative commands.

### Phase 10 — IAM Lifecycle
38. Joiner.
39. Mover.
40. Leaver.

### Phase 11 — Security Testing
41. Unauthorized access test.
42. Privileged access test.

### Phase 12 — Authentication Logging
43. Verify SSH, PAM, SSSD and sudo evidence.

### Phase 13 — Production Security Considerations
44. Identify insecure/default practices.
45. Establish that plain LDAP authentication traffic is not acceptable for production.

### Phase 14 — LDAP TLS / Encryption
46. Lab CA and server certificate.
47. STARTTLS/LDAPS validation.
48. SSSD encrypted LDAP configuration.

### Phase 15 — PAM Troubleshooting
49. Layered troubleshooting methodology.
50. Network checks.
51. LDAP checks.
52. SSSD checks.
53. PAM checks.
54. SSH checks.
55. Authorization checks.

### Phase 16 — Security Validation
56. Execute consolidated IAM/PAM security test matrix.

### Phase 17 — NCA ECC Mapping
57. Build evidence matrix.
58. ECC 2-2-1.
59. ECC 2-2-2.
60. ECC 2-2-3-1.
61. ECC 2-2-3-2.
62. ECC 2-2-3-3.
63. ECC 2-2-3-4.
64. ECC 2-2-3-5.
65. ECC 2-2-4.

### Phase 18 — Enterprise Implementation
66. Real enterprise operating model.
67. Enterprise Joiner example.
68. Enterprise Mover example.
69. Enterprise Leaver example.
70. Memorize the complete PAM architecture.

## Security policy targets

| Area | Lab target |
|---|---|
| LDAP minimum password length | 12 |
| LDAP maximum password age | 90 days / 7,776,000 seconds |
| LDAP password history | 5 |
| LDAP max failures | 5 |
| LDAP lockout | enabled |
| LDAP lockout duration | 900 seconds |
| LDAP failure interval | 900 seconds |
| pam_faillock deny | 5 |
| pam_faillock fail_interval | 900 seconds |
| pam_faillock unlock_time | 900 seconds |
| SSH direct root login | disabled |
| SSH access groups | linux-users, linux-admins |

Treat these values as lab targets. Validate the actual PAM/OpenLDAP module versions before applying to a production-like environment.

## Test model

Normal login must succeed for an authorized LDAP user.
Invalid credentials must fail.
Repeated invalid credentials must trigger the configured lockout control.
An LDAP user outside the approved SSH group must be rejected by SSH authorization.
An authorized privileged group must receive only documented sudo commands.
JML changes must alter group membership and resulting access.
TLS validation must fail when certificate trust/hostname/time validation is intentionally incorrect.

## Troubleshooting model

Network -> LDAP -> SSSD -> NSS -> PAM -> SSH -> Authorization

Useful commands are maintained in troubleshooting/troubleshooting-method.md and are intentionally grouped by layer so the analyst can isolate failures rather than changing multiple controls at once.

## NCA ECC 2:2024 mapping

The NCA ECC 2:2024 defines 2-2 as Identity and Access Management. It includes requirements for IAM definition/implementation, username/password authentication, MFA for remote access and privileged accounts, need-to-know/need-to-use and least privilege, privileged access management, periodic identity/access review, and periodic review of IAM implementation. This lab demonstrates selected IAM controls and documents MFA as a production extension rather than falsely claiming it is implemented here. [NCA ECC 2:2024](https://cdn.nca.gov.sa/api/files/public/upload/86e09090-44e4-481f-bc28-355673607654_ECC--2024-EN.pdf)

| Control | Evidence in this lab |
|---|---|
| 2-2-1 | IAM requirements, architecture, policy and design documentation |
| 2-2-2 | OpenLDAP, SSSD, NSS, PAM, SSH and sudo implementation |
| 2-2-3-1 | Username/password authentication through LDAP + PAM/SSSD |
| 2-2-3-2 | MFA for remote/privileged access is documented as a control gap/production extension |
| 2-2-3-3 | Group-based authorization, least privilege and role separation |
| 2-2-3-4 | Privileged LDAP role and restricted sudo |
| 2-2-3-5 | JML and periodic access review procedure/evidence |
| 2-2-4 | Periodic review procedure and evidence package |

## Repository structure

architecture/ contains the network and trust-boundary model.
phases/ contains one document per implementation phase.
configs/ contains safe example configuration fragments.
ldap/ contains directory hierarchy, group and user LDIF examples.
tests/ contains validation scenarios and expected outcomes.
jml/ contains Joiner-Mover-Leaver workflows.
troubleshooting/ contains layer-by-layer diagnostic procedures.
evidence/ contains evidence-index guidance.
reports/ contains the final incident/security report template.
web/ contains the project landing page shown from the portfolio.

## Important production notes

Do not store passwords or private keys in Git.
Do not enable broad sudo privileges for convenience.
Do not expose LDAP authentication traffic without appropriate encryption.
Keep CA trust, certificate hostname validation and time synchronization correct.
Use MFA for applicable remote and privileged access requirements.
Protect the LDAP administrator identity and backup/restore process.
Use replication/redundancy planning for critical identity services.
Keep break-glass access controlled and tested.

## Resume achievement

Engineered a three-server enterprise Linux IAM/PAM lab using OpenLDAP, SSSD, NSS and PAM, implementing centralized identity and group management, password-security controls, pam_faillock failed-login protection, SSH group-based authorization, least-privilege sudo/RBAC, Joiner-Mover-Leaver workflows, LDAP TLS, layered troubleshooting, security validation and NCA ECC 2:2024 evidence mapping.

## References

Ubuntu OpenLDAP documentation: https://ubuntu.com/server/docs/how-to/openldap/
Ubuntu SSSD with LDAP: https://documentation.ubuntu.com/server/how-to/sssd/with-ldap/
Ubuntu SSSD overview: https://ubuntu.com/server/docs/explanation/intro-to/sssd/
NCA ECC 2:2024: https://cdn.nca.gov.sa/api/files/public/upload/86e09090-44e4-481f-bc28-355673607654_ECC--2024-EN.pdf