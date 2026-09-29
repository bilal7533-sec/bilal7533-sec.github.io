# Security Reasoning

## Why centralize identity?
Manual local users create inconsistent access, duplicate lifecycle work and higher revocation risk. A directory centralizes identity/group state while clients consume it through SSSD.

## Why SSSD?
SSSD separates applications from direct LDAP handling and provides a Linux integration point for identity and authentication.

## Why NSS?
Authentication is not the same as identity lookup. NSS makes directory-backed users and groups available to the operating system.

## Why PAM?
PAM applies authentication, account, password and session policies at services such as SSH.

## Why separate password policy and faillock?
Directory password lifecycle and Linux failed-login protection address different control planes and can fail independently.

## Why group-based SSH?
Valid credentials should not automatically mean valid remote access. SSH authorization adds a second boundary based on role/group.

## Why least-privilege sudo?
Authentication answers who the user is; authorization answers what the user may do. Restricting sudo reduces blast radius.

## Why TLS?
LDAP authentication traffic can expose sensitive credentials if not protected. Encrypted transport plus certificate validation protects confidentiality and server authenticity.