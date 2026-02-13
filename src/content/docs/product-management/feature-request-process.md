---
title: Feature Request Process
description: How we intake, evaluate, prioritize, and communicate about feature requests
---

This document outlines our complete workflow for handling feature requests from initial submission to roadmap placement and communication back to requesters.

## Overview

**Goal:** Transform feature requests from "chaos in Google Chat" to **structured, data-driven prioritization** using RICE scoring and transparent communication.

**Timeline:**
- Acknowledgment: **Within 48 hours**
- Decision & communication: **Within 1 week**

## 1. Intake Process

###Sources of Feature Requests

Feature requests come from 5 primary sources:

| Source | How They Submit | Who Processes |
|--------|-----------------|---------------|
| **Clients** | Through account manager | Account manager logs in Linear |
| **Account Manager** | Direct submission (uses tool daily) | Account manager logs in Linear |
| **Sales Team** | Google Chat or direct to PM | PM logs in Linear |
| **Internal Team** | Linear or Google Chat | PM logs in Linear |
| **Founder** | Direct conversation with PM | PM logs in Linear |

### Tool: Linear

All feature requests are tracked in **Linear** with the `feature-request` label.

**Why Linear?**
- Already in use by the team
- Integrates with our development workflow
- Supports custom fields (RICE scoring)
- Public roadmap capability

### Required Information

When logging a feature request in Linear, include:

**1. Requester & Source**
- Who requested this? (name, role)
- Where did it come from? (client name, sales call, internal observation)

**2. Problem/Need Description**
- What problem are they trying to solve?
- What's the current workaround or pain point?
- How often does this problem occur?

**3. Expected Outcome**
- What does success look like?
- How will this improve their workflow/business?
- What specific result are they hoping for?

**4. Priority/Urgency from Requester's Perspective**
- How urgent do they think this is? (critical/high/medium/low)
- Is there a deadline or time sensitivity?
- What's the impact of not having this?

**5. Revenue Implications** (if applicable)
- Is this blocking a deal? (deal size, close date)
- Would this reduce churn or increase expansion?
- Is this a competitive gap (losing deals without it)?

### Linear Issue Template

Create this template in Linear:

```markdown
## Feature Request

**Requester**: [Name, Company]
**Source**: Client | Sales | Internal | Founder
**Date Submitted**: [YYYY-MM-DD]

### Problem
[What problem does this solve?]

### Expected Outcome
[What does success look like?]

### Requester's Priority
- [ ] Critical/Urgent
- [ ] High
- [ ] Medium
- [ ] Low

### Revenue Impact
- [ ] Blocking a deal (details: )
- [ ] Reduces churn
- [ ] Increases expansion
- [ ] Competitive gap
- [ ] No direct revenue impact

### Additional Context
[Screenshots, examples, related requests, etc.]

---

## PM Evaluation (filled in during triage)

**RICE Score**: [To be calculated]
- Reach:
- Impact:
- Confidence:
- Effort:

**Decision**: [ ] Approve | [ ] Defer | [ ] Decline | [ ] Needs more info
**Roadmap Placement**: Now | Next | Later | Parking Lot
**Notes**:
```

## 2. Triage & Initial Evaluation

**Timeframe:** Within 48 hours of submission

The PM reviews all new feature requests daily and performs initial triage.

### Initial Questions

Ask yourself these questions:

**1. Is this actually a bug fix?**
- If yes → Move to bug workflow (different process)
- Example: "Login doesn't work on Safari" = bug, not feature

**2. Is this already on the roadmap?**
- Check existing Linear issues
- If yes → Link to existing issue, update requester

**3. Is this technically feasible?**
- Quick gut-check with dev team (5-minute conversation)
- If clearly impossible → Decline with explanation
- If uncertain → Defer pending technical spike/research

**4. Does it align with product vision?**
- Does it fit our strategic direction?
- Would we want this even if the requester didn't ask?
- Is it a short-term bandaid or long-term improvement?

### Quick Classification

