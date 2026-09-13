import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">💰</div>

        <h1>BillEase</h1>

        <h2>Admin Login</h2>
        <p className="login-description">
          Login to manage your billing system
        </p>

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;