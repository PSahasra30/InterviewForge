import { useEffect, useState } from "react";
import axios from "axios";

function MockInterview({ workspaceId }) {

  const [pdfs, setPdfs] =
    useState([]);

  const [sourcePdf, setSourcePdf] =
    useState("All Documents");

  const [difficulty, setDifficulty] =
    useState("Medium");

  const [interviewType, setInterviewType] =
    useState("Technical");

  const [duration, setDuration] =
    useState(30);

  const [loading, setLoading] =
    useState(false);

  const [finishing, setFinishing] =
  useState(false);  

  const [interviewStarted, setInterviewStarted] =
  useState(false);

  const [questions, setQuestions] =
  useState([]);

  const [currentIndex, setCurrentIndex] =
  useState(0);

  const [answers, setAnswers] =
  useState([]);
  
  const [totalQuestions, setTotalQuestions] =
    useState(0);

  const [report, setReport] =
    useState("");

  const [interviewCompleted, setInterviewCompleted] =
    useState(false);  

  const [timeLeft, setTimeLeft] =
  useState(0);

  useEffect(() => {

    fetchPdfs();

  }, [workspaceId]);

  useEffect(() => {

  if (
    !interviewStarted ||
    interviewCompleted
  ) return;

  const timer =
    setInterval(() => {

      setTimeLeft(
        (prev) => {

          if (prev <= 1) {

            clearInterval(timer);

            alert(
              "Time is up. Please click Finish Interview."
            );

            return 0;
          }

          return prev - 1;
        }
      );

    }, 1000);

  return () =>
    clearInterval(timer);

}, [
  interviewStarted,
  interviewCompleted
]);

  const fetchPdfs =
    async () => {

      try {

        const response =
          await axios.get(
            `http://127.0.0.1:8000/pdfs/${workspaceId}`
          );

        setPdfs(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  const startInterview =
  async () => {

    setLoading(true);
    setTimeLeft(
    duration * 60
    );

    try {

      const response =
        await axios.post(
          "http://127.0.0.1:8000/start-interview",
          {
            workspace_id:
              workspaceId,

            source_pdf:
              sourcePdf,

            difficulty:
              difficulty,

            duration:
              duration,

            interview_type:
              interviewType
          }
        );

      if (response.data.message) {

  alert(
    response.data.message
  );

  setLoading(false);

  return;
}

setInterviewStarted(
        true
      );

    //  setAnswer ("");
      setReport("");
      setInterviewCompleted(false);


setQuestions(
  response.data.questions
);

setCurrentIndex(0);

setAnswers(
  new Array(
    response.data.total_questions
  ).fill("")
);

setTotalQuestions(
  response.data.total_questions
);

    } catch (error) {

      console.log(error);

      alert(
        "Failed to start interview"
      );
    }

    setLoading(false);
  };


  const finishInterview =
async () => {

  if (
    answers.every(
      answer => !answer.trim()
    )
  ) {

    alert(
      "Please answer at least one question."
    );

    return;
  }

  setFinishing(true);

  try {

    const response =
      await axios.post(
        "http://127.0.0.1:8000/finish-interview",
        {
          workspace_id:
            workspaceId,

          answers:
            answers
        }
      );

    setReport(
      response.data.report
    );

    setInterviewCompleted(
      true
    );

  } catch (error) {

    console.log(error);

    alert(
      "Failed to generate report"
    );

  } finally {

    setFinishing(false);

  }
};

  if (interviewCompleted) {

  return (

    <div className="interview-generator">

      <h2>
        Interview Report
      </h2>

      <pre>
        {report}
      </pre>

    </div>

  );
}

if (interviewStarted) {

  return (

    <div className="interview-generator">

      <h2>
        Mock Interview
      </h2>

      <div className="timer-box">

      ⏰ Time Left:
      {" "}
      {Math.floor(timeLeft / 60)}
      :
      {(timeLeft % 60)
        .toString()
        .padStart(2, "0")}

    </div>

      <h3>
  Question {currentIndex + 1}
  / {totalQuestions}
</h3>

<div className="question-box">

  {
    questions[
      currentIndex
    ]
  }

</div>

<textarea
  className="answer-box"
  value={
    answers[
      currentIndex
    ] || ""
  }
  onChange={(e) => {

    const updatedAnswers =
      [...answers];

    updatedAnswers[
      currentIndex
    ] =
      e.target.value;

    setAnswers(
      updatedAnswers
    );

  }}
  placeholder="Type your answer..."
/>

<div
  className="navigation-buttons"
>

  <button
    className = "prev-btn"
    onClick={() =>
      setCurrentIndex(
        currentIndex - 1
      )
    }
    disabled={
      currentIndex === 0
    }
  >
    ← Previous
  </button>

  <button
    className = "next-btn"
    onClick={() =>
      setCurrentIndex(
        currentIndex + 1
      )
    }
    disabled={
      currentIndex ===
      totalQuestions - 1
    }
  >
    Next →
  </button>

</div>

<button
  className="finish-btn"
  onClick={finishInterview}
  disabled={finishing}
>
  {
    finishing
      ? "Generating Report..."
      : "Finish Interview"
  }
</button>
    </div>

  );
}
  return (

    <div className="interview-generator">

      <h2>
        🎤 Mock Interview
      </h2>

      <p>
        Configure your interview and start practicing.
      </p>

      <div className="interview-controls">

        <div>

          <label>
            Source Document
          </label>

          <select
            value={sourcePdf}
            onChange={(e) =>
              setSourcePdf(
                e.target.value
              )
            }
          >

            <option>
              All Documents
            </option>

            {
              pdfs.map(
                (pdf) => (

                  <option
                    key={pdf._id}
                    value={pdf.pdf_name}
                  >
                    {pdf.pdf_name}
                  </option>

                )
              )
            }

          </select>

        </div>

        <div>

          <label>
            Difficulty
          </label>

          <select
            value={difficulty}
            onChange={(e) =>
              setDifficulty(
                e.target.value
              )
            }
          >

            <option>
              Easy
            </option>

            <option>
              Medium
            </option>

            <option>
              Hard
            </option>

            <option>
              Mixed
            </option>

          </select>

        </div>

        <div>

          <label>
            Interview Type
          </label>

          <select
            value={interviewType}
            onChange={(e) =>
              setInterviewType(
                e.target.value
              )
            }
          >

            <option>
              Technical
            </option>

            <option>
              HR
            </option>

            {/* <option>
              MCQ
            </option> */}

          </select>

        </div>

        <div>

          <label>
            Duration
          </label>

          <select
            value={duration}
            onChange={(e) =>
              setDuration(
                Number(
                  e.target.value
                )
              )
            }
          >

            <option value={15}>
              15 Minutes
            </option>

            <option value={30}>
              30 Minutes
            </option>

            <option value={45}>
              45 Minutes
            </option>

            <option value={60}>
              60 Minutes
            </option>

          </select>

        </div>

      </div>

      <button
        className="start-interview-btn"
        onClick={startInterview}
        disabled={loading}
      >
        {
          loading
          ? "Starting..."
          : "Start Interview"
        }
      </button>

    </div>
  );
}

export default MockInterview;