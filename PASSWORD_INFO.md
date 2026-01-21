# Password Protected Documentation

## Access the Docs

**URL**: https://my-marketing-pro.github.io/mmp-docs/

**Current Password**: `mmp2026secure`

When you visit the site, you'll be prompted to enter the password. Once entered correctly, you'll stay authenticated for that browser session.

---

## Changing the Password

To change the password:

1. **Generate a new hash**:
   ```bash
   echo -n "YOUR_NEW_PASSWORD" | shasum -a 256
   ```

2. **Update the hash** in `public/password-protection.js`:
   ```javascript
   const EXPECTED_HASH = "YOUR_NEW_HASH_HERE";
   ```

3. **Commit and push**:
   ```bash
   git add public/password-protection.js
   git commit -m "Update documentation password"
   git push
   ```

4. GitHub Actions will automatically deploy the update in ~2 minutes

---

## Security Note

⚠️ **This is client-side protection only**

Anyone with technical skills can:
- View the source code and see the password hash
- Bypass the protection by modifying their browser's sessionStorage
- Access the built files directly if they know the exact URLs

**This is intended to**:
- Keep casual visitors out
- Prevent search engines from indexing
- Provide basic privacy during the security incident

**This is NOT intended to**:
- Protect against determined attackers
- Secure highly sensitive information
- Replace proper authentication

For the security incident response, this provides adequate protection while you rotate secrets.

---

## What's Protected

All documentation pages including:
- 🚨 Security Incident Response
- 🚨 Secret Rotation Checklist
- Getting Started guides
- Architecture docs
- Workflows
- Reference materials

---

## Quick Start - Rotating Secrets

1. Visit: https://my-marketing-pro.github.io/mmp-docs/security/rotation-checklist/
2. Enter password: `mmp2026secure`
3. Follow the step-by-step checklist
4. Mark off each item as you complete it

---

## Removing Password Protection

If you want to remove password protection later:

1. Delete `public/password-protection.js`
2. Remove the `head` configuration from `astro.config.mjs`:
   ```javascript
   // Remove this section:
   head: [
     {
       tag: 'script',
       attrs: {
         src: '/mmp-docs/password-protection.js',
         defer: true,
       },
     },
   ],
   ```
3. Commit and push

---

## Troubleshooting

**Password prompt doesn't appear**:
- Hard refresh the page (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Clear browser cache
- Try incognito/private window

**Password doesn't work**:
- Make sure you're using: `mmp2026secure`
- Check for extra spaces
- Try copying and pasting it

**Still can't access**:
- Wait 2-3 minutes after pushing for GitHub Actions to deploy
- Check deployment status: https://github.com/my-marketing-pro/mmp-docs/actions

---

## After the Emergency

Once you've rotated all secrets and the incident is resolved:

1. Consider making the docs repo private (GitHub Pro required)
2. Or use Cloudflare Access for real authentication
3. Or remove sensitive incident response docs from the public site
