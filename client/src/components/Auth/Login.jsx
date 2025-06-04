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

      const fullUser = {
        name: user.name,
        email: user.email,
        _id: user._id,
        isAdmin: user.isAdmin,
      };

      localStorage.setItem("greenchampsToken", token);
      localStorage.setItem("greenchampsUser", JSON.stringify(fullUser));

      const storedUser = JSON.parse(localStorage.getItem("greenchampsUser"));
      console.log("Read from localStorage:", storedUser);
      console.log("storedUser.isAdmin:", storedUser.isAdmin);

      setUser(fullUser);
      // console.log("User from response:", user);
      toast.success("Login successful!");

      console.log("user.isAdmin from response:", user.isAdmin);
      alert("isAdmin: " + user.isAdmin);

      setTimeout(() => {
        if (storedUser.isAdmin) {
          console.log("navigating to the /admin-dashboard");
          navigate("/admin-dashboard");
        } else {
          console.log("navigating to the /dashboard");
          navigate("/dashboard");
        }
      }, 1500);
      console.log("Saving to localStorage:", response.data.user);
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
    </form>
  );
};

export default LoginForm;
