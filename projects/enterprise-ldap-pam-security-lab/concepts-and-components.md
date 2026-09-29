# Concepts & Components

## 1. Identity
OpenLDAP is the central directory. It stores users, groups and POSIX attributes used by Linux clients.

Core terms: Distinguished Name (DN), Relative Distinguished Name (RDN), organizational unit (OU), directory suffix/base DN, schema, objectClass, attributes.

## 2. Authentication
Authentication answers: Who are you?
In this lab SSH invokes PAM, PAM calls pam_sss, SSSD communicates with LDAP, and the directory validates the account credential according to the deployed authentication configuration.

## 3. NSS
NSS answers: What users and groups exist to the operating system?
Examples: getent passwd, getent group, id.

## 4. SSSD
SSSD is the Linux integration daemon. It provides a common interface to remote identity/authentication sources and can cache identity/credential information according to configuration.

## 5. PAM
PAM is a modular policy framework. The important management types are auth, account, password and session.
Module order matters. A control such as pam_faillock can affect whether a later authentication module is reached.

## 6. pam_sss.so
pam_sss.so connects PAM to SSSD for directory-backed authentication, account checks and password changes where configured.

## 7. pam_mkhomedir
Creates a user's home directory on first successful login according to the configured skeleton and PAM session flow.

## 8. LDAP password policy
Directory password policy controls lifecycle properties such as minimum length, age, history and lockout attributes. The policy belongs to the identity authority so multiple clients can follow one documented rule set.

## 9. pam_faillock
Client-side failed-authentication protection. It tracks failures at the Linux/PAM layer and can lock a user after the configured threshold.

## 10. SSH authorization
Authentication proves the identity; AllowGroups is an authorization boundary that restricts which directory groups may log in through SSH.

## 11. sudo / RBAC
sudo controls privilege after login. LDAP groups represent roles; sudoers translates those roles into permitted administrative commands.

## 12. Joiner-Mover-Leaver
JML is the identity lifecycle model. A user should receive, change and lose access according to an approved process rather than ad-hoc manual edits.

## 13. TLS
TLS protects LDAP communication and provides server-authentication through a trusted certificate chain when verification is configured correctly.

## 14. Break-glass access
A local account on SERVER-01 provides controlled recovery access if centralized identity becomes unavailable or a PAM configuration causes an outage.

## 15. Audit evidence
Local logs, LDAP queries, SSSD diagnostics, SSH configuration tests and sudo records demonstrate what the control actually did.

## 16. Security principle
Authentication, identity lookup, authorization and privilege are deliberately separated. This reduces the chance that one successful credential automatically becomes unrestricted host access.