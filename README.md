# InterviewForge

AI-powered interview preparation platform that helps students prepare for technical and HR interviews using their own study materials.

InterviewForge allows users to upload documents, interact with an AI assistant, generate interview questions, participate in mock interviews, and receive AI-generated performance reports.

## System Architecture

<p align="center">
  <img src="assets/architecture.png" alt="InterviewForge Architecture" width="1000"/>
</p>

---

## Features

### Authentication & User Management

* User Signup and Login
* JWT Authentication
* Protected Routes
* Personalized User Accounts

### Workspace Management

* Create Multiple Workspaces
* Upload Multiple Documents
* Workspace-Specific Knowledge Base
* File Management (Upload & Delete)

### AI Chat Assistant

* Ask Questions from Uploaded Documents
* Retrieval-Augmented Generation (RAG)
* Context-Aware Responses
* Chat History Support
* Structured Answers (Lists, Tables, Summaries, Comparisons)

### Interview Question Generator

* Generate Questions from Uploaded Documents
* Technical Interview Questions
* HR Interview Questions
* Difficulty Levels:

  * Easy
  * Medium
  * Hard
  * Mixed

### Mock Interview Module

* AI-Generated Interview Sessions
* Technical Interviews
* HR Interviews
* Timer-Based Interview Experience
* Question Navigation
* AI Evaluation

### AI Performance Reports

* Interview Score
* Performance Level
* Questions Attempted
* Strong Areas
* Areas for Improvement
* AI Feedback
* Report History

### Document Processing

* PDF Support
* DOCX Support
* Markdown Support
* TXT Support
* Automatic Text Extraction
* Chunking and Embedding Generation

---

## System Workflow

```text
Upload Documents
        │
        ▼
Text Extraction
        │
        ▼
Document Chunking
        │
        ▼
Embedding Generation
        │
        ▼
ChromaDB Vector Store
        │
        ▼
RAG Retrieval Pipeline
        │
        ▼
 ┌───────────────┬────────────────────┬────────────────┐
 │               │                    │                │
 ▼               ▼                    ▼                ▼

AI Chat   Question Generator   Mock Interview   Reports
```

---

## Architecture

```text
Frontend (React + Vite)
            │
            ▼
      FastAPI Backend
            │
            ▼
      LangChain RAG
            │
            ▼
     Gemini 2.5 Flash
            │
            ▼
        ChromaDB
            │
            ▼
        MongoDB
```

---

## Tech Stack

### Frontend

* React.js
* Vite
* Axios
* React Router
* CSS

### Backend

* FastAPI
* Python
* Uvicorn

### AI & RAG

* Google Gemini 2.5 Flash
* LangChain
* ChromaDB
* Sentence Transformers
* all-MiniLM-L6-v2

### Database

* MongoDB

### Authentication

* JWT Authentication
* Passlib (Bcrypt)

### Document Processing

* PyPDF
* Python-Docx

### Version Control

* Git
* GitHub

---

## Project Structure

```text
AI-Interview-Assistant
│
├── backend
│   ├── app
│   │   ├── routes
│   │   ├── services
│   │   ├── rag
│   │   ├── models
│   │   └── main.py
│   │
│   ├── tests
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── layouts
│   │   └── routes
│   │
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd AI-Interview-Assistant
```

### Backend Setup

```bash
cd backend

uv sync

uv run uvicorn app.main:app --reload
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend directory:

```env
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
```

---

## Key Modules

### AI Chat

Allows users to ask questions from uploaded study materials using Retrieval-Augmented Generation (RAG).

### Question Generator

Generates technical and HR interview questions from uploaded documents.

### Mock Interview

Conducts AI-powered mock interviews with configurable duration and difficulty levels.

### Reports

Generates concise AI-based performance reports with scores, strengths, weaknesses, and feedback.

---

## Future Enhancements

* Voice-Based Mock Interviews
* Resume Analyzer
* ATS Resume Scoring
* Company-Specific Interview Preparation
* Advanced Analytics Dashboard
* Personalized Study Plans
* Cloud Vector Database Support
