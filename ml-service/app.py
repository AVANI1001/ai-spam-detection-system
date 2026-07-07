from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    text = request.json["message"]

    vec = vectorizer.transform([text])
    prediction = model.predict(vec)[0]
    confidence = model.predict_proba(vec).max()

    return jsonify({
        "prediction": prediction,
        "confidence": float(confidence)
    })

if __name__ == "__main__":
    app.run(port=5001, debug=True)