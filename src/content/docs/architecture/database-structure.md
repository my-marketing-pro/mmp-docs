---
title: Database Structure
description: Complete database schema documentation for all 405 tables
---

## Summary

- **Total Databases**: 3
- **Active Database**: `mmp_app` (405 tables)
- **Empty Databases**: `emailblaster`, `mixpost` (currently unused)

---

## Database: `mmp_app` (405 tables)

### 1. User Management & Authentication (15 tables)
Core user account management

| Table | Purpose |
|-------|---------|
| `app_users` | Main user accounts |
| `app_admins` | Admin users |
| `app_auth_tokens` | Authentication tokens |
| `app_user_sessions` | Active user sessions |
| `app_login_attempts` | Login security tracking |
| `app_oauth_connections` | OAuth integrations (Google, etc.) |
| `app_oauth_links` | OAuth linking |
| `app_oauth_tokens` | OAuth access tokens |
| `app_invitations` | User invitation system |
| `users` | Legacy user table |
| `usersConnect` | Connected users |
| `user_tokens` | User access tokens |
| `user_settings` | User preferences |
| `user_onboarding` | Onboarding progress |
| `app_user_activity` | User activity logs |

### 2. Contacts & CRM (35 tables)
Contact management and customer relationship tracking

| Table | Purpose |
|-------|---------|
| `app_contacts` | Main contacts database |
| `contacts` | Legacy contacts |
| `app_contact_lists` | Contact list organization |
| `app_contact_list_members` | List membership |
| `app_contact_tags` | Contact tagging system |
| `app_contact_tag_relations` | Tag relationships |
| `app_contact_activities` | Contact activity timeline |
| `app_contact_activity` | Activity tracking |
| `app_contact_notes` | Notes on contacts |
| `app_contact_segments` | Contact segmentation |
| `app_contact_submissions` | Form submissions |
| `app_contact_imports` | Bulk contact imports |
| `app_contact_cache` | Contact data caching |
| `app_contact_enrichment_queue` | Contact data enrichment |
| `app_enterprise_contacts` | Enterprise-level contacts |
| `app_enterprise_inquiries` | Enterprise inquiries |
| `app_roi_calculator_contacts` | ROI calculator leads |
| `contact_search_queue` | Contact search operations |
| `temp_search_contacts` | Temporary search results |
| `connectCRM` | CRM integration |
| `app_gmail_sync` | Gmail contact sync |
| `app_gmail_sync_log` | Gmail sync logging |
| `app_list_automations` | List automation rules |
| `app_automation_enrollments` | Automation enrollments |
| `funnel_stages` | Sales funnel stages |
| `audience_personas` | Audience personas |
| `audience_custom_options` | Custom audience options |
| `app_domain_cache` | Domain lookup cache |
| `contacts_domains` | Contact domain mapping |
| `mmp_geo_cache` | Geo-location cache |
| `app_city_images` | City image assets |
| `view_active_contacts_summary` | Active contacts view |
| `view_list_membership_summary` | List membership view |
| `view_recent_contact_activity` | Recent activity view |
| `v_contact_timeline` | Contact timeline view |

### 3. Campaign Management (65+ tables)
Marketing campaign creation and management

**Main Campaigns:**
| Table | Purpose |
|-------|---------|
| `app-campaigns` | Modern campaign system |
| `campaigns` | Legacy campaigns |
| `mmpCampaigns` | MMP campaigns |
| `app_campaign_builder` | Campaign builder |
| `app_campaign_analytics` | Campaign performance |
| `app_campaign_summary` | Campaign summaries |
| `app_campaign_creative` | Campaign creative assets |
| `app_campaign_audience` | Target audience |
| `app_campaign_contacts` | Campaign contact lists |
| `app_campaign_uploads` | Campaign file uploads |
| `app_campaign_payments` | Campaign payments |
| `app_campaign_costs` | Campaign cost tracking |

