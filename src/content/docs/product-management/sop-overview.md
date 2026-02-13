---
title: Product Management SOP
description: Standard operating procedures for product management at My Marketing Pro
---

This document outlines our standard operating procedures for product management at My Marketing Pro. These guidelines ensure consistency, quality, and transparency in how we build and ship features.

## Philosophy & Principles

### Our Core Values

**1. Client-First Approach (Transitioning to Product Vision)**
- We prioritize features that solve real client problems
- Client feedback drives our roadmap, but we're evolving toward product-led growth
- We balance "what clients ask for" with "what clients actually need"

**2. Speed + Quality**
- We ship quickly but not recklessly
- Rolling releases allow us to iterate fast
- 3-stage review process ensures quality before client release

**3. Transparency & Communication**
- Stakeholders understand "why" behind decisions
- Roadmap is visible to the team (and eventually clients)
- Feature requests get timely responses (48hr acknowledgment, 1-week decision)

**4. Documentation Over Tribal Knowledge**
- Processes are written down and accessible
- Living documentation that evolves with the team
- New team members can onboard using these docs

### Decision-Making Framework

- **Founder has final say** on all features
- **Product Manager has autonomy** on quick wins and minor enhancements
- **Revenue-impacting features** get automatic priority consideration
- **Data-driven prioritization** using RICE scoring (see [Feature Request Process](/mmp-docs/product-management/feature-request-process/))

## Roles & Responsibilities

### Product Manager

**Key Responsibilities:**
- Intake and triage feature requests
- Prioritize roadmap using RICE scoring
- Communicate decisions to stakeholders
- Coordinate releases (founder review → QA → deployment)
- Maintain product documentation
- Monitor feature adoption and success metrics

**Decision Authority:**
- Full autonomy: Bug fixes, minor UI improvements, documentation updates
- Shared with founder: New features, significant changes, architectural decisions
- Requires founder approval: Strategic pivots, large investments, breaking changes

### Founder

**Key Responsibilities:**
- Strategic product direction
- Final approval on new features
- 1:1 review of features before QA
- Business impact assessment (revenue, market fit)
- Resource allocation (team, budget)

**Decision Authority:**
- Final say on all features
- Can override RICE scores based on business needs
- Veto power on technical approach

### Account Manager

**Key Responsibilities:**
- Collect feature requests from clients
- Communicate feature status to clients
- Represent client needs in product discussions
- User acceptance testing from client perspective
- Manage client expectations on timelines

**Input Provided:**
- Client pain points and requests
- Revenue implications of features
- Client feedback on releases
- Competitive intel from client conversations

### Development Team

**Key Responsibilities:**
- Technical feasibility assessment
- Implementation and code review
- Developer testing before reviews
- Technical documentation
- Bug fixes and maintenance

**Input Provided:**
- Effort estimates (RICE scoring)
- Technical constraints and limitations
- Alternative technical approaches
- Performance and security implications

### Sales Team

**Key Responsibilities:**
- Identify revenue-impacting feature requests
- Communicate product capabilities to prospects
- Provide market/competitive insights
- Demo new features to prospects

**Input Provided:**
- Deal-blocking feature requests
- Competitive feature analysis
- Prospect feedback and objections
- Revenue opportunities

## Product Development Lifecycle

Our features go through 7 stages:

### 1. Discovery

**What happens:**
- Feature request comes in (client, team, founder, sales)
- PM logs it in Linear with `feature-request` label
- Initial context gathered (who, what, why, expected outcome)

**Who's involved:** Requester, PM

**Timeline:** Immediate (< 1 day)

### 2. Evaluation

**What happens:**
- PM triages within 48 hours
- Quick feasibility check with dev team
- Classification (critical/urgent, revenue-impacting, strategic, parking lot)
- RICE scoring if appropriate

**Who's involved:** PM, dev team (brief consult), founder (if critical)

**Timeline:** 48 hours to 1 week

**Decision point:** Continue to planning OR parking lot with explanation

### 3. Planning

**What happens:**
- User stories written (As a [user], I want to [action], so that [benefit])
- Acceptance criteria defined (Given/When/Then)
- Technical approach discussion
- Effort estimation (person-weeks)
- Edge cases and rollback plan considered

**Who's involved:** PM, dev team, sometimes designer/stakeholder

**Timeline:** 1-3 days (depending on complexity)

**Decision point:** Add to roadmap OR defer to later

### 4. Development

**What happens:**
- Feature developed by dev team
- Code review within team
- Developer testing (happy path + edge cases)
- Staging deployment

**Who's involved:** Dev team

**Timeline:** Varies (hours to weeks depending on feature)

**Exit criteria:** Feature works in staging, dev-tested, ready for founder review

### 5. Founder Review (1:1)

**What happens:**
- PM demos feature to founder
- Founder evaluates against original request
- UI/UX review, edge case discussion
- Approval, minor changes, or major rework decision

**Who's involved:** PM, founder

**Timeline:** 15-30 minute meeting

**Decision point:** Approve for QA OR back to development

See [Release Process](/mmp-docs/product-management/release-process/) for detailed checklist.

### 6. QA & Team Testing

