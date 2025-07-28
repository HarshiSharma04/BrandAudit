// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import illustration from '../assets/illustration1.jpg';


const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <div className="landing-glass">
        <h1 className="landing-title">BrandSentinel</h1>
        <p className="landing-subtitle">
          Your all-in-one brand sentiment intelligence dashboard — powered by AI.
        </p>
        <button className="landing-btn" onClick={() => navigate('/dashboard')}>
          🚀 Get Started
        </button>
      </div>

      <div className="landing-illustration">
        <img
          src={illustration}
          alt="Illustration"
          className="landing-image"
        />
      </div>
    </div>
  );
};

export default LandingPage;
