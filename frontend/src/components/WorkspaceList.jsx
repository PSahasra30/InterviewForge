import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function WorkspaceList({ refresh }) {

  const [workspaces, setWorkspaces] =
    useState([]);

  const navigate =
    useNavigate();

  useEffect(() => {

    fetchWorkspaces();

  }, [refresh]);

  const fetchWorkspaces = async () => {

    try {

      const email =
        localStorage.getItem(
          "email"
        );

      const response =
        await axios.get(
          `http://127.0.0.1:8000/workspaces/${email}`
        );

      setWorkspaces(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  const selectWorkspace =
    (workspace) => {

      navigate(
        `/workspace/${workspace._id}`
      );
    };

  return (

    <div className="workspace-list">

      {
        workspaces.map(
          (workspace) => (

            <div
              key={workspace._id}
              className="workspace-item"
              onClick={() =>
                selectWorkspace(
                  workspace
                )
              }
            >
              📁 {workspace.workspace_name}
            </div>

          )
        )
      }

    </div>
  );
}

export default WorkspaceList;