import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def generate_answer(
    context,
    question,
    chat_history=""
):

    greetings = [
        "hi",
        "hello",
        "hey",
        "good morning",
        "good afternoon",
        "good evening"
    ]

    if question.lower().strip() in greetings:
        return (
            "Hello! 👋 I am your AI Interview Assistant. "
            "Upload your interview preparation notes and ask me questions."
        )

    question_lower = question.lower()

    # TOPICS
    if (
        "topic" in question_lower
        or "topics" in question_lower
        or "contents" in question_lower
        or "content list" in question_lower
        or "list of contents" in question_lower
        or "table of contents" in question_lower
    ):

        prompt = f"""
Extract ONLY the main topics from the uploaded documents.

Rules:

1. Return topic names only.
2. Do NOT explain topics.
3. Do NOT include personal details.
4. Do NOT include email, phone number,
   LinkedIn or GitHub.
5. Do NOT include project descriptions.
6. Keep the answer concise.
7. Group related topics together.

Example Output:

Programming
• Java
• Python

Web Development
• React
• Node.js

Artificial Intelligence
• YOLOv8
• Computer Vision

Document Context:
{context}
"""

    # SKILLS
    elif (
        "skill" in question_lower
        or "skills" in question_lower
    ):

        prompt = f"""
Extract all skills from the uploaded documents.

Rules:

1. Group skills by category.
2. Use bullet points.
3. No explanations.
4. Keep output concise.

Document Context:
{context}
"""

    # PROJECTS
    elif (
        "project" in question_lower
        or "projects" in question_lower
    ):

        prompt = f"""
List all projects from the uploaded documents.

Rules:

1. Create a separate section for each project.
2. Give a short summary.
3. Mention technologies used.
4. Mention key features.
5. Use bullet points.

Document Context:
{context}
"""

    # CERTIFICATIONS
    elif (
        "certification" in question_lower
        or "certifications" in question_lower
        or "certificate" in question_lower
    ):

        prompt = f"""
Extract all certifications.

Rules:

1. Return only certification names.
2. Use bullet points.
3. No explanations.

Document Context:
{context}
"""

    # SUMMARY
    elif (
        "summary" in question_lower
        or "summarize" in question_lower
    ):

        prompt = f"""
Provide a concise summary.

Rules:

1. Keep it short.
2. Highlight important points.
3. Use bullet points when useful.

Document Context:
{context}
"""
        
    elif (
        "table" in question_lower
        or "tabular" in question_lower
    ):
        
        prompt = f"""
    Extract information from the document and return it as a clean markdown table.

    Rules:

    1. Return ONLY a markdown table.
    2. Use exactly two columns:
    | Category | Details |
    3. Do not generate paragraphs.
    4. Do not repeat information.
    5. Merge similar information into a single row.
    6. Keep details concise.
    7. If information is missing, skip it.

    Example:

    | Category | Details |
    |----------|---------|
    | Name | John Doe |
    | Education | B.Tech CSE |
    | Skills | Python, Java |
    | Projects | Expense Tracker, AI Chatbot |

    Document Context:
    {context}
    """

    # NORMAL CHAT
    else:

        prompt = f"""
You are InterviewForge AI.

You help users learn from their uploaded documents.

Instructions:

1. Use uploaded documents as the primary source.

2. Use conversation history to understand follow-up questions.

3. You may combine information from multiple uploaded documents.

4. Keep answers structured, professional and easy to read.

5. Avoid large walls of text.

6. Adapt format based on the user's request:

   - LIST → bullet points
   - TABLE → ALWAYS return a valid markdown table
   - FLOWCHART → ASCII flowchart
   - SUMMARY → concise summary
   - EXAMPLES → include examples
   - COMPARISON → comparison table
   - STEPS → step-by-step instructions

7. When explaining concepts:
   - Start simple
   - Give details
   - Provide an example

8. If information exists across multiple documents,
   combine the information.

9. If information is unavailable,
   clearly say so.

Conversation History:
{chat_history}

Document Context:
{context}

Current Question:
{question}
"""
    # response = model.generate_content(prompt)
    try:
        response = model.generate_content(prompt)
    except Exception as e:
        return (
            "AI service is temporarily unavailable. "
            "Please try again later."
        )

    return response.text