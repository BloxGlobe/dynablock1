
// src/modules/auth-module/auth.js

const API = "/api/auth";

const Auth = {
  token: null,
  user: null,
  isAuthenticated: false,

  async init() {
    const stored = localStorage.getItem("auth_token");
    if (stored) this.token = stored;
    await this.restoreSession();
    this.expose();
    console.log("[Auth] connected to backend");
  },

  _authHeaders() {
    const headers = { "Content-Type": "application/json" };
    if (this.token) headers["Authorization"] = `Bearer ${this.token}`;
    return headers;
  },

  async restoreSession() {
    try {
      const res = await fetch(`${API}/session`, { headers: this._authHeaders() });
      if (!res.ok) return;

      const payload = await res.json();
      const user = payload && payload.user ? payload.user : payload;
      if (user) {
        this._setUser(user, this.token);
      }
    } catch {}
  },

  async login(data) {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }

    const payload = await res.json();
    const token = payload.token;
    const user = payload.user ? payload.user : payload;
    if (token) {
      localStorage.setItem("auth_token", token);
      this.token = token;
    }
    this._setUser(user, token);

    document.dispatchEvent(new CustomEvent("auth:login", { detail: user }));

    return { token, user };
  },

  async signup(data) {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      throw new Error("Signup failed");
    }

    const payload = await res.json();
    const token = payload.token;
    const user = payload.user ? payload.user : payload;
    if (token) {
      localStorage.setItem("auth_token", token);
      this.token = token;
    }
    this._setUser(user, token);

    document.dispatchEvent(new CustomEvent("auth:signup", { detail: user }));

    return { token, user };
  },

  logout() {
    fetch(`${API}/logout`, { method: "POST", headers: this._authHeaders() });
    localStorage.removeItem("auth_token");
    this.token = null;
    this.user = null;
    this.isAuthenticated = false;

    document.dispatchEvent(new CustomEvent("auth:logout"));
  },

  requireAuth() {
    if (!this.isAuthenticated) {
      throw new Error("Authentication required");
    }
  },

  _setUser(user, token) {
    this.user = user;
    if (token) this.token = token;
    this.isAuthenticated = !!user;
  },

  expose() {
    window.Auth = this;
  }
};

Auth.init();

