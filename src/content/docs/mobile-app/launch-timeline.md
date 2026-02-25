---
title: Launch Timeline
description: Sprint-by-sprint timeline for launching the MMP mobile app on Google Play and the App Store
---

This document outlines the phased plan for getting the My Marketing Pro mobile app to 100% and launched on both the Google Play Store and Apple App Store. The timeline follows our [Development Workflow](/mmp-docs/product-management/development-workflow/) and accounts for the full internal review process before public release.

## Timeline Summary

| Phase | What | Duration | Dependencies |
|-------|------|----------|-------------|
| **Phase 0** | Planning & Audit | 1 week | None |
| **Phase 1** | Web App Responsive Cleanup | 6-8 weeks | Phase 0 |
| **Phase 2** | Push Notification Admin Portal | 2-4 weeks | Phase 0 (can overlap Phase 1) |
| **Phase 3** | Programmatic Push Notifications | 2 weeks | Phase 0 definitions (can overlap Phase 2) |
| **Phase 4** | Internal Review & QA | 4-6 weeks | Phases 1-3 complete |
| **Phase 5** | App Store Submission | 2-3 weeks | Phase 4 complete |

---

## Phase 0: Planning & Audit (1 Week)

**Goal:** Understand the full scope before committing to sprint plans.

### Activities

**1. Web App Responsive Audit (2-3 days)**
- Walk through every page/screen in the web app on mobile devices (iPhone, Android)
- Categorize each page:
  - **Green:** Already responsive, looks good on mobile
  - **Yellow:** Partially responsive, needs cleanup (layout shifts, overflow, small text)
  - **Red:** Not responsive, needs significant rework (desktop-only layouts, unusable on mobile)
- Prioritize by usage: which pages do users visit most? Fix those first.
- Output: Responsive audit spreadsheet with page, status, priority, estimated effort

**2. Push Notification Rules Workshop (Half day)**
- Brainstorm session with Product Lead, Dev Lead, R&D Lead
- Define which events trigger notifications and what they say
- See [Push Notification Strategy](/mmp-docs/mobile-app/push-notification-strategy/) for the full list of rules to define
- Output: Documented notification rules ready for dev briefs

