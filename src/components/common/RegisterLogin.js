// Component: RegisterLogin
// Usage: import { mountRegisterLogin } from './components/common/RegisterLogin.js'
export function mountRegisterLogin(container) {
  if (!container) throw new Error('container is required');

  const el = document.createElement('div');
  el.className = 'register-login-container';

  el.innerHTML = `
    <div class="rl-tabs">
      <button data-tab="login" class="active">Login</button>
      <button data-tab="register">Register</button>
    </div>
    <div class="rl-forms">
      <form class="rl-form rl-login" data-form="login">
        <div class="rl-error" aria-live="polite"></div>
        <label>Email<input name="email" type="email" required></label>
        <label>Password<input name="password" type="password" required></label>
        <button type="submit">Login</button>
      </form>

      <form class="rl-form rl-register" data-form="register" style="display:none">
        <div class="rl-error" aria-live="polite"></div>
        <label>Name<input name="name" type="text" required></label>
        <label>Email<input name="email" type="email" required></label>
        <label>Password<input name="password" type="password" required></label>
        <label>Confirm Password<input name="confirm" type="password" required></label>
        <button type="submit">Create account</button>
      </form>
    </div>
  `;

  container.appendChild(el);

  const tabs = el.querySelectorAll('.rl-tabs button');
  const loginForm = el.querySelector('form[data-form="login"]');
  const registerForm = el.querySelector('form[data-form="register"]');

  function switchTab(name) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    loginForm.style.display = name === 'login' ? '' : 'none';
    registerForm.style.display = name === 'register' ? '' : 'none';
  }

  tabs.forEach(t => t.addEventListener('click', () => switchTab(t.dataset.tab)));

  async function postJson(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const body = await res.json().catch(() => null);
    if (!res.ok) {
      const msg = body && body.error ? body.error : (body && body.message) || res.statusText;
      throw new Error(msg || 'Request failed');
    }
    return body;
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errEl = loginForm.querySelector('.rl-error');
    errEl.textContent = '';
    const data = { email: loginForm.email.value.trim(), password: loginForm.password.value };
    try {
      const user = await postJson('/api/auth/login', data);
      document.dispatchEvent(new CustomEvent('auth:login', { detail: user }));
    } catch (err) {
      errEl.textContent = err.message || 'Login failed';
    }
  });

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errEl = registerForm.querySelector('.rl-error');
    errEl.textContent = '';
    const name = registerForm.name.value.trim();
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value;
    const confirm = registerForm.confirm.value;
    if (!name) return (errEl.textContent = 'Please enter your name.');
    if (password !== confirm) return (errEl.textContent = 'Passwords do not match.');
    try {
      const user = await postJson('/api/auth/register', { name, email, password });
      document.dispatchEvent(new CustomEvent('auth:signup', { detail: user }));
    } catch (err) {
      errEl.textContent = err.message || 'Signup failed';
    }
  });

  return {
    el,
    switchTab
  };
}

export default { mountRegisterLogin };
