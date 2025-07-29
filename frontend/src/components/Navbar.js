// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './Navbar.css';

const Navbar = ({ onTabChange }) => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => onTabChange('home')}>
        🚀 <span className="brand-name">BrandSentinel</span>
      </div>
      <div className="navbar-center">
        <button onClick={() => onTabChange('home')}>Home</button>
        <button onClick={() => onTabChange('analyzer')}>Brand Analyzer</button>
        <button onClick={() => onTabChange('compare')}>Compare</button>
        <button onClick={() => onTabChange('sentiment')}>AI Sentiment</button>
      </div>
      <div className="navbar-right">
        {user && (
          <>
            <img
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.email}`}
              alt="Profile"
              className="profile-pic"
            />
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
