---
title: Development Workflow
description: Sprint-based development process, technical discovery, capacity planning, and branching strategy
---

This document defines how My Marketing Pro plans, executes, and delivers development work. Our goal is to be **proactive** — turning client inputs into structured dev briefs, planning work in sprints, and thinking beyond quick fixes to build a scalable platform.

## Overview

Our development workflow follows this cycle:

```
Technical Discovery → Sprint Planning → Development → Code Review → QA → Staging → Deployment
```

Each phase has clear inputs, outputs, and responsibilities. The Product Lead owns prioritization, the Dev Lead owns execution, and the R&D Lead provides strategic direction.

---

## Technical Discovery

Before any feature enters a sprint, the development team conducts technical discovery to assess feasibility and estimate effort.

### When Technical Discovery Happens

- **New feature requests** that pass triage (RICE scored, P0-P2 severity)
- **Complex bug fixes** where the root cause isn't immediately clear
- **Architectural changes** proposed by the Dev Lead or R&D Lead
- **R&D handoffs** — work the R&D Lead has prototyped that needs production implementation

### Process

1. **Product Lead submits a dev brief** (see template below) to Dev Lead
2. **Dev Lead assigns discovery** to the appropriate developer (1-3 days depending on complexity)
3. **Developer investigates**: reviews codebase, identifies dependencies, considers edge cases
4. **Output**: Technical discovery brief returned to Product Lead with effort estimate

### Technical Discovery Brief Template

```markdown
## Technical Discovery Brief

**Feature/Issue**: [Name and Linear issue link]
**Discovery Lead**: [Developer name]
**Date**: [YYYY-MM-DD]

### Scope
[What exactly needs to be built or fixed — reference the dev brief from Product Lead]

### Technical Approach
[How the developer proposes to implement this]
- Database changes: [New tables, migrations, schema changes]
- API changes: [New endpoints, modified endpoints]
- Frontend changes: [New components, UI modifications]
- Third-party integrations: [APIs, services involved]

### Effort Estimate
- **Optimistic**: [X days/weeks] (if everything goes smoothly)
- **Realistic**: [Y days/weeks] (accounting for unknowns)
- **Pessimistic**: [Z days/weeks] (if complications arise)
- **Recommended sprint allocation**: [Y days/weeks]

### Dependencies
- [Other features/tasks this depends on]
- [Team members needed]
- [Third-party services or approvals required]

### Risks
- [Technical risks: performance, security, data integrity]
- [Schedule risks: dependencies, unknowns]
- [Mitigation strategies for each risk]

### Questions for Product Lead
- [Any clarifications needed before development begins]
```

### Communicating Estimates to Product Lead

The Dev Lead relays estimates using this format:

- **T-shirt size** for quick reference: XS (< 1 day), S (1-3 days), M (1 week), L (2 weeks), XL (3+ weeks)
- **Person-days** for sprint planning: specific number for capacity allocation
- **Confidence level**: High (done this before), Medium (some unknowns), Low (significant unknowns — consider a spike first)

If confidence is Low, recommend a **timeboxed spike** (1-2 days of investigation) before committing to a sprint.

---

## Sprint Schedule

We follow **2-week sprints** to balance planning overhead with delivery frequency.

### Sprint Cadence

| Day | Activity | Duration | Attendees |
|-----|----------|----------|-----------|
| **Monday (Week 1)** | Sprint Planning | 1-1.5 hours | Product Lead, Dev Lead, Dev Team |
| **Daily** | Standup (async or sync) | 15 minutes | Dev Team, Dev Lead |
| **Wednesday (Week 1)** | Triage Calibration | 30 minutes | Product Lead, Dev Lead, R&D Lead |
| **Friday (Week 2)** | Sprint Review / Demo | 30-45 minutes | All stakeholders |
| **Friday (Week 2)** | Sprint Retrospective | 30 minutes | Product Lead, Dev Lead, Dev Team |

### Sprint Ceremonies

**Daily Standup (15 minutes)**
- What I completed yesterday
- What I'm working on today
- Any blockers

Can be async (posted in team chat by 10 AM) or synchronous for teams that prefer it.

**Sprint Review / Demo (30-45 minutes)**
- Dev team demos completed work to stakeholders
- Product Lead confirms acceptance criteria are met
- R&D Lead provides feedback on strategic alignment
- Account Manager provides client perspective

**Sprint Retrospective (30 minutes)**
- What went well this sprint?
- What didn't go well?
- What will we change next sprint?
- Review any unplanned interruptions (resource reassignments, P0 escalations)

---

## Sprint Planning

Sprint planning is the most critical ceremony. A well-planned sprint prevents scope creep, sets realistic expectations, and ensures the team is aligned.

### Sprint Planning Agenda Template

Use this agenda for every sprint planning meeting:

