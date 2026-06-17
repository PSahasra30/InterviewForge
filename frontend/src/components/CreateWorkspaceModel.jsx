import { useState } from "react";
import axios from "axios";

function CreateWorkspaceModal({
  onClose,
  onWorkspaceCreated
}) {

  const [workspaceName,
    setWorkspaceName] =
    useState("");

  const createWorkspace =
    async () => {

      try {

        const email =
          localStorage.getItem(
            "email"
          );

        await axios.post(
          "http://127.0.0.1:8000/workspace",
          {
            user_email: email,
            workspace_name:
            workspaceName
          }
        );

        onWorkspaceCreated();

        onClose();

      } catch {

        alert(
          "Failed to create workspace"
        );
      }
    };

  return (

    <div className="modal-overlay">

      <div className="logout-modal">

        <h2>
          Create Workspace
        </h2>

        <input
          placeholder=
          "Workspace Name"
          value={workspaceName}
          onChange={(e) =>
            setWorkspaceName(
              e.target.value
            )
          }
        />

        <div
          className="modal-actions"
        >

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="confirm-btn"
            onClick={
              createWorkspace
            }
          >
            Create
          </button>

        </div>

      </div>

    </div>
  );
}

export default CreateWorkspaceModal;