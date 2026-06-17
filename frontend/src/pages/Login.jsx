import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      navigate(
        "/dashboard"
      );
    }

  }, [navigate]);

  const handleLogin = async () => {

    try {

      const response =
        await axios.post(
          "http://127.0.0.1:8000/login",
          {
            email,
            password
          }
        );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "name",
        response.data.name
      );

    localStorage.setItem(
        "email",
        response.data.email
    );

      navigate(
        "/dashboard"
      );

    } catch {

      alert(
        "Invalid Credentials"
      );
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1 className="auth-logo">
          InterviewForge
        </h1>

        <p className="auth-subtitle">
          AI-Powered Interview Preparation
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="auth-link">

          Don't have an account?

          <span
            onClick={() =>
              navigate("/signup")
            }
          >
            Sign Up
          </span>

        </p>

      </div>

    </div>
  );
}

export default Login;