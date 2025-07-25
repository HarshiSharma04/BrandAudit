import React from 'react';
import { useState } from 'react';
import SentimentChecker from './components/SentimentChecker';
import RedditSentiment from './components/RedditSentiment';
import TwitterSentiment from './components/TwitterSentiment';
import YouTubeSentiment from './components/YouTubeSentiment';
import './App.css'; // new custom CSS

function App() {
  const [activeTab, setActiveTab] = useState('reddit');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'reddit': return <RedditSentiment />;
      case 'twitter': return <TwitterSentiment />;
      case 'youtube': return <YouTubeSentiment />;
      default: return null;
    }
  };

  return (
    <div className="app-root">
      <header className="hero-section">
        <h1>🚀 BrandSentinel</h1>
        <p>Track your brand’s pulse across social media platforms in real-time</p>
      </header>

      <main className="main-content">
        <section className="card sentiment-checker">
          <h2>🧠 AI Sentiment Analyzer</h2>
          <SentimentChecker />
        </section>

        <section className="card platform-section">
          <div className="tab-buttons">
            <button
              className={activeTab === 'reddit' ? 'active' : ''}
              onClick={() => setActiveTab('reddit')}
            >
              Reddit
            </button>
            <button
              className={activeTab === 'twitter' ? 'active' : ''}
              onClick={() => setActiveTab('twitter')}
            >
              Twitter
            </button>
            <button
              className={activeTab === 'youtube' ? 'active' : ''}
              onClick={() => setActiveTab('youtube')}
            >
              YouTube
            </button>
          </div>

          <div className="tab-content">
            {renderTabContent()}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Built with 💜 by Harshita • BrandSentinel © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