```markdown
## Sprint Planning - Sprint [#] ([Date Range])

### 1. Previous Sprint Review (10 min)
- Velocity: [X] story points completed out of [Y] planned
- Carry-over items: [List any incomplete items]
- Key wins: [What shipped successfully]
- Issues: [What didn't go as planned]

### 2. Capacity Check (5 min)
- Team availability this sprint:
  - [Dev 1]: [Full | Partial (X days) | Unavailable]
  - [Dev 2]: [Full | Partial (X days) | Unavailable]
  - [Dev N]: [Full | Partial (X days) | Unavailable]
- On-call rotation: [Who is on-call this sprint]
- Total available capacity: [X] person-days

### 3. Capacity Allocation (5 min)
- **70% Planned work**: [X] person-days for features and planned items
- **20% Bugs + tech debt**: [Y] person-days reserved
- **10% Escalations**: [Z] person-days buffer for unplanned work

### 4. Priority Review (15 min)
- P0/P1 items requiring immediate attention: [List]
- Top RICE-scored features ready for development: [List]
- Items from R&D Lead (sprint requests, prototypes to productionize): [List]
- Technical debt items for this sprint: [List]

### 5. Task Selection & Assignment (20 min)
| Task | Assignee | Estimate | Acceptance Criteria |
|------|----------|----------|---------------------|
| [Task 1] | [Dev] | [X days] | [Given/When/Then] |
| [Task 2] | [Dev] | [X days] | [Given/When/Then] |

### 6. Risk & Dependency Review (5 min)
- Dependencies between tasks: [List]
- External dependencies (third-party APIs, client approvals): [List]
- Risks identified: [List with mitigation]

### 7. Sprint Goal (5 min)
**This sprint, we will:** [One sentence describing the primary outcome]

**We will know we succeeded when:** [Measurable criteria]
```

### Capacity Allocation: The 70/20/10 Rule

Never allocate more than 70% of sprint capacity to planned work.

| Allocation | % | Purpose | Examples |
|------------|---|---------|----------|
| **Planned work** | 70% | Features, enhancements from the roadmap | New email templates, contact import |
| **Bugs + tech debt** | 20% | Scheduled bug fixes, refactoring, upgrades | Fix Safari layout bug, upgrade dependencies |
| **Escalation buffer** | 10% | Unplanned client escalations, P0/P1 issues | Production outage, urgent client request |

**Why this matters:**
- Prevents sprint failures from unexpected work
- Reduces team burnout (constant interruptions are exhausting)
- Sets realistic client expectations ("we can deliver X this sprint")
- Ensures technical debt doesn't accumulate unchecked

**If the 10% buffer isn't used:** Great — developers can pull additional items from the backlog. Unused buffer is a win, not waste.

