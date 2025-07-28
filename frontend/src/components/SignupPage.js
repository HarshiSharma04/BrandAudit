import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      let message = 'Signup failed.';
      if (error.code === 'auth/email-already-in-use') {
        message = 'Email is already registered.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Please enter a valid email.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.';
      }
      toast.error(message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSignup} className="auth-form">
        <h2>📝 Sign Up</h2>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
        <p>Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
