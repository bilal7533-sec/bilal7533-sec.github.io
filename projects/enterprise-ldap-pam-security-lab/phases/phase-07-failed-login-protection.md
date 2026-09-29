# Phase 07 — Failed Login Protection

Use pam_faillock to control repeated failed Linux authentications. Target deny=5, fail_interval=900 and unlock_time=900. Validate PAM ordering and test failure/lockout/reset without locking the only recovery account.

## Deliverables

- Architecture/design evidence for Phase 07.
- Commands/configuration evidence with secrets redacted.
- Verification result and expected-vs-observed outcome.
- Troubleshooting notes for failures.
- Security reasoning: what control is being enforced and why.
- Where applicable, NCA ECC evidence reference.
