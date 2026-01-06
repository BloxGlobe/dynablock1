// src/module/auth-module/register-login/login.js

import React from 'https://esm.sh/react@18.2.0';
import { authAPI } from '../auth.js';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    const result = await authAPI.login(email, password);
    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    // Dispatch session login event
    window.dispatchEvent(new CustomEvent('session:login', {
      detail: {
        user: result.user,
        token: result.token,
        rememberMe: rememberMe
      }
    }));

    // Navigate to dashboard
    if (window.navigateToPage) {
      window.navigateToPage('dashboard');
    }
  }

  const banner = window.authImageSrc 
    ? React.createElement('img', { 
        src: window.authImageSrc, 
        alt: 'auth banner', 
        style: { 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          display: 'block', 
          margin: '12px auto' 
        } 
      }) 
    : React.createElement('div', { 
        style: { 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)', 
          margin: '12px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px'
        } 
      }, '👋');

  return React.createElement(
    'div',
    { style: { 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }},
    React.createElement(
      'form',
      { 
        onSubmit: handleSubmit, 
        style: { 
          maxWidth: '420px', 
          width: '100%',
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        } 
      },
      banner,
      React.createElement('h2', { 
        style: { 
          textAlign: 'center', 
          marginBottom: '8px',
          fontSize: '28px',
          fontWeight: '700'
        } 
      }, 'Welcome Back'),
      React.createElement('p', { 
        style: { 
          textAlign: 'center', 
          marginTop: 0, 
          marginBottom: '24px',
          color: '#666',
          fontSize: '14px'
        } 
      }, 'Sign in to your account'),
      
      error && React.createElement('div', { 
        style: { 
          padding: '12px', 
          background: '#fee', 
          color: '#c33', 
          borderRadius: '8px',
          marginBottom: '16px',
          fontSize: '14px'
        } 
      }, error),
      
      React.createElement('input', {
        type: 'email',
        placeholder: 'Email',
        value: email,
        onChange: e => setEmail(e.target.value),
        disabled: loading,
        style: { 
          width: '100%', 
          padding: '12px', 
          margin: '8px 0', 
          borderRadius: '8px', 
          border: '1px solid #ddd',
          fontSize: '15px',
          boxSizing: 'border-box'
        }
      }),
      React.createElement('input', {
        type: 'password',
        placeholder: 'Password',
        value: password,
        onChange: e => setPassword(e.target.value),
        disabled: loading,
        style: { 
          width: '100%', 
          padding: '12px', 
          margin: '8px 0', 
          borderRadius: '8px', 
          border: '1px solid #ddd',
          fontSize: '15px',
          boxSizing: 'border-box'
        }
      }),
      React.createElement('div', { 
        style: { 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginTop: '12px',
          fontSize: '13px'
        } 
      },
        React.createElement('label', { 
          style: { 
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          } 
        }, 
          React.createElement('input', { 
            type: 'checkbox',
            checked: rememberMe,
            onChange: e => setRememberMe(e.target.checked),
            disabled: loading,
            style: { marginRight: '6px' }
          }), 
          ' Remember me'
        ),
        React.createElement('a', { 
          href: '#forgot',
          onClick: e => {
            e.preventDefault();
            alert('Password reset coming soon!');
          },
          style: { 
            color: '#3b82f6',
            textDecoration: 'none',
            fontWeight: '500'
          }
        }, 'Forgot password?')
      ),
      React.createElement('button', { 
        type: 'submit',
        disabled: loading,
        style: { 
          marginTop: '20px', 
          width: '100%', 
          padding: '14px', 
          borderRadius: '10px', 
          background: loading ? '#ccc' : 'linear-gradient(90deg,#3b82f6,#7c3aed)', 
          color: '#fff', 
          border: 'none',
          fontSize: '16px',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s'
        } 
      }, loading ? 'Signing In...' : 'Sign In'),
      React.createElement('p', { 
        style: { 
          textAlign: 'center', 
          marginTop: '16px', 
          color: '#666',
          fontSize: '14px'
        } 
      }, 
        "Don't have an account? ",
        React.createElement('a', { 
          href: '#register',
          onClick: e => {
            e.preventDefault();
            if (window.navigateToPage) window.navigateToPage('register');
          },
          style: { 
            color: '#3b82f6',
            fontWeight: '600',
            textDecoration: 'none'
          }
        }, 'Sign Up')
      )
    )
  );
}