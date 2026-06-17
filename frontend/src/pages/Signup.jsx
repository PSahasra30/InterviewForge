import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

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

  const handleSignup = async () => {

    try {

      const response =
        await axios.post(
          "http://127.0.0.1:8000/signup",
          {
            name,
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
        "Signup Failed"
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
          Create your account
        </p>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
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
          onClick={handleSignup}
        >
          Signup
        </button>

        <p className="auth-link">

          Already have an account?

          <span
            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </span>

        </p>

      </div>

    </div>
  );
}

export default Signup;