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

  //accepts category param and fetches from backend accordingly
  const fetchChallenges = async (category = "All") => {
    try {
      const url =
        category === "All"
          ? `${baseURL}/api/challenges`
          : `${baseURL}/api/challenges?category=${category.toLocaleLowerCase()}`; // ⭐ MODIFIED
      const res = await axios.get(url);
      console.log("fetched challenges", res.data);
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
      console.log("✅ Completed Challenges from backend:", completedChallenges);
      setCompleted(completedChallenges.map((c) => c._id));
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // This now depends on filterCategory and fetches challenges accordingly
  useEffect(() => {
    fetchChallenges(filterCategory);
  }, [filterCategory]);

  // No need to filter challenges on frontend now
  // const filterChallenges = () => {
  //   if (filterCategory === "All") return allChallenges;
  //   return allChallenges.filter((ch) => ch.category === filterCategory);
  // };

  const groupedChallenges = () => {
    const completedSet = new Set(completed.map((id) => id.toString()));

    const completedList = allChallenges.filter((ch) =>
      completedSet.has(ch._id.toString())
    );

    const lockedList = allChallenges.filter(
      (ch) => !completedSet.has(ch._id.toString())
    );

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
          <option value="All">All</option>
          <option value="Water">Water</option>
          <option value="Waste">Waste</option>
          <option value="Energy">Energy</option>
          <option value="Nature">Nature</option>
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
