---
title: Team Structure & Resources
description: Team roles, resource planning, on-call procedures, and internal tooling resilience at My Marketing Pro
---

This document defines our team structure, resource allocation strategies, and plans for ensuring our internal tools remain resilient. It serves as the reference for who does what, how we handle resource constraints, and how we plan to scale.

## Team Roster

| Name | Role | Focus |
|------|------|-------|
| Juan Zamudio | Product Lead | Business side, hands-off-keys |
| Umair Ali | Dev Lead | Technical side, hands-on-keys |
| Frank O'Brien | R&D Lead | Product-market fit, strategic direction |
| Memory Harkins | Account Manager | Client liaison, feedback intake |
| TBD | Sales Team | Revenue-impacting requests, competitive insights |

---

## Role Definitions

Throughout these docs, we use **role titles** (not names) to keep processes scalable as the team grows.

### Product Lead

**Focus:** Business side — prioritization, roadmap, stakeholder communication

**Key Responsibilities:**
- Intake and triage feature requests and bug reports
- Prioritize roadmap using RICE scoring and P0-P3 severity framework
- Create dev briefs from client input (not just reactive quick fixes)
- Communicate decisions to stakeholders (clients, team, founder)
- Coordinate releases (founder review, QA, stakeholder validation, deployment)
- Maintain product documentation
- Monitor feature adoption and success metrics
- Run weekly triage calibration meetings

**Decision Authority:**
- Full autonomy: Bug fixes, minor UI improvements, documentation updates, P2/P3 prioritization
- Shared with R&D Lead: New features, significant changes, architectural decisions
- Requires R&D Lead approval: Strategic pivots, large investments, breaking changes

### Dev Lead

**Focus:** Technical side — hands-on-keys, team management, code quality

**Key Responsibilities:**
- Lead technical discovery and feasibility assessments
- Provide effort estimates to Product Lead
- Manage development team (task assignment, mentorship, code review)
- Own code quality, architecture decisions, and technical standards
- Run sprint execution (daily standups, unblock developers)
- Oversee feature branch workflow, PR reviews, and merge process
- Manage staging and production environments
- First responder for technical incidents and rollbacks

**Decision Authority:**
- Full autonomy: Technical approach, architecture patterns, tooling choices, code standards
- Shared with Product Lead: Sprint scope adjustments, effort re-estimates
- Shared with R&D Lead: Infrastructure changes, major architectural shifts

### R&D Lead / Founder

**Focus:** Product-market fit, strategic direction, hybrid hands-on when needed

**Key Responsibilities:**
- Strategic product direction and business vision
- Work on product-market fit components and sprint requests from clients
- Final approval on new features (1:1 review before QA)
- Guide roadmap and infrastructure setup with domain insight
- Turn over completed R&D work to Dev Lead and team
- Business impact assessment (revenue, market fit, competitive positioning)
- Resource allocation decisions (team, budget)

**Decision Authority:**
- Final say on all features and strategic direction
- Can override RICE scores based on business needs
- Veto power on technical approach when business implications are significant
- Approves resource additions and budget decisions

### Account Manager

**Key Responsibilities:**
- Collect feature requests and bug reports from clients
- Submit structured reports through the [Client Submission Portal](/mmp-docs/product-management/client-submission-portal/)
- Communicate feature status and timelines to clients
- Represent client needs in product discussions
- User acceptance testing from the client perspective
- Manage client expectations on timelines and priorities

### Sales Team

**Key Responsibilities:**
- Identify revenue-impacting feature requests and deal-blocking gaps
- Submit requests through Product Lead with revenue context
- Communicate product capabilities and roadmap to prospects
- Provide competitive insights and market feedback
- Demo new features to prospects

---

## Resource Planning

### The "Quick Fix" Resource

For bugs and urgent updates, we need the ability to respond without derailing sprint work. A dedicated "quick fix" resource handles this.

**What a Quick Fix Resource Handles:**
- P0/P1 bugs (system outages, major feature breakage)
- Urgent client escalations requiring immediate technical attention
- Small hotfixes that don't warrant pulling someone off a sprint
- Production incidents and emergency patches

**What Stays with the Sprint Team:**
- Planned feature work (P2/P3 items already in the sprint)
- Technical debt and refactoring
- Non-urgent bug fixes (scheduled into the 20% sprint buffer)

#### Option A: Dedicated Team Member

Bring in a resource whose primary role is triage and quick-fix development.

**When to consider:**
- Bug volume regularly exceeds the 10% sprint escalation buffer
- Sprint velocity is consistently impacted by unplanned interruptions
- Client escalations are frequent enough to justify a dedicated role

**Profile:**
- Strong debugging skills across the stack
- Comfortable working independently with minimal context
- Can context-switch quickly between unrelated issues
- Familiar with the full codebase (or can ramp up fast)

**Reporting:** Reports to Dev Lead for technical direction, Product Lead for prioritization.

#### Option B: Rotating On-Call Developer

In the absence of a dedicated resource, one developer rotates as the "on-call" person each sprint.

**How it works:**
- One developer per sprint is designated as the quick-fix/on-call resource
- Their sprint capacity is reduced to 50% (other 50% reserved for unplanned work)
- They handle P0/P1 issues, urgent client escalations, and small fixes
- Rotation ensures no single developer bears the full burden
- Rotation schedule set during sprint planning