**Campaign Types:**
- `app_campaign_brand_advertising` - Brand advertising campaigns
- `app_campaign_direct_marketing` - Direct marketing campaigns
- `app_campaign_dm_email` - Email campaigns
- `app_campaign_dm_sms` - SMS campaigns
- `app_campaign_dm_social` - Social media campaigns
- `app_outofhome_campaigns` - Out-of-home advertising

**Campaign Components:**
- Campaign targeting, dayparts, placements, segments
- Campaign locations, IPs, creative, credits
- Campaign enrichment, product info, audience lists

### 4. Email Marketing (30+ tables)
Email campaign and delivery system

| Table | Purpose |
|-------|---------|
| `app-email_campaigns` | Email campaigns |
| `app-email_templates` | Email templates |
| `app-email_queue` | Email send queue |
| `app-email_tracking` | Email open/click tracking |
| `app-email_clicks` | Click tracking |
| `app-email_subscriptions` | Subscription management |
| `app-email_domains` | Verified sending domains |
| `app-email_api_keys` | Email service API keys |
| `app-email_config` | Email configuration |
| `app-email_credits` | Email sending credits |
| `app-email_followups` | Follow-up sequences |
| `app-email_attachments` | Email attachments |
| `app_test_emails` | Test email tracking |
| `email_campaigns` | Legacy email campaigns |
| `email_templates` | Legacy templates |
| `email_queue` | Legacy queue |
| `email_recipients` | Email recipients |
| `email_events` | Email events |
| `email_sequence_steps` | Email sequences |
| `email_unsubscribes` | Unsubscribe list |
| `email_footers` | Email footer templates |
| `user_email_configs` | User email settings |
| `auto_prospect_email_log` | Auto-prospecting emails |

### 5. SMS/Text Messaging (20+ tables)
SMS campaign and delivery system

| Table | Purpose |
|-------|---------|
| `app_sms_campaigns` | SMS campaigns |
| `app_sms_queue` | SMS send queue |
| `app_sms_tracking` | SMS delivery tracking |
| `app_sms_clicks` | SMS link clicks |
| `app_sms_delivery_status` | Delivery status |
| `app_sms_numbers` | SMS phone numbers |
| `app_user_sms_numbers` | User SMS numbers |
| `app_sms_provider_tokens` | SMS provider credentials |
| `app_sms_followups` | SMS follow-ups |
| `app_sakari_groups` | Sakari SMS groups |
| `twilio_numbers` | Twilio phone numbers |
| `twilio_messages` | Twilio message history |
| `twilio_chats` | Twilio chat history |
| `inbound` | Inbound messages |
| `inbound_sms` | Inbound SMS |
| `vw_sms_delivery_summary` | SMS delivery view |
| `vw_sms_failed_messages` | Failed messages view |
| `vw_user_sms_numbers` | User numbers view |

### 6. Voice/Calling (10 tables)
Call tracking and voice features

| Table | Purpose |
|-------|---------|
| `app_call_recordings` | Call recordings |
| `call_logs` | Call history |
| `call_audio` | Audio files |
| `call_transcripts` | Call transcriptions |
| `twilio_call_logs` | Twilio call logs |
| `twilio_call_recordings_and_transcriptions` | Twilio recordings |
| `voice_logs` | Voice activity logs |
| `onboarding_calls` | Onboarding call tracking |
| `elevenlab_agents` | AI voice agents |

### 7. Messaging/Chat (8 tables)
Internal messaging system

| Table | Purpose |
|-------|---------|
| `app_messages` | Messages |
| `app_message_threads` | Message threads |
| `app_message_participants` | Thread participants |
| `app_message_attachments` | Message attachments |
| `messages` | Legacy messages |
| `linkedin_messages` | LinkedIn messages |
| `linkedin_threads` | LinkedIn threads |
| `v_recent_messages` | Recent messages view |
| `v_unread_counts` | Unread count view |

