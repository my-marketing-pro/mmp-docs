---
title: Frameworks & Tools
description: PM frameworks (RICE, JTBD, ICE, Kano, OKRs), user stories, tools, and templates
---

This document provides a comprehensive reference for product management frameworks, user story templates, recommended tools, and communication templates.

## Top 5 Product Management Frameworks

These are the essential frameworks every product manager should have in their toolkit.

### 1. RICE Scoring (Prioritization)

**What:** Quantitative prioritization formula for comparing features objectively

**When to use:**
- Comparing multiple feature requests
- Building/updating roadmap
- Justifying priority decisions to stakeholders

**Formula:**
```
RICE Score = (Reach × Impact × Confidence) / Effort
```

**Components:**
- **Reach:** Number of users/clients affected (per quarter)
- **Impact:** Value multiplier (0.25 = minimal, 0.5 = low, 1 = medium, 2 = high, 3 = massive)
- **Confidence:** How sure are we? (50% = low, 80% = medium, 100% = high)
- **Effort:** Person-weeks to build

**Example:**
```
Feature: Bulk email import
Reach: 30 clients
Impact: 2x (high)
Confidence: 100%
Effort: 2 weeks

RICE = (30 × 2 × 1.0) / 2 = 30 (High priority!)
```

**Resources:**
- [RICE Calculator Template](https://docs.google.com/spreadsheets/d/your-template) (Create your own)
- Detailed guide: [Feature Request Process](/mmp-docs/product-management/feature-request-process/#rice-scoring-framework)

**Pro Tips:**
- Most features are 0.5x to 2x impact (reserve 3x for transformative features)
- Be conservative on confidence (80% is typical)
- Ask dev team for effort estimates (they know better than PM)

---

### 2. Jobs-to-be-Done (JTBD) (Discovery)

**What:** Framework for understanding customer motivations and the "job" they're trying to accomplish

**When to use:**
- Discovering new features (what problems do clients actually have?)
- Understanding feature requests (what's the real need behind the ask?)
- User interviews and research
- Validating assumptions

**Framework:**
```
When [situation],
I want to [motivation],
So I can [expected outcome].
```

**Example:**

Bad (feature-focused):
> "I want a dashboard with charts"

Good (job-focused):
> "When I'm preparing for a client meeting,
> I want to quickly see campaign performance at a glance,
> So I can answer client questions without digging through data."

**How to apply at MMP:**

1. **Ask "Why?" 5 times**
   - Client: "We need dark mode"
   - PM: "Why?"
   - Client: "The UI is too bright"
   - PM: "Why is that a problem?"
   - Client: "I work late at night and it hurts my eyes"
   - → **Real job:** Reduce eye strain during late-night work sessions

2. **Identify the real problem**
   - Requested feature: Dark mode (8 weeks of work)
   - Real job: Reduce eye strain
   - Better solution: Reduce contrast, less white (1 week of work)

**Resources:**
- Book: "Competing Against Luck" by Clayton Christensen
- Template: See user story framework below (combines JTBD)
- Examples from MMP clients: [Document real JTBD from client conversations]

**Pro Tips:**
- Clients know their problems, not solutions (listen for the "job")
- Look for patterns across multiple clients (same job = high reach)
- Don't dismiss feature requests, dig deeper for the job

---

### 3. ICE Score (Quick Prioritization)

**What:** Simplified scoring for quick decisions (faster than RICE)

**When to use:**
- Small features or bug fixes
- Quick decisions (don't need full RICE analysis)
- Early-stage backlog grooming
- When you don't have data for Reach

**Formula:**
```
ICE Score = (Impact + Confidence + Ease) / 3
```

**Components** (each rated 1-10):
- **Impact:** How much value does this create?
- **Confidence:** How sure are we about the impact?
- **Ease:** How easy is this to build? (inverse of effort)

**Example:**
```
Feature: Add "Archive" button to contacts
Impact: 6/10 (nice to have, reduces clutter)
Confidence: 9/10 (pretty sure this helps)
Ease: 9/10 (very easy, <1 day)

ICE = (6 + 9 + 9) / 3 = 8/10 (Do it!)
```

**RICE vs. ICE:**
- **RICE:** More accurate, data-driven, takes time
- **ICE:** Faster, gut-based, good enough for small items

**Resources:**
- [ICE Calculator Template](https://docs.google.com/spreadsheets/d/your-ice-template)

**Pro Tips:**
- Use ICE for <1 week features
- Use RICE for >1 week features
- ICE is subjective (use team average, not just your score)

---

### 4. Kano Model (Feature Classification)

**What:** Classifies features by their impact on customer satisfaction

**When to use:**
- Roadmap planning (balance must-haves vs. delighters)
- Understanding feature types (not all features are equal)
- Explaining why some features matter more than others

**Categories:**

#### 🏗️ Basic Features (Must-Haves)
**Definition:** Expected by customers, dissatisfaction if missing, no excitement when present

**Examples:**
- Login/logout functionality
- Data security (encryption, backups)
- Basic reporting (clients expect this)
- Email delivery (it must work)

**Impact on satisfaction:**
- Present: Neutral (expected)
- Absent: High dissatisfaction

#### 📈 Performance Features (Differentiators)
**Definition:** More is better, linear relationship with satisfaction

**Examples:**
- Email sending speed (faster = better)
- Contact list size limits (higher = better)
- Number of integrations (more = better)
- Reporting detail (more data = better)

**Impact on satisfaction:**
- More = More satisfied
- Less = Less satisfied

#### ✨ Delight Features (Wow Factors)
**Definition:** Unexpected, create excitement, differentiate from competitors

**Examples:**
- AI-powered email subject line suggestions
- Beautiful email templates (when competitors have plain text)
- Predictive analytics ("This campaign will likely succeed")
- Personalized onboarding (feels custom)

**Impact on satisfaction:**
- Present: High excitement
- Absent: Neutral (they didn't expect it)

**How to apply at MMP:**

**Roadmap balance:**
- **70%** Performance features (improve core value prop)
- **20%** Delight features (wow factor, competitive edge)
- **10%** Basic features (fixing gaps, table stakes)

**Prioritization insight:**
- Basic features = Must fix (high priority if missing)
- Performance features = Improve over time (RICE score them)
- Delight features = Strategic bets (when you have capacity)

**Resources:**
- [Kano Model Diagram](https://www.google.com/search?q=kano+model+diagram)
- Examples: Document which MMP features fall into each category

**Pro Tips:**
- Don't neglect basic features (boring but necessary)
- Delight features become performance features over time (email templates)
- Ask clients: "What surprised you?" (reveals delighters)

---

### 5. OKRs (Objectives & Key Results) (Goal Setting)

**What:** Goal-setting framework for quarterly planning

**When to use:**
- Quarterly planning (set direction for next 3 months)
- Aligning team on priorities
- Measuring success beyond just "shipping features"
- Communicating strategy to stakeholders

**Format:**
```
Objective: [Qualitative, inspirational goal]

Key Results: [3-5 measurable outcomes that show you achieved the objective]
```

**Example:**

```
Objective: Improve client retention

Key Results:
- KR1: Reduce churn from 5% to 3% (measurement: monthly churn rate)
- KR2: Increase feature adoption by 40% (measurement: % of clients using 3+ features)
- KR3: Achieve NPS score >50 (measurement: quarterly NPS survey)
```

**Good vs. Bad OKRs:**

**Bad Objective:** "Ship 10 features"
- Too tactical (focuses on output, not outcome)
- Doesn't explain why

**Good Objective:** "Become the easiest-to-use marketing platform"
- Inspirational and clear
- Outcome-focused

**Bad Key Result:** "Build email templates"
- Output, not outcome
- Doesn't measure success

**Good Key Result:** "80% of clients use email templates within 30 days of release"
- Measurable outcome
- Shows adoption, not just existence

**How to set OKRs at MMP:**

**Quarterly Cadence:**
- Last week of quarter: Review current OKRs, set new ones
- Quarters: Q1 (Jan-Mar), Q2 (Apr-Jun), Q3 (Jul-Sep), Q4 (Oct-Dec)

**OKR Levels:**
- **Company OKRs:** Founder sets (high-level business goals)
- **Product OKRs:** PM sets (support company OKRs)
- **Feature OKRs:** Optional (for large initiatives)

**Example MMP OKRs (Product):**

**Q1 2026:**
```
Objective: Increase client satisfaction and feature usage

KR1: Improve NPS from 40 to 55 (survey)
KR2: Increase DAU/MAU ratio from 30% to 50% (analytics)
KR3: Launch 3 client-requested features with >50% adoption in 30 days
```

**Resources:**
- Book: "Measure What Matters" by John Doerr
- [OKR Template](https://docs.google.com/document/d/your-okr-template)
- Past quarters: [Document historical OKRs and results]

**Pro Tips:**
- 3-5 key results per objective (more = diluted focus)
- Key results should be measurable (numbers, not "improve" or "better")
- Aim for 70% achievement (if you hit 100%, you aimed too low)
- Review weekly (are we on track?)

---

## User Story Framework

User stories help translate feature requests into actionable development tasks.

### Format

```
As a [user type],
I want to [action/feature],
So that [benefit/value].
```

**Combines with JTBD:**
- "As a [who]" → user type
- "I want to [what]" → motivation/feature
- "So that [why]" → expected outcome (the job)

### Acceptance Criteria

Define "done" using **Given/When/Then** format:

```
Given [context/precondition],
When [action/trigger],
Then [expected result].
```

### Full Example

**User Story:**
```
As an account manager,
I want to bulk import contacts from a CSV file,
So that I can quickly onboard new clients without manual data entry.
```

**Acceptance Criteria:**
```
1. Given I have a CSV file with contact data,
   When I upload it through the Contacts page,
   Then all valid contacts are imported and invalid rows show error messages.

2. Given the import completes successfully,
   When I view my contact list,
   Then I see all newly imported contacts with correct data (name, email, phone).

3. Given the CSV has duplicate emails,
   When I upload it,
   Then the system skips duplicates and notifies me of the count.

4. Given the CSV has invalid data (missing required fields),
   When I upload it,
   Then the system shows a list of errors with row numbers so I can fix them.
```

### Tips for Writing Good User Stories

**Do:**
- Focus on the user's perspective (not the system's)
- Explain the "why" (benefit) clearly
- Keep acceptance criteria specific and testable
- Include edge cases (empty states, errors, limits)

**Don't:**
- Write technical implementation details ("Use React hooks")
- Make it too broad ("As a user, I want the app to work better")
- Forget the "so that" (always explain the value)

### Linear Template

Create this template in Linear for user stories:

```markdown
## User Story

**As a** [user type],
**I want to** [action/feature],
**So that** [benefit/value].

### Acceptance Criteria

- [ ] Given [context], when [action], then [result]
- [ ] Given [context], when [action], then [result]
- [ ] Given [context], when [action], then [result]

### Design/Mockups
[Attach screenshots or Figma links]

### Technical Notes
[Database changes, API endpoints, dependencies]

### Effort Estimate
[Person-weeks]
```

---

## Feature Voting & Roadmap Tools

### Current Tools

**Linear** (Already in use)
- Issue tracking and sprint planning
- Feature request label
- Roadmap view
- RICE scoring custom fields

**Configuration:**
- Labels: `feature-request`, `bug`, `priority-high`, `client-requested`, `revenue-impact`
- Workflows: Backlog → Triage → Planned → In Development → QA → Released
- Issue templates: Feature request template (see [Feature Request Process](/mmp-docs/product-management/feature-request-process/))

### Recommended Additions

#### Public Feature Voting (Free Options)

We want clients to vote on features and see our roadmap. Free tier options:

**Option 1: Canny (Free Tier)** ⭐ Recommended
- **Pros:**
  - Up to 100 voters, unlimited ideas
  - Public roadmap built-in
  - Upvoting + commenting
  - Integration with Linear (sync feature requests)
  - Professional appearance
- **Cons:**
  - Branding (Canny logo on free tier)
  - Limited customization
- **Setup:** [canny.io](https://canny.io) → Create board → Share URL with clients
- **Pricing:** Free tier, $50/mo for branded + more voters

**Option 2: FeedBear (Free Tier)**
- **Pros:**
  - Basic voting, public board
  - Simple and clean
- **Cons:**
  - Limited features on free tier
  - Less integration options
- **Setup:** [feedbear.com](https://feedbear.com)

**Option 3: Fider (Self-Hosted, Free)**
- **Pros:**
  - Open-source, full control
  - No limitations (unlimited voters)
  - Can customize fully
- **Cons:**
  - Requires hosting (server setup)
  - Maintenance overhead
- **Setup:** [fider.io](https://fider.io) → Deploy on your server

**Option 4: GitHub Discussions (Free)**
- **Pros:**
  - Free, native voting (upvote emoji)
  - If already using GitHub
- **Cons:**
  - Not as polished as Canny
  - Requires GitHub account to vote
- **Setup:** Enable Discussions in your GitHub repo

**Recommendation:** Start with **Canny free tier** → Evaluate after 3 months → Upgrade if needed

#### Public Roadmap Display

**Option 1: Canny Roadmap** ⭐ Recommended
- Built-in public roadmap (shows Now/Next/Later)
- Updates automatically when features move
- Clients see progress

**Option 2: Linear Roadmap (Public View)**
- Linear has roadmap feature
- Can share publicly (read-only link)
- Synced with your actual work

**Option 3: Custom Roadmap Page on mmp-docs**
- Build simple roadmap page in your docs
- Full control over design
- Manual updates (more work)

**Option 4: Notion Public Page**
- Free, easy to set up
- Looks professional
- Manual updates

**Recommendation:** **Canny public roadmap** (if using Canny) OR **Linear public roadmap** for transparency

---

## Communication Templates

### Feature Request Acknowledgment

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

### Feature Approved (High Priority)

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

### Feature Declined (with Empathy)

```
Hi [Name],

We've evaluated [Feature Name] and unfortunately it won't make our roadmap in the next quarter.

Why: [Brief, honest reason - doesn't fit strategy, low ROI, technical limitations]

Alternative: [Suggest workaround or similar feature if available]

We'll revisit this in our quarterly planning (next: [month]). Appreciate your understanding!

Questions or want to discuss further? Happy to chat.

[Your Name]
```

### Release Announcement

```
Subject: 🎉 New Feature: [Feature Name]

Hi [Client Name],

We just launched [Feature Name]! Here's what it does:

[2-3 sentences explaining the feature and benefit]

How to use it:
1. [Step 1]
2. [Step 2]
3. [Step 3]

[Screenshot or video]

Questions or feedback? We'd love to hear from you.

Thanks,
[Your Name]
```

### Weekly Stakeholder Update

```
Subject: Product Update - Week of [Date]

Hi team,

Here's what's happening in product this week:

**Shipped Last Week:**
- [Feature 1] - [1 sentence impact]
- [Feature 2] - [1 sentence impact]

**Shipping This Week:**
- [Feature 3] - In QA, releasing [day]
- [Feature 4] - Founder review scheduled

**Roadmap Updates:**
- [New addition]: [Feature X] added to Now (revenue-impacting)
- [Delay]: [Feature Y] moved to Next (dependency on Z)

**Feature Requests This Week:**
- 3 new requests logged
- 2 approved (RICE >10)
- 1 parking lot

**Metrics Snapshot:**
- DAU/MAU: [X]%
- NPS: [Y]
- Feature adoption: [Z]%

Blockers: [None | List any]

Questions? Let's discuss in Monday sync.

[Your Name]
```

---

## PM Learning Resources

### Books

**Essential:**
- **"Inspired"** by Marty Cagan (product management bible)
- **"The Lean Product Playbook"** by Dan Olsen (practical frameworks)
- **"Competing Against Luck"** by Clayton Christensen (Jobs-to-be-Done)

**Advanced:**
- **"Continuous Discovery Habits"** by Teresa Torres (user research)
- **"Measure What Matters"** by John Doerr (OKRs)

### Online Courses

- **Reforge:** Product Strategy, Growth, Retention courses ($2k+, high quality)
- **Product School:** PM certification programs ($1-3k)
- **Coursera:** "Digital Product Management" by UVA (free audit)

### Communities

- **Product Hunt:** Discover new products, see what's launching
- **Mind the Product:** PM community, conferences, articles
- **Lenny's Newsletter:** Product management insights (Substack)
- **Product Coalition (Medium):** PM articles and case studies

### Blogs & Newsletters

- **Lenny's Newsletter:** PM best practices, interviews
- **Stratechery:** Tech strategy analysis
- **First Round Review:** Startup/product articles
- **Silicon Valley Product Group (SVPG):** Marty Cagan's blog

### Tools to Research (Future)

- **ProductPlan:** Roadmap planning software
- **Aha!:** Product management suite (roadmaps, ideas, strategy)
- **Roadmunk:** Roadmap visualization tool
- **Amplitude:** Product analytics (deeper than Google Analytics)
- **Pendo:** Product analytics + in-app guidance

---

## Quick Reference

| Framework | Use Case | Time Investment |
|-----------|----------|-----------------|
| **RICE** | Prioritizing features objectively | 10-15 min per feature |
| **JTBD** | Understanding user problems | Ongoing (interviews, discovery) |
| **ICE** | Quick prioritization | 2-3 min per feature |
| **Kano** | Feature classification | Roadmap planning (quarterly) |
| **OKRs** | Quarterly goal setting | 2-3 hours per quarter |

---

**Last Updated**: February 2026
**Owner**: Product Manager
**Review Cadence**: Quarterly
