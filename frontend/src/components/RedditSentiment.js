import React, { useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

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
      const res = await axios.post('http://127.0.0.1:5000/reddit', { keyword });
      setResults(res.data.posts);
      setSummary(res.data.summary);
    } catch (err) {
      alert('Failed to fetch Reddit data');
      console.error(err);
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
        backgroundColor: ['#a6f7adff', '#ffe589ff', '#f99eabff'],
        borderWidth: 1
      }
    ]
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
          <div style={{ width: '300px', margin: 'auto' }}>
            <Pie data={chartData} 
            options={{
    plugins: {
      legend: {
        labels: {
          color: 'white', // ✅ Make labels black for better readability
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      }
    }
  }}
            />
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
                    ? '#a6f7adff'
                    : post.sentiment === 'Negative'
                    ? '#f99eabff'
                    : '#ffe589ff',
                color: '#333', // ✅ Ensures readability
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1rem',
                border: '1px solid #ccc',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}
            >
              <strong>{post.sentiment}</strong> — Score: {post.score.toFixed(2)}
              <p style={{ marginTop: '0.5rem' }}>{post.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RedditSentiment;
