import {
  Routes,
  Route
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Chat from "../pages/Chat";
import QuestionGenerator from "../pages/QuestionGenerator";
import MockInterview from "../pages/MockInterview";
import Reports from "../pages/Reports";
import Workspace from "../pages/Workspace";

import Login from "../pages/Login";
import Signup from "../pages/Signup";

import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "../components/ProtectedRoute";

import LandingPage from "../pages/LandingPage";

function AppRoutes() {

  return (

    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/workspace/:workspaceId"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Workspace />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Chat />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/questions"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <QuestionGenerator />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/interview"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <MockInterview />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Reports />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;