Based on answers above, classify the request:

#### 🚨 Critical/Urgent
- **Definition:** System is broken, blocking clients from core functionality, or deal-blocker for imminent close
- **Action:** Founder review immediately → expedite if approved
- **Example:** "Payment processing is broken"

#### 💰 Revenue-Impacting
- **Definition:** Blocking a deal, competitive gap losing us business, or prevents churn
- **Action:** High priority consideration, RICE score + founder input
- **Example:** "Enterprise client won't renew without SSO"

#### 🎯 Strategic Fit
- **Definition:** Aligns with product vision, benefits many clients, improves core value prop
- **Action:** Evaluate with RICE scoring framework
- **Example:** "Add bulk email personalization tokens"

#### 🅿️ Parking Lot
- **Definition:** Nice-to-have, edge case, doesn't fit strategy, or technically infeasible
- **Action:** Decline with empathy, provide alternative if possible, revisit quarterly
- **Example:** "Add dark mode to admin panel"

## 3. RICE Scoring Framework

For all **Strategic Fit** requests (and sometimes Revenue-Impacting), use RICE scoring to prioritize objectively.

### What is RICE?

**RICE = (Reach × Impact × Confidence) / Effort**

It's a quantitative prioritization formula that helps us compare apples-to-apples across different types of features.

### The Four Factors

#### Reach (Number)
**Question:** How many users/clients will this affect in a given time period?

**How to estimate:**
- For client-facing features: "How many clients use this workflow per quarter?"
- For internal tools: "How many team members per month?"

**Examples:**
- All clients send emails → Reach = 50 (if we have 50 clients)
- Only enterprise clients → Reach = 5
- Account manager uses daily → Reach = 1 (but high frequency)

**Tips:**
- Use quarterly timeframe (90 days) for consistency
- Count unique users/clients, not total interactions
- Be realistic, not optimistic

#### Impact (Multiplier)
**Question:** How much will this improve the outcome for each user?

**Scale:**
- **3x** = Massive impact (transforms workflow, solves major pain, wow factor)
- **2x** = High impact (significant improvement, removes friction)
- **1x** = Medium impact (noticeable improvement, nice to have)
- **0.5x** = Low impact (small improvement, minor convenience)
- **0.25x** = Minimal impact (barely noticeable, edge case)

**Examples:**
- Bulk email send (saves hours weekly) = **3x massive**
- Auto-save drafts (prevents lost work) = **2x high**
- Sort contacts by name (easier to find) = **1x medium**
- Change button color (aesthetic) = **0.5x low**
- Add tooltip on obscure setting = **0.25x minimal**

**Tips:**
- Think about "time saved" or "pain removed"
- Be conservative - most features are 0.5x to 2x
- Reserve 3x for transformative features

#### Confidence (Percentage)
**Question:** How confident are we in our Reach and Impact estimates?

**Scale:**
- **100%** = High confidence (data-backed, we've done this before, clear request)
- **80%** = Medium confidence (educated guess, some uncertainty)
- **50%** = Low confidence (hypothesis, need validation)

**Examples:**
- Client explicitly requested + clear pain point = **100%**
- Similar feature worked well before = **100%**
- Assumption based on user behavior = **80%**
- Speculative "nice to have" = **50%**

**Tips:**
- Don't use confidence <50% (means we're guessing wildly)
- Be honest about uncertainty - better to be conservative
- Lower confidence = lower RICE score (intentional de-prioritization)

#### Effort (Number)
**Question:** How much work (in person-weeks) will this take?

**Person-weeks:**
- Small dev team, so 1 person-week ≈ 1 week of work
- Includes: planning, development, code review, testing, documentation
- Does NOT include founder review, QA, or deployment (those are standard)

**Estimate buckets:**
- **0.5 weeks** = Few hours, trivial change (CSS tweak, copy change)
- **1 week** = Small feature, well-defined (add a field, simple form)
- **2 weeks** = Medium feature, some complexity (new page, integration)
- **4 weeks** = Large feature, significant scope (major workflow, architecture change)
- **8+ weeks** = Epic, break it down into smaller features

