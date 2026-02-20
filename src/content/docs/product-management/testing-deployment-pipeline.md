---
title: Testing & Deployment Pipeline
description: Four-stage deployment pipeline, rollback protocols, deployment runbook, and stakeholder validation
---

The Testing and Deployment Pipeline ensures that all code changes — whether bug fixes or new features — are thoroughly validated before reaching production. This systematic approach minimizes downtime, protects data integrity, and maintains service quality for My Marketing Pro clients.

Our pipeline follows a **four-stage progression**: Development Environment → Staging Environment → Production Deployment → Rollback Protocols. Each stage includes specific validation checkpoints and approval gates to catch issues early.

## Pipeline Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Stage 1: Dev   │───▶│Stage 2: Staging │───▶│  Stage 3: Prod  │───▶│ Stage 4: Monitor│
│                 │    │                 │    │                 │    │  & Rollback     │
│ • Feature branch│    │ • Integration   │    │ • Phased rollout│    │ • 24hr monitor  │
│ • PR review     │    │ • QA testing    │    │ • Deploy window │    │ • Rollback      │
│ • Unit tests    │    │ • Stakeholder   │    │ • Feature flags │    │   triggers      │
│ • Dev testing   │    │   validation    │    │ • Smoke tests   │    │ • On-call       │
│                 │    │ • Sign-off gate │    │                 │    │   authority     │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
    Gate 1:               Gate 2:                Gate 3:
    PR Approved           Stakeholder            Post-Deploy
    CI Passes             Sign-Off               Smoke Test OK
