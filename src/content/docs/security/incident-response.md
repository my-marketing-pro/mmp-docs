---
title: Security Incident Response
description: Critical incident response for exposed secrets
---

# Security Incident Response - Exposed Secrets

**Date**: 2026-01-21
**Severity**: CRITICAL
**Status**: Active Response

## Incident Summary

Repository was accidentally made public, exposing hardcoded API keys and secrets. Multiple services automatically disabled keys.

---

## EXPOSED SECRETS (MUST ROTATE IMMEDIATELY)

### 1. Database Credentials ⚠️ CRITICAL
**Location**: `config.php:18`, `includes/config.php:15`
```
Host: my-marketing-pro.cluster-c3mws4moov6r.us-east-2.rds.amazonaws.com
User: admin
Password: **************** (REDACTED - ROTATE THIS FIRST!)
Database: mmp_app
```
**Action**: Rotate RDS password immediately via AWS Console

---

### 2. Google OAuth Client Secrets ⚠️ CRITICAL
**Locations**: Multiple files

**Production Secrets**:
- `GOCSPX-************************` (config.php - ROTATE THIS!)
- `GOCSPX-************************` (multiple files - ROTATE THIS!)
- `GOCSPX-************************` (platform/onboarding - ROTATE THIS!)
- `GOCSPX-************************` (platform/refresh-token.php - ROTATE THIS!)

**Local/Test**:
- `GOCSPX-************************` (localhost - less critical)

**Action**: Regenerate all OAuth client secrets in Google Cloud Console

---

### 3. Stripe API Keys ⚠️ CRITICAL
**Location**: `includes/config.php:38-43`

**LIVE Keys**:
```
Publishable: pk_live_51Quh*************************** (REDACTED)
Secret: sk_live_51Quh*************************** (REDACTED - ROTATE THIS!)
```

**TEST Keys** (also exposed):
```
Publishable: pk_test_51Quh*************************** (REDACTED)
Secret: sk_test_51Quh*************************** (REDACTED - ROTATE THIS!)
```

**Also in**: `platform/buildplan/config.php`, `platform/buildplan/basic-index.php`
```
sk_live_kAZR*************************** (REDACTED)
sk_test_onhl*************************** (REDACTED)
```

**Action**: Roll keys in Stripe Dashboard immediately

---

### 4. Twilio Credentials ⚠️ HIGH
**Location**: `includes/config.php:46-48`
```
Account SID: AC89*************************** (REDACTED)
API Key SID: SKb2*************************** (REDACTED)
API Key Secret: USbn*************************** (REDACTED - ROTATE THIS!)
```

**Action**: Revoke and regenerate API Key in Twilio Console

---

### 5. Google Maps API Keys ⚠️ MEDIUM
**Location**: `includes/config.php:35`, multiple JS files

**Keys Found**:
- `AIzaSyAT************************` (most common - ROTATE THIS!)
- `AIzaSyDI************************`
- `AIzaSyDl************************`
- `AIzaSyBy************************`
- `AIzaSyAa************************`

**Action**: Regenerate keys and add domain restrictions in Google Cloud Console

---

### 6. WATT Data API Key ⚠️ MEDIUM
**Location**: `includes/config.php:32`
```
bXRfMmZk*************************** (Base64 encoded - ROTATE THIS!)
```

**Action**: Contact WATT support to rotate API key

---

## IMMEDIATE ACTION PLAN

### Phase 1: STOP THE BLEEDING (Do Now - 15 mins)

1. **Make Repository Private** ✅ (You did this)
   ```bash
   # Verify it's private
   gh repo view my-marketing-pro/mmp-webapp --json visibility
   ```

2. **Rotate Most Critical Keys** (Do in this order):

   a. **AWS RDS Database Password** (Highest priority - entire app breaks)
      - Go to: https://console.aws.amazon.com/rds
      - Select: `my-marketing-pro` cluster
      - Modify → Master password → Generate new password
      - **SAVE NEW PASSWORD IMMEDIATELY**
      - Apply immediately (will cause brief downtime)

   b. **Stripe Secret Keys** (Payments at risk)
      - Go to: https://dashboard.stripe.com/apikeys
      - Roll both live and test secret keys
      - **SAVE NEW KEYS**

   c. **Twilio API Key** (SMS/Calls broken)
      - Go to: https://console.twilio.com/
      - API Keys → Delete old key → Create new key
      - **SAVE NEW KEY**

### Phase 2: SAVE NEW CREDENTIALS (20 mins)

Create a secure credentials file (NOT in git):

```bash
# Create .env file (already in .gitignore)
touch .env
chmod 600 .env
```

### Phase 3: ROTATE REMAINING KEYS (30 mins)

3. **Google OAuth Secrets**
   - Go to: https://console.cloud.google.com/apis/credentials
   - For each OAuth 2.0 Client ID → Edit → Regenerate secret
   - Update all affected files

4. **Google Maps API Keys**
   - Go to: https://console.cloud.google.com/google/maps-apis/credentials
   - Create new restricted keys
   - Add HTTP referrer restrictions
   - Delete old keys

5. **WATT API Key**
   - Contact WATT support
   - Request new API key

---

## FILES REQUIRING UPDATES

### Config Files (Priority 1)
- [ ] `config.php` - Database, Google OAuth
- [ ] `includes/config.php` - ALL API keys
- [ ] `includes/db.php` - Database credentials (if any)

