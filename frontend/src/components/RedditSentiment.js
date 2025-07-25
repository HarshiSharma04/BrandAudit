import React, { useState } from 'react';
import axios from 'axios';

function RedditSentiment() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSentiment = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setResults([]);
    setSummary(null);

    try {
      const res = await axios.post('http://127.0.0.1:5000/reddit', {
        keyword
      });
      setResults(res.data.posts);
      setSummary(res.data.summary);
    } catch (err) {
      alert('Failed to fetch Reddit data');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: '3rem' }}>
      <h2>🔍 Brand Sentiment from Reddit</h2>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter brand keyword (e.g., Zomato)"
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
          background: '#673ab7',
          color: 'white',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Analyze Reddit
      </button>

      {loading && <p style={{ marginTop: '1rem' }}>⏳ Fetching posts...</p>}

      {summary && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <h3>📊 Sentiment Summary:</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '1rem' }}>
            <div style={{ background: '#e8f5e9', padding: '10px', borderRadius: '8px' }}>
              <strong>Positive: {summary.Positive || 0}</strong>
            </div>
            <div style={{ background: '#fff3cd', padding: '10px', borderRadius: '8px' }}>
              <strong>Neutral: {summary.Neutral || 0}</strong>
            </div>
            <div style={{ background: '#f8d7da', padding: '10px', borderRadius: '8px' }}>
              <strong>Negative: {summary.Negative || 0}</strong>
            </div>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div style={{ textAlign: 'left', maxWidth: '800px', margin: '2rem auto' }}>
          <h3>📝 Analyzed Reddit Posts:</h3>
          {results.map((post, i) => (
            <div
              key={i}
              style={{
                backgroundColor:
                  post.sentiment === 'Positive'
                    ? '#e8f5e9'
                    : post.sentiment === 'Negative'
                    ? '#ffebee'
                    : '#fef9e7',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                border: '1px solid #ccc'
              }}
            >
              <strong>{post.sentiment}</strong> — Score: {post.score.toFixed(2)}
              <p>{post.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RedditSentiment;