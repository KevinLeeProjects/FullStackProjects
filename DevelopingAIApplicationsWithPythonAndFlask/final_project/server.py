"""
This script launches a Flask server on port 5000 and renders the 'index.html' template. 
It also provides an endpoint '/emotionDetector' that analyzes text using an emotion detector 
and returns the emotional analysis results, including anger, disgust, fear, joy, and sadness, 
along with the dominant emotion. If the input text is invalid, it responds with an error message.
"""

from flask import Flask, render_template, request
from EmotionDetection.emotion_detection import emotion_detector

app = Flask("Emotion Detector")

@app.route("/emotionDetector")
def emot_detector():
    """
    Analyzes text submitted as a query parameter ('textToAnalyze') using an emotion detector 
    and returns the emotional analysis results as a formatted string.
    """
    text_to_analyze = request.args.get("textToAnalyze")
    response = emotion_detector(text_to_analyze)
    if response['dominant_emotion'] is None:
        return "Invalid text! Please try again!"

    return (f"For the given statement, the system response is "
    f"'anger': {response['anger']}, "
    f"'disgust': {response['disgust']}, "
    f"'fear': {response['fear']}, "
    f"'joy': {response['joy']}, "
    f"and 'sadness': {response['sadness']}. "
    f"The dominant emotion is {response['dominant_emotion']}.")

@app.route("/")
def render_index_page():
    """
    Renders index.html
    """
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
