// src/module/auth-module/auth.js
// Minimal auth module - boots up register-login module

import { renderLogin, renderRegister } from './register-login/renders/render.js';
import './session-manager/session.js';

/* ============ AUTH INITIALIZATION ============ */
let initialized = false;

export function initAuth() {
  if (initialized) return;
  initialized = true;
  console.log('[Auth] Module initialized');
}

/* ============ BOOT UI ============ */
export function bootLogin(containerId = 'app') {
  const container = typeof containerId === 'string' 
    ? document.getElementById(containerId) 
    : containerId;
  
  if (!container) {
    console.error('[Auth] Container not found:', containerId);
    return;
  }
  
  renderLogin(container);
}

export function bootRegister(containerId = 'app') {
  const container = typeof containerId === 'string' 
    ? document.getElementById(containerId) 
    : containerId;
  
  if (!container) {
    console.error('[Auth] Container not found:', containerId);
    return;
  }
  
  renderRegister(container);
}

/* ============ MOCK API ============ */
export const authAPI = {
  async login(email, password) {
    await new Promise(r => setTimeout(r, 800));
    
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
    
    if (email === 'demo@example.com') {
      return { success: false, message: 'Email already registered' };
    }
    
    return {
      success: true,
      user: { id: Date.now(), username, email },
      message: 'Registration successful! Please login.'
    };
  }
};

/* ============ EXPORTS ============ */
export default {
  initAuth,
  bootLogin,
  bootRegister,
  authAPI
};