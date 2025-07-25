from flask import Flask, request, jsonify
from flask_cors import CORS
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = Flask(__name__)
CORS(app)

analyzer = SentimentIntensityAnalyzer()

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data.get('text', '')

    score = analyzer.polarity_scores(text)
    compound = score['compound']

    if compound >= 0.2:
        sentiment = 'Positive'
    elif compound <= -0.2:
        sentiment = 'Negative'
    else:
        sentiment = 'Neutral'

    return jsonify({
        'sentiment': sentiment,
        'score': compound
    })

import praw

# Initialize Reddit instance
reddit = praw.Reddit(
    client_id='1BtNhXTsKqVsMPEPtKkQwA',
    client_secret='FPiHfD41vuXbkXEqwl5E3vkQbXRMdg',
    user_agent='vibecheck by u/your_reddit_username'
)

@app.route('/reddit', methods=['POST'])
def analyze_reddit():
    data = request.get_json()
    keyword = data.get('keyword', '')

    results = []
    sentiment_counts = {'Positive': 0, 'Neutral': 0, 'Negative': 0}

    for submission in reddit.subreddit("all").search(keyword, limit=10):
        title = submission.title
        score = analyzer.polarity_scores(title)
        compound = score['compound']
        if compound >= 0.2:
            sentiment = 'Positive'
        elif compound <= -0.2:
            sentiment = 'Negative'
        else:
            sentiment = 'Neutral'

        sentiment_counts[sentiment] += 1
        results.append({
            'title': title,
            'sentiment': sentiment,
            'score': compound
        })

    return jsonify({
        'posts': results,
        'summary': sentiment_counts
    })


if __name__ == '__main__':
    app.run(debug=True)
