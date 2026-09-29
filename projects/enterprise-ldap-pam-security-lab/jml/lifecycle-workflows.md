# Joiner / Mover / Leaver Lifecycle

## Joiner
Approved request -> create LDAP identity -> assign least-privilege role group -> validate identity lookup -> validate SSH authorization -> provision documented sudo scope if required -> record evidence.

## Mover
Approved role change -> identify existing access -> remove old role/group -> assign new role/group -> review sudo -> test authorization -> document the resulting access.

## Leaver
Approved departure -> disable/revoke LDAP identity -> remove role groups -> review SSH authorized_keys -> review sudo/privileged access -> verify login denial on clients -> retain evidence.

## Review questions
- Does the identity have a unique identifier?
- Are old privileges removed before new privileges are finalized?
- Is privileged access separately reviewed?
- Is remote access revoked?
- Is the change traceable to an approved request?