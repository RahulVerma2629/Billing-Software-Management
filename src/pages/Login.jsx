import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setError("");
      onLogin();
      navigate("/dashboard", { replace: true });
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">💰</div>
        <h1>BillEase</h1>
        <p className="login-subtitle">Admin Login</p>

        <form onSubmit={submit} className="login-form">
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

          {error && <div className="error-box">{error}</div>}
          <button className="primary-btn login-btn">Login</button>
        </form>

        <div className="demo-box">
          <strong>Demo credentials</strong>
          <div>Username: <b>admin</b></div>
          <div>Password: <b>admin123</b></div>
        </div>
      </div>
    </div>
  );
}