### 8. Payments & Billing (35+ tables)
Payment processing and subscription management

**Payments:**
| Table | Purpose |
|-------|---------|
| `app-payments` | Main payments |
| `app_payments_log` | Payment history |
| `payments` | Legacy payments |
| `payment_history` | Payment records |
| `app-payment-links` | Payment links |
| `payment_links` | Legacy payment links |
| `app_payment_methods` | Saved payment methods |
| `account_cards` | Stored credit cards |

**Subscriptions:**
| Table | Purpose |
|-------|---------|
| `app-subscriptions` | Subscriptions |
| `app-subscription-billing` | Billing records |
| `app-subscription_renewals` | Renewal tracking |
| `v_active_subscriptions` | Active subs view |
| `v_monthly_revenue` | Revenue view |

**Credits & Wallets:**
| Table | Purpose |
|-------|---------|
| `app-credit_wallets` | Credit wallets |
| `app-wallet_transactions` | Wallet transactions |
| `app_user_credits` | User credit balances |
| `app_credit_transactions` | Credit transactions |
| `app_credits_history` | Credit history |
| `credit_packages` | Credit packages |
| `credit_usage` | Credit usage tracking |
| `user_credits` | Legacy credits |
| `user_credit_summary` | Credit summary |

**Orders & Invoices:**
| Table | Purpose |
|-------|---------|
| `app-orders` | Orders |
| `app-order_items` | Order line items |
| `app-invoices` | Invoices |
| `app-invoice_line_items` | Invoice items |
| `orders` | Legacy orders |
| `order_events` | Order events |

**Other:**
- Tax rates, transactions, usage records
- Discount coupons, promo codes
- Debits and credits tracking

### 9. Lead Generation (20+ tables)
Lead capture and qualification

| Table | Purpose |
|-------|---------|
| `leads` | Main leads database |
| `app_leadgen_profiles` | Lead profiles |
| `app_leadgen_leads` | Generated leads |
| `app_leadgen_geo_targets` | Geographic targeting |
| `app_leadgen_demo_targets` | Demographic targeting |
| `app_leadgen_psycho_targets` | Psychographic targeting |
| `app_leadgen_behav_targets` | Behavioral targeting |
| `app_high_intent_leads` | High-intent leads |
| `app_high_intent_tracking` | Intent tracking |
| `app-lead-breakpoints` | Lead breakpoint analysis |
| `app-lead-usage` | Lead usage tracking |
| `app_dma_leads` | DMA market leads |
| `app_roi_calculator_leads` | ROI calculator leads |
| `lead_onboarding_profiles` | Lead onboarding |
| `v_high_intent_daily_stats` | Daily stats view |
| `v_high_intent_funnel` | Funnel view |
| `v_high_intent_lead_sources` | Lead sources view |
| `v_high_intent_leads_by_industry` | Industry view |
| `v_lead_usage_summary` | Usage summary view |

### 10. Advertising & Inventory (50+ tables)
Out-of-home and digital advertising inventory

**Ad Management:**
| Table | Purpose |
|-------|---------|
| `ad_order` | Ad orders |
| `ad_submissions` | Ad submissions |
| `adserver` | Ad server data |

**Inventory:**
| Table | Purpose |
|-------|---------|
| `app-inventory_master` | Master inventory |
| `app-inventory_searches` | Inventory searches |
| `app-saved_inventory` | Saved inventory items |
| `app-screen_types` | Screen types |
| `app-screen_type_analytics` | Screen analytics |

**Campaign Locations:**
- `campaignlocations` - Campaign location data
- `campaignlocradio` - Radio locations
- `campaignloctv` - TV locations
- Various placement tables (D, R, T placements)

**Connect/Pontiac Integration:**
- Multiple `connectPontiac_*` tables for device stats, metrics, data
- Location, audience, and market data
- Network and exchange metrics

