---
title: Database Setup
description: Configure MySQL locally and sync with production database
---

The My Marketing Pro application uses MySQL for data storage. This guide covers database setup and synchronization.

## Database Overview

### Production Database (AWS RDS)

- **Host**: `my-marketing-pro.cluster-c3mws4moov6r.us-east-2.rds.amazonaws.com`
- **Database**: `mmp_app`
- **User**: `admin`
- **Tables**: 405 tables across 23 feature areas

### Local Database

- **Host**: `localhost`
- **Database**: `mmp_app`
- **User**: `root`
- **Password**: (empty for local development)

## Quick Setup

### Create Local Database

```bash
# Connect to MySQL
mysql -u root

# Create database
CREATE DATABASE mmp_app;

# Exit
exit
```

### Sync Schema from Production

The easiest way to get the database structure locally:

```bash
# Export schema from production and import to local
make db-sync
```

This command:
1. Exports the schema (structure only, no data) from production
2. Saves it to `/tmp/mmp_app_schema.sql`
3. Imports it into your local `mmp_app` database

## Manual Database Operations

### Export Schema Only

```bash
# Export structure without data
make db-export
```

This creates `/tmp/mmp_app_schema.sql` (~11,124 lines) containing:
- Table definitions
- Indexes
- Foreign keys
- Views

### Import Schema

```bash
# Import the schema file
make db-import
```

### View Schema File

```bash
# Check the file size
ls -lh /tmp/mmp_app_schema.sql

# Preview the first few lines
head -50 /tmp/mmp_app_schema.sql

# Count lines
wc -l /tmp/mmp_app_schema.sql
```

## Database Management

### Start/Stop MySQL

```bash
# Start MySQL service
make db-start

# Stop MySQL service
make db-stop
```

### Check MySQL Status

```bash
# View running services
brew services list

# Check if MySQL is running
brew services list | grep mysql
```

### Connect to Database

```bash
# Connect to local database
mysql -u root mmp_app

# Common SQL commands
SHOW TABLES;                    # List all tables
DESCRIBE app_users;             # Show table structure
SELECT COUNT(*) FROM app_users; # Count records
```

## Configuration

The application automatically detects whether to use local or production database based on the hostname.

### Config Files

Check these files for database configuration:
- `config.php:15-18` - Main database connection
- `includes/config.php` - Additional configuration
- `includes/db.php` - Database helpers

### Local Detection

```php
if ($_SERVER['HTTP_HOST'] === 'localhost' || strpos($_SERVER['HTTP_HOST'], 'localhost:') === 0) {
    $host = 'localhost';
    $db = 'mmp_app';
    $user = 'root';
    $pass = '';
}
```

## Understanding the Schema

### Database Size

- **Total Tables**: 405
- **Schema File**: ~11,124 lines
- **Main Categories**: 23 feature areas

### Key Table Groups

1. **User Management** (15 tables)
   - `app_users`, `app_admins`, `app_auth_tokens`

2. **Contacts & CRM** (35 tables)
   - `app_contacts`, `app_contact_lists`, `app_contact_tags`

3. **Campaigns** (65+ tables)
   - `app-campaigns`, `app_campaign_analytics`

4. **Messaging** (50+ tables)
   - `app_email_campaigns`, `app_sms_messages`

See [Database Structure](/mmp-docs/architecture/database-structure/) for complete details.

## Troubleshooting

### "Database does not exist"

```bash
# Create the database
mysql -u root -e "CREATE DATABASE mmp_app;"
```

### "Access denied for user"

For local development, MySQL should allow root access without a password:

```bash
# Connect to MySQL as root
mysql -u root

# If that fails, reset the password
mysql.server stop
mysqld_safe --skip-grant-tables &
mysql -u root
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY '';
FLUSH PRIVILEGES;
```

### Import Fails with Errors

```bash
# Check MySQL version
mysql --version

# Ensure you're using MySQL 8.0+
brew upgrade mysql
```

### Schema File Not Found

```bash
# Re-export from production
make db-export

# Verify it was created
ls -lh /tmp/mmp_app_schema.sql
```

## Next Steps

- [Database Structure](/mmp-docs/architecture/database-structure/) - Understand all 405 tables
- [Local Development](/mmp-docs/getting-started/local-development/) - Complete setup guide
- [Development Workflow](/mmp-docs/workflows/development/) - Development best practices