### OAuth Files (Priority 2)
- [ ] `app-modules/gcal/oauth2callback.php`
- [ ] `app-modules/gcal/sync_calendars.php`
- [ ] `app-modules/gcal/oauth_callback.php`
- [ ] `meet/oauth2callback.php`
- [ ] `platform/refresh-token.php`
- [ ] `platform/modules/google-api/settings.php`
- [ ] `platform/business-profile-callback.php`
- [ ] `platform/onboarding/gmail.php`
- [ ] `platform/onboarding/gmail-callback.php`
- [ ] `modules/google-calendar/oauth2callback.php`
- [ ] `modules/google-calendar/create_event.php`
- [ ] `api/facebook_leadform.php`

### Stripe Files (Priority 2)
- [ ] `platform/buildplan/config.php`
- [ ] `platform/buildplan/basic-index.php`
- [ ] `stripe-config.php`

### Google Maps Files (Priority 3)
- [ ] All files with hardcoded `AIza...` keys (40+ files)

---

## LONG-TERM FIX: Environment Variables

After rotating, implement proper secrets management:

```php
// NEW: .env file (NOT in git)
DB_HOST=my-marketing-pro.cluster-c3mws4moov6r.us-east-2.rds.amazonaws.com
DB_USER=admin
DB_PASS=<NEW_PASSWORD>
DB_NAME=mmp_app

GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=<NEW_SECRET>

STRIPE_PUBLISHABLE_KEY=<NEW_KEY>
STRIPE_SECRET_KEY=<NEW_KEY>

TWILIO_ACCOUNT_SID=...
TWILIO_API_KEY_SID=<NEW_KEY>
TWILIO_API_KEY_SECRET=<NEW_SECRET>

GOOGLE_MAPS_API_KEY=<NEW_KEY>
WATT_API_KEY=<NEW_KEY>
```

```php
// NEW: includes/load-env.php
<?php
// Load environment variables from .env file
$envFile = __DIR__ . '/../.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($key, $value) = explode('=', $line, 2);
        putenv(trim($key) . '=' . trim($value));
        $_ENV[trim($key)] = trim($value);
    }
}
```

```php
// UPDATED: includes/config.php
<?php
require_once __DIR__ . '/load-env.php';

// Auto-detect environment
if ($_SERVER['HTTP_HOST'] === 'localhost' || strpos($_SERVER['HTTP_HOST'], 'localhost:') === 0) {
    // Local development
    $host = 'localhost';
    $db = 'mmp_app';
    $user = 'root';
    $pass = '';
} else {
    // Production - use environment variables
    $host = getenv('DB_HOST');
    $db = getenv('DB_NAME');
    $user = getenv('DB_USER');
    $pass = getenv('DB_PASS');
}

// API Keys from environment
define('GOOGLE_CLIENT_SECRET', getenv('GOOGLE_CLIENT_SECRET'));
define('STRIPE_SECRET_KEY', getenv('STRIPE_SECRET_KEY'));
define('TWILIO_API_KEY_SECRET', getenv('TWILIO_API_KEY_SECRET'));
define('GOOGLE_MAPS_API_KEY', getenv('GOOGLE_MAPS_API_KEY'));
define('WATT_API_KEY', getenv('WATT_API_KEY'));
```

---

## VERIFY FIXES

After rotating all keys:

1. **Test locally**:
   ```bash
   make server
   # Test login, payments, maps, etc.
   ```

2. **Deploy to production**:
   ```bash
   # Upload new .env file to server
   scp .env mymarketingpro:/var/www/sftp/app/

   # Deploy code changes
   make deploy
   ```

3. **Monitor for errors**:
   ```bash
   ssh mymarketingpro
   tail -f /var/log/nginx/error.log
   tail -f /var/log/php/error.log
   ```

---

## PREVENT FUTURE INCIDENTS

1. **Update .gitignore** to ensure .env is never committed:
   ```
   .env
   .env.*
   !.env.example
   ```

2. **Create .env.example** template (safe to commit):
   ```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=
   # ... (with placeholder values)
   ```

3. **Add pre-commit hook** to scan for secrets:
   ```bash
   #!/bin/bash
   # Check for potential secrets before commit
   if git diff --cached | grep -i "sk_live_\|password.*=.*[^']$\|secret.*="; then
     echo "⚠️  WARNING: Potential secret detected in commit!"
     exit 1
   fi
   ```

4. **Use GitHub Secret Scanning** (now available since repo was public):
   - Go to: Repository Settings → Security → Secret scanning
   - Enable alerts

---

## TIMELINE

- **T+0**: Repository made public (accident)
- **T+?**: Services detected and disabled keys
- **T+now**: Repository made private
- **Next 1 hour**: Rotate all critical keys
- **Next 24 hours**: Implement environment variable system
- **Next week**: Audit all code for remaining hardcoded secrets

---

## STATUS TRACKING

### Rotation Status
- [ ] RDS Database Password
- [ ] Stripe Live Secret Key
- [ ] Stripe Test Secret Key
- [ ] Twilio API Key
- [ ] Google OAuth Secrets (5 different secrets)
- [ ] Google Maps API Keys (5 different keys)
- [ ] WATT API Key

### Implementation Status
- [ ] Create .env file
- [ ] Create load-env.php
- [ ] Update includes/config.php
- [ ] Update config.php
- [ ] Update all OAuth files
- [ ] Update all Stripe files
- [ ] Test locally
- [ ] Deploy to production
- [ ] Verify all functionality

---

## NOTES

- **DO NOT commit new credentials** to git
- **DO NOT push .env file** to GitHub
- Keep this incident response doc in /docs for future reference
- Document which services were affected and how long they were down