**Geographic Data:**
| Table | Purpose |
|-------|---------|
| `connectZipCodes` | Zip code data |
| `connectCities` | City data |
| `connectCountries` | Country data |
| `dma_markets` | DMA markets |
| `app_dmas` | DMA definitions |
| `app_dma_markets` | DMA market data |

### 11. Social Media (10+ tables)
Social media posting and management

| Table | Purpose |
|-------|---------|
| `social_content` | Social posts |
| `social_tokens` | Social media tokens |
| `social_topics` | Content topics |
| `fb_ads_data` | Facebook ads data |
| `shopify_tokens` | Shopify integration |
| `app_campaign_dm_social` | Social campaigns |

### 12. Analytics & Tracking (20+ tables)
Performance analytics and tracking

| Table | Purpose |
|-------|---------|
| `analytics` | Main analytics |
| `analytics_bak` | Analytics backup |
| `app-campaign_analytics` | Campaign analytics |
| `app_admin_activity` | Admin activity |
| `app_user_activity` | User activity |
| `user_activity_logs` | Activity logs |
| `app-activity-log` | App activity log |
| `app_campaign_activity_log` | Campaign activity |
| `admin_tracking_emailsend` | Email send tracking |
| `admin_tracking_mobilesend` | Mobile tracking |
| `admin_tracking_firebasesend` | Firebase tracking |
| `app_referral_tracking` | Referral tracking |
| `app_promo_clicks` | Promo click tracking |
| `app_promo_tracking` | (If exists) |
| `search_history` | Search history |
| `user_referrals` | User referrals |

### 13. Brand Assets & Creative (15+ tables)
Brand management and creative assets

| Table | Purpose |
|-------|---------|
| `app-brand_assets` | Brand assets |
| `app-brand_files` | Brand files |
| `app-creative-orders` | Creative orders |
| `app_campaign_creative_assets` | Campaign assets |
| `app_campaign_creative_config` | Creative config |
| `campaigncreative` | Legacy creative |
| `app_proposal_assets` | Proposal assets |
| `app_proposal_visuals` | Proposal visuals |
| `app_proposal_versions` | Proposal versions |
| `app_proposals` | Proposals |
| `program_material_uploads` | Program materials |

### 14. AI & Automation (15+ tables)
AI-powered features and automation

| Table | Purpose |
|-------|---------|
| `app_ai_assessments` | AI assessments |
| `app_ai_assessment_assets` | Assessment assets |
| `auto_prospect` | Auto-prospecting |
| `auto_prospect_domains` | Prospect domains |
| `auto_prospect_log` | Prospect logs |
| `auto_prospect_reporting` | Prospect reports |
| `marketing_analyses` | Marketing analysis |
| `app-marketing_analysis_log` | Analysis logs |
| `marketing_health` | Marketing health scores |
| `marketing_programs` | Marketing programs |
| `daily_briefings` | AI daily briefings |
| `elevenlab_agents` | Voice AI agents |

### 15. Data Enrichment (15+ tables)
Contact and company data enrichment

| Table | Purpose |
|-------|---------|
| `app_watt_enrichment_batches` | WATT enrichment batches |
| `app_watt_enrichment_history` | Enrichment history |
| `app_watt_enrichment_results` | Enrichment results |
| `app-watt_clusters` | Data clusters |
| `app-watt_cluster_segments` | Cluster segments |
| `app-watt_cluster_predictors` | Predictive models |
| `app-watt_cluster_exemplars` | Cluster exemplars |
| `app-watt_cluster_discriminators` | Discriminators |
| `app-watt_cluster_cooccurring` | Co-occurring patterns |
| `app-watt_search_results` | Search results |
| `app-watt_searches` | Search history |
| `app_website_audits` | Website audits |
| `app_website_audit_batches` | Audit batches |
| `app_crawler_jobs` | Web crawler jobs |
| `app_crawler_logs` | Crawler logs |
| `app_crawler_results` | Crawler results |

