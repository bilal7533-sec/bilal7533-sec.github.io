# Password Policy Target

Target values used in the lab design:

Minimum length: 12
Maximum password age: 7,776,000 seconds (90 days)
Password history: 5
Maximum failures: 5
Lockout: enabled
Lockout duration: 900 seconds
Failure interval: 900 seconds

Important: OpenLDAP ppolicy schema/module activation and attribute syntax must be validated against the deployed OpenLDAP 2.6 package before applying changes. If schema activation fails, troubleshoot schema/module loading first rather than forcing malformed LDIF into cn=config.

Client-side pam_faillock is separate from directory password policy: it protects repeated authentication failures at the Linux/PAM layer.