// src/module/auth-module/register-login/render.js
// Renders login and register modules

import { createLoginForm } from './login.js';
import { createRegisterForm } from './register.js';

/* ============ LOGIN RENDERER ============ */
export function renderLogin(container) {
  container.innerHTML = '';
  const loginElement = createLoginForm();
  container.appendChild(loginElement);
}

/* ============ REGISTER RENDERER ============ */
export function renderRegister(container) {
  container.innerHTML = '';
  const registerElement = createRegisterForm();
  container.appendChild(registerElement);
}

export default {
  renderLogin,
  renderRegister
};