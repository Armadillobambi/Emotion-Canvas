from transformers import pipeline

# Load pre-trained emotion detection pipeline
emotion_classifier = pipeline('text-classification', model='bhadresh-savani/distilbert-base-uncased-emotion')

# Sample text
text = "I am so thrilled about the upcoming holidays!"

# Classify emotions
results = emotion_classifier(text,)

# Print the results
print(results)
