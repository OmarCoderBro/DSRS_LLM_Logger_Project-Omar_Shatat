from flask import Flask, request, jsonify
from flask_cors import CORS

from transformers import pipeline
from wiki_util import get_wikipedia_context

app = Flask(__name__)
CORS(app)

hallucination_detector = pipeline(
    "text-classification",
    model="Varun-Chowdary/hallucination_detect"
)

@app.route("/detect", methods=["POST"])
def detect():
    data = request.get_json()
    prompt = data.get("prompt", "")
    response = data.get("response", "")

    if not prompt or not response:
        return jsonify({"error": "Prompt and response are required"}), 400

    # 1️⃣ Fetch Wikipedia RAG context
    context = get_wikipedia_context(prompt)

    # 2️⃣ Prepare text for hallucination detection
    text_to_check = f"""
Context:
{context}

Question:
{prompt}

Answer:
{response}
"""
    result = hallucination_detector(text_to_check, truncation=True)
    label = result[0]["label"]
    score = round(result[0]["score"], 3)

    return jsonify({
        "context": context,
        "label": label,
        "score": score
    })

if __name__ == "__main__":
    app.run(port=3001, debug=True)