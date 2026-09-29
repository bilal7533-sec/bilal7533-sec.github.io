# Troubleshooting Lessons Learned

## StartTLS capability mismatch
Symptom: a client-side STARTTLS test can fail with an unsupported extended operation.
Method: verify LDAP server listener/configuration, client library capability, TLS configuration and the exact command path independently. Do not assume that an LDAP TCP listener implies STARTTLS is active.

## SSSD authentication errors
Symptom: SSSD can resolve a user but authentication fails.
Method: separate identity lookup from authentication. Test getent/id first, then sssctl user-checks, then SSSD logs, then LDAP bind/authentication and finally PAM/SSH.

## LDAP ppolicy schema problems
Symptom: malformed ppolicy LDIF can produce schema/objectClass syntax errors.
Method: verify ppolicy schema/module availability, objectClass syntax and attribute definitions before applying policy changes. Record the exact server response as evidence.

## TLS certificate access / AppArmor
Symptom: a service can fail to read a certificate or key even when filesystem permissions appear correct.
Method: verify file ownership/permissions, AppArmor profile status, denial logs, certificate path configuration and service confinement.

## General recovery rule
Keep a tested local break-glass path on SERVER-01. Never make simultaneous PAM, SSH, SSSD and LDAP changes while troubleshooting; isolate one layer at a time.