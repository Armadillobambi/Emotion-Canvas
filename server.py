from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)

# Load the pre-trained emotion detection model
emotion_classifier = pipeline('text-classification', model="SamLowe/roberta-base-go_emotions", return_all_scores=True)

# Map emotions to colors
emotion_to_color = {
    "admiration": "#FFC300",   # Yellow
    "amusement": "#FF5733",    # Orange-red
    "anger": "#C70039",        # Deep red
    "annoyance": "#900C3F",    # Maroon
    "approval": "#DAF7A6",     # Light green
    "caring": "#85C1E9",       # Sky blue
    "confusion": "#BB8FCE",    # Lavender
    "curiosity": "#48C9B0",    # Teal
    "desire": "#F1948A",       # Soft pink
    "disappointment": "#6C3483",  # Dark purple
    "disapproval": "#7D3C98",  # Purple
    "disgust": "#117A65",      # Deep teal
    "embarrassment": "#D98880",# Blush
    "excitement": "#F7DC6F",   # Bright yellow
    "fear": "#34495E",         # Dark blue-gray
    "gratitude": "#52BE80",    # Green
    "grief": "#1B2631",        # Charcoal
    "joy": "#F9E79F",          # Pale yellow
    "love": "#F1948A",         # Pink-red
    "nervousness": "#5D6D7E",  # Gray-blue
    "optimism": "#ABEBC6",     # Mint green
    "pride": "#F4D03F",        # Golden yellow
    "realization": "#B2BABB",  # Neutral gray
    "relief": "#82E0AA",       # Soft green
    "remorse": "#7B241C",      # Brown-red
    "sadness": "#5DADE2",      # Soft blue
    "surprise": "#F5B041",     # Orange
    "neutral": "#D5DBDB"       # Light gray
}

@app.route('/analyze', methods=['POST'])
def analyze_emotion():
    data = request.json
    sentence = data.get('sentence', '')

    # Perform emotion analysis
    results = emotion_classifier(sentence)
    if not results:
        return jsonify({'error': 'No emotions detected'}), 400

    # Pick the highest-scoring emotion
    highest_emotion = max(results[0], key=lambda x: x['score'])
    emotion = highest_emotion['label']
    color = emotion_to_color.get(emotion, "#FFFFFF")  # Default to white if not found

    return jsonify({'emotion': emotion, 'color': color})

if __name__ == '__main__':
    app.run(debug=True)
