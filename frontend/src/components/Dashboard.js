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

function Dashboard() {
  const [activeTab, setActiveTab] = useState('reddit');
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
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
          <p>Analyze how people feel about your brand across platforms</p>
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
