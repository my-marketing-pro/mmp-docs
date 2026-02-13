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

function createPasswordModal() {
  const modal = document.createElement('div');
  modal.id = 'password-modal';
  modal.innerHTML = `
    <style>
      #password-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
        animation: fadeIn 0.3s ease-out;
        visibility: visible !important;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideUp {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
      }

      .modal-content {
        background: white;
        padding: 48px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-width: 440px;
        width: 90%;
        animation: slideUp 0.4s ease-out;
      }

      .modal-header {
        text-align: center;
        margin-bottom: 32px;
      }

      .lock-icon {
        font-size: 48px;
        margin-bottom: 16px;
        display: inline-block;
        animation: pulse 2s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      .modal-title {
        font-size: 28px;
        font-weight: 700;
        color: #1a1a1a;
        margin: 0 0 8px 0;
      }

      .modal-subtitle {
        font-size: 15px;
        color: #666;
        margin: 0;
        line-height: 1.5;
      }

      .password-form {
        margin-top: 32px;
      }

      .form-group {
        margin-bottom: 24px;
      }

      .form-label {
        display: block;
        font-size: 14px;
        font-weight: 600;
        color: #333;
        margin-bottom: 8px;
      }

      .password-input-wrapper {
        position: relative;
      }

      .password-input {
        width: 100%;
        padding: 14px 16px;
        font-size: 16px;
        border: 2px solid #e0e0e0;
        border-radius: 10px;
        outline: none;
        transition: all 0.2s;
        box-sizing: border-box;
        font-family: inherit;
      }

      .password-input:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
      }

      .password-input.error {
        border-color: #ef4444;
        animation: shake 0.4s ease-out;
      }

      .error-message {
        color: #ef4444;
        font-size: 14px;
        margin-top: 8px;
        display: none;
      }

      .error-message.show {
        display: block;
        animation: slideUp 0.2s ease-out;
      }

      .submit-button {
        width: 100%;
        padding: 14px 24px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
      }

      .submit-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
      }

      .submit-button:active {
        transform: translateY(0);
      }

      .submit-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
      }

      .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      /* Mobile responsiveness */
      @media (max-width: 480px) {
        .modal-content {
          padding: 32px 24px;
        }

        .modal-title {
          font-size: 24px;
        }

        .lock-icon {
          font-size: 40px;
        }
      }
    </style>

    <div class="modal-content">
      <div class="modal-header">
        <div class="lock-icon">🔒</div>
        <h1 class="modal-title">Password Protected</h1>
        <p class="modal-subtitle">This documentation requires authentication.<br>Please enter your password to continue.</p>
      </div>

      <form class="password-form" id="password-form">
        <div class="form-group">
          <label class="form-label" for="password-field">Password</label>
          <div class="password-input-wrapper">
            <input
              type="password"
              id="password-field"
              class="password-input"
              placeholder="Enter your password"
              autocomplete="off"
              autofocus
            />
          </div>
          <div class="error-message" id="error-message">
            ❌ Incorrect password. Please try again.
          </div>
        </div>

        <button type="submit" class="submit-button" id="submit-button">
          <span id="button-text">Unlock Documentation</span>
          <span id="button-spinner" style="display: none;" class="loading-spinner"></span>
        </button>
      </form>
    </div>
  `;

  return modal;
}

async function handlePasswordSubmit(e) {
  e.preventDefault();

  const passwordInput = document.getElementById('password-field');
  const submitButton = document.getElementById('submit-button');
  const buttonText = document.getElementById('button-text');
  const buttonSpinner = document.getElementById('button-spinner');
  const errorMessage = document.getElementById('error-message');
  const password = passwordInput.value;

  // Reset error state
  passwordInput.classList.remove('error');
  errorMessage.classList.remove('show');

  if (!password) {
    passwordInput.classList.add('error');
    errorMessage.textContent = '⚠️ Please enter a password';
    errorMessage.classList.add('show');
    return;
  }

  // Show loading state
  submitButton.disabled = true;
  buttonText.style.display = 'none';
  buttonSpinner.style.display = 'inline-block';

  // Small delay for better UX
  await new Promise(resolve => setTimeout(resolve, 300));

  const hash = await hashPassword(password);

  if (hash === EXPECTED_HASH) {
    sessionStorage.setItem('mmp_auth', 'true');

    // Show success state
    buttonText.textContent = '✓ Access Granted';
    buttonText.style.display = 'inline-block';
    buttonSpinner.style.display = 'none';
    submitButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

    // Fade out modal and reveal content
    const modal = document.getElementById('password-modal');
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease-out';

    setTimeout(() => {
      modal.remove();
      document.body.style.visibility = 'visible';
    }, 300);
  } else {
    // Show error state
    submitButton.disabled = false;
    buttonText.style.display = 'inline-block';
    buttonSpinner.style.display = 'none';

    passwordInput.classList.add('error');
    passwordInput.value = '';
    errorMessage.textContent = '❌ Incorrect password. Please try again.';
    errorMessage.classList.add('show');
    passwordInput.focus();
  }
}

async function checkPassword() {
  // Check if already authenticated in this session
  if (sessionStorage.getItem('mmp_auth') === 'true') {
    document.body.style.visibility = 'visible';
    return true;
  }

  // Hide content initially
  document.body.style.visibility = 'hidden';

  // Create and show modal
  const modal = createPasswordModal();
  document.body.appendChild(modal);

  // Attach form submit handler
  const form = document.getElementById('password-form');
  form.addEventListener('submit', handlePasswordSubmit);

  // Allow Enter key to submit
  document.getElementById('password-field').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit(e);
    }
  });

  return false;
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkPassword);
} else {
  checkPassword();
}
