# NCA ECC 2:2024 — IAM Evidence Matrix

The current NCA ECC 2:2024 identifies 2-2 as Identity and Access Management.

| Control | Lab mapping | Evidence type |
|---|---|---|
| 2-2-1 | IAM requirements, architecture, password/access policy | Documentation |
| 2-2-2 | OpenLDAP + SSSD + NSS + PAM + SSH + sudo implementation | Technical evidence |
| 2-2-3-1 | Username/password authentication | Technical test |
| 2-2-3-2 | MFA for applicable remote/privileged access | Production extension / gap |
| 2-2-3-3 | Need-to-know/need-to-use, least privilege, group/RBAC model | Technical + documentation |
| 2-2-3-4 | Privileged LDAP role + restricted sudo | Technical evidence |
| 2-2-3-5 | JML + periodic identity/access review | Process evidence |
| 2-2-4 | Periodic review of IAM implementation | Review evidence |

Important: 2-2-3-2 is not claimed as implemented by this three-server username/password lab. MFA must be addressed by the applicable production architecture.

Official source: https://cdn.nca.gov.sa/api/files/public/upload/86e09090-44e4-481f-bc28-355673607654_ECC--2024-EN.pdf