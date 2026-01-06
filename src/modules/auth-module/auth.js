// src/module/auth-module/auth.js
// Simplified auth module - boots up React login/register

import React from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0/client';
import Login from './register-login/login.js';
import Register from './register-login/register.js';

/* ============ SESSION MANAGER ============ */
const SessionManager = {
  _user: null,
  _token: null,

  load() {
    try {
      const token = localStorage.getItem('auth_token');
      const user = localStorage.getItem('user_data');
      this._token = token;
      this._user = user ? JSON.parse(user) : null;
    } catch {
      this._user = null;
      this._token = null;
    }
  },

  login(user, token, remember) {
    this._user = user;
    this._token = token;
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('auth_token', token);
    storage.setItem('user_data', JSON.stringify(user));
  },

  logout() {
    this._user = null;
    this._token = null;
    localStorage.clear();
    sessionStorage.clear();
  },

  isAuthenticated() {
    return !!this._token;
  },

  getUser() {
    return this._user;
  }
};

// Load session and expose globally
SessionManager.load();
window.SessionManager = SessionManager;

/* ============ REACT MOUNTING ============ */
let root = null;

function mount(Component, container) {
  if (root) root.unmount();
  root = ReactDOM.createRoot(container);
  root.render(React.createElement(Component));
}

/* ============ PUBLIC API ============ */

// Render login page
export function renderLogin(container) {
  mount(Login, container);
}

// Render register page
export function renderRegister(container) {
  mount(Register, container);
}

// Initialize auth event listeners (call once from main.js or router)
export function initAuth() {
  if (window.__authInitialized) return;
  window.__authInitialized = true;

  window.addEventListener('session:login', (e) => {
    const { user, token, rememberMe } = e.detail;
    SessionManager.login(user, token, rememberMe);
  });

  window.addEventListener('session:logout', () => {
    SessionManager.logout();
  });
}

// Logout user
export function logout() {
  SessionManager.logout();
  window.dispatchEvent(new Event('session:logout'));
  if (window.navigateToPage) window.navigateToPage('login');
}

/* ============ MOCK API ============ */
export const authAPI = {
  async login(email, password) {
    await new Promise(r => setTimeout(r, 800));

    // Demo account
    if (email === 'demo@example.com' && password === 'demo123') {
      return {
        success: true,
        token: btoa(JSON.stringify({ userId: 1, exp: Date.now() + 86400000 })),
        user: { id: 1, username: 'demo', email }
      };
    }

    return { success: false, message: 'Invalid email or password' };
  },

  async register(username, email, password) {
    await new Promise(r => setTimeout(r, 1000));

    // Check if email exists (mock)
    if (email === 'demo@example.com') {
      return { success: false, message: 'Email already registered' };
    }

    return {
      success: true,
      user: { id: Date.now(), username, email }
    };
  }
};

export default {
  renderLogin,
  renderRegister,
  initAuth,
  logout,
  authAPI
};