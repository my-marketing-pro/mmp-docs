---
title: App Store Submission
description: Complete checklists for Google Play and Apple App Store submission, assets, legal compliance, and review process
---

This document covers everything needed to submit the MMP mobile app to both the Google Play Store and the Apple App Store. Use these checklists to ensure nothing is missed during [Phase 5 of the launch timeline](/mmp-docs/mobile-app/launch-timeline/#phase-5-app-store-submission-2-3-weeks).

## Pre-Submission Requirements

Before submitting to either store, these items must be complete:

- [ ] All [Phase 4 exit criteria](/mmp-docs/mobile-app/launch-timeline/#exit-criteria-for-phase-4) met (zero P0/P1 bugs, R&D Lead sign-off)
- [ ] Privacy policy published and accessible via URL
- [ ] Terms of service published and accessible via URL
- [ ] App tested on minimum 4 real devices (2 iOS, 2 Android)
- [ ] All screenshots captured on required device sizes
- [ ] Store listing copy written and reviewed
- [ ] Data collection practices documented for both stores' declarations

---

## App Identity

| Field | Value |
|-------|-------|
| **App Name** | My Marketing Pro |
| **Bundle ID** | `com.mymarketingpro.app` |
| **Developer Name** | My Marketing Pro (must match legal entity) |
| **Category** | Business (primary), Productivity (secondary) |
| **Content Rating** | Everyone / 4+ |
| **Pricing** | Free (monetization through web platform subscription) |

---

## Google Play Store

### Developer Account Setup

- [ ] Google Play Developer account active ($25 one-time fee)
- [ ] Developer profile complete (name, address, contact email, website)
- [ ] Payment profile linked (for future in-app purchases if needed)

### Store Listing

**Text Assets:**

| Field | Requirements | Notes |
|-------|-------------|-------|
| **App name** | Max 30 characters | "My Marketing Pro" |
| **Short description** | Max 80 characters | One-liner value prop for search results |
| **Full description** | Max 4,000 characters | Feature highlights, benefits, keywords for ASO |
| **What's new** | Max 500 characters | Release notes for this version |

**Graphic Assets:**

| Asset | Requirements | Notes |
|-------|-------------|-------|
| **App icon** | 512 x 512 px, PNG, 32-bit | Already configured in Flutter project |
| **Feature graphic** | 1024 x 500 px, PNG or JPEG | Displayed at top of store listing; design needed |
| **Screenshots** | Min 2, max 8 per device type; JPEG or PNG | See screenshot matrix below |
| **Video** | YouTube URL (optional) | 30-second app walkthrough recommended |

**Screenshot Matrix (Google Play):**

| Device Type | Required Sizes | Min Count |
|-------------|---------------|-----------|
| Phone | 16:9 or 9:16, min 320px, max 3840px | 2-8 screenshots |
| 7-inch tablet | Optional but recommended | 2-8 screenshots |
| 10-inch tablet | Optional but recommended | 2-8 screenshots |

**Recommended screenshots to capture:**
1. Onboarding / welcome screen
2. Dashboard / main feed
3. Campaign creation
4. Contact management
5. Analytics / reporting
6. Push notification example
7. Settings / profile
8. Login screen with OAuth options

### Content Rating

- [ ] Complete the IARC content rating questionnaire in Google Play Console
- [ ] Expected rating: Everyone (no violence, no user-generated content displayed in-app, no location sharing)

### Data Safety Declaration

Google Play requires a data safety section. Based on the MMP app:

| Data Type | Collected | Shared | Purpose |
|-----------|-----------|--------|---------|
| Email address | Yes | No | Account authentication |
| Name | Yes | No | Account profile |
| Push notification tokens | Yes | No (Firebase only) | Push notifications |
| Cookies / session data | Yes | No | Authentication persistence |
| Crash logs | Yes | No (Firebase Crashlytics) | App stability |
| App interactions | Yes | No | Analytics |

- [ ] Data safety form completed in Google Play Console
- [ ] Privacy policy URL provided
- [ ] Data deletion request mechanism documented (how users can request account deletion)

### App Review Checklist (Google Play)

- [ ] Target API level meets current Google Play requirements (API 34+ for new apps)
- [ ] App signing configured with Google Play App Signing (upload key + signing key)
- [ ] `google-services.json` is NOT exposed in public repos (managed via CI/CD secrets)
- [ ] No broken links in store listing
- [ ] App does not crash on launch
- [ ] All OAuth flows work (Google, Facebook, LinkedIn, Apple)
- [ ] Push notifications functional
- [ ] App loads content within reasonable time (< 5 seconds on 4G)
- [ ] No deceptive behavior (app description matches functionality)

### Google Play Specific Concerns

**WebView Apps:** Google Play is generally lenient with WebView-based apps, but reviewers may flag apps that are "just a website." Our native features help differentiate:
- Native onboarding flow (6-slide carousel)
- Push notifications (FCM integration)
- OAuth with native flows (Google uses external browser per policy)
- Offline detection with native banner
- Session persistence with secure storage

---

## Apple App Store

### Developer Account Setup

- [ ] Apple Developer Program membership active ($99/year)
- [ ] App Store Connect access configured
- [ ] Certificates and provisioning profiles valid (managed via Fastlane)
- [ ] Team Agent or Admin role for submitting

### Store Listing

**Text Assets:**

| Field | Requirements | Notes |
|-------|-------------|-------|
| **App name** | Max 30 characters | "My Marketing Pro" |
| **Subtitle** | Max 30 characters | Brief value prop shown under app name |
| **Description** | Max 4,000 characters | Similar to Google Play but can differ |
| **What's New** | Max 4,000 characters | Release notes for this version |
| **Keywords** | Max 100 characters, comma-separated | For App Store search optimization |
| **Promotional text** | Max 170 characters | Can be updated without new submission |
| **Support URL** | Required | Link to support/help page |
| **Marketing URL** | Optional | Link to marketing site |

**Graphic Assets:**

| Asset | Requirements | Notes |
|-------|-------------|-------|
| **App icon** | 1024 x 1024 px, PNG, no alpha | Generated from Flutter project assets |
| **Screenshots** | Required per device size (see below) | Must be actual app screenshots |
| **App preview video** | Optional, 15-30 seconds | Must be captured from app, not marketing video |

**Screenshot Matrix (Apple App Store):**

| Device | Required Size | Required? |
|--------|--------------|-----------|
| iPhone 6.9" (iPhone 16 Pro Max) | 1320 x 2868 px | Required |
| iPhone 6.3" (iPhone 16 Pro) | 1206 x 2622 px | Required |
| iPhone 6.7" (iPhone 15 Plus) | 1290 x 2796 px | Optional (uses 6.9") |
| iPhone 6.5" (iPhone 11 Pro Max) | 1284 x 2778 px | Optional |
| iPhone 5.5" (iPhone 8 Plus) | 1242 x 2208 px | Required if supporting |
| iPad Pro 13" | 2064 x 2752 px | Required if iPad supported |
| iPad Pro 11" | 1668 x 2388 px | Optional |

**Minimum: 3 screenshots per required device size, maximum 10.**

### App Privacy

Apple requires detailed privacy nutrition labels:

| Data Type | Linked to Identity? | Used for Tracking? | Purpose |
|-----------|---------------------|-------------------|---------|
| Email address | Yes | No | App functionality |
| Name | Yes | No | App functionality |
| User ID | Yes | No | App functionality |
| Crash data | No | No | Analytics |
| Performance data | No | No | Analytics |
| Product interaction | No | No | Analytics |

- [ ] Privacy nutrition labels completed in App Store Connect
- [ ] Privacy policy URL provided
- [ ] App Tracking Transparency (ATT) prompt implemented if any tracking occurs (likely not needed for MMP)

### App Review Guidelines — Key Concerns

Apple's review is stricter than Google's. These are the areas most likely to cause issues for the MMP app:

#### Guideline 4.2 — Minimum Functionality

**This is the biggest risk.** Apple may reject apps that are "just a repackaged website." The reviewer will check if the app provides features beyond what the mobile website offers.

**Our differentiators (document these in the review notes):**
- Native push notifications with topic subscription and deep linking
- Native OAuth flows (Apple Sign-In is required if other social logins exist)
- Native onboarding experience with permission prompts
- Offline detection with native connectivity banner
- Secure session persistence using device keychain
- Platform-specific notification channels (high priority on Android, alert/badge/sound on iOS)

**Review Notes Field:** When submitting, include a note to reviewers explaining the native features. Example:

> This app provides the My Marketing Pro marketing platform experience with native push notifications (Firebase Cloud Messaging), native OAuth authentication (including Apple Sign-In), a native onboarding flow, offline detection, and secure session management. The app enhances the web experience with device-native features not available in a mobile browser.

#### Guideline 4.0 — Apple Sign-In

- [ ] Apple Sign-In is implemented (required since the app offers Google, Facebook, and LinkedIn sign-in)
- [ ] Apple Sign-In works correctly in production environment

#### Guideline 5.1 — Privacy

- [ ] App only requests permissions it actually uses (notifications, potentially camera/photos if needed)
- [ ] Permission prompts include clear usage descriptions in `Info.plist`
- [ ] No data collected without disclosure

#### Guideline 2.1 — Performance

- [ ] App launches without crash on all supported iOS versions (iOS 13.0+)
- [ ] No broken features or placeholder content
- [ ] WebView loads within acceptable time
- [ ] App works on both WiFi and cellular

### Apple-Specific Submission Steps

1. **Archive the build** via Xcode or Fastlane (`fastlane ios release`)
2. **Upload to App Store Connect** via Xcode Organizer or `altool`/Transporter
3. **Wait for processing** (usually 10-30 minutes)
4. **Select build** in App Store Connect under the app version
5. **Complete all metadata** (screenshots, description, privacy, etc.)
6. **Submit for review**
7. **Monitor review status** (typically 1-3 days, first submission may take longer)

---

## Common Rejection Reasons & Mitigations

| Rejection Reason | Likelihood | Mitigation |
|-----------------|------------|------------|
| **4.2 Minimum Functionality** (WebView-only) | Medium | Document native features in review notes; ensure onboarding, push notifications, and OAuth are working |
| **Missing Apple Sign-In** | High (if not implemented) | Already implemented — verify it works in production |
| **Privacy policy issues** | Medium | Ensure policy is accessible, covers all collected data, includes deletion process |
| **Broken functionality** | Low (if QA is thorough) | Complete Phase 4 QA before submission |
| **Metadata mismatch** | Low | Ensure screenshots match current app; description accurately reflects features |
| **Missing data deletion** | Medium | Implement account deletion or document the process for requesting deletion |
| **Crash on launch** | Low | Test on multiple real devices; check Crashlytics |

---

## Post-Submission Monitoring

### After Approval

- [ ] Verify app appears correctly in both stores (listing, screenshots, description)
- [ ] Download and test the production app on a clean device
- [ ] Verify push notifications work for the production app
- [ ] Verify all OAuth flows work with production credentials
- [ ] Monitor crash reports via Firebase Crashlytics for first 48 hours
- [ ] Monitor app store reviews for first week
- [ ] Send deployment communication per [Deployment Communication](/mmp-docs/product-management/testing-deployment-pipeline/#deployment-communication)

### If Rejected

1. **Read the rejection reason carefully** — Apple provides specific guideline references
2. **Don't panic** — first-submission rejections are common, especially for WebView apps
3. **Address the specific issue** — fix only what was cited
4. **Reply to the reviewer** if clarification is needed (App Store Connect resolution center)
5. **Resubmit** — re-reviews are typically faster than initial reviews (1-2 days)
6. **Escalate if needed** — Apple has an appeal process for disagreements

---

## Asset Preparation Checklist

Use this checklist during [Phase 5 Week 1](/mmp-docs/mobile-app/launch-timeline/#week-1-asset-preparation):

### Screenshots
- [ ] Capture on iPhone 16 Pro Max (6.9")
- [ ] Capture on iPhone 16 Pro (6.3")
- [ ] Capture on Pixel 7 or equivalent Android phone
- [ ] Capture on iPad Pro 13" (if iPad supported)
- [ ] Screenshots show actual app content (not mockups)
- [ ] Minimum 3, recommended 6-8 screenshots per device
- [ ] Screenshots cover: onboarding, dashboard, campaigns, contacts, analytics, notifications

### Store Listing Copy
- [ ] App name finalized (30 characters max)
- [ ] Short description written (80 chars for Google, 30 chars subtitle for Apple)
- [ ] Full description written (4,000 chars max)
- [ ] Keywords defined (Apple: 100 chars; Google: embedded in description)
- [ ] "What's New" release notes written
- [ ] Copy reviewed by Product Lead and R&D Lead

### Graphics
- [ ] App icon exported at 512x512 (Google) and 1024x1024 (Apple)
- [ ] Feature graphic designed (1024x500, Google Play only)
- [ ] App preview video recorded (optional but recommended)

### Legal & Compliance
- [ ] Privacy policy URL live and accessible
- [ ] Terms of service URL live and accessible
- [ ] Data safety declaration completed (Google Play)
- [ ] Privacy nutrition labels completed (Apple)
- [ ] Content rating questionnaire completed (Google Play)
- [ ] Age rating set (Apple)
- [ ] Account deletion mechanism documented or implemented
- [ ] GDPR compliance verified (if serving EU users)

---

**Last Updated**: February 2026
**Owner**: Product Lead + Dev Lead
**Review Cadence**: Before each app store submission
