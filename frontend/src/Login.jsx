import { useState } from "react";
import { api } from "./api.js";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      onLogin(await api("/auth/login", "POST", { username, password }));
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login">
      <form onSubmit={submit}>
        <h2>Student Management System</h2>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
