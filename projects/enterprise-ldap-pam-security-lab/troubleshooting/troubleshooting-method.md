# PAM / LDAP Troubleshooting Method

Do not modify multiple layers at once. Prove each layer before moving upward.

## Layer 1 — Network
ping -c 3 LDAP01
getent hosts LDAP01
nc -vz LDAP01 389
nc -vz LDAP01 636

Questions: Is the server reachable? Is the intended port listening? Is name resolution deterministic?

## Layer 2 — LDAP
systemctl status slapd
ldapsearch -x -H ldap://LDAP01 -b dc=corp,dc=example '(uid=bilal)'

Questions: Is slapd healthy? Does the base DN exist? Does the identity exist? Is the bind/search valid?

## Layer 3 — SSSD
systemctl status sssd
sssctl config-check
sssctl domain-list
sssctl user-checks bilal
journalctl -u sssd -n 100 --no-pager

Questions: Can SSSD parse the configuration? Can it reach LDAP? Is there stale cache or a provider error?

## Layer 4 — NSS
getent passwd bilal
getent group linux-users
id bilal

Questions: Can Linux resolve the centralized identity and group membership?

## Layer 5 — PAM
grep -nE 'pam_sss|pam_faillock|mkhomedir' /etc/pam.d/common-auth /etc/pam.d/common-account /etc/pam.d/common-password /etc/pam.d/common-session
tail -f /var/log/auth.log

Questions: Is module order correct? Is the expected module being invoked? Is faillock blocking the test?

## Layer 6 — SSH
sshd -t
sshd -T | grep -Ei 'usepam|permitrootlogin|allowgroups'
journalctl -u ssh -n 100 --no-pager

Questions: Did SSH accept the connection? Did authorization reject it? Is AllowGroups correct?

## Layer 7 — Authorization
getent group linux-admins
sudo -l -U bilal

Questions: Is the user in the intended role? Does sudo match the intended commands?

## Recovery principle
Keep a known-good local break-glass path on SERVER-01 so a directory/PAM mistake does not remove all administrative access.