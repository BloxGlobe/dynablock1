// src/module/auth-module/register-login/register.js

import React from 'https://esm.sh/react@18.2.0';
import { authAPI } from '../auth.js';

export default function Register() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const result = await authAPI.register(username, email, password);
    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setMessage('Registration successful! Redirecting to login...');

    setTimeout(() => {
      if (window.navigateToPage) {
        window.navigateToPage('login');
      }
    }, 2000);
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
          background: 'linear-gradient(135deg, #f5eaff, #e9d5ff)', 
          margin: '12px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px'
        } 
      }, '🚀');

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
      }, 'Create Account'),
      React.createElement('p', { 
        style: { 
          textAlign: 'center', 
          marginTop: 0, 
          marginBottom: '24px',
          color: '#666',
          fontSize: '14px'
        } 
      }, 'Sign up to get started'),
      
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
      
      message && React.createElement('div', { 
        style: { 
          padding: '12px', 
          background: '#efe', 
          color: '#0a0', 
          borderRadius: '8px',
          marginBottom: '16px',
          fontSize: '14px'
        } 
      }, message),
      
      React.createElement('input', {
        placeholder: 'Username',
        value: username,
        onChange: e => setUsername(e.target.value),
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
      React.createElement('input', {
        type: 'password',
        placeholder: 'Confirm Password',
        value: confirmPassword,
        onChange: e => setConfirmPassword(e.target.value),
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
      React.createElement('button', { 
        type: 'submit',
        disabled: loading,
        style: { 
          marginTop: '16px', 
          width: '100%', 
          padding: '14px', 
          borderRadius: '10px', 
          background: loading ? '#ccc' : 'linear-gradient(90deg,#d946ef,#f472b6)', 
          color: '#fff', 
          border: 'none',
          fontSize: '16px',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s'
        } 
      }, loading ? 'Creating Account...' : 'Sign Up'),
      React.createElement('p', { 
        style: { 
          textAlign: 'center', 
          marginTop: '16px', 
          color: '#666',
          fontSize: '14px'
        } 
      }, 
        'Already have an account? ',
        React.createElement('a', { 
          href: '#login',
          onClick: e => {
            e.preventDefault();
            if (window.navigateToPage) window.navigateToPage('login');
          },
          style: { 
            color: '#d946ef',
            fontWeight: '600',
            textDecoration: 'none'
          }
        }, 'Sign In')
      )
    )
  );
}