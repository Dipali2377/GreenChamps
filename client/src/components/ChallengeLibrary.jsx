import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ChallengeLibrary.css";
import { FaLeaf, FaLock, FaCheckCircle } from "react-icons/fa";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const ChallengeLibrary = () => {
  const [allChallenges, setAllChallenges] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");

  const token = localStorage.getItem("greenchampsToken");

  const fetchChallenges = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/challenges`);
      setAllChallenges(res.data);
    } catch (err) {
      console.error("Error fetching challenges:", err);
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { completedChallenges } = res.data;
      setCompleted(completedChallenges.map((c) => c._id));
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  useEffect(() => {
    fetchChallenges();
    fetchUserData();
  }, []);

  const filterChallenges = () => {
    if (filterCategory === "All") return allChallenges;
    return allChallenges.filter((ch) => ch.category === filterCategory);
  };

  const groupedChallenges = () => {
    const filtered = filterChallenges();
    const completedList = filtered.filter((ch) => completed.includes(ch._id));
    const lockedList = filtered.filter((ch) => !completed.includes(ch._id));
    return { completedList, lockedList };
  };

  const { completedList, lockedList } = groupedChallenges();

  return (
    <div className="library-container">
      <h1 className="library-title">📚 Challenge Library</h1>

      <div className="library-filter-section">
        <label>Filter by Category:</label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option>All</option>
          <option>Water</option>
          <option>Waste</option>
          <option>Energy</option>
          <option>Nature</option>
        </select>
      </div>

      <h2 className="library-section-title">✅ Completed Challenges</h2>
      <div className="library-grid">
        {completedList.map((ch) => (
          <div className="library-card completed" key={ch._id}>
            <div className="library-card-header">
              <FaCheckCircle className="library-icon green" />
              <span>{ch.title}</span>
            </div>
            <p>{ch.description}</p>
            <span className="library-category-tag">{ch.category}</span>
          </div>
        ))}
        {completedList.length === 0 && <p>No challenges completed yet.</p>}
      </div>

      <h2 className="library-section-title">🔒 Locked/Upcoming Challenges</h2>
      <div className="library-grid">
        {lockedList.map((ch) => (
          <div className="library-card locked" key={ch._id}>
            <div className="library-card-header">
              <FaLock className="library-icon gray" />
              <span>{ch.title}</span>
            </div>
            <p>{ch.description}</p>
            <span className="library-category-tag">{ch.category}</span>
          </div>
        ))}
        {lockedList.length === 0 && <p>All challenges completed! 🎉</p>}
      </div>
    </div>
  );
};

export default ChallengeLibrary;
