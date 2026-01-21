---
title: Development Workflow
description: Best practices and workflows for local development
---

## Daily Development Workflow

### 1. Start Your Day

```bash
# Navigate to project
cd ~/Desktop/mmp/mmp-webapp

# Pull latest changes
make pull

# Check for coworker's changes
make diff

# Start MySQL if needed
make db-start

# Start PHP dev server
make server
```

Your local app is now running at `http://localhost:8000`

### 2. Make Changes

Edit files in your IDE/editor:
- PHP files for backend logic
- JavaScript files in `assets/js/`
- CSS files in `assets/css/`
- HTML in PHP templates

### 3. Test Locally

```bash
# Access your local site
open http://localhost:8000

# Test specific pages
open http://localhost:8000/app-dashboard.php
open http://localhost:8000/app-crm-full.php
```

### 4. Commit Changes

```bash
# Check what changed
git status

# Stage changes
git add .

# Commit with descriptive message
git commit -m "Fix: Resolve authentication redirect loop in app-auth.php"

# Push to GitHub
git push origin main
```

### 5. Deploy

```bash
# Deploy to production
make deploy

# Verify deployment
make status
```

## Development Best Practices

### Environment Detection

The app auto-detects environment based on hostname:

```php
// In config.php
if ($_SERVER['HTTP_HOST'] === 'localhost' || strpos($_SERVER['HTTP_HOST'], 'localhost:') === 0) {
    // Local development
    $host = 'localhost';
    $db = 'mmp_app';
    $user = 'root';
    $pass = '';
} else {
    // Production
    $host = 'my-marketing-pro.cluster-c3mws4moov6r.us-east-2.rds.amazonaws.com';
    $db = 'mmp_app';
    $user = 'admin';
    $pass = 'J6Jq4i358ht)49';
}
```

### Testing Changes

**Always test locally before deploying:**

1. **Functionality**: Does it work as expected?
2. **Error handling**: Check PHP warnings/errors
3. **Database**: Verify queries work
4. **JavaScript**: Check browser console
5. **Responsive**: Test on different screen sizes

### Database Changes

If you modify database structure:

```bash
# Export schema from production (if needed)
make db-export

# Or manually create migration script
mysql -u root mmp_app < migrations/add_new_field.sql
```

Remember: Schema changes affect production!

### File Changes

**Before moving or renaming files:**

```bash
# Search for references
grep -r "old-filename.php" .

# Check JavaScript
grep -r "old-filename.php" assets/js/

# Check AJAX calls
grep -r "url.*old-filename" assets/js/
```

## Code Style Guidelines

### PHP

```php
// Use descriptive variable names
$userEmail = $row['email'];  // Good
$e = $row['email'];           // Bad

// Always check for undefined array keys
$redirect = $_GET['redirect'] ?? '';

// Use prepared statements for security
$stmt = $db->prepare("SELECT * FROM app_users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
```

### JavaScript

```javascript
// Use const/let, not var
const userId = document.getElementById('user-id').value;

// Use async/await for AJAX
async function fetchContacts() {
  const response = await fetch('/ajax/get-contacts.php');
  const data = await response.json();
  return data;
}

// Handle errors
try {
  const contacts = await fetchContacts();
} catch (error) {
  console.error('Error fetching contacts:', error);
}
```

### SQL

```sql
-- Use clear table aliases
SELECT
    u.id,
    u.email,
    c.name as company_name
FROM app_users u
LEFT JOIN app_contacts c ON u.id = c.user_id;

-- Add indexes for performance
CREATE INDEX idx_user_email ON app_users(email);
```

## Debugging

### PHP Errors

**Enable error reporting locally:**

```php
// Add to top of file temporarily
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

**Check PHP logs:**

```bash
# On server
ssh mymarketingpro
tail -f /var/log/php/error.log
```

### Database Queries

**Test queries in MySQL:**

```bash
# Connect locally
mysql -u root mmp_app

# Run query
SELECT * FROM app_users WHERE email = 'test@example.com';

# Explain query for performance
EXPLAIN SELECT * FROM app_users WHERE email = 'test@example.com';
```

### AJAX Debugging

**Check browser console:**
```javascript
// Add console logs
console.log('Request data:', requestData);

// Log responses
fetch('/ajax/endpoint.php')
  .then(response => response.json())
  .then(data => console.log('Response:', data));
