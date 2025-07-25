import React, { useState, useEffect } from 'react';
import SentimentChecker from './components/SentimentChecker';
import RedditSentiment from './components/RedditSentiment';
import TwitterSentiment from './components/TwitterSentiment';
import YouTubeSentiment from './components/YouTubeSentiment';
import CompareDashboard from './components/CompareDashboard';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('reddit');
  const [darkMode, setDarkMode] = useState(false);

  // Optional: persist dark mode across reloads
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) setDarkMode(savedMode === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'reddit': return <RedditSentiment />;
      case 'twitter': return <TwitterSentiment />;
      case 'youtube': return <YouTubeSentiment />;
      case 'compare': return <CompareDashboard />;
      default: return null;
    }
  };

  return (
    <div className={`app-root ${darkMode ? 'dark-mode' : ''}`}>
      <header className="hero-section">
        <div className="header-content">
          <h1>🚀 BrandSentinel</h1>
          <button
            className="toggle-mode"
            onClick={() => setDarkMode(prev => !prev)}
          >
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        <p>Track your brand’s pulse across social media platforms in real-time</p>
      </header>

      <main className="main-content">
        <section className="card sentiment-checker">
          <h2>🧠 AI Sentiment Analyzer</h2>
          <SentimentChecker />
        </section>

        <section className="card platform-section">
          <div className="tab-buttons">
            <button className={activeTab === 'reddit' ? 'active' : ''} onClick={() => setActiveTab('reddit')}>Reddit</button>
            <button className={activeTab === 'twitter' ? 'active' : ''} onClick={() => setActiveTab('twitter')}>Twitter</button>
            <button className={activeTab === 'youtube' ? 'active' : ''} onClick={() => setActiveTab('youtube')}>YouTube</button>
            <button className={activeTab === 'compare' ? 'active' : ''} onClick={() => setActiveTab('compare')}>Compare</button>
          </div>
          <div className="tab-content">{renderTabContent()}</div>
        </section>
      </main>

      <footer className="footer">
        <p>Built with 💜 by Harshita • BrandSentinel © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
