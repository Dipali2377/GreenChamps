import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const RegisterForm = () => {
  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  console.log(formData);

  let navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    try {
      //   const response = await axios.post(
      //     "http://localhost:8080/api/auth/register",

      //     { ...formData }
      //   );
      const response = await axios.post(
        `${baseURL}/api/auth/register`,
        { ...formData },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Important if you're using cookies or sessions
        }
      );
      const { data: { message } = {} } = response || {};

      toast.success(message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      console.error("Registration failed", errorMessage);
      toast.error("Registration failed: " + errorMessage);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        id="register-name"
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        id="register-email"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        id="register-password"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>

      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>

      <ToastContainer position="top-right" autoClose={3000} />
    </form>
  );
};

export default RegisterForm;
