---
title: Deployment
description: Deployment procedures and best practices
---

## Deployment Overview

Deployments push code from the `main` branch on GitHub to the production server via SSH and Git.

## Quick Deployment

```bash
# Deploy main branch to production
make deploy
```

This command:
1. SSHs into production server
2. Stashes any uncommitted changes
3. Checks out `main` branch
4. Pulls latest code from GitHub
5. Pops stashed changes (if any)

## Full Deployment Process

### 1. Pre-Deployment Checklist

- [ ] Code tested locally
- [ ] All tests passing
- [ ] Database migrations prepared (if needed)
- [ ] No breaking changes to coworker's workflow
- [ ] Coworker notified of deployment
- [ ] Backup plan ready

### 2. Check Current Production State

```bash
# Check what's on production server
make status

# Should show:
# - Current branch (should be 'main')
# - Clean working directory (or pending auto-commits)
# - Latest commit
```

### 3. Review Changes to Deploy

```bash
# See what will be deployed
git log origin/main..main --oneline

# Or check GitHub
open "https://github.com/my-marketing-pro/mmp-webapp/commits/main"
```

### 4. Deploy

```bash
# Deploy to production
make deploy
```

**What happens:**
```bash
ssh mymarketingpro "cd /var/www/sftp/app &&
  sudo git stash &&
  sudo git checkout main &&
  sudo git pull &&
  sudo git stash pop 2>/dev/null || true"
```

### 5. Verify Deployment

```bash
# Check production status
make status

# Should show:
# - On branch main
# - Latest commit matches your local
# - No errors
```

### 6. Test Production

1. Open production site in browser
2. Test the changed functionality
3. Check browser console for errors
4. Monitor for any issues

### 7. Monitor

```bash
# SSH into server
ssh mymarketingpro

# Check error logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/php/error.log

# Check application logs
cd /var/www/sftp/app
tail -f logs/app.log  # If you have app logging
```

## Deployment with Database Changes

If your deployment includes database migrations:

### 1. Prepare Migration Script

Create migration file locally:
```sql
-- migrations/2026-01-21-add-user-preferences.sql
ALTER TABLE app_users
ADD COLUMN preferences JSON NULL AFTER email;

CREATE INDEX idx_user_preferences ON app_users(preferences);
```

### 2. Test Migration Locally

```bash
# Test on local database
mysql -u root mmp_app < migrations/2026-01-21-add-user-preferences.sql

# Verify
mysql -u root mmp_app -e "DESCRIBE app_users;"
```

### 3. Deploy Code

```bash
# Deploy application code first
make deploy
```

### 4. Run Migration on Production

```bash
# SSH into server
ssh mymarketingpro

# Navigate to app directory
cd /var/www/sftp/app

# Run migration
mysql -h my-marketing-pro.cluster-c3mws4moov6r.us-east-2.rds.amazonaws.com \
  -u admin -p \
  mmp_app < migrations/2026-01-21-add-user-preferences.sql

# Verify
mysql -h my-marketing-pro.cluster-c3mws4moov6r.us-east-2.rds.amazonaws.com \
  -u admin -p \
  -e "DESCRIBE mmp_app.app_users;"
```

### 5. Test Application

Test that the new feature works with the new database structure.

## Deployment Scenarios

### Scenario 1: Normal Deployment

Simple code changes, no database changes, no breaking changes.

```bash
make deploy
```

### Scenario 2: Hotfix Deployment

Critical bug fix that needs to go out immediately.

```bash
# Make fix locally
git add .
git commit -m "Hotfix: Fix critical authentication bug"
git push origin main

# Deploy immediately
make deploy

# Verify fix
open "https://production-url.com"
```

### Scenario 3: Coordinated Deployment

Large changes that require coworker to pause FTP edits.

1. **Notify coworker**: "Deploying in 10 minutes, please save your work"
2. **Wait for confirmation**: Ensure no active FTP edits
3. **Deploy**:
```bash
make deploy
```
4. **Verify and notify**: "Deployment complete, safe to resume"

### Scenario 4: Rollback Deployment

Something broke, need to rollback.

