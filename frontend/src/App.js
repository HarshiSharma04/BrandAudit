import React from 'react';
import SentimentChecker from './components/SentimentChecker';
import RedditSentiment from './components/RedditSentiment';
import TwitterSentiment from './components/TwitterSentiment';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>📊 BrandSentinel</h1>
      <p>Real-time sentiment analyzer for your brand</p>

      <SentimentChecker />
      <RedditSentiment />
      <TwitterSentiment />
    </div>
  );
}

export default App;
