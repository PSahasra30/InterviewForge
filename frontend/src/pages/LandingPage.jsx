import { useNavigate } from "react-router-dom";

function LandingPage() {

  const navigate = useNavigate();

  return (
    <div className="landing-page">

      <div className="hero">

        <h1>
          InterviewForge
        </h1>

        <p>
          AI-Powered Interview Preparation Platform
        </p>

        <div className="hero-buttons">

          <button
            className="login-btn"
            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </button>

          <button
            className="signup-btn"
            onClick={() =>
              navigate("/signup")
            }
          >
            Sign Up
          </button>

        </div>

      </div>

      <div className="features">

        <div className="feature-card">
          <h3>📄 Upload Notes</h3>
          <p>
            Upload multiple PDFs and create
            personalized workspaces.
          </p>
        </div>

        <div className="feature-card">
          <h3>🤖 AI Chat</h3>
          <p>
            Ask questions directly from
            your uploaded notes.
          </p>
        </div>

        <div className="feature-card">
          <h3>🎯 Question Generator</h3>
          <p>
            Generate interview questions
            with varying difficulty.
          </p>
        </div>

        <div className="feature-card">
          <h3>🎤 Mock Interviews</h3>
          <p>
            Practice real interviews
            with AI evaluation.
          </p>
        </div>

      </div>

    </div>
  );
}

export default LandingPage;