---
title: Push Notification Strategy
description: Admin portal options, programmatic notification rules, and Firebase setup for the MMP mobile app
---

This document covers the push notification strategy for the MMP mobile app: the current Firebase setup, the admin portal for ad hoc notifications, and the programmatic notification rules that need to be defined with the team.

## Current Setup

The mobile app already has Firebase Cloud Messaging (FCM) fully integrated:

| Component | Status | Details |
|-----------|--------|---------|
| Firebase Core | Integrated | Project: `my-marketing-pro-b13ed` |
| FCM Token Handling | Working | Token retrieved on app init, logged for debugging |
| Topic Subscription | Working | Auto-subscribes to `all_users` topic |
| Foreground Notifications | Working | Local notification shown when app is active |
| Background Notifications | Working | System notification displayed |
| Notification Tap Handling | Stubbed | `onMessageOpenedApp` listener ready, deep link routing to be implemented |
| Permission Handling | Working | Requested during onboarding (final slide) |

**Firebase Config:**
- Sender ID: `713572660880`
- Android config: `google-services.json` (managed via CI/CD secrets)
- iOS config: `GoogleService-Info.plist` (managed via CI/CD secrets)
- Android notification channel: `high_importance_channel` (high priority)
- iOS: Alert, badge, and sound enabled

**What's Missing:**
1. No admin-friendly interface for sending notifications (currently requires Firebase console)
2. No programmatic/automated notifications defined
3. Notification tap → deep link routing not yet connected (stubbed in code)

---

## Ad Hoc Notification Portal

### The Need

The R&D Lead and other non-developer admin users need to send push notifications without accessing the Firebase console. The portal must be intuitive enough that someone without technical knowledge can compose, target, and send a notification in under 2 minutes.

### Required Capabilities

**Compose:**
- Notification title (max 65 characters for display)
- Notification body (max 240 characters for full display)
- Optional: deep link URL (opens specific page when tapped)
- Optional: image URL (rich notification)
- Preview: show how the notification will appear on iOS and Android

**Target Audience:**
- **All users** — Send to the `all_users` FCM topic
- **User segments** — Send to groups based on criteria:
  - Plan type (free, basic, premium, enterprise)
  - Signup date range (e.g., users who joined in the last 30 days)
  - Activity level (active, inactive for X days)
  - Platform (iOS only, Android only, both)
- **Individual users** — Look up by email or user ID, send to their specific FCM token

**Send Options:**
- Send immediately
- Schedule for a specific date/time (nice-to-have for v1, can be added later)

**History & Metrics:**
- Log of all sent notifications with: sender, timestamp, audience, content
- Delivery count (from FCM response)
- Open rate (if trackable via FCM analytics)

### Portal Location: Two Options

**Decision needed from R&D Lead.**

#### Option A: Within Existing Admin Panel

Add a "Push Notifications" section to the MMP web app admin area.

| Aspect | Details |
|--------|---------|
| **Pros** | No new infrastructure; users already logged into admin; shared auth system; faster to build |
| **Cons** | If the main app goes down, push notification portal goes down too; adds complexity to the existing codebase |
| **Effort** | ~2-3 weeks (frontend UI + backend API to FCM) |
| **Infrastructure** | None additional — runs on existing servers |

#### Option B: Standalone Tool

Separate lightweight web app on independent infrastructure.

