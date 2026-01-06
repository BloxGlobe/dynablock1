// src/main.js

import initRouter from "./router.js";
import { setSessionManager } from "./pages/settings.js";
import { initAuth } from "./module/auth-module/auth.js";

/**
 * Session Manager
 * Manages user authentication state across the entire app
 */
class SessionManager {
  constructor() {
    this.user = null;
    this.token = null;
    this.isAuthenticated = false;
  }

  /**
   * Login - Store user session
   */
  login(userData, authToken, rememberMe = false) {
    this.user = userData;
    this.token = authToken;
    this.isAuthenticated = true;

    // Store in localStorage if remember me is checked
    if (rememberMe) {
      try {
        localStorage.setItem('auth_token', authToken);
        localStorage.setItem('user_data', JSON.stringify(userData));
      } catch (error) {
        console.warn('Could not store session:', error);
      }
    }

    console.log('✓ Session initialized:', userData.username);
    
    // Emit login event
    window.dispatchEvent(new CustomEvent('session:login', { 
      detail: { user: userData, token: authToken } 
    }));
    
    return true;
  }

  /**
   * Logout - Clear user session
   */
  logout() {
    const username = this.user?.username;
    
    this.user = null;
    this.token = null;
    this.isAuthenticated = false;

    // Clear localStorage
    try {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    } catch (error) {
      console.warn('Could not clear session:', error);
    }

    console.log('✓ Session cleared:', username);
    
    // Emit logout event
    window.dispatchEvent(new CustomEvent('session:logout'));
    
    return true;
  }

  /**
   * Update user data
   */
  updateUser(updates) {
    if (!this.user) return false;
    
    this.user = { ...this.user, ...updates };

    // Update localStorage if exists
    try {
      const storedToken = localStorage.getItem('auth_token');
      if (storedToken) {
        localStorage.setItem('user_data', JSON.stringify(this.user));
      }
    } catch (error) {
      console.warn('Could not update user data:', error);
    }

    console.log('✓ User data updated:', updates);
    
    // Emit update event
    window.dispatchEvent(new CustomEvent('session:update', { 
      detail: { user: this.user } 
    }));
    
    return true;
  }

  /**
   * Verify if token is still valid
   */
  verifyToken() {
    if (!this.token) return false;
    
    try {
      const decoded = JSON.parse(atob(this.token));
      
      // Check if token expired
      if (decoded.exp < Date.now()) {
        console.warn('Token expired');
        this.logout();
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  }

  /**
   * Get remaining session time in minutes
   */
  getSessionDuration() {
    if (!this.token) return 0;
    
    try {
      const decoded = JSON.parse(atob(this.token));
      const remaining = decoded.exp - Date.now();
      return Math.floor(remaining / 1000 / 60);
    } catch {
      return 0;
    }
  }

  /**
   * Restore session from localStorage
   */
  restoreSession() {
    try {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user_data');
      
      if (token && userData) {
        const user = JSON.parse(userData);
        
        // Check if token is still valid
        const decoded = JSON.parse(atob(token));
        if (decoded.exp > Date.now()) {
          this.user = user;
          this.token = token;
          this.isAuthenticated = true;
          console.log('✓ Session restored:', user.username);
          return true;
        } else {
          // Token expired, clear it
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
          console.log('Token expired, cleared');
        }
      }
    } catch (error) {
      console.error('Session restoration failed:', error);
    }
    
    return false;
  }

  /**
   * Get current user
   */
  getUser() {
    return this.user;
  }

  /**
   * Check if authenticated
   */
  isAuth() {
    return this.isAuthenticated && this.verifyToken();
  }
}

// Create singleton instance
const sessionManager = new SessionManager();

/**
 * Initialize the application
 */
function initApp() {
  console.log('🚀 Initializing DynaBlocks...');
  
  // Expose SessionManager globally
  window.SessionManager = sessionManager;
  
  // Try to restore previous session
  sessionManager.restoreSession();
  
  // Connect session manager to settings dropdown
  setSessionManager(sessionManager);
  
  // Initialize auth module (React components)
  initAuth();
  
  // Set up global navigation helpers
  setupNavigationHelpers();
  
  // Set up session event listeners
  setupSessionListeners();
  
  // Initialize router
  initRouter();
  
  console.log('✓ DynaBlocks initialized successfully!');
}

/**
 * Set up global navigation helpers
 */
function setupNavigationHelpers() {
  // Global navigation function
  window.navigateToPage = (page) => {
    console.log('→ Navigating to:', page);
    window.location.hash = `#${page}`;
  };
  
  // Account switcher (future feature)
  window.openAccountSwitcher = () => {
    showNotification('Account switcher coming soon!', 'info');
  };
}

/**
 * Set up listeners for session events
 */
function setupSessionListeners() {
  // Listen for login events
  window.addEventListener('session:login', (e) => {
    console.log('✓ User logged in:', e.detail.user.username);
    showWelcomeMessage(e.detail.user.username);
  });
  
  // Listen for logout events
  window.addEventListener('session:logout', () => {
    console.log('✓ User logged out');
    showNotification('You have been logged out', 'info');
    
    // Redirect to home
    setTimeout(() => {
      window.navigateToPage('home');
    }, 500);
  });
  
  // Listen for user update events
  window.addEventListener('session:update', (e) => {
    console.log('✓ User data updated:', e.detail.user);
  });
}

/**
 * Show welcome message after login
 */
function showWelcomeMessage(username) {
  showNotification(`Welcome back, ${username}!`, 'success');
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
  const colors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  };

  const notification = document.createElement('div');
  notification.className = 'app-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: ${colors[type] || colors.info};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    font-size: 14px;
    font-weight: 500;
    animation: slideInRight 0.3s ease-out;
    max-width: 400px;
  `;
  
  // Add animation styles if not already present
  if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

/**
 * Start the app when DOM is ready
 */
document.addEventListener("DOMContentLoaded", initApp);

/**
 * Handle errors globally
 */
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});