```

**Check network tab:**
1. Open DevTools (F12)
2. Go to Network tab
3. Make request
4. Inspect request/response

## Common Tasks

### Adding a New Page

1. Create PHP file in root: `app-new-feature.php`
2. Include necessary headers:
```php
<?php
session_start();
require_once 'config.php';
require_once 'includes/auth.php';
?>
<!DOCTYPE html>
<html>
<head>
    <title>New Feature</title>
</head>
<body>
    <!-- Your content -->
</body>
</html>
```

3. Add to navigation if needed
4. Test locally
5. Commit and deploy

### Adding an AJAX Endpoint

1. Create file in `ajax/` directory: `ajax/new-endpoint.php`
2. Handle request:
```php
<?php
session_start();
require_once '../config.php';

header('Content-Type: application/json');

// Validate session
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// Process request
$data = json_decode(file_get_contents('php://input'), true);

// Query database
$stmt = $db->prepare("SELECT * FROM table WHERE id = ?");
$stmt->bind_param("i", $data['id']);
$stmt->execute();
$result = $stmt->get_result();

// Return response
echo json_encode([
    'success' => true,
    'data' => $result->fetch_assoc()
]);
```

3. Call from JavaScript:
```javascript
fetch('/ajax/new-endpoint.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id: 123 })
})
.then(response => response.json())
.then(data => console.log(data));
```

### Adding a Database Table

1. Create migration script:
```sql
-- migrations/add_new_table.sql
CREATE TABLE IF NOT EXISTS app_new_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES app_users(id)
);
```

2. Run locally:
```bash
mysql -u root mmp_app < migrations/add_new_table.sql
```

3. Run on production:
```bash
ssh mymarketingpro
cd /var/www/sftp/app
mysql -h [rds-host] -u admin -p mmp_app < migrations/add_new_table.sql
```

## Performance Tips

### Query Optimization

```sql
-- Bad: Loads all fields
SELECT * FROM app_contacts;

-- Good: Only needed fields
SELECT id, email, name FROM app_contacts;

-- Use indexes
CREATE INDEX idx_email ON app_contacts(email);

-- Use LIMIT for pagination
SELECT * FROM app_contacts LIMIT 50 OFFSET 0;
```

### Caching

```php
// Cache database results
$cacheKey = 'user_' . $userId;
if (isset($_SESSION[$cacheKey])) {
    $user = $_SESSION[$cacheKey];
} else {
    $user = getUserFromDatabase($userId);
    $_SESSION[$cacheKey] = $user;
}
```

### Minimize Database Calls

```php
// Bad: N+1 query problem
foreach ($users as $user) {
    $contacts = getContactsForUser($user['id']);  // Query in loop!
}

// Good: Single query with JOIN
$sql = "
    SELECT u.*, c.*
    FROM app_users u
    LEFT JOIN app_contacts c ON u.id = c.user_id
";
```

## Security Checklist

Before deploying:

- [ ] SQL injection: Use prepared statements
- [ ] XSS: Escape output with `htmlspecialchars()`
- [ ] CSRF: Validate tokens on forms
- [ ] Authentication: Check session on protected pages
- [ ] File uploads: Validate file types
- [ ] Sensitive data: Never commit credentials
- [ ] Error messages: Don't expose system details

## Deployment Checklist

Before deploying:

- [ ] Code tested locally
- [ ] No PHP warnings/errors
- [ ] Database migrations tested
- [ ] JavaScript console clean
- [ ] Commit message descriptive
- [ ] Coworker notified of deployment
- [ ] Backup plan ready

After deploying:

- [ ] Test on production
- [ ] Check error logs
- [ ] Verify database changes
- [ ] Monitor for issues

## Useful Commands

### Database

```bash
# Export production schema
make db-export

# Import to local
make db-import

# Full sync
make db-sync

# Start/stop MySQL
make db-start
make db-stop
```

### Git

```bash
# Pull latest
make pull

# Check coworker changes
make diff

# View commits
make log

# Deploy
make deploy
```

### Server

```bash
# Start PHP server
make server

# SSH into production
make ssh

# Check production status
make status
```

## Next Steps

- [Git Workflow](/mmp-docs/workflows/git/) - Version control process
- [Deployment](/mmp-docs/workflows/deployment/) - Deployment procedures
- [Makefile Commands](/mmp-docs/reference/makefile/) - Command reference
