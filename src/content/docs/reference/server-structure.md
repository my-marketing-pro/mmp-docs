---
title: Server Structure
description: Complete reference for the AWS production server structure and organization
---

# Server Structure Reference

## AWS Production Server: 18.218.4.234

### Standard Linux Directory Structure

```
/                           <- Root of everything
|-- home/                   <- User home directories (like Users/ on Mac)
|   |-- ubuntu/             <- Your personal space when you SSH in
|   +-- otheruser/
|
|-- var/                    <- "Variable" data - things that change during operation
|   |-- www/                <- Web server files (convention, not required)
|   |-- log/                <- System logs
|   +-- mail/               <- Email storage
|
|-- etc/                    <- Configuration files
|   |-- nginx/              <- Nginx config
|   +-- ssh/                <- SSH server config
|
|-- usr/                    <- User programs (installed software)
|   |-- bin/                <- Commands like git, php, etc.
|   +-- lib/                <- Libraries
|
|-- bin/                    <- Essential commands (ls, cp, etc.)
|-- root/                   <- Root user's home directory (admin)
|-- tmp/                    <- Temporary files
+-- opt/                    <- Optional/third-party software
```

### Why `/var/www/`?

- `var` = "variable" - data that changes frequently (as opposed to system files)
- Web content changes often (uploads, edits, etc.), so it lives in `/var`
- `/var/www/` is a convention that web servers (Apache, Nginx) use by default
- You could technically put websites anywhere, but this is the standard

### Home Directory vs Web Root

| `/home/ubuntu/` | `/var/www/sftp/app/` |
|-----------------|----------------------|
| Your personal workspace | Where the website actually runs |
| Only you can access | Web server (Nginx) serves this to the internet |
| Put scripts, tools, personal projects here | Put website files here |
| Not publicly accessible | Publicly accessible via HTTP |

---

## Our Server's Actual Structure

```
/
|-- home/
|   +-- ubuntu/                     <- Where you land when you SSH in
|       |-- my-websocket-app/       <- Node.js WebSocket app
|       |-- twilio-caller/          <- Twilio integration
|       |-- native-websocket/
|       +-- whisper-env/            <- AI/transcription related
|
|-- var/
|   +-- www/
|       |-- html/                   <- Default Nginx page (mostly unused)
|       |-- sftp/                   <- Our actual websites live here
|       |   |-- app/                <- Main PHP app (My Marketing Pro)
|       |   |-- wordpress/          <- Main WordPress site
|       |   |-- wordpress-mylabelteam.com/
|       |   |-- wordpress-mylawyeradvertising.com/
|       |   |-- wordpress-myprospectingpro.com/
|       |   |-- wordpress-myrealtimeoffers.com/
|       |   |-- wordpress-themycoinc.com/
|       |   |-- wordpress-marketingmenus.com/
|       |   |-- wordpress-mygigpromoter.com/
|       |   |-- acellemail/         <- Email marketing software
|       |   +-- events/
|       +-- sftp.tar.gz             <- 2GB backup file
|
|-- etc/                            <- Configs (Nginx, PHP, MySQL, etc.)
|-- nfs/                            <- Network File System (shared storage)
|-- opt/                            <- Third-party software
|-- tmp/                            <- Temporary files
+-- root/                           <- Root user's home (not same as /)
```

---

## Main Application: `/var/www/sftp/app/`

This is the My Marketing Pro PHP application. Key directories and files:

```
/var/www/sftp/app/
|-- admin/                  <- Admin panel files
|-- ajax/                   <- AJAX handlers
|-- api/                    <- API endpoints
|-- app-functions/          <- Shared PHP functions
|-- app-dashboard.php       <- Main dashboard
|-- app-crm-full.php        <- CRM functionality
|-- app-auth.php            <- Authentication
|-- admin-dashboard.php     <- Admin dashboard
+-- ...                     <- Many more PHP files
```

---

## File Ownership

| Owner | Meaning |
|-------|---------|
| `root` | System files, requires sudo to modify |
| `www-data` | Web server user (Nginx/PHP runs as this) |
| `sftp` | Files uploaded via SFTP by coworker |
| `ubuntu` | Your user account |

---

## SSH Access

```bash
# SSH into server (manage server)
ssh mymarketingpro

# Or directly
ssh -i ~/.ssh/mymarketingpro ubuntu@18.218.4.234
```

## SFTP Access

```bash
# SFTP into server (file access)
sftp mymarketingpro
```

---

## Important Notes

- **Disk Usage**: Server is 86% full (41GB of 48GB). Monitor this.
- **Backup file**: `/var/www/sftp.tar.gz` is 2GB - can be deleted if not needed
- **Git**: Version 2.43.0 is installed on the server

---

## Git Workflow

### Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Your changes (dev team) - deploy from here |
| `production` | Coworker's FTP changes - auto-committed every 15 min |

### How It Works

```
Coworker (FTP) ──► Production Server ──► Cron auto-commits to `production` branch
                                                      │
                                                      ▼
                                         GitHub `production` branch
                                                      │
                                         You review changes via PR
                                                      │
                                                      ▼
You (local dev) ──► Push to `main` ◄─── Merge approved changes
                          │
                          ▼
              Deploy: ssh + git pull on server
```

### Your Workflow

```bash
# 1. Check for coworker's changes
#    Go to: https://github.com/my-marketing-pro/mmp-webapp/compare/main...production

# 2. If there are changes you want, create a PR to merge production → main

# 3. Work on your changes locally
git checkout main
# ... make edits ...
git add .
git commit -m "Your changes"
git push

# 4. Deploy your changes to production server
ssh mymarketingpro "cd /var/www/sftp/app && sudo git checkout main && sudo git pull"
```

### Auto-Commit Cron Job

- **Runs every 15 minutes** (at :00, :15, :30, :45)
- **Script location**: `/usr/local/bin/auto-commit-mmp.sh`
- **Log file**: `/var/log/auto-commit.log`
- **Commits to**: `production` branch

### Deploy Script

```bash
# To deploy main branch changes to production:
ssh mymarketingpro "cd /var/www/sftp/app && sudo git stash && sudo git checkout main && sudo git pull && sudo git stash pop"
```

### Viewing FTP Changes

To see what your coworker changed via FTP:
- **GitHub compare**: https://github.com/my-marketing-pro/mmp-webapp/compare/main...production
- **Create PR**: https://github.com/my-marketing-pro/mmp-webapp/pull/new/production
