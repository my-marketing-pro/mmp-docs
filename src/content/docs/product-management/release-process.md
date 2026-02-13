---
title: Release Process
description: Our 3-stage release workflow - Founder Review, QA, and Client Release
---

This document outlines our 3-stage release process: **Founder Review → QA → Client Release**. This ensures quality, alignment with requirements, and smooth deployments.

## Release Philosophy

###Principles

**1. Rolling Releases (No Fixed Schedule)**
- We ship when features are ready, not on a calendar
- Allows us to iterate quickly and respond to urgent needs
- Reduces pressure to "push buggy code by Friday"

**2. Feature Flags for Gradual Rollout** (Future Goal)
- Ability to turn features on/off without redeploying
- Test with subset of users before full release
- Quick rollback if issues arise

**3. Quality Over Speed (But Fast Iteration)**
- 3-stage process prevents shipping broken features
- Better to delay 1 day for QA than rollback in production
- "Slow is smooth, smooth is fast"

**4. Clear Rollback Plans**
- Every release needs a rollback strategy
- Database migrations must be reversible
- Monitor for 24 hours post-release

## Stage 1: Founder Review (1:1)

### When

Feature development is **complete** and **dev-tested** in staging environment.

**Prerequisites:**
- [ ] Feature works in staging
- [ ] Happy path tested by developer
- [ ] Known edge cases documented
- [ ] Basic cross-browser testing done (Chrome, Safari)

### Format

**1:1 demo with founder** (in-person or screen share)

**Duration:** 15-30 minutes (depending on feature complexity)

**Preparation:**
- Have staging environment ready to demo
- Prepare test data (realistic scenarios)
- Document any known issues or limitations
- Bring the original feature request for context

### Review Checklist

The PM presents and founder evaluates:

- [ ] **Feature works as intended**
  - Matches original request
  - Happy path flows smoothly
  - No obvious bugs or glitches

- [ ] **Aligns with original request**
  - Solves the problem it was supposed to solve
  - Doesn't add unnecessary scope
  - Requester would be satisfied

- [ ] **UI/UX meets standards**
  - Intuitive to use (no training needed)
  - Consistent with existing design patterns
  - Mobile-friendly (if applicable)
  - Accessible (keyboard navigation, labels)

- [ ] **Edge cases considered**
  - What happens with no data?
  - What happens with too much data?
  - Error states handled gracefully
  - Permissions and access control correct

- [ ] **Performance acceptable**
  - No noticeable slowdowns
  - Queries optimized
  - Page loads in <3 seconds

### Outcomes

**✅ Approve → Move to QA**
- Feature meets all criteria
- Ready for team testing
- Document any minor polish items (do in parallel with QA)

**⚠️ Minor Changes → Fix and Re-Review**
- Small issues found (copy changes, style tweaks, edge case bugs)
- Dev fixes in 1-2 hours
- Quick async re-review (screenshots/video, no meeting needed)

**❌ Major Issues → Back to Development**
- Significant bugs, wrong approach, or scope mismatch
- Requires re-work (days, not hours)
- Schedule another founder review when ready

### Documentation

**Capture the review:**
- **Loom video:** Record the demo (async reference for team)
- **Screenshots:** Key screens and flows
- **Notes:** Founder feedback, approved changes, concerns

**Why document?**
- Team can reference what was approved
- Future retrospectives ("What did we learn?")
- Onboarding new team members

## Stage 2: QA Process

### Team

**PM + 1-2 rotating team members**

**Why rotating?**
- Spreads product knowledge across team
- Fresh eyes catch different bugs
- Builds empathy (team sees features before clients)

**Who rotates:**
- Account manager (tests from client perspective)
- Developer not involved in building this feature
- Sales team member (tests for demos)
- Founder (if they want to stay involved)

### Environment

**Staging Environment** (clone of production)

**Why not production?**
- Catch bugs before clients see them
- Test destructive actions safely
- Realistic data without risk

**Staging should mirror production:**
- Same database schema
- Same third-party integrations
- Same server configuration

### QA Checklist

**Duration:** 1-2 days (depending on bugs found)

#### ✅ Functional Testing (Happy Path)

- [ ] Follow the intended user flow start to finish
- [ ] All buttons and links work
- [ ] Forms submit correctly
- [ ] Data saves and persists
- [ ] Success messages appear
- [ ] Feature works as demoed to founder

**Test with realistic scenarios:**
- Real client names (anonymized)
- Typical data volumes
- Common workflows

#### ✅ Edge Case Testing

- [ ] **Empty states:** What if no data exists?
- [ ] **Maximum inputs:** What if someone enters 10,000 characters?
- [ ] **Special characters:** Names with apostrophes, emails with +
- [ ] **Permissions:** Can unauthorized users access this?
- [ ] **Concurrent users:** What if two people edit the same record?
- [ ] **Network issues:** What if API call fails or times out?

