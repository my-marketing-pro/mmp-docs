// Simple client-side password protection
// Note: This is NOT secure against determined attackers
// For emergency use only - protects against casual visitors

// Password is hashed with SHA-256
// Current password: "mmp2026secure"
// To change password: generate new hash with: echo -n "YOUR_PASSWORD" | shasum -a 256
const EXPECTED_HASH = "98bb6a46decc519c7bebf2a1050359391866a594e4ee37850087db6a546229f0";

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function checkPassword() {
  // Check if already authenticated in this session
  if (sessionStorage.getItem('mmp_auth') === 'true') {
    document.body.style.visibility = 'visible';
    return true;
  }

  // Hide content initially
  document.body.style.visibility = 'hidden';

  // Prompt for password
  const password = prompt('🔒 This documentation is password protected.\n\nEnter password to continue:');

  if (!password) {
    document.body.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: system-ui, sans-serif; background: #f5f5f5;">
        <div style="text-align: center; padding: 40px; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 400px;">
          <h1 style="color: #333; margin-bottom: 16px;">🔒 Access Denied</h1>
          <p style="color: #666; margin-bottom: 24px;">Password required to view this documentation.</p>
          <button onclick="location.reload()" style="padding: 12px 24px; background: #000; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: 500;">
            Try Again
          </button>
        </div>
      </div>
    `;
    document.body.style.visibility = 'visible';
    return false;
  }

  const hash = await hashPassword(password);

  if (hash === EXPECTED_HASH) {
    sessionStorage.setItem('mmp_auth', 'true');
    document.body.style.visibility = 'visible';
    return true;
  } else {
    alert('❌ Incorrect password. Please try again.');
    location.reload();
    return false;
  }
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkPassword);
} else {
  checkPassword();
}
