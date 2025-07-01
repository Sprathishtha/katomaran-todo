import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/auth/${isLogin ? "login" : "register"}`, {
        email,
        password,
        name,
      });
      localStorage.setItem("token", res.data.token);
      toast.success(`${isLogin ? "Logged in" : "Registered"} successfully`);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {!isLogin && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleSubmit}>
        {isLogin ? "Login" : "Register"}
      </button>
      <br />
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "New user? Register" : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default LoginPage;
