---
title: Architecture Overview
description: High-level overview of the My Marketing Pro application architecture
---

## System Architecture

My Marketing Pro is a PHP-based marketing automation platform that follows a traditional server-side architecture with direct file access patterns.

### Application Type

- **Monolithic PHP Application**: Single codebase with all functionality
- **Direct File Access**: URLs map directly to PHP files
- **No Framework**: Custom implementation without a full framework
- **Mixed Architecture**: Legacy and modern code coexist

## Technology Stack

### Backend
- **PHP 7.4+**: Server-side language
- **MySQL 8.0**: Relational database (AWS RDS)
- **Nginx**: Web server
- **Cron Jobs**: Scheduled tasks and automation

### Frontend
- **Vanilla JavaScript**: No framework
- **HTML/CSS**: Traditional server-rendered pages
- **AJAX**: Asynchronous calls to backend

### Infrastructure
- **AWS EC2**: Application server (Ubuntu)
- **AWS RDS**: MySQL database
- **Nginx**: Reverse proxy and web server
- **Git**: Version control with GitHub

## Directory Structure

```
/var/www/sftp/app/               <- Production root
├── admin/                        <- Admin panel files
├── ajax/                         <- AJAX request handlers
├── api/                          <- API endpoints
├── app-functions/                <- Shared PHP functions
├── assets/                       <- Static assets (CSS, JS, images)
├── controllers/                  <- Business logic controllers
├── cron/                         <- Cron job scripts
├── includes/                     <- Shared includes and configs
├── modules/                      <- Third-party modules
├── testing/                      <- Test files (gitignored)
├── uploads/                      <- User uploads
├── app-*.php                     <- Main application pages
├── admin-*.php                   <- Admin pages
├── config.php                    <- Main configuration
└── Makefile                      <- Development commands
```

## Request Flow

### 1. Direct Page Access
```
User → Nginx → PHP File → Database → Response
```

Example: `https://example.com/app-dashboard.php`
- Nginx serves the file directly
- PHP executes and queries database
- HTML returned to browser

### 2. AJAX Requests
```
Browser → AJAX → ajax/*.php → Database → JSON Response
```

Example: `POST /ajax/get-contacts.php`
- JavaScript makes async request
- PHP handler processes and queries DB
- JSON returned to client

### 3. API Endpoints
```
External System → API → api/*.php → Database → JSON
```

Example: `POST /api/webhook.php`
- Webhook or API client makes request
- PHP validates and processes
- JSON response returned

## Code Patterns

### Configuration
- Environment detection (localhost vs production) based on hostname
- Database credentials in `config.php`
- Auto-detection avoids need for `.env` files

### Database Access
- Direct MySQLi connections
- Procedural queries (not ORM)
- Mix of prepared statements and direct queries

### Authentication
- Session-based authentication
- OAuth integration (Google)
- Token-based API authentication

### File Organization Challenges

Current state:
- **194 PHP files in root** (should be ~10-15)
- **41 subdirectories** (structure exists but underutilized)
- **Mix of active, test, and legacy code**

See [File Organization](/mmp-docs/architecture/file-organization/) for cleanup plan.

## Data Flow

### User Registration
```
1. User visits app-auth.php
2. OAuth flow (Google)
3. Token stored in app_auth_tokens
4. User record created in app_users
5. Redirect to app-dashboard.php
```

### Campaign Creation
```
1. User accesses app-campaign-builder.php
2. AJAX calls to ajax/campaign-*.php
3. Data saved to app-campaigns table
4. Related records in campaign_* tables
5. Analytics tracked in app_campaign_analytics
```

### Email Sending
```
1. Campaign scheduled
2. Cron job processes app-email_queue
3. External email API called
4. Tracking pixel added to email
5. Opens/clicks recorded in app-email_tracking
```

## Multi-Tenancy

The application supports multiple white-label domains:

```php
// In config.php
$wl_domain = $_SERVER['SERVER_NAME'];

$sql = "SELECT * FROM domains WHERE domain = '".$wl_domain."'";
$result = $db->query($sql);

// Each domain gets custom branding
$wl_name = $row["name"];
$wl_logo = $row["logo"];
```

## Deployment Architecture

### Development Flow
```
Local Dev → GitHub (main) → Production Server
```

### FTP Flow (Coworker)
```
FTP Client → Production Server → Auto-commit (production branch)
```

### Deployment
```
GitHub (main) → SSH + Git Pull → Production Server
```

See [Deployment](/mmp-docs/workflows/deployment/) for details.

## Performance Considerations

### Current Optimizations
- Database query caching
- Session management
- CDN for static assets (if configured)

### Known Bottlenecks
- Large table scans (campaignlocations is 224MB)
- No query optimization layer
- Direct file access (no opcode cache mentioned)

## Security

### Authentication
- OAuth 2.0 (Google)
- Session tokens
- Login attempt tracking

### Database
- Some prepared statements
- Input validation present
- ⚠️ Some direct query concatenation (SQL injection risk)

### File Access
- User uploads directory
- ⚠️ No mention of file type validation

## Next Steps

- [Database Structure](/mmp-docs/architecture/database-structure/) - Explore all 405 tables
- [File Organization](/mmp-docs/architecture/file-organization/) - Cleanup plan
- [Git Workflow](/mmp-docs/workflows/git/) - Version control process