### 16. Calendar & Events (25+ tables)
Calendar management and event bookings

**Calendars:**
| Table | Purpose |
|-------|---------|
| `calendars` | Calendar definitions |
| `calendar_entries` | Calendar entries |
| `calendar_events` | Calendar events |
| `calendar_bookings` | Calendar bookings |
| `calendar_availability` | Availability slots |
| `calendar_ranges` | Date ranges |
| `calendar_tokens` | Calendar tokens |
| `user_availability` | User availability |
| `google_calendars` | Google Calendar sync |
| `booking_calendars` | Booking calendars |
| `booking_availability` | Booking availability |
| `booking_templates` | Booking templates |
| `booking_events` | Booking events |
| `bookings` | Bookings |

**Events:**
| Table | Purpose |
|-------|---------|
| `events` | Main events |
| `event_types` | Event type definitions |
| `event_invitees` | Event invitees |
| `event_ranges` | Event date ranges |
| `event_tokens` | Event access tokens |
| `event_zoom_tokens` | Zoom integration |
| `event_booking_details` | Booking details |
| `event_bookings` | Event bookings |
| `event_gate_submissions` | Event gate submissions |
| `event_invitee_questions` | Invitee questions |
| `rsvps` | Event RSVPs |
| `questions` | Event questions |

### 17. Tasks & Projects (15+ tables)
Task management and project tracking

| Table | Purpose |
|-------|---------|
| `tasks` | Main tasks |
| `taskFiles` | Task files |
| `task_files` | Task files (alt) |
| `task_comments` | Task comments |
| `task_assignees` | Task assignments |
| `projects` | Projects |
| `priorities` | Priority levels |
| `statuses` | Status definitions |
| `feed_tasks` | Feed tasks |
| `feed_content` | Feed content |
| `feed_events` | Feed events |
| `feed_files` | Feed files |
| `feed_files_uploaded` | Uploaded feed files |
| `feed_tags` | Feed tags |

### 18. Workflows & Automation (5 tables)
Workflow automation system

| Table | Purpose |
|-------|---------|
| `flows` | Workflow definitions |
| `flow_nodes` | Workflow nodes |
| `flow_edges` | Workflow connections |
| `app_list_automations` | List automations |
| `app_automation_enrollments` | Automation enrollments |

### 19. Admin & System (20+ tables)
Admin tools and system management

| Table | Purpose |
|-------|---------|
| `admin` | Admin users |
| `app_admins` | App admins |
| `app_admin_activity` | Admin activity |
| `app_admin_emulations` | User emulation tracking |
| `app-api_cache` | API caching |
| `app-api_logs` | API logs |
| `app_pontiac_api_logs` | Pontiac API logs |
| `app_settings` | App settings |
| `accountSettings` | Account settings |
| `company_info` | Company information |
| `app-company_info` | App company info |
| `app_fob_access_keys` | FOB access keys |
| `app_bug_reports` | Bug reports |
| `app_bug_report_history` | Bug report history |
| `bug_feature_requests` | Feature requests |
| `content_feedback` | Content feedback |
| `dashboard` | Dashboard config |
| `domains` | Domain management |

### 20. White Label & Multi-Tenant (10+ tables)
Multi-tenant and white-label support

| Table | Purpose |
|-------|---------|
| `domains` | White-label domains |
| `orgs` | Organizations |
| `user_orgs` | User-org relationships |
| `userOrg` | Legacy user-org |
| `orgid` | Org identifiers |
| `orgTransaction` | Org transactions |
| `partner` | Partners |
| `partnerUsers` | Partner users |
| `app_share_promos` | Shared promos |

### 21. Onboarding (10+ tables)
User onboarding flows

| Table | Purpose |
|-------|---------|
| `user_onboarding` | User onboarding progress |
| `app_marketing_onboarding` | Marketing onboarding |
| `onboarding_new` | New onboarding |
| `onboarding_calls` | Onboarding calls |
| `onboarding_uploads` | Onboarding uploads |
| `lead_onboarding_profiles` | Lead onboarding |