**3. Dev Briefs & Sprint Planning (2-3 days)**
- Write [dev briefs](/mmp-docs/product-management/development-workflow/#dev-briefs) for each workstream
- Technical discovery with Dev Lead for effort estimates
- Plan sprint allocation based on team size
- Output: Sprint backlog ready for Sprint 1 planning

**4. Founder Alignment (30 minutes)**
- Present the audit findings and proposed timeline to R&D Lead
- Get decisions on: team allocation, push portal location, launch priority
- Output: Approved plan and team allocation

---

## Phase 1: Web App Responsive Cleanup (6-8 Weeks / 3-4 Sprints)

**Goal:** Make the web app fully mobile-first and responsive so it looks and works great inside the mobile app's WebView.

This is the **critical path** — the mobile app can't launch until the web app looks good on mobile.

### Sprint 1-2: Core Pages (4 weeks)

Focus on the highest-traffic, most-critical pages first:

**Priority 1 — Navigation & Layout:**
- Global navigation (header, sidebar, menu) must work on mobile
- Page layout containers must be responsive (no horizontal scroll)
- Touch-friendly tap targets (minimum 44px)

**Priority 2 — Core Workflows:**
- Dashboard / Feed (`/platform/feed.php`)
- Login and authentication screens
- Contact management
- Email campaign creation and management
- Reporting and analytics views

**Priority 3 — Forms & Inputs:**
- All forms usable on mobile (proper input sizing, keyboard handling)
- Modal dialogs and popups fit mobile viewports
- File uploads work on mobile browsers

**Per sprint:**
- Dev team implements responsive fixes per dev briefs
- Feature branches with PR review per [Development Workflow](/mmp-docs/product-management/development-workflow/#pull-request-workflow)
- Product Lead tests on actual mobile devices throughout (not just browser DevTools)
- Bug fixes within same sprint where possible

### Sprint 3-4: Remaining Pages & Polish (4 weeks)

- Fix remaining Yellow/Red pages from the audit
- Cross-device testing (various iPhone sizes, Android phones, tablets)
- Edge cases: landscape orientation, split-screen, dynamic text sizing
- Performance optimization for mobile (image sizes, lazy loading)
- Final polish pass: consistent spacing, font sizes, touch interactions

### Acceptance Criteria for Phase 1

- [ ] Every page in the web app is usable on a 375px-wide screen (iPhone SE)
- [ ] No horizontal scrolling on any page
- [ ] All tap targets are minimum 44px
- [ ] Forms are fully functional on mobile keyboards
- [ ] Navigation is intuitive on mobile (hamburger menu, back button)
- [ ] Page load times acceptable on 4G connection (< 3 seconds)
- [ ] Tested on: iPhone (Safari), Android phone (Chrome), iPad (Safari)

---

## Phase 2: Push Notification Admin Portal (2-4 Weeks / 1-2 Sprints)

**Goal:** Build a user-friendly interface for non-developer admin users to send push notifications.

**Can overlap with Phase 1** if 2+ developers are available.

### What to Build

**Ad Hoc Notification Sending:**
- Send to all users (via FCM `all_users` topic)
- Send to a group of users (by segment: plan type, activity level, signup date, etc.)
- Send to individual users (by user ID or email lookup)
- Compose notification: title, body, optional deep link URL, optional image
- Preview notification before sending
- Schedule for future delivery (nice-to-have, not required for launch)

**Notification History:**
- Log of all sent notifications (who sent, when, to whom, content)
- Basic delivery metrics (sent count, open rate if available from FCM)

### Portal Location Options

See [Push Notification Strategy](/mmp-docs/mobile-app/push-notification-strategy/) for detailed comparison. Decision needed from R&D Lead:

**Option A: Within Existing Admin Panel**
- Add a "Push Notifications" section to the MMP admin area
- Pros: No new infrastructure, users already familiar with admin
- Cons: Goes down if main app goes down

**Option B: Standalone Tool**
- Separate lightweight app on independent infrastructure
- Pros: Independent uptime, aligns with [tooling resilience](/mmp-docs/product-management/team-structure-resources/#internal-tooling-resilience) plan
- Cons: More setup, separate login/auth

### Acceptance Criteria for Phase 2

- [ ] Non-developer admin can compose and send a push notification without Firebase console access
- [ ] Notifications can target: all users, a defined segment, or a specific user
- [ ] Sent notification appears on both iOS and Android devices
- [ ] Notification history is viewable with send details
- [ ] At least one admin besides the dev team can use it successfully (usability validation)

---

## Phase 3: Programmatic Push Notifications (2 Weeks / 1 Sprint)

**Goal:** Implement automated push notifications triggered by backend events.

**Can overlap with Phase 2 tail end.**

### Implementation

- Backend code triggers FCM sends based on defined rules
- Rules are defined during Phase 0 workshop (see [Push Notification Strategy](/mmp-docs/mobile-app/push-notification-strategy/#programmatic-notification-rules))
- Each rule needs: trigger event, delay (if any), notification content, target audience, frequency cap

### Acceptance Criteria for Phase 3

- [ ] Each defined notification rule is implemented and tested
- [ ] Notifications fire correctly when trigger conditions are met
- [ ] Users can opt out of specific notification types (in-app settings, future enhancement)
- [ ] No duplicate notifications sent for the same event
- [ ] Notification content matches the approved copy from Phase 0 definitions

---

## Phase 4: Internal Review & QA (4-6 Weeks / 2-3 Sprints)

**Goal:** Thorough internal review before public release. This follows our [Release Process](/mmp-docs/product-management/release-process/) but is expanded for a full app launch.

This is where we ensure quality. The boss specifically requested multiple rounds of end-user QA before the app goes public.

### Sprint 1: Founder Review + QA Round 1 (2 weeks)

**Founder 1:1 Review (Day 1-2)**
- Product Lead demos the complete app experience to R&D Lead
- Walk through: onboarding → login → all core workflows → push notifications → settings
- Review on actual devices (not simulator)
- Capture feedback, approve or request changes
- Per [Release Process - Founder Review](/mmp-docs/product-management/release-process/#stage-1-founder-review-11)

**QA Round 1 (Day 3-10)**
- Full app testing per [Release Process QA checklist](/mmp-docs/product-management/release-process/#stage-2-qa-process)
- Test matrix:

| Area | What to Test |
|------|-------------|
| **Responsive** | Every page on iPhone SE, iPhone 15, Pixel 7, iPad |
| **Authentication** | Email login, Google OAuth, Facebook OAuth, LinkedIn OAuth, Apple Sign-in, session persistence, logout |
| **Push Notifications** | Foreground, background, app-closed, tap-to-open, deep links, admin portal sends |
| **Onboarding** | Full flow, permission prompts, skip behavior |
| **Offline** | Offline banner, reconnection behavior, no data loss |
| **Performance** | Page load times, scroll smoothness, memory usage |
| **Navigation** | Back button, deep links, external links open in browser |
| **Edge cases** | Low battery, interrupted network, orientation changes, multitasking |

- Log all bugs in Linear with severity (P0-P3)
- Testers: Product Lead, Client Success Lead, R&D Lead, 1-2 team members

### Sprint 2: Bug Fixes + QA Round 2 (2 weeks)

**Bug Fix Sprint (Week 1)**
- Dev team fixes all P0 and P1 bugs from QA Round 1
- P2 bugs fixed if capacity allows
- P3 bugs documented for post-launch

**QA Round 2 — Regression Testing (Week 2)**
- Verify all P0/P1 fixes
- Regression test: ensure fixes didn't break other functionality
- Focused re-test on areas that had bugs
- New bugs logged and triaged

### Sprint 3: Final Validation (If Needed — 2 weeks)

**Only if significant issues found in QA Round 2.**

- Additional bug fixes
- QA Round 3 (targeted, not full regression)
- Stakeholder validation: Product Lead + R&D Lead final sign-off
- Per [Stakeholder Validation](/mmp-docs/product-management/release-process/#stage-25-stakeholder-validation)

### Exit Criteria for Phase 4

- [ ] Zero P0 bugs
- [ ] Zero P1 bugs (or explicitly accepted by R&D Lead)
- [ ] P2 bugs documented with post-launch fix plan
- [ ] R&D Lead has signed off on the complete app experience
- [ ] Product Lead has signed off on all acceptance criteria from Phases 1-3
- [ ] App tested on minimum 4 real devices (2 iOS, 2 Android)

---

## Phase 5: App Store Submission (2-3 Weeks)

**Goal:** Submit the app to both Google Play and Apple App Store and get approved.

See [App Store Submission](/mmp-docs/mobile-app/app-store-submission/) for the complete checklist.

### Week 1: Asset Preparation

- Capture screenshots on required device sizes (see submission checklist)
- Write store listing copy (app name, short description, full description, what's new)
- Prepare feature graphic (Google Play) and app preview video (optional but recommended)
- Finalize privacy policy and terms of service
- Complete data safety declarations (both stores)
- Content rating questionnaires

### Week 2: Submit & Monitor

- Submit to Google Play Console (review: typically 1-7 days)
- Submit to App Store Connect (review: typically 1-3 days, first app may take longer)
- Monitor for rejection feedback
- Common first-submission issues:
  - Privacy policy not accessible or incomplete
  - Screenshots don't match current app
  - Missing data collection disclosures
  - WebView-only apps may get extra scrutiny from Apple (our onboarding + push notifications + OAuth help differentiate)

### Week 3: Address Feedback (If Needed)

- Fix any rejection issues
- Resubmit with corrections
- Apple and Google re-reviews are typically faster than initial review

### Go-Live

- Once both stores approve, coordinate release timing
- Send deployment communication per [Deployment Communication](/mmp-docs/product-management/testing-deployment-pipeline/#deployment-communication)
- Monitor app store reviews and crash reports for first 48 hours
- Celebrate the launch

---

## Team Capacity Scenarios

The timeline above assumes sequential phases. With more developers, Phases 1-3 can overlap:

### Scenario A: 1 Developer (Umair)

```
Phase 0 ──▶ Phase 1 (8 weeks) ──▶ Phase 2 (4 weeks) ──▶ Phase 3 (2 weeks) ──▶ Phase 4 ──▶ Phase 5
   1 wk            8 weeks               4 weeks             2 weeks          4-6 wks    2-3 wks
```

**Total: ~21-26 weeks (5-6.5 months)**

All development work is sequential. Longest timeline but lowest cost.

### Scenario B: 2 Developers

```
Phase 0 ──▶ Phase 1 (8 weeks)     ──▶ Phase 4 ──▶ Phase 5
   1 wk     Phase 2 (4 weeks, starts Sprint 2)
             Phase 3 (2 weeks, after Phase 2)
```

**Total: ~15-20 weeks (4-5 months)**

Dev 1 focuses on responsive cleanup. Dev 2 starts push notification portal in Sprint 2, then programmatic notifications. Phases overlap by ~4 weeks.

### Scenario C: 3 Developers

```
Phase 0 ──▶ Phase 1 (6 weeks, faster with 2 devs) ──▶ Phase 4 ──▶ Phase 5
   1 wk     Phase 2 (3 weeks, 1 dedicated dev)
             Phase 3 (2 weeks, after Phase 2)
```

**Total: ~13-17 weeks (3-4 months)**

Two devs on responsive cleanup (faster), one dev on push notifications. Maximum parallelization. Phase 4 and 5 don't compress — they're process-bound.

### Comparison

| | Scenario A (1 dev) | Scenario B (2 devs) | Scenario C (3 devs) |
|---|---|---|---|
| **Development (Phases 1-3)** | 14 weeks | 10 weeks | 8 weeks |
| **Internal Review (Phase 4)** | 4-6 weeks | 4-6 weeks | 4-6 weeks |
| **App Store (Phase 5)** | 2-3 weeks | 2-3 weeks | 2-3 weeks |
| **Total** | 21-26 weeks | 15-20 weeks | 13-17 weeks |
| **Estimated Launch** | ~5-6.5 months | ~4-5 months | ~3-4 months |

**Recommendation:** Scenario B (2 developers) provides the best balance of timeline and cost. The responsive cleanup benefits from dedicated focus, while push notification work can run in parallel without blocking.

---

## Risk Factors

| Risk | Impact | Mitigation |
|------|--------|------------|
| Web app responsive work is larger than estimated | Timeline extends by 2-4 weeks | Phase 0 audit will surface the true scope before committing |
| Apple rejects WebView-only app | 1-2 week delay | Our native features (onboarding, push notifications, OAuth) differentiate from a bare wrapper |
| Push notification rules take too long to define | Phase 3 delayed | Timebox the Phase 0 workshop; start with the 3-4 most obvious rules, add more post-launch |
| QA reveals significant bugs | Phase 4 extends by 1-2 sprints | Budget for 3 QA sprints; if only 2 needed, we launch faster |
| Team availability disrupted (PTO, other priorities) | Sprints slip | 70/20/10 capacity rule + explicit on-call rotation already accounts for interruptions |

---

## Quick Reference

| Milestone | Depends On | Estimated Date (from start) |
|-----------|------------|----------------------------|
| Phase 0 complete | Project kickoff | Week 1 |
| Responsive audit done | Phase 0 | Week 1 |
| Core pages responsive | Phase 1 Sprint 2 | Week 5 |
| All pages responsive | Phase 1 complete | Week 9 |
| Push portal usable | Phase 2 complete | Week 7-11 (depends on team) |
| Programmatic notifications live | Phase 3 complete | Week 9-13 |
| Founder sign-off | Phase 4 QA Round 1 | Week 11-15 |
| QA complete | Phase 4 complete | Week 13-19 |
| App store approval | Phase 5 complete | Week 15-22 |

*Dates shown for Scenario B (2 developers). Adjust +/- 4 weeks for Scenarios A or C.*

---

**Last Updated**: February 2026
**Owner**: Product Lead
**Review Cadence**: Weekly during active development
