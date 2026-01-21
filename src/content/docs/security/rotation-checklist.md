---
title: Secret Rotation Checklist
description: Step-by-step checklist for rotating all exposed API keys and secrets
---

# Secret Rotation Checklist

**Start Time**: ___________
**Estimated Duration**: 1-2 hours

---

## STEP 1: Rotate Keys (30-45 mins)

### AWS RDS Database Password ⚠️ DO THIS FIRST
**Why first**: Entire app depends on database access

- [ ] Go to: https://console.aws.amazon.com/rds/
- [ ] Find cluster: `my-marketing-pro`
- [ ] Actions → Modify
- [ ] Master password → **Generate new password**
- [ ] **COPY NEW PASSWORD**: `_______________________________`
- [ ] Apply immediately: YES (will cause ~2 min downtime)
- [ ] Wait for modification to complete

---

### Stripe API Keys
**Why critical**: Payments are broken without these

- [ ] Go to: https://dashboard.stripe.com/apikeys
- [ ] Live mode:
  - [ ] Click "Roll key" on Secret key
  - [ ] **COPY NEW SECRET KEY**: `sk_live_________________________`
  - [ ] Note: Publishable key can stay the same (it's meant to be public)
- [ ] Test mode:
  - [ ] Click "Roll key" on Test Secret key
  - [ ] **COPY NEW TEST SECRET KEY**: `sk_test_________________________`

---

### Twilio API Key
**Why critical**: SMS/Voice features broken

- [ ] Go to: https://console.twilio.com/us1/develop/api-keys
- [ ] Find key: `SKb2************************` (your old key)
- [ ] Delete it
- [ ] Create new API Key → Standard
- [ ] **COPY NEW KEY SID**: `SK_________________________`
- [ ] **COPY NEW KEY SECRET**: `_______________________________`
  - ⚠️ **IMPORTANT**: Secret only shows once!

---

### Google OAuth Client Secrets
**Why important**: Login via Google broken

**Main OAuth Client** (most important):
- [ ] Go to: https://console.cloud.google.com/apis/credentials
- [ ] Find OAuth 2.0 Client: `886461719587-lqo3n8af58p08r8136offhp4jime385b`
- [ ] Edit → Reset secret
- [ ] **COPY NEW SECRET**: `GOCSPX-_________________________`

**Other OAuth Clients** (if you use them):
- [ ] Calendar OAuth: Reset and copy new secret
- [ ] Gmail OAuth: Reset and copy new secret
- [ ] Business Profile OAuth: Reset and copy new secret

---

### Google Maps API Keys
**Why medium priority**: Maps won't load but app still works

- [ ] Go to: https://console.cloud.google.com/google/maps-apis/credentials
- [ ] Create NEW API key
- [ ] **COPY NEW KEY**: `AIza_________________________`
- [ ] Click "Restrict Key":
  - [ ] Application restrictions: HTTP referrers
  - [ ] Add referrer: `*.mymarketingpro.com/*`
  - [ ] Add referrer: `*.themycoinc.com/*`
  - [ ] Add referrer: `localhost:*` (for dev)
  - [ ] API restrictions: Maps JavaScript API, Geocoding API, Places API
- [ ] Save
- [ ] **DELETE OLD KEYS** after testing

---

### WATT Data API Key
**Why low priority**: Data enrichment feature

- [ ] Contact WATT support
- [ ] Request: "Need to rotate API key due to security incident"
- [ ] **COPY NEW KEY**: `_______________________________`

---

## STEP 2: Save New Credentials (10 mins)

Create `.env` file in project root:

```bash
cd /Users/jzamudio/Desktop/mmp/mmp-webapp
touch .env
chmod 600 .env
```

Edit `.env` file with new credentials:

```bash
# Database
DB_HOST=my-marketing-pro.cluster-c3mws4moov6r.us-east-2.rds.amazonaws.com
DB_NAME=mmp_app
DB_USER=admin
DB_PASS=<NEW_RDS_PASSWORD>

# Google OAuth
GOOGLE_CLIENT_ID=886461719587-***************************
GOOGLE_CLIENT_SECRET=<NEW_GOOGLE_SECRET>

# Stripe LIVE
STRIPE_PUBLISHABLE_KEY=pk_live_51Quh***************************
STRIPE_SECRET_KEY=<NEW_STRIPE_LIVE_KEY>

# Stripe TEST
STRIPE_TEST_PUBLISHABLE_KEY=pk_test_51Quh***************************
STRIPE_TEST_SECRET_KEY=<NEW_STRIPE_TEST_KEY>

# Twilio
TWILIO_ACCOUNT_SID=AC89************************
TWILIO_API_KEY_SID=<NEW_TWILIO_KEY_SID>
TWILIO_API_KEY_SECRET=<NEW_TWILIO_SECRET>

# Google Maps
GOOGLE_MAPS_API_KEY=<NEW_GOOGLE_MAPS_KEY>

# WATT Data
WATT_API_KEY=<NEW_WATT_KEY_WHEN_AVAILABLE>
# (Update when WATT responds)
```

- [ ] Verify `.env` is NOT tracked in git:
  ```bash
  git status  # Should NOT show .env
  ```

---

## STEP 3: Test Locally (15 mins)

Before deploying, verify everything works locally:

```bash
# Start local server
make server
```

Test these features:
- [ ] Can log in via Google OAuth
- [ ] Maps load correctly
- [ ] Can create test payment (Stripe test mode)
- [ ] SMS features work (if applicable)
- [ ] Database queries work

If anything fails, check:
- [ ] `.env` file has correct values
- [ ] No typos in keys
- [ ] Keys are the NEW rotated ones

---

## STEP 4: Deploy to Production (20 mins)

### Upload .env to server

```bash
# Copy .env to production
scp .env mymarketingpro:/var/www/sftp/app/

# Verify it's there and has correct permissions
ssh mymarketingpro
cd /var/www/sftp/app
ls -la .env  # Should show -rw------- (600)
cat .env     # Verify contents
```

### Deploy code changes

```bash
# Push to GitHub (if you made code changes)
git push origin dev

# Deploy
make deploy
```

### Verify production

- [ ] Visit production site
- [ ] Test login
- [ ] Test a map feature
- [ ] Check error logs:
  ```bash
  ssh mymarketingpro
  tail -f /var/log/nginx/error.log
  ```

---

## STEP 5: Clean Up Old Keys (5 mins)

Once everything is working:

### Delete old Google Maps keys
- [ ] Go to: https://console.cloud.google.com/google/maps-apis/credentials
- [ ] Delete all old `AIza...` keys

### Verify old Twilio key is deleted
- [ ] Go to: https://console.twilio.com/us1/develop/api-keys
- [ ] Confirm `SKb2bf...` is gone

### Monitor for issues
- [ ] Set reminder to check logs in 24 hours
- [ ] Monitor Stripe dashboard for successful payments
- [ ] Check Twilio logs for SMS delivery

---

## POST-INCIDENT REVIEW (Next day)

- [ ] Review security incident response doc
- [ ] Update team on what happened
- [ ] Schedule meeting to discuss prevention
- [ ] Audit other repos for hardcoded secrets
- [ ] Consider using: https://github.com/trufflesecurity/trufflehog

---

## COMPLETION

- [ ] All keys rotated
- [ ] All services working
- [ ] Old keys deleted
- [ ] .env file secure (NOT in git)
- [ ] Team notified
- [ ] Incident documented

**Completion Time**: ___________
**Total Duration**: ___________

**Issues Encountered**:
-
-
-

**Lessons Learned**:
-
-
-