**What happens:**
- PM + 1-2 team members test in staging
- Functional, cross-browser, mobile testing
- Bug reporting in Linear
- PM sign-off when critical bugs fixed

**Who's involved:** PM, rotating team members, dev team (for fixes)

**Timeline:** 1-2 days (depending on bugs found)

**Exit criteria:** All critical bugs fixed, PM approves for release

See [Release Process](/mmp-docs/product-management/release-process/) for detailed QA checklist.

### 7. Release & Monitor

**What happens:**
- Deploy to production
- Smoke test post-deployment
- Release notes to team/clients
- Monitor for 24 hours (errors, feedback, metrics)
- Rollback if critical issues

**Who's involved:** Dev team (deployment), PM (communication, monitoring)

**Timeline:** 30 minutes deployment + 24 hours monitoring

**Success criteria:** No critical bugs, positive/neutral feedback, metrics stable

See [Release Process](/mmp-docs/product-management/release-process/) for detailed release workflow.

## Communication Guidelines

### Weekly Sync Meetings

**When:** Every Monday, 10am
**Duration:** 30 minutes
**Attendees:** PM, founder, dev team, account manager

**Agenda:**
1. Last week's releases (metrics, feedback)
2. This week's roadmap (what's shipping)
3. Feature requests review (new additions, RICE scores)
4. Blockers and dependencies
5. Client escalations or urgent requests

### Stakeholder Updates

**Frequency:** Bi-weekly email
**Recipients:** Founder, account manager, sales team

**Content:**
- Shipped features (with links to release notes)
- In development (what's coming next 2 weeks)
- Roadmap changes (new priorities, delays, cancellations)
- Metrics snapshot (adoption, performance)

### Feature Request Communication

**Acknowledgment (within 48 hours):**
```
Hi [Name],

Thanks for the feature request! We've added it to our backlog: [Feature Name].

We'll evaluate it with our prioritization framework and get back to you within 1 week with:
- Our assessment
- Potential timeline (if approved)
- Alternative solutions (if not prioritized now)

Questions? Reach out anytime.
```

**Decision Communication (within 1 week):**

If approved:
```
Good news! [Feature Name] has been prioritized for development.

Timeline: [Now/Next/Later + specific dates if available]
RICE Score: [X] (Reach: Y, Impact: Z, Confidence: A%, Effort: B weeks)

We'll keep you updated on progress.
```

If declined:
```
After evaluation, [Feature Name] won't make our roadmap in the next quarter.

Why: [Brief, honest reason - doesn't fit strategy, low ROI, technical limitations]

Alternative: [Suggest workaround or similar feature if available]

We'll revisit this in our quarterly planning. Appreciate your understanding!
```

### Release Notes Format

See [Release Process](/mmp-docs/product-management/release-process/) for full template.

**Structure:**
1. What's New (feature description + benefits)
2. How to Use (step-by-step + screenshots/video)
3. Technical Details (for team)
4. Known Issues (if any)

## Metrics & Success Criteria

### Feature Success Metrics

**Adoption Rate:**
- % of users/clients using the feature within 30 days
- Goal: >40% for client-requested features, >20% for strategic features

**Client Satisfaction:**
- NPS or satisfaction survey after releases
- Goal: No negative feedback, >70% positive

**Performance Impact:**
- Page load time, query performance
- Goal: No degradation >10%, ideally improvement

**Technical Debt:**
- Code quality, test coverage
- Goal: All features have tests, code reviewed

### Product Management Process Metrics

**Feature Request Response Time:**
- Time from request to acknowledgment: <48 hours
- Time from request to decision: <1 week

**Development Velocity:**
- Average time from planning to release
- Goal: Small features <1 week, medium <2 weeks, large <4 weeks

**Release Success Rate:**
- % of releases with no rollbacks/critical bugs
- Goal: >95%

**Stakeholder Satisfaction:**
- Quarterly survey on PM communication and process
- Goal: >4/5 rating

## Quarterly Review & Updates

**When:** Last week of each quarter (March, June, September, December)

**Activities:**
1. **Roadmap Review**: What shipped vs. planned, why deviations occurred
2. **Metrics Review**: Feature adoption, velocity, satisfaction scores
3. **Process Retrospective**: What's working, what needs improvement
4. **Documentation Update**: Revise this SOP based on learnings
5. **Parking Lot Review**: Revisit deferred features, re-score with RICE
6. **Next Quarter Planning**: Set OKRs, prioritize initiatives

**Output:**
- Updated roadmap for next quarter
- Process improvements (documented in SOP)
- OKRs for product/team

---

## Quick Reference

| Task | See... |
|------|--------|
| Handling a feature request | [Feature Request Process](/mmp-docs/product-management/feature-request-process/) |
| Releasing a feature | [Release Process](/mmp-docs/product-management/release-process/) |
| PM frameworks and tools | [Frameworks & Tools](/mmp-docs/product-management/frameworks-and-tools/) |
| User story template | [Frameworks & Tools - User Stories](/mmp-docs/product-management/frameworks-and-tools/#user-story-framework) |
| Communication templates | [Frameworks & Tools - Templates](/mmp-docs/product-management/frameworks-and-tools/#communication-templates) |

---

**Last Updated**: February 2026
**Owner**: Product Manager
**Review Cadence**: Quarterly
