# SOC Investigation Checklist

## Alert intake

- [ ] Hostname confirmed
- [ ] Alert timestamp captured
- [ ] Affected file/process/port captured
- [ ] OSSEC rule/severity recorded
- [ ] Analyst assigned

## Identity and access

- [ ] SSH successes reviewed
- [ ] SSH failures reviewed
- [ ] Source IP identified
- [ ] Active user identified
- [ ] sudo activity checked
- [ ] Recent logins checked

## Process and network

- [ ] Process tree reviewed
- [ ] Suspicious PID validated
- [ ] Executable path checked
- [ ] Listening ports checked
- [ ] Unexpected connections checked
- [ ] Persistence locations checked

## Integrity and rootkit checks

- [ ] OSSEC FIM event reviewed
- [ ] OSSEC rootcheck reviewed
- [ ] chkrootkit result captured
- [ ] rkhunter result captured
- [ ] Package ownership checked
- [ ] File hash checked
- [ ] Authorized change validated

## Decision

Classify the finding as one of:

- Expected / authorized change
- False positive
- Lab simulation
- Suspicious activity requiring containment
- Confirmed incident based on corroborating evidence

## Timeline

```text
Source IP
  -> User
  -> SSH login
  -> Success / Failure
  -> Process
  -> sudo
  -> File change
  -> OSSEC alert
  -> Investigation
  -> Remediation
  -> Verification
```
