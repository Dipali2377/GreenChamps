import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">🌱 GreenChamps</div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/challenges">Challenges</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/login" className="btn login-btn">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="btn register-btn">
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