**Trade-offs:**
- Lower sprint velocity (one developer at half capacity)
- Requires all developers to have broad codebase knowledge
- More equitable distribution of interrupt-driven work

### Resource Reassignment

When a P0/P1 issue requires pulling a developer from sprint work, follow this process:

**Step 1: Assess Impact**
- What sprint work will be delayed?
- Can someone else pick up the delayed work?
- Is the sprint goal still achievable?

**Step 2: Communicate**
- Product Lead notifies the team immediately
- Dev Lead reassigns the developer and adjusts sprint tasks
- Affected stakeholders are informed of any timeline changes

**Step 3: Adjust Sprint Scope**
- Remove or defer equivalent story points from the sprint backlog
- Document the reassignment reason in the sprint notes
- Do not silently add scope — if work is pulled in, other work must come out

**Step 4: Post-Resolution**
- Developer returns to sprint work once the issue is resolved
- Sprint retrospective captures the interruption and its impact
- If reassignments happen frequently (>2 per sprint), escalate to R&D Lead to discuss adding a dedicated quick-fix resource

### Scaling: Adding Team Members

As MMP grows, here's what additional support looks like at each stage:

| Stage | Team Addition | Trigger |
|-------|--------------|---------|
| **Current** | Existing team + rotating on-call | < 3 escalations per sprint |
| **Near-term** | Dedicated quick-fix developer | > 3 escalations per sprint consistently |
| **Growth** | Second dev team (feature vs. maintenance) | Multiple parallel workstreams needed |
| **Scale** | QA engineer, DevOps engineer | Deployment frequency or complexity increases significantly |

---

## On-Call & Incident Response

### Who Handles Rollbacks

The on-call developer (or dedicated quick-fix resource) has **authority to execute rollbacks without additional approvals** when rollback triggers are met (see [Testing & Deployment Pipeline](/mmp-docs/product-management/testing-deployment-pipeline/)).

**Escalation path:**
1. On-call developer identifies the issue and initiates rollback
2. Dev Lead is notified immediately
3. Product Lead is notified for stakeholder communication
4. R&D Lead is notified if the issue has business/revenue impact

### On-Call Expectations

**What "on-call" means at our current size:**
- Available to respond to production alerts within 30 minutes during business hours
- Available within 1 hour outside business hours for P0 issues
- Has access to production systems, monitoring dashboards, and rollback procedures
- Has reviewed the [Deployment Runbook](/mmp-docs/product-management/testing-deployment-pipeline/#deployment-runbook)

**What on-call does NOT mean:**
- Working 24/7 or sacrificing personal time regularly
- Sole responsibility for all production issues — escalation exists for a reason
- Handling non-urgent requests outside of business hours

---

## Internal Tooling Resilience

### Current State

We use **Linear** for task management, bug tracking, and sprint planning. Linear is a third-party SaaS tool with its own infrastructure — it operates independently of our main application.

### The Concern

If we build or rely on internal tools that run on the same infrastructure as the main MMP application, we risk losing access to our development workflow tools during the exact moments we need them most — outages and incidents.

### Resilience Plan

Any internal tools we build (client submission portal, custom dashboards, monitoring tools) should follow these principles:

**1. Independent Infrastructure**
- Internal tools must not share hosting with the main MMP application
- If the main app goes down, dev tools must remain accessible
- Separate server, separate subdomain (e.g., `tools.mymarketingpro.com`)

**2. Options for Implementation**

| Option | Approach | Pros | Cons |
|--------|----------|------|------|
| **Standalone microservice** | Deploy on a separate server/container | Full independence, can scale separately | More infrastructure to manage |
| **JS snippet inclusion** | Lightweight widgets embedded via external JS | Minimal infrastructure, easy to deploy | Limited functionality |
| **Managed service** | Use SaaS tools (Linear, Canny, etc.) | Zero infrastructure overhead, high availability | Less customization, vendor dependency |

**3. Recommendation**
- **Short-term:** Continue using Linear (SaaS, already independent of our infrastructure)
- **Medium-term:** If we build custom tools (client portal, etc.), deploy as a standalone microservice on its own server
- **Long-term:** Evaluate consolidating internal tools into a single internal platform, hosted independently

### Action Items for Infrastructure

To get internal tools on independent infrastructure, present the following to the DevOps/infrastructure team:

1. **Request:** Provision a separate server or container environment for internal development tools
2. **Requirements:** Independent uptime from main application, basic monitoring, automated deployment
3. **Scope:** Initially for any custom-built tools (client portal, deployment dashboard); Linear and other SaaS tools are already independent
4. **Timeline:** Align with the build timeline for the custom client portal (see [Client Submission Portal - Future Vision](/mmp-docs/product-management/client-submission-portal/#future-vision-custom-client-portal))

---

## Quick Reference

| Question | Answer |
|----------|--------|
| Who prioritizes work? | Product Lead (RICE + P0-P3) with R&D Lead final approval |
| Who assigns tasks to developers? | Dev Lead |
| Who handles production rollbacks? | On-call developer (authority to rollback without approval) |
| Who communicates with clients? | Account Manager (day-to-day), Product Lead (decisions/status) |
| What happens when a dev is pulled from sprint? | Follow resource reassignment process, adjust sprint scope |
| Where are internal tools hosted? | SaaS (Linear) now; future custom tools on independent infrastructure |

---

**Last Updated**: February 2026
**Owner**: Product Lead
**Review Cadence**: Quarterly
