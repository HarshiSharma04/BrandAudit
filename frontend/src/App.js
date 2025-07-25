import React from 'react';
import SentimentChecker from './components/SentimentChecker';
import RedditSentiment from './components/RedditSentiment';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>📊 VibeCheck (with Reddit)</h1>
      <p>Real-time sentiment analyzer for your brand</p>

      <SentimentChecker />
      <RedditSentiment />
    </div>
  );
}

export default App;