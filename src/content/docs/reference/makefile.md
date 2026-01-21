---
title: Makefile Commands
description: Complete reference for all Makefile commands
---

The project includes a Makefile that provides convenient shortcuts for common development and deployment tasks.

## Quick Reference

| Command | Description |
|---------|-------------|
| `make` or `make help` | Show all available commands |
| `make deploy` | Deploy main branch to production |
| `make pull` | Pull latest from GitHub |
| `make sync` | Sync production branch to local |
| `make diff` | Show coworker's changes |
| `make log` | View recent production commits |
| `make ssh` | SSH into production server |
| `make status` | Check production server status |
| `make pr` | Open GitHub PR page |
| `make compare` | Open GitHub compare view |
| `make db-export` | Export production database schema |
| `make db-import` | Import schema to local MySQL |
| `make db-sync` | Full database sync (export + import) |
| `make db-start` | Start local MySQL service |
| `make db-stop` | Stop local MySQL service |
| `make server` | Start PHP development server |

## Deployment Commands

### `make deploy`

Deploy the `main` branch to production server.

```bash
make deploy
```

**What it does:**
1. SSH into production server
2. Stash any uncommitted changes
3. Checkout `main` branch
4. Pull latest code from GitHub
5. Pop stashed changes (if any)

**Example output:**
```
Deploying main branch to production...
Switched to branch 'main'
Already up to date.
Deploy complete!
```

**When to use:**
- After pushing changes to `main` branch
- When you want to sync production with GitHub

### `make pull`

Pull latest changes from GitHub `main` branch to local.

```bash
make pull
```

**Equivalent to:**
```bash
git pull origin main
```

**When to use:**
- Start of day to get latest changes
- Before starting new work
- After coworker merges changes

## Git Sync Commands

### `make sync`

