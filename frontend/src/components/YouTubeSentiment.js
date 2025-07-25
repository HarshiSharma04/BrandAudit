import React, { useState } from 'react';
import axios from 'axios';

const YouTubeSentiment = () => {
  const [keyword, setKeyword] = useState('');
  const [comments, setComments] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSentiment = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setComments([]);
    setSummary(null);

    try {
      const res = await axios.post('http://127.0.0.1:5000/youtube', { keyword });
      setComments(res.data.comments);
      setSummary(res.data.summary);
    } catch (error) {
      alert('Failed to fetch YouTube data');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div style={{ marginTop: '3rem' }}>
      <h2>📺 Brand Sentiment from YouTube</h2>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter brand keyword (e.g., Boat)"
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
          background: '#ff0000',
          color: 'white',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Analyze YouTube
      </button>

      {loading && <p style={{ marginTop: '1rem' }}>⏳ Fetching comments...</p>}

      {summary && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <h3>📊 Sentiment Summary:</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '1rem' }}>
            <div style={{ background: '#e8f5e9', padding: '10px', borderRadius: '8px' }}>
              <strong>Positive: {summary.Positive}</strong>
            </div>
            <div style={{ background: '#fff3cd', padding: '10px', borderRadius: '8px' }}>
              <strong>Neutral: {summary.Neutral}</strong>
            </div>
            <div style={{ background: '#f8d7da', padding: '10px', borderRadius: '8px' }}>
              <strong>Negative: {summary.Negative}</strong>
            </div>
          </div>
        </div>
      )}

      {comments.length > 0 && (
        <div style={{ textAlign: 'left', maxWidth: '800px', margin: '2rem auto' }}>
          <h3>📝 Analyzed Comments:</h3>
          {comments.map((comment, i) => (
            <div
              key={i}
              style={{
                backgroundColor:
                  comment.sentiment === 'Positive'
                    ? '#e8f5e9'
                    : comment.sentiment === 'Negative'
                    ? '#ffebee'
                    : '#fef9e7',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                border: '1px solid #ccc'
              }}
            >
              <strong>{comment.sentiment}</strong> — Score: {comment.score.toFixed(2)}
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YouTubeSentiment;