**Examples:**
- Add "Archive" button to contacts = **0.5 weeks**
- Bulk import contacts from CSV = **2 weeks**
- Build email template editor = **4 weeks**
- SSO with OAuth = **6 weeks**

**Tips:**
- Ask dev team for effort estimates (they know better than PM)
- Round up, not down (pad for unknowns)
- If estimate >4 weeks, consider breaking into phases

### Calculating RICE Score

**Formula:**
```
RICE Score = (Reach × Impact × Confidence) / Effort
```

**Example Calculation:**

Feature: **Bulk email import from CSV**
- **Reach:** 30 clients per quarter
- **Impact:** 2x (high - saves hours of manual entry)
- **Confidence:** 100% (explicitly requested, clear need)
- **Effort:** 2 person-weeks

```
RICE = (30 × 2 × 1.0) / 2
RICE = 60 / 2
RICE = 30
```

### RICE Scoring Template

Use this spreadsheet template or Linear custom fields:

| Feature Name | Reach | Impact | Confidence | Effort | RICE Score | Priority |
|--------------|-------|--------|------------|--------|------------|----------|
| Bulk email import | 30 | 2.0 | 100% | 2 | 30 | High |
| Dark mode | 50 | 0.5 | 80% | 4 | 5 | Low |
| Email scheduling | 40 | 2.0 | 100% | 1 | 80 | High |
| SSO with Google | 5 | 3.0 | 80% | 6 | 2 | Low |

**Tool Options:**
- **Google Sheets:** Simple RICE calculator spreadsheet
- **Linear Custom Fields:** Add Reach/Impact/Confidence/Effort fields, calculate in spreadsheet
- **Notion Database:** RICE formula built-in

## 4. Prioritization Decision

Once you have a RICE score, prioritize using these thresholds:

### Priority Tiers

| RICE Score | Priority | Action |
|------------|----------|--------|
| **≥ 10** | **High Priority** | Consider for next sprint (0-4 weeks) |
| **5-10** | **Medium Priority** | Add to upcoming quarter (1-3 months) |
| **< 5** | **Low Priority** | Backlog (3+ months or parking lot) |

### Founder Override

RICE scores are a **starting point, not the final answer**.

The founder can override RICE scores based on:
- Strategic business priorities (market positioning, partnerships)
- Critical revenue impact (deal closing, major client request)
- Technical dependencies (must build X before Y)
- Team capacity (avoid overloading devs)

**Process:**
1. PM presents RICE score + recommendation
2. Founder provides context (business factors PM might not see)
3. Collaborative decision on priority

**Document the override:**
- Note in Linear: "Founder override: [reason]"
- Transparency builds trust, shows RICE isn't arbitrary

### Revenue-Impacting Features

Features tied to revenue get automatic **high priority consideration**, but still benefit from RICE analysis.

**Auto-prioritize if:**
- Deal >$10k ARR blocked on this feature
- Churn risk from key client ($5k+ ARR)
- Competitive loss pattern (lost 2+ deals for same reason)

**Still RICE score it:**
- Helps justify the decision internally
- Useful for retrospective ("Was the effort worth the revenue?")
- Prevents scope creep ("Can we add X too?" → Check RICE)

## 5. Roadmap Placement

Once prioritized, place the feature on the roadmap:

### Roadmap Buckets

**Now (0-4 weeks)**
- Features in active development or queued up next
- Founder approved, ready for implementation
- Clear scope, estimates finalized

**Next (1-3 months)**
- Features planned and scoped
- Awaiting capacity or dependency resolution
- RICE scored, founder aware

**Later (3+ months)**
- Validated ideas, not yet prioritized
- May require more research or planning
- Revisited in quarterly planning

**Parking Lot**
- Not prioritized, revisit quarterly
- Declined features with low RICE scores
- "Maybe someday" ideas

### Communicating Roadmap