Sync the `production` branch (coworker's FTP changes) to local.

```bash
make sync
```

**What it does:**
```bash
git fetch origin production
git checkout production
git pull origin production
git checkout main
```

**When to use:**
- To review coworker's FTP changes
- Before merging production changes into main
- To see what was auto-committed

### `make diff`

Show differences between `main` and `production` branches.

```bash
make diff
```

**Example output:**
```
Changes in production (FTP) not yet in main:
=============================================
 app-dashboard.php    | 12 ++++++++++--
 app-crm-full.php     |  5 +++--
 config.php           |  1 +
 3 files changed, 14 insertions(+), 4 deletions(-)
```

**When to use:**
- Daily check for coworker's changes
- Before creating a merge PR
- To see what's different between branches

### `make log`

View recent auto-commits on the `production` branch.

```bash
make log
```

**Example output:**
```
Recent auto-commits from production:
=====================================
a1b2c3d Auto-commit: 2026-01-21 14:30:00
e4f5g6h Auto-commit: 2026-01-21 14:15:00
i7j8k9l Auto-commit: 2026-01-21 14:00:00
```

**When to use:**
- See what coworker changed recently
- Check auto-commit frequency
- Review commit history

## Server Commands

### `make ssh`

SSH into the production server.

```bash
make ssh
```

**Equivalent to:**
```bash
ssh mymarketingpro
```

**Lands you in:**
```bash
ubuntu@ip-172-31-24-17:~$
```

**When to use:**
- Check server logs
- Run manual commands on server
- Troubleshoot issues

### `make status`

Check the production server's git status.

```bash
make status
```

**Example output:**
```
Production server git status:
==============================
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean

Current branch:
main
```

**When to use:**
- Verify current branch on server
- Check for uncommitted changes
- Ensure deployment succeeded

## GitHub Shortcuts

### `make pr`

Open GitHub to create a pull request from `production` to `main`.

```bash
make pr
```

**Opens:**
```
https://github.com/my-marketing-pro/mmp-webapp/compare/main...production?expand=1
```

**When to use:**
- After reviewing coworker's changes
- To merge FTP changes into main branch

### `make compare`

Open GitHub compare view to see differences.

```bash
make compare
```

**Opens:**
```
https://github.com/my-marketing-pro/mmp-webapp/compare/main...production
```

**When to use:**
- Visual review of coworker's changes
- Before creating PR
- Sharing changes with team

## Database Commands

### `make db-export`

Export production database schema to local file.

```bash
make db-export
```

**What it does:**
1. SSH into production server
2. Run `mysqldump --no-data` (structure only, no data)
3. Save to `/tmp/mmp_app_schema.sql`

**Example output:**
```
Exporting production database schema...
Schema exported to /tmp/mmp_app_schema.sql
   11124 /tmp/mmp_app_schema.sql
```

**File contains:**
- Table definitions
- Indexes
- Foreign keys
- Views
- ~11,124 lines

**When to use:**
- First time setup
- After production schema changes
- To update local structure

### `make db-import`

Import schema from `/tmp/mmp_app_schema.sql` to local MySQL.

```bash
make db-import
```

**What it does:**
```bash
mysql -u root mmp_app < /tmp/mmp_app_schema.sql
```

**When to use:**
- After running `make db-export`
- To sync local database structure
- After production adds new tables

**Prerequisites:**
- Local MySQL running
- `mmp_app` database exists
- Schema file exists at `/tmp/mmp_app_schema.sql`

### `make db-sync`

Full database sync: export from production and import to local.

```bash
make db-sync
```

**What it does:**
1. Run `make db-export`
2. Run `make db-import`

**This is the most common database command** for keeping local in sync.

**Example output:**
```
Syncing database schema from production to local...
Exporting production database schema...
Schema exported to /tmp/mmp_app_schema.sql
   11124 /tmp/mmp_app_schema.sql
Importing schema to local mmp_app database...
Import complete!
Database sync complete!
```

**When to use:**
- Daily or weekly to stay in sync
- After production schema changes
- When local database is out of date

### `make db-start`

Start local MySQL service.

```bash
make db-start
```

**What it does:**
```bash
brew services start mysql
```

**Example output:**
```
Starting MySQL...
==> Successfully started `mysql` (label: homebrew.mxcl.mysql)

Name   Status  User     File
mysql  started username ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
```

**When to use:**
- Start of development session
- After system restart
- When MySQL is not running

### `make db-stop`

Stop local MySQL service.

```bash
make db-stop
```

**What it does:**
```bash
brew services stop mysql
```

**When to use:**
- End of development session
- To free up system resources
- Before system maintenance

## Development Server

### `make server`

Start PHP development server on `localhost:8000`.

```bash
make server
```

**What it does:**
```bash
php -S localhost:8000
```

**Example output:**
```
Starting PHP development server on http://localhost:8000
Press Ctrl+C to stop
[Wed Jan 21 14:30:00 2026] PHP 7.4.33 Development Server (http://localhost:8000) started
```

**Access your app:**
- Main: `http://localhost:8000`
- Dashboard: `http://localhost:8000/app-dashboard.php`
- Auth: `http://localhost:8000/app-auth.php`

**To stop:** Press `Ctrl+C`

**When to use:**
- Local development
- Testing changes before deployment
- Working on features locally

## Command Combinations

### Daily Development Start

```bash
# Full setup for development
make pull          # Get latest code
make db-start      # Start MySQL
make db-sync       # Sync database
make server        # Start PHP server
```

### Review and Deploy Workflow

```bash
# Review coworker's changes
make diff          # See what changed
make log           # View commits
make compare       # Open GitHub

# If changes look good, merge then deploy
make deploy        # Deploy to production
make status        # Verify deployment
```

### Database Refresh

```bash
# Refresh local database structure
make db-sync       # Export from production, import to local
```

### Deployment Verification

```bash
# After deploying, verify
make status        # Check server status
make ssh           # SSH in to check logs
```

## Makefile Source

The Makefile is located at:
```
/Users/jzamudio/Desktop/mmp/mmp-webapp/Makefile
```

To see all commands:
```bash
make help
# or just:
make
```

## Customizing Commands

You can add your own commands to the Makefile:

```makefile
# Example: Add a custom command
.PHONY: test

test:
	@echo "Running tests..."
	php vendor/bin/phpunit tests/
```

Then use it:
```bash
make test
```

## Troubleshooting

### Command Not Found

```bash
make: command not found
```

**Solution:** Install make via Xcode Command Line Tools:
```bash
xcode-select --install
```

### SSH Connection Fails

```bash
make ssh
# Permission denied (publickey)
```

**Solution:** Ensure SSH key is loaded:
```bash
ssh-add ~/.ssh/mymarketingpro
```

### Database Commands Fail

```bash
make db-sync
# ERROR 2002: Can't connect to local MySQL server
```

**Solution:** Start MySQL first:
```bash
make db-start
# Wait a few seconds
make db-sync
```

### Server Port In Use

```bash
make server
# Address already in use
```

**Solution:** Use a different port:
```bash
php -S localhost:8001
```

## Next Steps

- [Git Workflow](/mmp-docs/workflows/git/) - Learn the Git workflow
- [Development Workflow](/mmp-docs/workflows/development/) - Development best practices
- [Deployment](/mmp-docs/workflows/deployment/) - Deployment procedures
