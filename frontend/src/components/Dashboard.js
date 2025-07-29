// src/components/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import SentimentChecker from './SentimentChecker';
import RedditSentiment from './RedditSentiment';
import TwitterSentiment from './TwitterSentiment';
import YouTubeSentiment from './YouTubeSentiment';
import CompareDashboard from './CompareDashboard';
import Navbar from './Navbar';
import './Dashboard.css';
import illustration from '../assets/illustration1.jpg';


function Dashboard() {
  const [activeTab, setActiveTab] = useState('home'); // FIXED DEFAULT TAB
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
  return (
    <div className="dashboard-card home-intro-card">
      
      
      <p className="intro-description">
        BrandSentinel is your real-time brand sentiment intelligence dashboard. It enables you to monitor, analyze, and compare public perception of your brand across major platforms like Reddit, Twitter, and YouTube all enhanced with AI-driven sentiment analysis. Make smarter decisions backed by data, not guesswork.
      </p>
      <div className="intro-image">
        <img src={illustration} alt="Illustration" />

      </div>
    </div>
  );

      case 'analyzer':
        return (
          <>
            <div className="dashboard-card">
              <RedditSentiment />
            </div>
            <div className="dashboard-card">
              <TwitterSentiment />
            </div>
            <div className="dashboard-card">
              <YouTubeSentiment />
            </div>
          </>
        );
      case 'compare':
        return (
          <div className="dashboard-card">
            <CompareDashboard />
          </div>
        );
      case 'sentiment':
        return (
          <div className="dashboard-card">
            <h2>🧠 AI Sentiment Text Analyzer</h2>
            <SentimentChecker />
          </div>
        );
      case 'reddit':
        return (
          <div className="dashboard-card">
            <h2>🌐 Brand Sentiment from Reddit</h2>
            <RedditSentiment />
          </div>
        );
      case 'twitter':
        return (
          <div className="dashboard-card">
            <h2>🐦 Brand Sentiment from Twitter</h2>
            <TwitterSentiment />
          </div>
        );
      case 'youtube':
        return (
          <div className="dashboard-card">
            <h2>📺 Brand Sentiment from YouTube</h2>
            <YouTubeSentiment />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar onTabChange={handleTabChange} />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome to <span className="brand-gradient">BrandSentinel</span></h1>
          
        </header>

        {renderTabContent()}

        <footer className="dashboard-footer">
          Built with 💜 by Harshita • BrandSentinel © {new Date().getFullYear()}
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