```

---

## Stage 1: Development Environment

All code changes begin in isolated feature branches and go through peer review before advancing.

### Process

1. **Feature branch created** from `main` (or `develop`) per [branching conventions](/mmp-docs/product-management/development-workflow/#feature-branching-strategy)
2. **Developer implements** the change, writing tests as appropriate
3. **Developer self-tests**: happy path, edge cases, and acceptance criteria
4. **Pull request opened** with description, testing notes, and screenshots
5. **Peer review** — at least one other developer reviews the code
6. **CI checks pass** — automated tests, linting, build verification

### Gate 1: PR Approval

**Must be true before advancing to staging:**
- [ ] At least one peer review approval
- [ ] All CI checks pass (tests, lint, build)
- [ ] No unresolved review comments
- [ ] PR description includes testing notes
- [ ] Acceptance criteria from sprint item are referenced

**Who can approve:** Any developer on the team. Dev Lead reviews complex or architectural changes.

---

## Stage 2: Staging Environment

Staging is a production-mirror environment where features are validated by QA testers and stakeholders before reaching clients.

### QA Testing

Once a feature branch is merged (or deployed to staging from the branch), QA testing begins per the [Release Process QA checklist](/mmp-docs/product-management/release-process/#stage-2-qa-process):

- Functional testing (happy path + edge cases)
- Cross-browser testing (Chrome, Safari, Firefox, Mobile Safari)
- Mobile responsiveness
- Performance checks (page load, query performance)
- Data integrity (saves, validates, maintains relationships)
- Accessibility basics (keyboard nav, labels, contrast)

### Stakeholder Validation

**This is a formal approval gate.** Before any change proceeds to production, it must be validated by the appropriate stakeholders.

**Who validates:**
- **Product Lead**: Verifies feature meets acceptance criteria and dev brief requirements
- **Original requestor**: The person who submitted the bug report or feature request reviews the implementation in staging

**For client-facing changes:**
- Client-facing features require **explicit sign-off** from the Product Lead before production deployment
- If the feature was requested by a specific client, the Account Manager reviews from the client's perspective
- Sign-off is documented in the Linear issue (comment: "Stakeholder sign-off: [name], [date]")

**For internal changes:**
- Product Lead sign-off is sufficient
- Dev Lead confirms technical implementation is sound

### Gate 2: Stakeholder Sign-Off

**Must be true before advancing to production:**
- [ ] All critical and major QA bugs fixed
- [ ] Product Lead has signed off on acceptance criteria
- [ ] Original requestor (or representative) has reviewed in staging
- [ ] Client-facing changes have explicit Product Lead approval
- [ ] Minor bugs documented with plan (fix post-release or accept)
- [ ] Rollback plan documented

---

## Stage 3: Production Deployment

Production deployments follow a phased rollout strategy to minimize risk.

### Deployment Windows

Deploy during **low-traffic windows** to minimize client impact:

| Day | Time (EST) | Status |
|-----|------------|--------|
| **Tuesday** | 10 PM - 2 AM | Preferred |
| **Wednesday** | 10 PM - 2 AM | Preferred |
| **Thursday** | 10 PM - 2 AM | Acceptable |
| Monday | — | Avoid (start of week, high activity) |
| Friday | — | Avoid (no weekend support for issues) |
| Weekends | — | Emergency only (P0 hotfixes) |

**Exceptions:**
- P0 hotfixes deploy immediately regardless of window
- P1 fixes can deploy during business hours with Dev Lead approval
- Feature flags allow "deploying" code without exposing it to clients

### Feature Flags

Use feature flags to control exposure when available:

- **Deploy code** to production with the flag OFF
- **Enable for internal team** first (smoke test with real production data)
- **Enable for subset of clients** (beta testers, enterprise clients)
- **Enable for all clients** after validation

Feature flags reduce rollback complexity — instead of reverting code, just flip the flag off.

### Pre-Deployment Checklist

Before deploying to production:

- [ ] Staging sign-off complete (Gate 2 passed)
- [ ] Database migrations tested in staging and reversible
- [ ] Environment variables configured in production
- [ ] No breaking dependency changes
- [ ] Deployment runbook reviewed (see below)
- [ ] On-call developer identified and available
- [ ] Team notified of planned deployment (pre-deployment communication sent)

### Deployment Steps

1. **Send pre-deployment notification** (see communication template below)
2. **Merge to production branch** (squash commits, reference Linear issue)
3. **Deploy** following the [Deployment Workflow](/mmp-docs/workflows/deployment/)
4. **Run database migrations** (if applicable)
5. **Clear caches** (if applicable)
6. **Smoke test** (5-10 minutes):
   - [ ] Application loads and responds
   - [ ] Login works
   - [ ] Core features functional (email, contacts, campaigns)
   - [ ] New feature works as tested in staging
   - [ ] No new errors in error logs
   - [ ] Database migrations completed successfully
7. **Send post-deployment notification** (see communication template below)
8. **Enter 24-hour monitoring period**

### Post-Deployment Monitoring (24 Hours)

**What to monitor:**

| Category | What to Watch | Tool |
|----------|---------------|------|
| **Errors** | New error patterns, error rate spikes | Error tracking (Sentry, logs) |
| **Performance** | Server CPU/memory, query times, page load | Server monitoring |
| **User behavior** | Support tickets, chat mentions, direct feedback | Support channels |
| **Feature adoption** | Are users finding and using the new feature? | Analytics |
| **Database** | Query performance, connection pool, disk usage | Database monitoring |

---

## Stage 4: Rollback Protocols

### Immediate Rollback Triggers

Initiate **immediate rollback** if any of the following occur:

| Trigger | Threshold | Action |
|---------|-----------|--------|
| Error rate increase | > 5% from baseline | Immediate rollback |
| Critical feature non-functional | Login, payments, email broken | Immediate rollback |
| Database corruption | Any detected corruption | Immediate rollback + investigation |
| Security vulnerability | Any exposed vulnerability | Immediate rollback + security response |
| User-reported issues | > 10 tickets within 1 hour | Evaluate, likely rollback |

### Who Can Rollback

The **on-call developer has authority to execute rollback without additional approvals.** Speed matters during incidents — waiting for approval chains costs minutes that compound into client impact.

**After rollback:**
1. Notify Dev Lead immediately
2. Notify Product Lead (for stakeholder communication)
3. Notify R&D Lead if business/revenue impact
4. Schedule post-mortem within 24 hours

### Rollback Procedure

1. **Identify the issue** — What broke? When did it start? What deployment caused it?
2. **Execute rollback:**
   - Revert to previous deployment (git revert + deploy)
   - Reverse database migrations if applicable (must be reversible — this is why we test in staging)
   - Disable feature flag if applicable (fastest option)
3. **Verify rollback** — Smoke test that the previous version works correctly
4. **Communicate:**
   - Team: "Rollback executed for [deployment]. Issue: [brief description]. Investigating."
   - Clients (if affected): Account Manager sends brief notification
5. **Investigate root cause** — Why did this pass staging? What was missed?
6. **Post-mortem** — Schedule within 24 hours (see below)

### Post-Mortem Template

```markdown
## Post-Mortem: [Incident Title]

**Date**: [YYYY-MM-DD]
**Severity**: [P0 | P1]
**Duration**: [How long was the issue active?]
**Impact**: [Number of clients affected, what was broken]

### Timeline
- [HH:MM] Deployment started
- [HH:MM] Issue detected (how?)
- [HH:MM] Rollback initiated
- [HH:MM] Rollback complete, service restored
- [HH:MM] Root cause identified

### Root Cause
[What went wrong technically?]

### Why It Wasn't Caught
[What gap in our process allowed this to reach production?]

### Action Items
- [ ] [Fix 1: description, owner, deadline]
- [ ] [Fix 2: description, owner, deadline]
- [ ] [Process improvement: description, owner, deadline]

