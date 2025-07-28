// src/components/SignupPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
  e.preventDefault();
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    navigate('/dashboard');
  } catch (error) {
    let message = 'Signup failed. Try again.';
    if (error.code === 'auth/email-already-in-use') {
      message = 'This email is already in use. Try logging in.';
    } else if (error.code === 'auth/weak-password') {
      message = 'Password should be at least 6 characters.';
    } else if (error.code === 'auth/invalid-email') {
      message = 'Please enter a valid email address.';
    }
    alert(message);
    console.error(error.message);
  }
};


  return (
    <div className="auth-container">
      <h2>📝 Sign Up</h2>
      <form onSubmit={handleSignup} className="auth-form">
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>
    </div>
  );
};

export default SignupPage;
