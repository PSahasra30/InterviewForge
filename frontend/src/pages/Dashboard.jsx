function Dashboard() {
  return (
    <div>

      <div className="hero-section">

        <h1 className="dashboard-title">
          Welcome Back 👋
        </h1>

        <p className="dashboard-subtitle">
          Prepare, Practice and Perform
          with InterviewForge.
        </p>

      </div>

      <div className="section">

        <h2>Quick Actions</h2>

        <div className="dashboard-cards">

          <div className="card">
            <h3>AI Chat</h3>

            <p>
              Ask questions from uploaded notes.
            </p>
          </div>

          <div className="card">
            <h3>Question Generator</h3>

            <p>
              Generate interview questions.
            </p>
          </div>

          <div className="card">
            <h3>Mock Interview</h3>

            <p>
              Practice with AI interviews.
            </p>
          </div>

        </div>

      </div>

      
    </div>
  );
}

export default Dashboard;