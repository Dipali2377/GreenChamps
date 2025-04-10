import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../styles/Navbar.css";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import logo from "../assets/greenchamps-logo.png";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="GreenChamps Logo" className="logo-img" />
      </Link>

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

        {!user ? (
          <>
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
