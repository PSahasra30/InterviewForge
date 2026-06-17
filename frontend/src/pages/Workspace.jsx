import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import QuestionGenerator from "./QuestionGenerator";
import MockInterview from "./MockInterview";
import Reports from "./Reports";

function Workspace() {

  const { workspaceId } =
    useParams();

  const [workspace,
    setWorkspace] =
    useState(null);

  const [pdfs,
    setPdfs] =
    useState([]);

  const [activeTab,
    setActiveTab] =
    useState("chat");
  
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] =
  useState(false);

  const fileInputRef =
    useRef(null);

  const messagesEndRef =
  useRef(null);  

  useEffect(() => {

    fetchWorkspace();

    fetchPdfs();

    fetchChatHistory();

  }, [workspaceId]);

  useEffect(() => {

  messagesEndRef.current?.scrollIntoView(
    {
      behavior: "smooth"
    }
  );

}, [messages]);

  const fetchWorkspace =
    async () => {

      try {

        const response =
          await axios.get(
            `http://127.0.0.1:8000/workspace/${workspaceId}`
          );

        setWorkspace(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

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

  const uploadPdf =
    async (event) => {

      const files =
        event.target.files;

      if (!files.length)
        return;

      setUploading(true);

      try {

        for (
          let i = 0;
          i < files.length;
          i++
        ) {

          const formData =
            new FormData();

          formData.append(
            "workspace_id",
            workspaceId
          );

          formData.append(
            "file",
            files[i]
          );

          await axios.post(
            "http://127.0.0.1:8000/upload-pdf",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data"
              }
            }
          );
        }

        await fetchPdfs();

        alert(
          "PDF(s) uploaded successfully"
        );

        setUploading(false);

      } catch (error) {

        console.log(error);

        alert(
          "Upload failed"
        );
        setUploading(false);
      }
    };

    const fetchChatHistory =
  async () => {

    try {

      const response =
        await axios.get(
          `http://127.0.0.1:8000/chat-history/${workspaceId}`
        );

      const formattedMessages =
        response.data.map(
          (message) => ({
            role:
            message.role,

            text:
            message.message
          })
        );

      setMessages(
        formattedMessages
      );

    } catch (error) {

      console.log(error);
    }
  };

  const clearChat = async () => {

  const confirmClear =
    window.confirm(
      "Clear all chat messages?"
    );

  if (!confirmClear)
    return;

  try {

    await axios.delete(
      `http://127.0.0.1:8000/chat-history/${workspaceId}`
    );

    setMessages([]);

    alert(
      "Chat cleared successfully"
    );

  } catch (error) {

    console.log(error);

    alert(
      "Failed to clear chat"
    );
  }
};

  const deletePdf =
    async (pdfId) => {

      const confirmDelete =
        window.confirm(
          "Delete this PDF?"
        );

      if (!confirmDelete)
        return;

      try {
        const response =
        await axios.delete(
          `http://127.0.0.1:8000/pdf/${pdfId}`
        );

        await fetchPdfs();

        alert(
            response.data.message
        );

      } catch (error) {

        console.log(error);

        alert(
          "Delete failed"
        );
      }
    };

    const askQuestion = async () => {

  if (!question.trim())
    return;

  const currentQuestion =
    question;

  setQuestion("");

  const userMessage = {
    role: "user",
    text: currentQuestion
  };

  setMessages(prev => [
    ...prev,
    userMessage
  ]);

  setLoading(true);

  try {

    await axios.post(
      "http://127.0.0.1:8000/chat-message",
      {
        workspace_id:
        workspaceId,

        role:
        "user",

        message:
        currentQuestion
      }
    );

    const response =
      await axios.post(
        "http://127.0.0.1:8000/ask",
        {
          workspace_id:
          workspaceId,

          question:
          currentQuestion
        }
      );

    const aiMessage = {
      role: "assistant",
      text:
      response.data.answer
    };

    setMessages(prev => [
      ...prev,
      aiMessage
    ]);

    await axios.post(
      "http://127.0.0.1:8000/chat-message",
      {
        workspace_id:
        workspaceId,

        role:
        "assistant",

        message:
        response.data.answer
      }
    );

  } catch (error) {

    console.log(error);

    alert(
      "Failed to get answer"
    );

  } finally {

    setLoading(false);
  }
};

  if (!workspace)
    return <h2>Loading...</h2>;

  return (

    <div className="workspace-page">

      {
  uploading && (

    <div className="upload-overlay">

      <div className="upload-modal">

        <h2>
          ⏳ Processing Document
        </h2>

        <p>
          Uploading and preparing your file...
        </p>

        <p>
          This may take a few seconds.
        </p>

      </div>

    </div>

  )
}
        <div className="workspace-container">
      <div className="workspace-header">

        <div className="workspace-title">
          <span className="folder-icon">📁</span>
          <span>{workspace.workspace_name}</span>
        </div>

        <p className="workspace-subtitle">
          Upload PDFs and interact with AI
          inside this workspace.
        </p>

        <p className="workspace-count">
          {pdfs.length} PDF(s) Uploaded
        </p>

      </div>

      <div className="workspace-actions">

  <button
    className="upload-btn"
    onClick={() =>
      fileInputRef.current.click()
    }
  >
    + Upload PDFs
  </button>


  <input
    type="file"
    accept=".pdf,.docx,.md,.txt"
    multiple
    ref={fileInputRef}
    onChange={uploadPdf}
    style={{
      display: "none"
    }}
  />

</div>
      <div className="pdf-section">

        <h3>
          Uploaded Files
        </h3>

        {
          pdfs.length === 0 ? (

            <div className="empty-state">
              No PDFs uploaded yet.
            </div>

          ) : (

            pdfs.map((pdf) => (

              <div
                key={pdf._id}
                className="pdf-item"
              >

                <span>
                  📄 {pdf.pdf_name}
                </span>

                <div className="pdf-actions">

                  <button
                    className="open-pdf-btn"
                    onClick={() =>
                      window.open(
                        `http://127.0.0.1:8000/${pdf.file_path}`,
                        "_blank"
                      )
                    }
                  >
                    Open
                  </button>

                  <button
                    className="delete-pdf-btn"
                    onClick={() =>
                      deletePdf(
                        pdf._id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))
          )
        }

      </div>

      <div className="workspace-tabs">

        <button
          className={
            activeTab === "chat"
              ? "active-tab"
              : ""
          }
          onClick={() =>
            setActiveTab("chat")
          }
        >
          Chat
        </button>

        <button
          className={
            activeTab === "questions"
              ? "active-tab"
              : ""
          }
          onClick={() =>
            setActiveTab("questions")
          }
        >
          Questions
        </button>

        <button
          className={
            activeTab === "interview"
              ? "active-tab"
              : ""
          }
          onClick={() =>
            setActiveTab("interview")
          }
        >
          Interview
        </button>

        <button
        className={
          activeTab === "reports"
            ? "active-tab"
            : ""
        }
        onClick={() =>
          setActiveTab("reports")
        }
      >
        Reports
      </button>

      </div>

      <div className="workspace-content">

        {
  activeTab === "chat" && (

    <div className="chat-container">

      <div className="chat-messages">

        {
          messages.length === 0 && (

            <div className="welcome-panel">

              <h2>
                Workspace Chat
              </h2>

              <p>
                Ask questions from
                uploaded PDFs.
              </p>

            </div>

          )
        }

        {
          messages.map(
            (message, index) => (

              <div
  key={index}
  className={
    message.role === "user"
      ? "user-message"
      : "ai-message"
  }
>
  {
    message.role === "assistant"
    ? (
        <ReactMarkdown>
          {message.text}
        </ReactMarkdown>
      )
    : (
        message.text
      )
  }
</div>

            )
          )
        }
        <div
            ref={messagesEndRef}
        />

      </div>

      <div className="chat-input-container">

        <input
        type="text"
        value={question}
        placeholder="Ask something..."
        onChange={(e) =>
            setQuestion(
            e.target.value
            )
        }
        onKeyDown={(e) => {

            if (
            e.key === "Enter" &&
            !loading
            ) {

            askQuestion();
            }
        }}
        />
        <button
          onClick={askQuestion}
          disabled={loading}
        >
          {
            loading
            ? "Thinking..."
            : "Send"
          }
        </button>

      </div>

    </div>

  )
}

        {
  activeTab === "questions" && (

    <QuestionGenerator
      workspaceId={workspaceId}
    />

  )
}

     {
    activeTab === "interview" && (

      <MockInterview
        workspaceId={workspaceId}
      />

    )
  } 

  {
  activeTab === "reports" && (

    <Reports
      workspaceId={workspaceId}
    />

  )
}

  </div>

    </div>

  </div>
);
}

export default Workspace;