### 22. Integrations (15+ tables)
Third-party service integrations

| Table | Purpose |
|-------|---------|
| `gmail_tokens` | Gmail OAuth tokens |
| `app_gmail_sync` | Gmail sync |
| `shopify_tokens` | Shopify integration |
| `social_tokens` | Social media tokens |
| `calendar_tokens` | Calendar tokens |
| `event_zoom_tokens` | Zoom tokens |
| `app_oauth_tokens` | OAuth tokens |
| `app_sms_provider_tokens` | SMS provider tokens |
| `mmp_wp_sites` | WordPress sites |
| `mmp_wp_captures` | WordPress captures |
| `app_fob_campaign_bookings` | FOB bookings |
| `app_fob_offer_requests` | FOB offer requests |

### 23. Miscellaneous (20+ tables)

**Target Audience:**
- `target_audience` - Target audience definitions
- `campaigntargets` - Campaign targets
- `campaigntargetgroups` - Target groups
- `campaigntargetcategories` - Target categories

**Other:**
| Table | Purpose |
|-------|---------|
| `categories` | General categories |
| `data_business_categories` | Business categories |
| `app_business_categories` | App business categories |
| `deviceIds` | Device identifiers |
| `user_sites` | User websites |
| `user_quicklinks` | User quick links |
| `music_venues` | Music venue data |
| `app_csv_import_jobs` | CSV import jobs |
| `app_dma_communication_log` | DMA communications |
| `b_to_c` | B2C data |
| `dump` | Temporary dump table |

---

## Quick Reference by Feature

| Feature Area | Table Count | Key Tables |
|--------------|-------------|------------|
| 👥 Users & Auth | 15 | `app_users`, `app_auth_tokens` |
| 📇 Contacts/CRM | 35 | `app_contacts`, `app_contact_lists` |
| 📢 Campaigns | 65+ | `app-campaigns`, `app_campaign_builder` |
| ✉️ Email Marketing | 30 | `app-email_campaigns`, `app-email_queue` |
| 💬 SMS/Text | 20 | `app_sms_campaigns`, `app_sms_queue` |
| 📞 Voice/Calls | 10 | `call_logs`, `twilio_call_logs` |
| 💰 Payments | 35 | `app-payments`, `app-subscriptions` |
| 🎯 Lead Gen | 20 | `app_leadgen_leads`, `app_high_intent_leads` |
| 📺 Ad Inventory | 50+ | `campaignlocations`, `app-inventory_master` |
| 📊 Analytics | 20 | `analytics`, `app-campaign_analytics` |
| 🎨 Brand/Creative | 15 | `app-brand_assets`, `app_proposals` |
| 🤖 AI/Automation | 15 | `auto_prospect`, `marketing_analyses` |
| 🔍 Data Enrichment | 15 | `app_watt_enrichment_*` |
| 📅 Calendar/Events | 25 | `calendars`, `events`, `bookings` |
| ✅ Tasks/Projects | 15 | `tasks`, `projects` |

---

## Database Health

```bash
# Check table sizes
mysql -u root mmp_app -e "
SELECT
    table_name,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.TABLES
WHERE table_schema = 'mmp_app'
ORDER BY (data_length + index_length) DESC
LIMIT 20;
"
```

---

## Notes

- **Views**: Tables starting with `v_` or `view_` are SQL views (virtual tables)
- **Legacy Tables**: Many tables exist in duplicate (e.g., `campaigns` vs `app-campaigns`) - likely migration in progress
- **Empty Databases**: `emailblaster` and `mixpost` are set up but not yet populated with schema
- **Naming Conventions**:
  - `app-*` = New app tables (hyphenated)
  - `app_*` = New app tables (underscored)
  - No prefix = Legacy/original tables