### Lessons Learned
[What will we do differently going forward?]
```

### On-Call Considerations

**What "on-call" means for deployments:**
- The on-call developer is identified before every deployment (part of pre-deployment checklist)
- They must be available for the deployment window + 2 hours after
- They have production access, monitoring dashboard access, and know the rollback procedure
- They have authority to rollback without waiting for approval

**Rotation:**
- On-call rotates each sprint (aligned with sprint on-call in [Team Structure](/mmp-docs/product-management/team-structure-resources/#on-call--incident-response))
- All developers should be trained on rollback procedures
- On-call schedule is set during sprint planning

**What on-call does NOT mean:**
- Being the only person responsible — escalation paths exist
- Working overnight — deployments are planned during windows, not surprises
- Handling non-deployment issues — general production incidents follow the separate on-call process

---

## Deployment Communication

### Pre-Deployment Notification

Send to the team 1 hour before planned deployment:

```markdown
## Planned Deployment

**What**: [Feature/fix name] ([Linear issue link])
**When**: [Date, Time EST]
**Duration**: ~[X] minutes
**On-call**: [Developer name]

**Changes included**:
- [Change 1]
- [Change 2]

**Expected impact**: [None | Brief downtime of X seconds | Feature flag rollout]

**Rollback plan**: [Revert commit | Disable feature flag | Reverse migration]

Questions? Reach out to [Dev Lead] or [On-call developer].
```

### Post-Deployment Notification

Send immediately after successful deployment:

```markdown
## Deployment Complete

**What**: [Feature/fix name] deployed successfully
**Time**: [HH:MM EST]
**Status**: All smoke tests passed

**What's new**:
- [Change 1 — brief description]
- [Change 2 — brief description]

**Known issues**: [None | List minor items]

**Monitoring**: On-call ([Developer name]) monitoring for next 24 hours.

If you notice anything unusual, ping [On-call developer] or [Dev Lead].
```

### Escalation Notification (If Issues Found)

```markdown
## Deployment Issue Detected

**What**: [Brief description of the problem]
**When detected**: [HH:MM EST]
**Severity**: [P0 | P1 | P2]
**Impact**: [What's affected, how many clients]

**Status**: [Investigating | Rollback in progress | Rolled back]

**Next update**: [Time — within 30 minutes for P0, 1 hour for P1]

Point of contact: [On-call developer]
```

---

## Deployment Runbook

The deployment runbook is a single source of truth for deployment operations. It must be accessible even when the main application is down.

### What the Runbook Contains

| Section | Contents |
|---------|----------|
| **Server Access** | SSH credentials reference (link to secrets manager, not plaintext), server IPs, jump host details |
| **Deployment Commands** | Step-by-step commands for deploying to staging and production |
| **Rollback Commands** | Step-by-step commands for reverting to the previous version |
| **Database Migration** | How to run and reverse migrations, backup/restore procedures |
| **Monitoring Dashboards** | Links to error tracking, server monitoring, database monitoring |
| **Emergency Contacts** | Dev Lead, Product Lead, R&D Lead — phone numbers and secondary contact methods |
| **Third-Party Status** | Links to status pages for critical services (hosting, email provider, payment processor) |
| **Known Failure Modes** | Common issues and their resolutions (e.g., "if X happens, do Y") |

### Runbook Maintenance

- **Review quarterly** — Last week of each quarter, Dev Lead reviews and updates
- **Update after every incident** — Post-mortems often reveal runbook gaps
- **Accessible offline** — Store a copy outside the main application (e.g., separate repo, Google Drive, printed copy for critical procedures)
- **All DevOps team members can access** — Don't let a single person be the bottleneck

### Where the Runbook Lives

The runbook structure is documented here. **Actual runbook content** (with credentials references, specific commands, and server details) lives in a separate, access-controlled location:

- **Primary:** [Link to internal runbook — e.g., private repo, Notion, or separate doc]
- **Backup:** [Offline copy location]

*Note: Never put actual credentials in documentation. Reference your secrets manager or credential vault instead.*

---

## Quick Reference

| Stage | Gate | Who Approves | Timeline |
|-------|------|-------------|----------|
| **Development** | PR approved, CI passes | Peer developer (+ Dev Lead for complex) | During sprint |
| **Staging** | Stakeholder sign-off | Product Lead + original requestor | 1-2 days |
| **Production** | Pre-deploy checklist | Dev Lead + on-call developer | Deployment window |
| **Monitoring** | 24hr clean | On-call developer | 24 hours post-deploy |

| Rollback Trigger | Threshold | Authority |
|------------------|-----------|-----------|
| Error rate | > 5% from baseline | On-call (no approval needed) |
| Critical feature broken | Any | On-call (no approval needed) |
| Database corruption | Any | On-call (no approval needed) |
| Security vulnerability | Any | On-call (no approval needed) |
| User-reported issues | > 10/hour | On-call (evaluate, likely rollback) |

---

**Last Updated**: February 2026
**Owner**: Dev Lead + Product Lead
**Review Cadence**: Quarterly (aligned with runbook review)
