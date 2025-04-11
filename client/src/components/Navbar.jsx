import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../styles/Navbar.css";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import logo from "../assets/greenchamps-logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("greenchampsUser"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    setDropdownOpen(false); // Hide dropdown on login/logout
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("greenchampsUser");
    localStorage.removeItem("greenchampsToken");
    setUser(null);
    navigate("/login");
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setDropdownOpen(false);
  };
  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="GreenChamps Logo" className="logo-img" />
      </Link>

      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/challenges" onClick={() => setMenuOpen(false)}>
            Challenges
          </Link>
        </li>
        <li>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
        </li>

        {!user ? (
          <>
            <li>
              <Link
                to="/login"
                className="btn login-btn"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="btn register-btn"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </li>
          </>
        ) : (
          <li className="profile-menu">
            <div
              className="profile-icon"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FaUserCircle size={24} />
              <span className="username">
                {user.name?.split(" ")[0] || "User"}
              </span>
            </div>

            {dropdownOpen && (
              <div className="dropdown">
                <button onClick={handleLogout}>Sign Out</button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
