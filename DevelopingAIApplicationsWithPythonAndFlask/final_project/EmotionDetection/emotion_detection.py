import requests
import json

def emotion_detector(text_to_analyse):
    """
    Analyzes the emotion in the given text using a remote emotion prediction service.

    Args:
        text_to_analyse (str): The text to be analyzed for emotion.

    Returns:
        dict: A dictionary containing emotional analysis results, including anger, disgust, 
              fear, joy, sadness, and the dominant emotion, or None for each emotion 
              if the analysis fails.
    """
    url = 'https://sn-watson-emotion.labs.skills.network/v1/watson.runtime.nlp.v1/NlpService/EmotionPredict'
    myobj = { "raw_document": { "text": text_to_analyse } }
    header = {"grpc-metadata-mm-model-id": "emotion_aggregated-workflow_lang_en_stock"}
    response = requests.post(url, json = myobj, headers=header)

    status_code = response.status_code
    if status_code == 400:
        return ({
            "anger": None,
            "disgust": None,
            "fear": None,
            "joy": None,
            "sadness": None,
            "dominant_emotion": None
        })

    formatted_response = json.loads(response.text)

    emotions = formatted_response["emotionPredictions"][0]["emotion"]

    anger_score = emotions["anger"]
    disgust_score = emotions["disgust"]
    fear_score = emotions["fear"]
    joy_score = emotions["joy"]
    sadness_score = emotions["sadness"]

    dominant_emotion_score = 0
    dominant_emotion = ""

    for emotion in emotions:
        if emotions[emotion] > dominant_emotion_score:
            dominant_emotion_score = emotions[emotion]
            dominant_emotion = emotion
    
    result = {
        "anger": anger_score,
        "disgust": disgust_score,
        "fear": fear_score,
        "joy": joy_score,
        "sadness": sadness_score,
        "dominant_emotion": dominant_emotion
    }

    return result