#### ✅ Cross-Browser Testing

Test in these browsers:
- [ ] **Chrome** (latest - most common)
- [ ] **Safari** (latest - Mac users)
- [ ] **Firefox** (latest - diversity check)
- [ ] **Mobile Safari** (iPhone - mobile check)

**Don't need to test:**
- Old browser versions (focus on latest)
- Internet Explorer (unless client explicitly uses it)

#### ✅ Mobile Responsiveness

- [ ] Layout adapts to small screens (< 768px width)
- [ ] Buttons large enough to tap (44px min)
- [ ] Text readable without zooming
- [ ] Forms easy to fill on mobile
- [ ] No horizontal scrolling

**Test on:**
- [ ] iPhone (Safari)
- [ ] Android phone (Chrome) if available

#### ✅ Performance Testing

- [ ] **Page load time:** <3 seconds on decent connection
- [ ] **Database queries:** Check for N+1 queries, missing indexes
- [ ] **File uploads:** Don't timeout or max out memory
- [ ] **Large datasets:** Pagination works, doesn't load 10,000 records

**Tools:**
- Browser DevTools Network tab
- Database query log
- Chrome Lighthouse audit

#### ✅ Accessibility Basics

- [ ] **Keyboard navigation:** Can you tab through and use Enter/Space?
- [ ] **Focus indicators:** Clear outline on focused elements
- [ ] **Form labels:** All inputs have associated labels
- [ ] **Alt text:** Images have descriptive alt text
- [ ] **Color contrast:** Text readable (4.5:1 ratio for body text)

**Quick test:**
- Unplug your mouse, navigate with keyboard only
- Use browser's "Inspect accessibility" tool

#### ✅ Data Integrity

- [ ] **No data loss:** Edits save correctly, nothing disappears
- [ ] **Validation works:** Invalid data rejected with clear messages
- [ ] **Relationships maintained:** Foreign keys, cascading deletes work
- [ ] **Audit trail:** Changes logged if needed (who/when/what)

#### ✅ Rollback Plan Tested

- [ ] Document how to rollback this feature
- [ ] Test rollback in staging (if high risk)
- [ ] Ensure database migrations are reversible
- [ ] Know how to quickly disable feature flag (future)

### Bug Reporting

**Tool:** Linear issues

**Create linked issues for bugs:**
- Link to original feature request
- Label: `qa-bug`, severity (`critical`/`major`/`minor`)
- Assign to developer
- Include reproduction steps + screenshots

**Severity Definitions:**
- **Critical:** Blocks core functionality, data loss, security issue → Must fix before release
- **Major:** Feature partially broken, bad UX, affects many users → Fix before release
- **Minor:** Edge case, cosmetic issue, affects few users → Fix after release or accept

### Sign-Off

**PM approves when:**
- All **critical bugs** fixed
- All **major bugs** fixed OR explicitly accepted (founder approval)
- Minor bugs documented (fix post-release)

**PM communicates:**
- "✅ QA approved, ready for release"
- List of known minor issues (if any)
- Estimated release date/time

## Stage 3: Client Release

### Pre-Deployment Checklist

Before hitting deploy:

- [ ] **Code review complete**
  - At least 1 other developer reviewed
  - No "FIXME" or "TODO" comments left

- [ ] **Database migrations ready**
  - Migrations tested in staging
  - Reversible (can rollback)
  - No data loss

- [ ] **Environment variables set**
  - API keys, secrets configured
  - Same in staging and production

- [ ] **Dependency updates safe**
  - No breaking changes in package updates
  - Lock file updated

### Deployment

**Process:** (Adapt to your specific deployment workflow)

1. **Merge to main branch**
   - Squash commits for clean history
   - Write clear merge commit message
   - Reference Linear issue (e.g., "Fixes ABC-123")

2. **Deploy to production**
   - Follow [Deployment Workflow](/mmp-docs/workflows/deployment/)
   - Run database migrations if needed
   - Clear caches if needed

3. **Smoke test post-deployment** (5-10 minutes)
   - Test the happy path in production
   - Verify database migrations ran successfully
   - Check error logs (no new errors)
   - Test login/critical paths (payments, emails, etc.)

4. **Monitor for 30 minutes**
   - Watch error tracking dashboard
   - Check server resource usage
   - Monitor customer support channels
   - Be ready to rollback if critical issues

### Communication

#### Release Notes to Team

**When:** Immediately after deployment

**Where:** Slack/Google Chat + Email (for significant releases)

**Format:**