```bash
# Find last good commit
git log --oneline -10

# Rollback locally
git reset --hard <last-good-commit>

# Force push (careful!)
git push origin main --force

# Deploy the rollback
make deploy
```

### Scenario 5: Deployment with Downtime

Changes that require brief downtime.

1. **Put up maintenance page** (if you have one)
2. **Make changes**
3. **Deploy**
4. **Verify**
5. **Remove maintenance page**

## Deployment Best Practices

### Timing

**Best times to deploy:**
- Low-traffic periods (early morning, late evening)
- Weekdays (not Friday!)
- When coworker is available for coordination

**Avoid deploying:**
- During peak usage hours
- Friday afternoons (weekend issues)
- When coworker is actively editing via FTP
- Late at night when you can't monitor

### Communication

**Before deployment:**
- Review changes with team
- Notify coworker of deployment window
- Prepare rollback plan

**During deployment:**
- Monitor logs
- Test immediately after deployment
- Keep team updated

**After deployment:**
- Confirm successful deployment
- Monitor for issues
- Document any problems

### Safety

**Always have a rollback plan:**
```bash
# Know the last good commit
git log --oneline -5

# Test rollback process before you need it
# (on a test environment if available)
```

**Use feature flags for big changes:**
```php
// In config.php
define('FEATURE_NEW_UI', false);

// In code
if (FEATURE_NEW_UI) {
    // New code
} else {
    // Old code
}
```

## Troubleshooting Deployments

### Deployment Hangs

```bash
# Cancel with Ctrl+C
# SSH into server manually
ssh mymarketingpro

# Check what's happening
cd /var/www/sftp/app
sudo git status

# If stuck, kill git process
ps aux | grep git
sudo kill <pid>

# Try deployment again
make deploy
```

### Merge Conflicts During Deployment

```bash
# SSH into server
ssh mymarketingpro
cd /var/www/sftp/app

# Check status
sudo git status

# If conflicts, decide:
# Option 1: Keep production changes
sudo git checkout --theirs .
sudo git add .

# Option 2: Keep main branch changes
sudo git checkout --ours .
sudo git add .

# Complete merge
sudo git commit -m "Resolve merge conflict during deployment"

# Try deployment again from local
make deploy
```

### Permission Errors

```bash
# On server
ssh mymarketingpro
cd /var/www/sftp/app

# Check permissions
ls -lh

# Fix if needed
sudo chown -R www-data:www-data .

# Ensure Git directory is accessible
sudo chmod -R 755 .git/
```

### Git Lock File

```bash
# On server
ssh mymarketingpro
cd /var/www/sftp/app

# Remove lock file
sudo rm -f .git/index.lock

# Try deployment again
make deploy
```

## Automated Deployments (Future)

Consider setting up CI/CD:

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        run: |
          ssh ${{ secrets.SSH_HOST }} "cd /var/www/sftp/app && sudo git pull"
```

### Benefits of CI/CD

- Automated testing before deployment
- Consistent deployment process
- Deployment history and audit trail
- Rollback automation

## Deployment Checklist Template

```markdown
## Deployment: [Feature Name]
Date: [YYYY-MM-DD]
Deployed by: [Your Name]

### Pre-Deployment
- [ ] Code reviewed
- [ ] Tested locally
- [ ] Database migrations prepared
- [ ] Coworker notified
- [ ] Backup plan ready

### Deployment
- [ ] Deployed with `make deploy`
- [ ] Migration run (if needed)
- [ ] Production tested
- [ ] Error logs checked

### Post-Deployment
- [ ] Functionality verified
- [ ] No errors in logs
- [ ] Coworker notified of completion
- [ ] Documentation updated

### Rollback Plan
Last good commit: [commit-hash]
Command: `git reset --hard [commit-hash] && git push --force && make deploy`

### Notes
[Any issues, observations, or follow-ups]
```

## Next Steps

- [Git Workflow](/mmp-docs/workflows/git/) - Version control process
- [Development Workflow](/mmp-docs/workflows/development/) - Development best practices
- [Makefile Commands](/mmp-docs/reference/makefile/) - Command reference
