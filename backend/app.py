from flask import Flask, request, jsonify
from flask_cors import CORS
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import praw
import requests

app = Flask(__name__)
CORS(app)

analyzer = SentimentIntensityAnalyzer()

# -------------------- Sentiment Analysis for Custom Text --------------------
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

# -------------------- Reddit Integration --------------------
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

    try:
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

    except Exception as e:
        print(f"Reddit Error: {e}")
        return jsonify({'posts': [], 'summary': sentiment_counts})

    return jsonify({
        'posts': results,
        'summary': sentiment_counts
    })

# -------------------- Twitter Integration --------------------
BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAJr33AEAAAAAVB5E%2FhfhRX8N090nU8aUyKLA5SA%3DuLuoqNXUj9EX9AaXjDF9EqisA0VqpIRVqUJZ8jvFMWrZnkDrOg'

def get_twitter_headers():
    return {
        'Authorization': f'Bearer {BEARER_TOKEN}',
    }

def get_tweets(keyword):
    url = f"https://api.twitter.com/2/tweets/search/recent?query={keyword} lang:en&max_results=10&tweet.fields=text,lang"

    try:
        response = requests.get(url, headers=get_twitter_headers())
        response.raise_for_status()
        data = response.json()
        tweets = [tweet['text'] for tweet in data.get('data', [])]
        return tweets
    except Exception as e:
        print(f"Twitter API Error: {e}")
        return []

@app.route('/twitter', methods=['POST'])
def analyze_twitter():
    data = request.get_json()
    keyword = data.get('keyword', '')
    print(f"Fetching tweets for keyword: {keyword}")

    tweets = get_tweets(keyword)
    print(f"Fetched {len(tweets)} tweets")

    results = []
    sentiment_counts = {'Positive': 0, 'Neutral': 0, 'Negative': 0}

    for text in tweets:
        score = analyzer.polarity_scores(text)
        compound = score['compound']
        if compound >= 0.2:
            sentiment = 'Positive'
        elif compound <= -0.2:
            sentiment = 'Negative'
        else:
            sentiment = 'Neutral'

        sentiment_counts[sentiment] += 1
        results.append({
            'text': text,
            'sentiment': sentiment,
            'score': compound
        })

    return jsonify({
        'tweets': results,
        'summary': sentiment_counts
    })

# -------------------- Youtube Integration --------------------
import googleapiclient.discovery

# Your YouTube API key
YOUTUBE_API_KEY = "AIzaSyDu5SgK8w_M3CJKCA_3xTy24X7vGcuwUtw"

# Initialize YouTube client
youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=YOUTUBE_API_KEY)

def get_youtube_comments(keyword):
    print(f"Fetching YouTube comments for keyword: {keyword}")
    comments = []

    try:
        # Search videos by keyword
        search_response = youtube.search().list(
            q=keyword,
            part="id",
            type="video",
            maxResults=3
        ).execute()

        for item in search_response.get("items", []):
            video_id = item["id"]["videoId"]

            # Get top comments from video
            comment_response = youtube.commentThreads().list(
                part="snippet",
                videoId=video_id,
                maxResults=10,
                textFormat="plainText"
            ).execute()

            for comment_thread in comment_response.get("items", []):
                comment = comment_thread["snippet"]["topLevelComment"]["snippet"]["textDisplay"]
                comments.append(comment)

    except Exception as e:
        print("YouTube API Error:", e)

    print(f"Fetched {len(comments)} comments")
    return comments

@app.route('/youtube', methods=['POST'])
def analyze_youtube():
    data = request.get_json()
    keyword = data.get('keyword', '')

    comments = get_youtube_comments(keyword)
    results = []
    sentiment_counts = {'Positive': 0, 'Neutral': 0, 'Negative': 0}

    for text in comments:
        score = analyzer.polarity_scores(text)
        compound = score['compound']
        if compound >= 0.2:
            sentiment = 'Positive'
        elif compound <= -0.2:
            sentiment = 'Negative'
        else:
            sentiment = 'Neutral'

        sentiment_counts[sentiment] += 1
        results.append({
            'text': text,
            'sentiment': sentiment,
            'score': compound
        })

    return jsonify({
        'comments': results,
        'summary': sentiment_counts
    })


# -------------------- Run App --------------------
if __name__ == '__main__':
    app.run(debug=True)
