import json
from app.services.qa_service import model


def evaluate_answer(
    question,
    answer
):

    prompt = f"""
You are an expert technical interviewer.

Question:
{question}

Candidate Answer:
{answer}

Evaluate the answer.

Return ONLY valid JSON.

Format:

{{
    "score": 8,
    "strengths": "text",
    "improvements": "text",
    "ideal_answer": "text"
}}

Rules:
- score must be between 0 and 10
- return only JSON
- no markdown
- no explanation outside JSON
"""

    # response = model.generate_content(
    #     prompt
    # )

    try:
        response = model.generate_content(prompt)
    except Exception as e:
        return {
            "score": 0,
            "strengths": "Evaluation unavailable",
            "improvements": str(e),
            "ideal_answer": ""
        }

    try:
        return json.loads(
            response.text
        )

    except Exception:

        return {
            "score": 0,
            "strengths":
            "Could not evaluate",

            "improvements":
            "Could not evaluate",

            "ideal_answer":
            "Could not evaluate"
        }