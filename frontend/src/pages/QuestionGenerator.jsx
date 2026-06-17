import { useEffect, useState } from "react";
import axios from "axios";

function QuestionGenerator({ workspaceId }) {

  const [difficulty, setDifficulty] =
    useState("Easy");

  const [questionType, setQuestionType] =
    useState("Technical");

  const [count, setCount] =
    useState(10);

  const [sourcePdf, setSourcePdf] =
    useState("All Documents");

  const [pdfs, setPdfs] =
    useState([]);

  const [questions, setQuestions] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    fetchPdfs();
    setQuestions("");
    setSourcePdf("All Documents");

  }, [workspaceId]);

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

  const generateQuestions =
    async () => {

      setLoading(true);

      try {

        const response =
          await axios.post(
            "http://127.0.0.1:8000/generate-questions",
            {
              workspace_id:
                workspaceId,

              count,

              difficulty,

              question_type:
                questionType,

              source_pdf:
                sourcePdf
            }
          );

        setQuestions(
          response.data.questions
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to generate questions"
        );
      }

      setLoading(false);
    };

  return (

    <div className="question-generator">

      <h2>
        Interview Question Generator
      </h2>

      <div className="question-controls">

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
            Question Type
          </label>

          <select
            value={questionType}
            onChange={(e) =>
              setQuestionType(
                e.target.value
              )
            }
          >

            <option>
              Technical
            </option>

            <option>
              MCQ
            </option>

            <option>
              HR
            </option>

          </select>

        </div>

        <div>

          <label>
            Number
          </label>

          <select
            value={count}
            onChange={(e) =>
              setCount(
                Number(
                  e.target.value
                )
              )
            }
          >

            <option>
              5
            </option>

            <option>
              10
            </option>

            <option>
              15
            </option>

            <option>
              20
            </option>

          </select>

        </div>

      </div>

      <button
        className="generate-btn"
        onClick={generateQuestions}
        disabled={loading}
      >

        {
          loading
          ? "Generating..."
          : "Generate Questions"
        }

      </button>

      {
        questions && (

          <div className="questions-output">

            <h3>
              Generated Questions
            </h3>

            <pre>
              {questions}
            </pre>

          </div>

        )
      }

    </div>
  );
}

export default QuestionGenerator;