```markdown
🎉 Released: [Feature Name]

What's new:
- [Feature description in 1-2 sentences]
- [Benefit to clients/users]

How to use: [Link to docs or video]

Known issues: [If any minor bugs]

Questions? Reach out to PM.
```

#### Client Announcement (If Significant)

**When to announce:**
- Major feature (changes workflow, adds significant value)
- Client-requested (they're waiting for it)
- Competitive advantage (market differentiator)

**When NOT to announce:**
- Internal tools
- Bug fixes (unless critical issue)
- Minor improvements (batch these in monthly updates)

**Format:**

```markdown
Subject: New Feature: [Feature Name] 🚀

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

#### Sales Team Briefing (If Impacts Demos)

**When:** Before client announcement (give them a heads-up)

**Include:**
- What changed
- How to demo it (talking points)
- Competitive advantage (why this matters)
- Link to docs

#### Documentation Update

- [ ] Update internal docs (if process changed)
- [ ] Update client-facing docs (help articles)
- [ ] Record demo video (Loom)
- [ ] Update marketing site (if public feature)

### Monitoring (First 24 Hours)

**What to monitor:**

**1. Error Tracking**
- Check error dashboard (Sentry, Rollbar, logs)
- Look for new error patterns
- Investigate any spike in errors

**2. User Feedback**
- Google Chat mentions
- Support tickets related to new feature
- Direct feedback from clients

**3. Performance Metrics**
- Server CPU/memory usage
- Database query performance
- Page load times
- API response times

**4. Feature Adoption**
- How many users tried the feature? (analytics)
- Are they using it correctly?
- Any confused user behavior?

**Rollback Criteria:**

**Immediate rollback if:**
- Critical bug (data loss, security issue, breaks core flow)
- Severe performance degradation (site slows to crawl)
- Error rate spike >5x baseline

**Rollback Process:**
1. Notify founder immediately
2. Revert to previous version (git revert + deploy)
3. Reverse database migrations if needed
4. Communicate to team (and clients if affected)
5. Schedule retrospective ("What went wrong?")

## Hotfix Process

**When:** Critical bug in production that can't wait for full 3-stage process

**Definition of "critical":**
- Core functionality broken (login, payments, emails)
- Data loss or corruption
- Security vulnerability
- Major client blocker (revenue impact)

### Hotfix Workflow

**Stages 1-2 Skipped** (Founder + QA) → Straight to production

**Modified Process:**
1. **Identify + notify founder** (immediately)
2. **Fix in isolated branch** (hotfix/[bug-name])
3. **Quick testing** (dev tests happy path in staging)
4. **Deploy to production** (within hours, not days)
5. **Monitor closely** (next 2 hours)
6. **Retrospective scheduled** (within 24 hours)

**Documentation:**
- Log what broke, why, and how we fixed it
- Update processes to prevent recurrence
- Communicate to team (transparency)

## Release Notes Template

Use this template for all significant releases:

```markdown
## [Feature Name] - Released [Date]

### What's New

[2-3 sentences describing the feature]

**Benefits:**
- [Benefit 1: saves time, reduces errors, etc.]
- [Benefit 2: improves workflow, adds capability]

### How to Use

1. [Step-by-step instructions]
2. [With screenshots or video]
3. [Link to full documentation]

**Video Demo:** [Link to Loom video]

### Technical Details

_(For internal team)_

**Changes Made:**
- [Database migrations, new tables, etc.]
- [API endpoints added/modified]
- [Third-party integrations]

**Performance Impact:**
- [Page load time, query performance]
- [Expected server load]

**Dependencies:**
- [New packages or services]
- [Configuration changes]

### Known Issues

_(If any)_

- [Minor bug 1 - workaround or fix timeline]
- [Minor bug 2 - accepted as low priority]

### Feedback

We'd love to hear from you! Questions or feedback? Reach out to [PM Name].
```

## Tools & Resources

**Linear:**
- QA bug reports
- Release tracking

**Loom:**
- Demo videos
- Founder review recordings

**Error Tracking:**
- Sentry, Rollbar, or server logs

**Analytics:**
- Feature adoption tracking

**Deployment:**
- See [Deployment Workflow](/mmp-docs/workflows/deployment/)

---

## Quick Reference

| Stage | Duration | Who | Outcome |
|-------|----------|-----|---------|
| **Founder Review** | 15-30 min | PM + Founder | Approve/Minor changes/Major issues |
| **QA** | 1-2 days | PM + 2 team members | All critical bugs fixed |
| **Deployment** | 30 min | Dev team | Feature live in production |
| **Monitoring** | 24 hours | PM + Dev | No critical issues |

---

**Last Updated**: February 2026
**Owner**: Product Manager
**Review Cadence**: Quarterly
