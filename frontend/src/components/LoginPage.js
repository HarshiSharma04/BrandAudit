// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate('/dashboard');
  } catch (error) {
    let message = 'Login failed. Please check your credentials.';
    if (error.code === 'auth/user-not-found') {
      message = 'No account found with this email.';
    } else if (error.code === 'auth/wrong-password') {
      message = 'Incorrect password. Please try again.';
    }
    alert(message);
    console.error(error.message);
  }
};


  return (
    <div className="auth-container">
      <h2>🔐 Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>Don’t have an account? <span onClick={() => navigate('/signup')}>Sign up</span></p>
    </div>
  );
};

export default LoginPage;
