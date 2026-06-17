import { NavLink } from "react-router-dom";
import { useState } from "react";

import WorkspaceList from "./WorkspaceList";
import CreateWorkspaceModal from "./CreateWorkspaceModel";

function Sidebar() {

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  const [showWorkspaceModal,
    setShowWorkspaceModal] =
    useState(false);

  const [refresh,
    setRefresh] =
    useState(false);

  const handleLogout = () => {

    localStorage.clear();

    window.location.href =
      "/";
  };

  return (
    <>

      <div className="sidebar">

        <div className="sidebar-top">

          <div className="logo">
            InterviewForge
          </div>

          <button
            className="new-workspace"
            onClick={() =>
              setShowWorkspaceModal(true)
            }
          >
            + New Workspace
          </button>

          <div className="workspace-section">

            <h4>
              Workspaces
            </h4>

            <WorkspaceList
              refresh={refresh}
            />

          </div>

          <nav className="nav-links">

            <NavLink to="/dashboard">
              Dashboard
            </NavLink>

            {/* <NavLink to="/reports">
              Reports
            </NavLink> */}

          </nav>

        </div>

        <div className="sidebar-footer">

          <div className="user-info">
            👤 {localStorage.getItem("name")}
          </div>

          <button
            className="logout-btn"
            onClick={() =>
              setShowLogoutModal(true)
            }
          >
            Logout
          </button>

        </div>

      </div>

      {showWorkspaceModal && (

        <CreateWorkspaceModal

          onClose={() =>
            setShowWorkspaceModal(false)
          }

          onWorkspaceCreated={() =>
            setRefresh(!refresh)
          }

        />

      )}

      {showLogoutModal && (

        <div className="modal-overlay">

          <div className="logout-modal">

            <h2>
              Are you sure?
            </h2>

            <p>
              Do you really want to logout?
            </p>

            <div className="modal-actions">

              <button
                className="cancel-btn"
                onClick={() =>
                  setShowLogoutModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={handleLogout}
              >
                Yes, Logout
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default Sidebar;