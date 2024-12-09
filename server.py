from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)

# Load the pre-trained emotion detection model
emotion_classifier = pipeline('text-classification', model='ayoubkirouane/BERT-Emotions-Classifier', return_all_scores=True)

# Map emotions to colors
emotion_to_color = {
    "joy": "#FFD700",   # Gold
    "sadness": "#1E90FF", # Dodger Blue
    "anger": "#FF4500",  # Orange Red
    "fear": "#9400D3",   # Dark Violet
    "surprise": "#00FF7F", # Spring Green
    "love": "#FF69B4"    # Hot Pink
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
