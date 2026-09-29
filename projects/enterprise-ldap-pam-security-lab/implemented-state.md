# Implementation State & Evidence Boundary

## Demonstrated in the lab design/workflow
- Three-server role separation.
- OpenLDAP centralized directory.
- LDAP organizational units, groups and user identity model.
- SSSD client integration.
- NSS identity resolution.
- PAM authentication/session integration.
- Automatic home-directory creation.
- LDAP password-policy target and validation approach.
- pam_faillock failed-login target.
- SSH root-login restriction and LDAP group authorization target.
- Least-privilege sudo/RBAC model.
- Joiner-Mover-Leaver lifecycle.
- Authentication and sudo logging review.
- LDAP TLS design and client trust verification.
- Layered troubleshooting methodology.
- Consolidated security test matrix.
- NCA ECC evidence mapping.

## Explicit production extensions / gaps
- MFA for applicable remote and privileged access.
- Identity-service redundancy/replication.
- Enterprise backup and restore testing for the directory.
- Formal change/approval workflow integration.
- Enterprise secrets management.
- Centralized SIEM/EDR integration.

## Documentation rule
An example configuration file in this repository is a reference, not a claim that the exact values are currently active on every host. Evidence should contain command output, configuration snapshots and verification results for the actual lab state.