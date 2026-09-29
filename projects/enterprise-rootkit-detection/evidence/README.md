# Evidence Collection

Store screenshots, logs and exported reports here during the lab exercise.

## Recommended evidence naming

```text
YYYYMMDD_HOST_PHASE_EVIDENCE.ext
```

Examples:

```text
20260929_WEB01_phase04_chkrootkit.txt
20260929_WEB01_phase07_rkhunter.txt
20260929_WEB01_phase12_ossec-fim.png
20260929_WEB01_phase15_timeline.md
20260929_WEB01_phase18_verification.txt
```

## Evidence handling

- Do not commit passwords, private keys, tokens or secrets.
- Redact personal data and unrelated production information.
- Keep raw evidence immutable after collection where practical.
- Store a short analyst note beside important evidence.
- Record host, timestamp, tool version and command used.
