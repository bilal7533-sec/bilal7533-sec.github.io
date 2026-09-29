# Unauthorized Access Test

Purpose: prove group-based SSH authorization rather than merely proving that authentication works.

Test user must exist in LDAP but must not be a member of linux-users or linux-admins.

Procedure:
1. Verify identity resolution with getent passwd USER.
2. Attempt SSH to SERVER-01 and SERVER-03.
3. Capture the client result.
4. Inspect the SSH authentication/authorization log.
5. Add the approved group only after the negative test is captured.
6. Repeat and verify expected authorization.

Success criterion: authentication credentials alone do not override the configured SSH group authorization boundary.