**If the buffer is exceeded:** Follow the [resource reassignment process](/mmp-docs/product-management/team-structure-resources/#resource-reassignment) to adjust sprint scope.

### Acceptance Criteria

Every sprint item must have clear acceptance criteria before development begins. Use the **Given/When/Then** format from our [User Story Framework](/mmp-docs/product-management/frameworks-and-tools/#user-story-framework):

```
Given [precondition],
When [action],
Then [expected result].
```

**Acceptance criteria should be:**
- Specific enough that any developer can verify them
- Testable (can you write a test for it?)
- Agreed upon by Product Lead and Dev Lead before sprint starts

**If acceptance criteria are unclear**, the item goes back to technical discovery — it is not ready for sprint.

---

## Development Process

### Feature Branching Strategy

All development happens in feature branches. No direct commits to `main` or `develop`.

**Branch naming convention:**
```
feature/ABC-123-short-description    # New features
bugfix/ABC-456-fix-description       # Bug fixes
hotfix/ABC-789-urgent-fix            # Production hotfixes (P0/P1)
tech-debt/ABC-012-description        # Technical debt items
```

Where `ABC-123` is the Linear issue identifier.

### Pull Request Workflow

1. **Developer creates PR** from feature branch to `develop` (or `main` depending on branching model)
2. **PR description includes:**
   - Link to Linear issue
   - Summary of changes
   - Screenshots/recordings for UI changes
   - Testing notes (what was tested, how to test)
   - Checklist: acceptance criteria from the sprint item
3. **Peer review required** — At least one other developer reviews before merge
4. **Dev Lead reviews** complex or architectural changes
5. **CI checks pass** — Automated tests, linting, build checks
6. **Merge** after approval — squash commits for clean history

### Code Review Standards

Reviewers should check:

- **Correctness:** Does it solve the stated problem? Does it meet acceptance criteria?
- **Security:** No SQL injection, XSS, exposed secrets, or OWASP top 10 vulnerabilities
- **Performance:** No N+1 queries, unnecessary re-renders, or unoptimized loops
- **Readability:** Code is clear without excessive comments; naming is descriptive
- **Tests:** Appropriate test coverage for new functionality
- **Edge cases:** Empty states, error handling, boundary conditions

**Review SLA:** PRs should be reviewed within 24 business hours. If a reviewer is unavailable, Dev Lead reassigns.

### Dev Server / QA Testing

Before merging to the main branch, features should be tested in a development or QA environment:

1. Deploy feature branch to dev/QA server
2. Developer performs happy-path testing
3. Product Lead or QA tester verifies acceptance criteria
4. Bug fixes happen on the same feature branch (update the PR)
5. Once verified, PR is approved for merge

This catches issues before they reach staging, where stakeholder validation occurs.

---

## Triage Calibration Meeting

### Purpose

Prevent priority creep and ensure the team interprets classification criteria consistently. Over time, "P1" can mean different things to different people — this meeting keeps everyone aligned.

### Format

- **Frequency:** Weekly
- **Duration:** 30 minutes
- **Attendees:** Product Lead, Dev Lead, R&D Lead
- **Day:** Wednesday (mid-sprint, before priorities drift)

### Agenda

1. **Review 3-5 prioritization decisions from the previous week** (10 min)
   - Was this P1 actually a P1, or should it have been P2?
   - Did this RICE score feel right after we started working on it?
   - Were any items over/under-prioritized?

2. **Review incoming submissions** (10 min)
   - Any new P0/P1 items that need immediate attention?
   - Feature requests that need R&D Lead input before scoring

3. **Process check** (5 min)
   - Are templates being used consistently?
   - Any gaps in the intake process?
   - Are SLAs being met (48-hour triage)?

4. **Alignment decisions** (5 min)
   - Agree on any re-prioritizations
   - Document any changes to classification criteria

### Output

- Updated priorities in Linear (if any items re-classified)
- Notes captured in a running doc (or Linear comment)
- Action items for anyone who needs to follow up

---

## Dev Briefs

A dev brief is how the Product Lead communicates work to the development team. It transforms client input into a structured, actionable document — moving us from reactive quick fixes to proactive, well-planned development.

### When to Write a Dev Brief

- Every feature request that will enter a sprint
- Complex bug fixes where context matters
- R&D handoffs (founder prototypes that need production implementation)
- Any work where "just fix it" would lead to misunderstanding

### Dev Brief Template

```markdown
## Dev Brief

**Title**: [Feature/Fix Name]
**Linear Issue**: [ABC-123]
**Author**: [Product Lead]
**Date**: [YYYY-MM-DD]
**Priority**: [P0 | P1 | P2 | P3] / RICE Score: [X]

### Problem Statement
[What problem are we solving? Who has this problem? How often does it occur?]
[Include client quotes or data if available]

### Proposed Solution
[Product Lead's recommendation for what to build — not how to build it]
[The "what" and "why", leaving the "how" to the dev team]

### User Story
As a [user type],
I want to [action],
So that [benefit].

### Acceptance Criteria
1. Given [context], when [action], then [result]
2. Given [context], when [action], then [result]
3. Given [context], when [action], then [result]

### Success Metrics
[How will we know this was successful?]
- [Metric 1: e.g., "Reduce support tickets about X by 50%"]
- [Metric 2: e.g., "Feature adopted by 40% of clients within 30 days"]

### Out of Scope
[Explicitly state what this dev brief does NOT cover]
[Prevents scope creep during development]

### Open Questions
[Anything the Product Lead needs the dev team to weigh in on]
```

### Dev Brief vs. Feature Request

| | Feature Request | Dev Brief |
|---|---|---|
| **Who writes it** | Anyone (client, AM, sales) | Product Lead |
| **Purpose** | Capture a need | Define the work |
| **Detail level** | Problem-focused | Solution-focused |
| **Audience** | Product Lead (for triage) | Dev team (for implementation) |
| **When** | When a need is identified | After triage, before sprint |

The dev brief is the bridge between "what clients want" and "what we build." Every item in a sprint should trace back to a dev brief.

---

## Quick Reference

| Activity | Frequency | Duration | Owner |
|----------|-----------|----------|-------|
| Sprint Planning | Bi-weekly (start of sprint) | 1-1.5 hours | Product Lead + Dev Lead |
| Daily Standup | Daily | 15 minutes | Dev Team |
| Triage Calibration | Weekly | 30 minutes | Product Lead + Dev Lead + R&D Lead |
| Sprint Review / Demo | Bi-weekly (end of sprint) | 30-45 minutes | Dev Team → Stakeholders |
| Sprint Retrospective | Bi-weekly (end of sprint) | 30 minutes | Product Lead + Dev Team |
| Technical Discovery | As needed | 1-3 days | Dev Team |

---

**Last Updated**: February 2026
**Owner**: Product Lead + Dev Lead
**Review Cadence**: Quarterly
