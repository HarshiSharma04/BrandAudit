import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CompareDashboard = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    const keywords = input.split(',').map(k => k.trim()).filter(k => k);
    if (keywords.length < 2) return alert('Enter at least 2 brands.');

    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:5000/compare', { keywords });
      setResult(res.data);
    } catch (err) {
      alert('Failed to compare');
      console.error(err);
    }
    setLoading(false);
  };

  const generateChartData = (platform) => {
    const labels = Object.keys(result);
    const positive = labels.map(brand => result[brand][platform].Positive || 0);
    const neutral = labels.map(brand => result[brand][platform].Neutral || 0);
    const negative = labels.map(brand => result[brand][platform].Negative || 0);

    return {
      labels,
      datasets: [
        {
          label: 'Positive',
          data: positive,
          backgroundColor: '#4caf50'
        },
        {
          label: 'Neutral',
          data: neutral,
          backgroundColor: '#ffeb3b'
        },
        {
          label: 'Negative',
          data: negative,
          backgroundColor: '#f44336'
        }
      ]
    };
  };

  return (
    <div style={{ marginTop: '3rem' }}>
      <h2>📊 Compare Brand Sentiment</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter brands separated by commas (e.g., Nike, Adidas)"
        style={{ width: '60%', padding: '0.6rem', borderRadius: '8px', marginRight: '1rem' }}
      />
      <button
        onClick={handleCompare}
        style={{
          padding: '0.6rem 1rem',
          background: '#673ab7',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Compare
      </button>

      {loading && <p>Loading comparison...</p>}

      {result && (
        <div style={{ marginTop: '2rem' }}>
          {['Reddit', 'Twitter', 'YouTube'].map((platform, idx) => (
            <div key={idx} style={{ marginBottom: '3rem' }}>
              <h3>{platform} Sentiment</h3>
              <Bar data={generateChartData(platform)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompareDashboard;
