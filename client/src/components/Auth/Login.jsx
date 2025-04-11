// LoginForm.jsx
import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

import "./Login.css";
import { UserContext } from "../../context/UserContext";

const LoginForm = () => {
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/api/auth/login`, {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem("greenchampsToken", token);
      localStorage.setItem("greenchampsUser", JSON.stringify(user));

      setUser(response.data.user);
      toast.success("Login successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Login error object:", error);
      console.error("Login failed", error.response?.data?.message);
      toast.error(
        "Login failed: " +
          (error.response?.data?.message || "Something went wrong")
      );
    }
  };

  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        id="login-email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        id="login-password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      <p>
        Don’t have an account? <a href="/register">Register here</a>
      </p>
      <ToastContainer position="top-right" autoClose={3000} />
    </form>
  );
};

export default LoginForm;