| Aspect | Details |
|--------|---------|
| **Pros** | Independent uptime (per [tooling resilience plan](/mmp-docs/product-management/team-structure-resources/#internal-tooling-resilience)); clean separation of concerns; can be reused across products |
| **Cons** | Separate auth needed; more infrastructure to manage; slightly longer to build |
| **Effort** | ~3-4 weeks (standalone app + auth + deployment) |
| **Infrastructure** | Requires separate server/container (coordinate with DevOps) |

#### Recommendation

**Start with Option A** for launch speed. The push notification portal is primarily used during business hours for planned communications — if the main app is down, sending marketing notifications is not the top priority anyway. Option B can be revisited post-launch if reliability becomes a concern.

---

## Programmatic Notification Rules

These are automated notifications triggered by backend events. They need to be **defined during the Phase 0 planning workshop** with Product Lead, Dev Lead, and R&D Lead.

### Rules to Define

For each rule, the team should decide: **trigger, delay, content, audience, and frequency cap.**

#### Account Lifecycle

| Rule | Trigger | Suggested Delay | Audience | Status |
|------|---------|----------------|----------|--------|
| Welcome notification | New account created | Immediate | New user | To define |
| Complete your profile | Account created, profile incomplete | 24 hours | Users with incomplete profiles | To define |
| First campaign prompt | Account created, no campaign sent | 3 days | New users who haven't sent a campaign | To define |

#### Engagement & Re-Engagement

| Rule | Trigger | Suggested Delay | Audience | Status |
|------|---------|----------------|----------|--------|
| Inactivity reminder | No app open for X days | After X days (define threshold) | Inactive users | To define |
| Win-back notification | No app open for 30+ days | 30 days | Lapsed users | To define |
| Weekly digest | Scheduled (every Monday) | N/A | All active users | To define |

#### Feature & Product

| Rule | Trigger | Suggested Delay | Audience | Status |
|------|---------|----------------|----------|--------|
| New feature announcement | Feature released | Immediate or scheduled | All users or segment | To define |
| Campaign performance update | Campaign sent, results available | When results ready (e.g., 24 hours after send) | Campaign sender | To define |
| Action required | Pending item needs attention | Immediate | Affected user | To define |

#### System & Operational

| Rule | Trigger | Suggested Delay | Audience | Status |
|------|---------|----------------|----------|--------|
| Scheduled maintenance | Planned downtime | 24 hours before | All users | To define |
| Incident resolved | After outage recovery | Immediate | All users | To define |

### Workshop Template

Use this template during the Phase 0 notification rules workshop:

```markdown
## Notification Rule: [Name]

**Trigger Event**: [What backend event causes this notification?]
**Delay**: [Send immediately? After X hours/days?]
**Target Audience**: [All users? Specific segment? Individual?]
**Frequency Cap**: [Max once per day? Once per week? Once ever?]

**Notification Content:**
- Title: [Max 65 characters]
- Body: [Max 240 characters]
- Deep Link: [URL to open when tapped, or none]

**Priority**: [Must-have for launch | Nice-to-have | Post-launch]

**Opt-Out**: [Can users disable this specific notification type?]
```

### Implementation Notes

- Backend sends notifications via FCM Admin SDK (server-side)
- Each rule implemented as a triggered function or cron job
- Frequency caps stored per-user to prevent notification fatigue
- Deep link routing needs to be connected in the mobile app (`onMessageOpenedApp` handler is stubbed)
- Consider a notification preferences screen in the app (future enhancement, not required for launch)

### Recommended Launch Set

Start with the minimum viable set of programmatic notifications for launch. Add more post-launch based on engagement data:

**Must-have for launch:**
1. Welcome notification (account creation)
2. Inactivity reminder (define threshold with team)
3. New feature announcement (ad hoc via portal, not automated)

**Nice-to-have for launch:**
4. Complete your profile
5. Campaign performance update

**Post-launch:**
6. Weekly digest
7. Win-back notification
8. Scheduled maintenance alerts

---

## Deep Link Routing

When a user taps a notification, the app should navigate to the relevant page. The mobile app already handles deep links via the `app_links` package and the `mmp.app://` scheme.

### Implementation Needed

The `onMessageOpenedApp` listener in `push_service.dart` is stubbed. It needs to:

1. Extract the `url` or `route` from the notification's `data` payload
2. Navigate the WebView to that URL
3. Handle cases where the app is cold-started from a notification (check `getInitialMessage`)

### Deep Link Format

Notifications should include a `data` field with the target URL:

```json
{
  "notification": {
    "title": "New Campaign Results",
    "body": "Your email campaign has results. Tap to view."
  },
  "data": {
    "url": "https://app.mymarketingpro.com/platform/campaigns/results.php?id=123",
    "type": "campaign_results"
  }
}
```

---

**Last Updated**: February 2026
**Owner**: Product Lead + Dev Lead
**Review Cadence**: Weekly during active development
