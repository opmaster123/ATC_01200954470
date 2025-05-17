import React, { useState } from "react";

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (endpoint) => {
    try {
      const res = await fetch(`/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed");
      }

      localStorage.setItem("token", data.token);
      setMessage(`✅ ${endpoint} success! Welcome, ${data.user.username}`);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "2rem auto", textAlign: "center" }}>
      <h2>Auth Form</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button onClick={() => handleSubmit("register")}>Register</button>{" "}
      <button onClick={() => handleSubmit("login")}>Login</button>
      <p>{message}</p>
    </div>
  );
};

export default AuthForm;
