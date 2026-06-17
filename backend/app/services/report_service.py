from app.services.qa_service import model


def generate_interview_report(
    questions,
    answers
):

    prompt = f"""
You are an expert interviewer.

Interview Questions:
{questions}

Candidate Answers:
{answers}

Generate a concise interview report.

Scoring Rules:

1. Evaluate answer quality, clarity, correctness,
   communication skills and confidence.

2. Do NOT heavily penalize unanswered questions.

3. If attempted answers are strong,
   score them fairly.

4. Mention unanswered questions separately
   in the feedback if necessary.

5. Be realistic and constructive.

Return ONLY in this format:

Interview Score:
x/10

Performance Level:
Excellent / Good / Average / Poor

Questions Attempted:
x/y

Strong Areas:
- point
- point
- point

Needs Improvement:
- point
- point
- point

AI Feedback:
A short professional paragraph
under 80 words.

Rules:

- Keep the report concise.
- Do NOT generate long explanations.
- Do NOT generate sections outside the format.
- Do NOT generate markdown headings.
- Keep feedback practical and professional.
"""

    try:

        response = model.generate_content(
            prompt
        )

        return response.text

    except Exception:

        return (
            "AI service is temporarily unavailable. "
            "Please try again later."
        )