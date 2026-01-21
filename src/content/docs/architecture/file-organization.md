---
title: File Organization
description: Current file organization and cleanup plans
---

## Current State

### Root Directory Issues
- **194 PHP files in root** (should be ~10-15 max)
- **41 subdirectories** (good structure exists, just not being used)
- Mix of active code, test files, backups, and legacy code

### File Breakdown
- 37 `app-*.php` files (main application pages)
- 26 `test-*.php` files (test/debug files)
- 22 `watt-*.php` files (WATT integration)
- 8 `admin-*.php` files (admin pages)
- Many one-off scripts scattered around

## Cleanup Progress

### Phase 1: Safe Cleanup ✅ Complete

**Completed Actions:**
- ✅ Moved 26 test files to `/testing/` directory
- ✅ Deleted 9 empty files (0 bytes each)
- ✅ Updated `.gitignore` for test and archive directories
- ✅ Created comprehensive database documentation

**Files Moved to `/testing/`:**
- `test-*.php` (26 files)
- Examples: `test-api-ninjas.php`, `test-brand-building.php`, `test-email-api.php`, etc.

**Files Deleted (Empty):**
- `app-modal-brand-building.php` (0 bytes)
- `app-modal-direct-marketing.php` (0 bytes)
- `message-center-api.php` (0 bytes)
- `testp.php` (0 bytes)
- Several `untitled*.php` files (0 bytes each)

**Results:**
- Reduced root directory from **194 to 161 files** (17% reduction)
- Zero risk - no production code affected
- All test files preserved for reference

## Future Cleanup Phases

### Phase 2: Logical Grouping (Planned)

**Modal Files** (25 files):
```
Current: app-modal-*.php (in root)
Proposed: app/modals/ or pages/modals/
```

Modal files are used in AJAX calls, so paths need updating in JavaScript.

**Admin Files** (8 files):
```
Current: admin-*.php (in root)
Proposed: admin/pages/ or admin/
```

Admin pages are accessed directly, so either:
- Move and update links
- OR create redirects from old locations

**Integration Files** (22 files):
```
Current: watt-*.php (in root)
Proposed: integrations/watt/
```

WATT integration files may be called externally, needs careful testing.

### Phase 3: Modern Structure (Future)

Eventually migrate to:
- **MVC pattern** (Model-View-Controller)
- **PSR-4 autoloading** (no more manual requires)
- **Routing layer** (URLs don't map to files)
- **Dependency injection**
- **Environment-based config** (.env files)

**This requires:**
- Coordinating with coworker
- Rewriting URLs
- Testing extensively
- Gradual migration

## Recommended File Structure

### Ideal Structure (Long-term Goal)

```
/
├── public/                    <- Public entry points only
│   ├── index.php
│   ├── app-auth.php
│   ├── app-dashboard.php
│   └── assets/
│
├── app/                       <- Application logic
│   ├── controllers/           <- Business logic
│   ├── models/                <- Database models
│   ├── views/                 <- Templates
│   ├── middleware/            <- Request middleware
│   └── services/              <- Service layer
│
├── config/                    <- Configuration
│   ├── config.php
│   ├── database.php
│   └── services.php
│
├── integrations/              <- Third-party integrations
│   ├── watt/
│   ├── stripe/
│   ├── twilio/
│   └── google/
│
├── storage/                   <- Storage
│   ├── logs/
│   ├── uploads/
│   └── cache/
│
├── tests/                     <- Tests
│   ├── Unit/
│   ├── Integration/
│   └── Feature/
│
├── scripts/                   <- CLI scripts
│   ├── cron/
│   └── migrations/
│
└── vendor/                    <- Composer dependencies
```

## Safety Guidelines

### Before Moving Any File

1. **Search for references**
   ```bash
   grep -r "filename.php" .
   ```

2. **Check JavaScript includes**
   ```bash
   grep -r "filename.php" assets/js/
   ```

3. **Test locally first**
   - Move file locally
   - Test affected pages
   - Check browser console for errors

4. **Create redirects if needed**
   - Old location → New location
   - Use `.htaccess` or PHP redirect

5. **Deploy during low-traffic time**
   - Monitor for errors
   - Have rollback plan

## Known Constraints

### Important Limitations

1. **Coworker uses FTP** - Moving files will break his workflow
2. **Production is live** - Can't break existing URLs
3. **No .htaccess/routing** - Files accessed directly by path
4. **Git auto-commits** - Changes tracked every 15 minutes

**Recommendation**: Coordinate with coworker before major reorganization.

## File Categories

### Active Application Files
Main PHP files that serve pages or handle requests:
- `app-*.php` - Main application pages
- `admin-*.php` - Admin pages
- `ajax/*.php` - AJAX handlers
- `api/*.php` - API endpoints

### Integration Files
Third-party service integrations:
- `watt-*.php` - WATT integration
- Files in `modules/` directory
- OAuth callback handlers

### Configuration Files
- `config.php` - Main config
- `includes/config.php` - Additional config
- `includes/db.php` - Database connection

### Test Files ✅ Moved
- All `test-*.php` files now in `/testing/`
- Safe to ignore during development
- Preserved for reference

### Empty/Dead Files ✅ Deleted
- 9 empty files removed
- No functionality lost

## Naming Conventions

### Current Patterns

**Prefixes:**
- `app-` = Main application pages
- `admin-` = Admin pages
- `test-` = Test files (now in /testing/)
- `watt-` = WATT integration

**Database Tables:**
- `app-*` = New app tables (hyphenated)
- `app_*` = New app tables (underscored)
- No prefix = Legacy tables

## Next Steps

### Immediate (Complete)
- ✅ Documentation created
- ✅ Test files archived
- ✅ Empty files deleted

### Short Term (Pending Coworker Coordination)
- Group modal files
- Update JavaScript includes
- Test thoroughly
- Deploy incrementally

### Long Term (After Git Adoption)
- Introduce routing
- Refactor to MVC
- Implement autoloading
- Add proper testing

## Want to Proceed?

Before moving to Phase 2:
1. **Coordinate with coworker** about Git workflow
2. **Set up staging environment** for testing
3. **Create file movement plan** with rollback strategy
4. **Schedule deployment** during low-traffic period

Remember: The coworker's FTP workflow is currently a blocker for major reorganization.
