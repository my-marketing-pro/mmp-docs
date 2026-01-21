---
title: Local Development Setup
description: Step-by-step guide to setting up your local development environment
---

This guide will help you set up a local development environment for the My Marketing Pro application.

## Prerequisites

- **PHP 7.4+**: Built-in PHP development server
- **MySQL 8.0**: Database server (via Homebrew on macOS)
- **Git**: Version control
- **SSH Access**: Configured access to production server

## Installation Steps

### 1. Install MySQL via Homebrew

```bash
# Install MySQL
brew install mysql

# Start MySQL service
brew services start mysql

# Verify it's running
brew services list | grep mysql
```

### 2. Create Local Database

```bash
# Connect to MySQL
mysql -u root

# Create the database
CREATE DATABASE mmp_app;

# Exit MySQL
exit
```

### 3. Clone the Repository

```bash
cd ~/Desktop/mmp
git clone https://github.com/my-marketing-pro/mmp-webapp.git
cd mmp-webapp
```

### 4. Import Database Schema

Use the Makefile command to sync the production database schema to your local environment:

```bash
# Full sync: export from production and import locally
make db-sync
```

Or do it manually:

```bash
# Export from production
make db-export

# Import to local
make db-import
```

### 5. Configure Environment

The application auto-detects whether you're running locally or in production based on the hostname.

**Check your config files:**
- `config.php` - Main configuration
- `includes/config.php` - Additional configuration
- `includes/db.php` - Database connection

These files already have localhost detection built in:

```php
if ($_SERVER['HTTP_HOST'] === 'localhost' || strpos($_SERVER['HTTP_HOST'], 'localhost:') === 0) {
    $host = 'localhost';
    $db = 'mmp_app';
    $user = 'root';
    $pass = '';
}
```

## Running the Development Server

### Start PHP Development Server

```bash
# Start server on http://localhost:8000
make server

# Or manually:
php -S localhost:8000
```

### Access the Application

Open your browser and navigate to:
- **Main App**: http://localhost:8000
- **Dashboard**: http://localhost:8000/app-dashboard.php
- **Auth**: http://localhost:8000/app-auth.php

## Database Management

### Start/Stop MySQL

```bash
# Start MySQL
make db-start

# Stop MySQL
make db-stop
```

### Sync Database Schema

```bash
# Sync production schema to local
make db-sync
```

### Manual Database Access

```bash
# Connect to local database
mysql -u root mmp_app

# Check tables
SHOW TABLES;

# View database structure
DESCRIBE app_users;
```

## Troubleshooting

### Port Already in Use

If port 8000 is already in use:

```bash
# Use a different port
php -S localhost:8001
```

### MySQL Connection Error

Check if MySQL is running:

```bash
brew services list | grep mysql
```

If it's not running:

```bash
brew services start mysql
```

### Database Import Errors

If the database import fails, check that:
1. MySQL is running
2. The database `mmp_app` exists
3. The schema file exists at `/tmp/mmp_app_schema.sql`

```bash
# Verify file exists
ls -lh /tmp/mmp_app_schema.sql

# Check database exists
mysql -u root -e "SHOW DATABASES LIKE 'mmp_app';"
```

## Next Steps

- [Database Structure](/mmp-docs/architecture/database-structure/) - Understand the database schema
- [Git Workflow](/mmp-docs/workflows/git/) - Learn the Git workflow
- [Makefile Commands](/mmp-docs/reference/makefile/) - Quick command reference
