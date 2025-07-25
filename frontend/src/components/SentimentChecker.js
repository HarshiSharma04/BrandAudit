import React, { useState } from 'react';
import axios from 'axios';

function SentimentChecker() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);

  const getEmoji = (sentiment) => {
    switch (sentiment) {
      case 'Positive': return '😊';
      case 'Negative': return '😞';
      case 'Neutral': return '😐';
      case 'Error': return '⚠️';
      default: return '';
    }
  };

  const getColor = (sentiment) => {
    switch (sentiment) {
      case 'Positive': return '#d4edda';
      case 'Negative': return '#f8d7da';
      case 'Neutral': return '#fff3cd';
      case 'Error': return '#f5c6cb';
      default: return '#f0f0f0';
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setSentiment(null);

    try {
      const res = await axios.post('http://127.0.0.1:5000/analyze', { text });
      const data = res.data;

      setSentiment({
        status: data.sentiment,
        score: data.score.toFixed(2),
      });
    } catch (error) {
      setSentiment({ status: 'Error', score: 0 });
    }

    setLoading(false);
  };

  return (
    <div style={{
      marginTop: '2rem',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: '2rem',
      borderRadius: '10px',
      background: '#ffffff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
        cols="60"
        placeholder="Type something to analyze sentiment..."
        style={{
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '1rem',
          width: '100%',
          resize: 'none'
        }}
      />
      <br />
      <button
        onClick={handleSubmit}
        style={{
          marginTop: '1rem',
          padding: '0.7rem 1.5rem',
          fontSize: '1rem',
          background: '#6200ea',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Analyze
      </button>

      {loading && <p style={{ marginTop: '1rem' }}>⏳ Analyzing sentiment...</p>}

      {sentiment && !loading && (
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: getColor(sentiment.status),
            borderRadius: '8px',
            border: '1px solid #ccc',
            textAlign: 'center'
          }}
        >
          <h3 style={{ marginBottom: '0.5rem' }}>
            {getEmoji(sentiment.status)} Sentiment: {sentiment.status}
          </h3>
          <p><strong>Score:</strong> {sentiment.score}</p>
        </div>
      )}
    </div>
  );
}

export default SentimentChecker;