**Internally:**
- Weekly sync meetings (upcoming work)
- Bi-weekly stakeholder email (bigger picture)
- Linear roadmap view (live status)

**Externally (future goal):**
- Public roadmap (Canny or custom page)
- Feature voting system
- Transparency builds trust

## 6. Communication Back to Requesters

**Timeline:**
- **Acknowledgment:** Within 48 hours of submission
- **Decision:** Within 1 week of submission

### Acknowledgment Template

Use this within 48 hours:

```
Hi [Name],

Thanks for the feature request! We've added it to our backlog: [Feature Name].

We'll evaluate it with our prioritization framework and get back to you within 1 week with:
- Our assessment
- Potential timeline (if approved)
- Alternative solutions (if not prioritized now)

Questions? Reach out anytime.

[Your Name], Product Manager
```

### Decision Communication

#### If Approved (High Priority)

```
Good news! [Feature Name] has been prioritized for development.

Timeline: [Now/Next/Later + specific dates if available]
RICE Score: [X] (Reach: Y, Impact: Z, Confidence: A%, Effort: B weeks)

Why we're prioritizing this:
- [Reason 1: aligns with strategy, solves major pain, etc.]
- [Reason 2: high RICE score, benefits many clients]

We'll keep you updated on progress. Expected completion: [date range if known]

Thanks for the suggestion!
```

#### If Approved (Medium/Low Priority)

```
Thanks for the suggestion! [Feature Name] has been added to our roadmap.

Timeline: [Next/Later - expected quarter]
RICE Score: [X]

This is a valuable idea, but we're prioritizing [other features] first due to [revenue impact, client requests, strategic fit].

We'll revisit timing in our quarterly planning and keep you posted.
```

#### If Declined (Parking Lot)

**Use empathy and provide alternatives:**

```
Hi [Name],

We've evaluated [Feature Name] and unfortunately it won't make our roadmap in the next quarter.

Why: [Brief, honest reason]
- Doesn't fit our current strategy (focusing on [X])
- Low RICE score (limited reach or high effort)
- Technical limitations (explain briefly)
- Similar functionality exists (point to it)

Alternative: [Suggest workaround or similar feature if available]

We'll revisit this in our quarterly planning (next: [month]). Appreciate your understanding!

Questions or want to discuss further? Happy to chat.

[Your Name]
```

**Be transparent but kind:**
- Give a real reason (not just "no bandwidth")
- Offer alternatives if possible
- Leave door open for revisiting
- Thank them for thinking about the product

### Follow-Up Communication

**During Development:**
- Update requester when work starts ("We've begun work on [feature]")
- Share progress if long timeline ("50% done, on track for [date]")

**After Release:**
- Notify requester when shipped ("Launched! Check it out here: [link]")
- Collect feedback 1 week after release ("How's [feature] working for you?")

## Tools & Resources

**Linear:**
- Feature request label
- Custom RICE fields
- Roadmap view
- Linear issue template (see above)

**RICE Calculator:**
- Google Sheets template: [Create your own based on example]
- Formula: `=(Reach * Impact * Confidence) / Effort`

**Communication Templates:**
- See [Frameworks & Tools - Communication](/mmp-docs/product-management/frameworks-and-tools/#communication-templates)

**Quarterly Review:**
- Revisit parking lot features
- Re-score with updated data
- Archive truly dead ideas

---

## Quick Reference

| Scenario | Action | Timeline |
|----------|--------|----------|
| New request comes in | Log in Linear, acknowledge requester | 48 hours |
| Triage & classify | Evaluate, RICE score if needed | 1 week |
| Critical/urgent request | Founder review immediately | Same day |
| Revenue-impacting | Auto-prioritize, still RICE score | 1-2 days |
| Strategic fit | RICE score, roadmap placement | 1 week |
| Parking lot | Decline with empathy, offer alternative | 1 week |

---

**Last Updated**: February 2026
**Owner**: Product Manager
**Review Cadence**: Quarterly
