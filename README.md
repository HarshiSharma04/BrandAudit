# BrandAudit – Real-time Sentiment Analysis Dashboard

BrandAudit is a full-stack sentiment monitoring platform that collects and analyzes real-time data from multiple social media sources to evaluate public sentiment for brands. Designed to provide actionable insights through powerful NLP techniques and live data visualization.

---

## 🚀 Features

- 🔍 Real-time sentiment analysis of Twitter, Reddit, and YouTube comments
- 📊 Interactive dashboard with live sentiment charts (positive, neutral, negative)
- ⚡ Asynchronous data ingestion and classification pipelines
- 🌙 Dark/Light mode toggle
- 🔁 Auto-refresh & real-time trend comparison between brands

---

## 🧠 Tech Stack

| Frontend | Backend | NLP | APIs |
|----------|---------|-----|------|
| React.js | Flask   | VADER | Twitter API v2 |
| Chart.js | Python  | TextBlob | Reddit API (PRAW) |
| Axios    |         |       | YouTube Data API |


## 🛠 Setup Instructions

### Backend

```bash
# Clone the repo
git clone https://github.com/HarshiSharma04/BrandAudit.git
cd BrandAudit/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Run server
python app.py
