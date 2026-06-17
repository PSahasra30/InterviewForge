from app.services.qa_service import model

def generate_questions(
    context,
    count,
    difficulty,
    question_type
):

    prompt = f"""
You are an expert interviewer.

Generate exactly {count} interview questions.

Question Type:
{question_type}

Difficulty:
{difficulty}

Rules:

1. Generate ONLY questions.

2. Do NOT provide answers.

3. Number each question.

4. Avoid duplicate questions.

5. Generate exactly {count} questions.

6. Follow the rules based on Question Type:

------------------------------------------------

TECHNICAL

If question_type = Technical:

- Generate technical interview questions.
- Use ONLY the uploaded document.
- Cover as many document topics as possible.
- Mix conceptual, practical and scenario-based questions.
- Do NOT introduce topics not present in the document.

------------------------------------------------

MCQ

If question_type = MCQ:

- Generate exactly {count} MCQs.
- Use ONLY the uploaded document.
- Do NOT introduce topics not present in the document.

Format every MCQ exactly like:

1. Question text?

A) Option 1
B) Option 2
C) Option 3
D) Option 4

Leave one blank line after each MCQ.

------------------------------------------------

HR

If question_type = HR:

- Generate ONLY HR and behavioral questions.
- Do NOT ask technical questions.
- Do NOT ask programming questions.
- Do NOT ask Java, Python, OOP, DSA, DBMS, AI, ML, Web Development or Computer Science questions.
- Do NOT use document content as technical material.

Focus on:

- Self Introduction
- Teamwork
- Leadership
- Communication Skills
- Conflict Resolution
- Time Management
- Career Goals
- Strengths
- Weaknesses
- Project Experiences
- Problem Solving
- Learning Mindset
- Working Under Pressure

------------------------------------------------

7. If difficulty = Mixed:

- 30% Easy
- 50% Medium
- 20% Hard

8. If information is insufficient for Technical or MCQ,
generate questions only from available document content.

Context:
{context}
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
