import React, { useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TwitterSentiment = () => {
  const [keyword, setKeyword] = useState('');
  const [tweets, setTweets] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSentiment = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setTweets([]);
    setSummary(null);

    try {
      const res = await axios.post('http://127.0.0.1:5000/twitter', { keyword });
      setTweets(res.data.tweets);
      setSummary(res.data.summary);
    } catch (error) {
      alert('Failed to fetch Twitter data');
      console.error(error);
    }

    setLoading(false);
  };

  const chartData = summary && {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [
          summary.Positive || 0,
          summary.Neutral || 0,
          summary.Negative || 0
        ],
        backgroundColor: ['#4caf50', '#ffeb3b', '#f44336'],
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ marginTop: '3rem' }}>
      <h2>🐦 Brand Sentiment from Twitter</h2>

      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter brand keyword (e.g., Nykaa)"
        style={{
          padding: '0.6rem',
          borderRadius: '8px',
          width: '60%',
          border: '1px solid #ccc',
          fontSize: '1rem',
          marginRight: '1rem'
        }}
      />
      <button
        onClick={fetchSentiment}
        style={{
          padding: '0.6rem 1rem',
          borderRadius: '6px',
          background: '#1da1f2',
          color: 'white',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Analyze Twitter
      </button>

      {loading && <p style={{ marginTop: '1rem' }}>⏳ Fetching tweets...</p>}

      {summary && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <h3>📊 Sentiment Summary:</h3>
          <div style={{ width: '300px', margin: 'auto' }}>
            <Pie data={chartData} />
          </div>
        </div>
      )}

      {tweets.length > 0 && (
        <div style={{ textAlign: 'left', maxWidth: '800px', margin: '2rem auto' }}>
          <h3>📝 Analyzed Tweets:</h3>
          {tweets.map((tweet, i) => (
            <div
              key={i}
              style={{
                backgroundColor:
                  tweet.sentiment === 'Positive'
                    ? '#e8f5e9'
                    : tweet.sentiment === 'Negative'
                    ? '#ffebee'
                    : '#fef9e7',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                border: '1px solid #ccc'
              }}
            >
              <strong>{tweet.sentiment}</strong> — Score: {tweet.score.toFixed(2)}
              <p>{tweet.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TwitterSentiment;
