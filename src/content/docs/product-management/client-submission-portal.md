---
title: Client Submission Portal
description: Structured client feedback intake, bug report and feature request templates, and future portal vision
---

The Client Submission Portal is our direct line to improving My Marketing Pro. Whether a client has encountered a bug that's disrupting their workflow or has a brilliant idea for a new feature, this structured submission process ensures their feedback reaches our development team quickly and with all the necessary context.

By following these standardized procedures, we help clients communicate their needs effectively while giving our team the information needed to prioritize, investigate, and respond.

## Current Process (Linear-Based)

We currently use **Linear** as our submission and tracking tool. All client feedback — bugs and feature requests — flows through Linear with structured templates.

### How Submissions Arrive

| Channel | Flow | Who Logs It |
|---------|------|-------------|
| Client → Account Manager | AM collects details, logs in Linear | Account Manager |
| Client → Support Email | PM reviews, logs in Linear | Product Lead |
| Client → Direct (if configured) | Client submits via Linear form | Client (auto-logged) |
| Internal team observation | Team member identifies issue | Any team member |

**Key principle:** No matter how feedback arrives, it must be logged in Linear within 24 hours with a structured template. Informal mentions in chat or calls are not sufficient — they need a Linear issue.

### Bug Report Template

Use this template when logging client-reported bugs in Linear:

```markdown
## Bug Report

**Reporter**: [Client name, company]
**Reported via**: Account Manager | Support Email | Direct
**Date Reported**: [YYYY-MM-DD]
**Environment**: Production | Staging

### Description
[Clear, concise description of the bug]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Severity
- [ ] P0 - Critical (system outage, data loss, security vulnerability)
- [ ] P1 - High (major feature broken, significant UX degradation)
- [ ] P2 - Medium (minor bug, workaround available)
- [ ] P3 - Low (cosmetic issue, edge case)

### Impact
- Number of clients affected: [All | Multiple | Single]
- Workaround available: [Yes - describe | No]
- Revenue impact: [Yes - describe | No]

### Additional Context
- Browser/OS: [e.g., Chrome 120 / macOS 14]
- Screenshots/recordings: [Attach or link]
- Error messages: [Exact text or screenshot]
- Related issues: [Link to existing Linear issues if any]
```

### Feature Request Template (Client-Facing)

Use this template when logging client feature requests. This is the client-facing version — simpler than the internal evaluation template in the [Feature Request Process](/mmp-docs/product-management/feature-request-process/).

```markdown
## Feature Request

**Requester**: [Client name, company]
**Submitted by**: [Account Manager name or direct]
**Date Submitted**: [YYYY-MM-DD]

### What problem are you trying to solve?
[Describe the pain point or need in the client's own words]

### What would the ideal solution look like?
[Client's description of what they want — we'll translate this into a dev brief]

### How does this affect your business?
- [ ] Blocking a critical workflow
- [ ] Reducing efficiency (describe time spent)
- [ ] Missing capability vs. competitors
- [ ] Nice-to-have improvement
- [ ] Other: [describe]

### How urgent is this for you?
- [ ] Critical — blocking our work right now
- [ ] High — significant impact on our operations
- [ ] Medium — would improve our workflow noticeably
- [ ] Low — nice to have when you get to it

### Additional Context
- How many people on your team would use this? [number]
- How often would you use this? [Daily | Weekly | Monthly | Occasionally]
- Screenshots/mockups of what you're imagining: [Attach]
- Similar features you've seen in other tools: [Describe]
```

---

## Intake Processing Workflow

Once submissions arrive through any channel, the Product Development Team must systematically process each request to ensure nothing falls through the cracks. This transforms raw client feedback into actionable development tasks while maintaining transparency and efficiency.

**Goal:** Categorize, prioritize, and route submissions within **48 business hours** of receipt.

### Step 1: Initial Review

**Who:** Product Lead (daily review of new submissions)

