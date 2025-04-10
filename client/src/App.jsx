import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Correct import
import Navbar from "./components/Navbar";
import LoginForm from "./components/Auth/Login";
import RegisterForm from "./components/Auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import ChallengeLibrary from "./components/ChallengeLibrary";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/challenges"
          element={
            <PrivateRoute>
              <ChallengeLibrary />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