**Questions to answer:**
- **Is this a bug or a feature request?** Miscategorized submissions get re-labeled.
- **Is this a duplicate?** Search existing Linear issues. If duplicate, link to the existing issue and notify the reporter.
- **Is this actionable?** Does it have enough detail to investigate? If not, follow up with the reporter for clarification.
- **Is there immediate danger?** P0 issues (outages, data loss, security) bypass this workflow — escalate immediately per the [severity framework](/mmp-docs/product-management/feature-request-process/#severity-framework-p0-p3).

### Step 2: Categorization and Tagging

**Apply these labels in Linear:**

**Type:**
- `bug` — Something is broken
- `feature-request` — New capability or enhancement
- `improvement` — Enhancement to existing feature
- `technical-debt` — Internal cleanup, no client-facing change

**Product Area:**
- `email` | `contacts` | `campaigns` | `reporting` | `admin` | `integrations` | `other`

**Client Tier** (for prioritization context):
- `enterprise` — High-value client
- `standard` — Standard client
- `internal` — Internal team request

**Severity** (for bugs):
- `P0-critical` | `P1-high` | `P2-medium` | `P3-low`

### Step 3: Stakeholder Routing

Based on categorization, route to the right people:

| Type | Severity | Route To | Action |
|------|----------|----------|--------|
| Bug | P0 | Dev Lead + R&D Lead immediately | Emergency response, potential rollback |
| Bug | P1 | Dev Lead | Assign to on-call or next sprint |
| Bug | P2-P3 | Dev Lead (sprint planning) | Add to backlog, schedule per capacity |
| Feature Request | Revenue-impacting | Product Lead + R&D Lead | RICE score + founder review |
| Feature Request | Standard | Product Lead | RICE score, roadmap placement |
| Improvement | Any | Product Lead | Evaluate, batch with related work |
| Technical Debt | Any | Dev Lead | Add to 20% sprint buffer |

### Step 4: Priority Assignment

**For bugs:** Use the [P0-P3 Severity Framework](/mmp-docs/product-management/feature-request-process/#severity-framework-p0-p3).

| Severity | Target Resolution | Action |
|----------|-------------------|--------|
| P0 - Critical | 24-48 hours | Immediate escalation, all-hands if needed |
| P1 - High | 1-2 weeks | Next sprint or current sprint (from 10% buffer) |
| P2 - Medium | 1-2 sprints | Scheduled into sprint planning |
| P3 - Low | Backlog | Addressed when capacity allows |

**For feature requests:** Use [RICE Scoring](/mmp-docs/product-management/feature-request-process/#rice-scoring-framework) to determine roadmap placement (Now / Next / Later / Parking Lot).

**For both:** The weekly [Triage Calibration Meeting](/mmp-docs/product-management/development-workflow/#triage-calibration-meeting) reviews 3-5 recent prioritization decisions to ensure consistency.

---

## Tracking & Metrics

### Submission Metrics to Track

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Time to acknowledgment | < 48 business hours | Client confidence that feedback is heard |
| Time to triage | < 48 business hours | Nothing sits unprocessed |
| P0 response time | < 4 hours (business hours) | Critical issues get immediate attention |
| Resolution rate | > 80% within SLA | We deliver on our commitments |
| Submissions per month | Track trend | Indicates client engagement (or pain) |
| Duplicate rate | < 15% | Templates are clear, clients aren't re-reporting |

### Monthly Review

At the end of each month, Product Lead reviews:
- Total submissions by type and severity
- SLA adherence (% resolved within target)
- Top client pain points (recurring themes)
- Submission quality (are templates being used effectively?)
- Triage accuracy (were priorities assigned correctly?)

This data feeds into sprint planning and quarterly roadmap reviews.

---

## Future Vision: Custom Client Portal

While Linear works well for internal tracking, a purpose-built client submission portal would give clients direct visibility and reduce the Account Manager bottleneck.

### What It Would Look Like

- **Self-service submission** — Clients log in and submit bug reports or feature requests directly using guided templates
- **Status tracking** — Clients see the status of their submissions (Received → Under Review → Planned → In Development → Released)
- **Feature voting** — Clients upvote existing feature requests, helping us gauge demand
- **Knowledge base** — FAQ and known issues reduce duplicate submissions
- **Notifications** — Automated updates when status changes (no manual email needed)

### Why Build It

- **Scales better** than routing everything through Account Managers
- **Reduces communication overhead** — clients check status themselves
- **Better data** — structured submissions with required fields, less back-and-forth
- **Transparency** — clients see their feedback matters (builds trust)
- **Prioritization signal** — voting surfaces what clients actually want most

### RICE Score (Preliminary)

| Factor | Estimate | Rationale |
|--------|----------|-----------|
| Reach | All clients (50+) | Every client would use this |
| Impact | 2x (High) | Transforms feedback workflow |
| Confidence | 80% | Strong need, some uncertainty on adoption |
| Effort | 6-8 weeks | Full-stack build with auth, UI, notifications |
| **RICE Score** | **~10-13** | Medium-high priority |

### Technical Considerations

Per the [Internal Tooling Resilience](/mmp-docs/product-management/team-structure-resources/#internal-tooling-resilience) plan:
- Must be deployed on **independent infrastructure** (not on the same server as the main app)
- Options: standalone microservice, separate container, or separate hosting
- Should integrate with Linear via API (sync submissions both ways)
- Consider using an existing tool (Canny, Fider) as a starting point vs. building from scratch

### Next Steps

1. **Formally submit as a feature request** — Use the [Feature Request Process](/mmp-docs/product-management/feature-request-process/) to evaluate
2. **Present to R&D Lead** — Get founder input on scope and priority
3. **Infrastructure request** — Coordinate with DevOps on independent hosting (see [Team Structure - Action Items](/mmp-docs/product-management/team-structure-resources/#action-items-for-infrastructure))
4. **Evaluate build vs. buy** — Compare custom build against tools like Canny (free tier) or Fider (self-hosted)

---

**Last Updated**: February 2026
**Owner**: Product Lead
**Review Cadence**: Quarterly
