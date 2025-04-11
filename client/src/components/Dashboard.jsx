import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { FaLeaf, FaStar, FaLock } from "react-icons/fa";
import Confetti from "react-confetti";
import { Tooltip } from "react-tooltip";

const baseURL = import.meta.env.VITE_API_BASE_URL;

import "react-tooltip/dist/react-tooltip.css";

const Dashboard = () => {
  const [challenges, setChallenges] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [badges, setBadges] = useState([]);

  const [showConfetti, setShowConfetti] = useState(false);
  const [prevBadgeCount, setPrevBadgeCount] = useState(0);

  const user = JSON.parse(localStorage.getItem("greenchampsUser"));
  const token = localStorage.getItem("greenchampsToken");

  // 🔹 Fetch all daily challenges
  const fetchChallenges = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/challenges`);
      const daily = response.data.filter((challenge) => challenge.isDaily);
      setChallenges(daily);
    } catch (error) {
      console.error("Error fetching challenges:", error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { completedChallenges, badges } = response.data;

      // Trigger confetti if new badge earned
      if (badges.length > prevBadgeCount) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000); // hide after 5 sec
      }

      setPrevBadgeCount(badges.length);
      setCompleted(completedChallenges.map((c) => c._id));
      setBadges(badges);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchChallenges();
    fetchUserProfile(); // ✅ Use backend data instead of localStorage
  }, []);

  const handleComplete = async (challengeId) => {
    try {
      await axios.post(
        `${baseURL}/api/challenges/complete/${challengeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Update UI after completion
      //   const updated = [...completed, challengeId];

      //   setCompleted(updated);
      await fetchUserProfile();
    } catch (error) {
      console.error("Error marking challenge complete:", error);
    }
  };

  //   const handleCreateChallenge = async (e) => {
  //     e.preventDefault();
  //     try {
  //       await axios.post("http://localhost:8080/api/challenges", newChallenge, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setNewChallenge({
  //         title: "",
  //         description: "",
  //         points: "",
  //         isDaily: false,
  //       });
  //       fetchChallenges(); // refresh list
  //     } catch (error) {
  //       console.error("Error creating challenge:", error);
  //     }
  //   };

  return (
    <div className="dashboard-container">
      {/* <div className="create-challenge-section">
        <h2>➕ Add New Challenge</h2>
        <form onSubmit={handleCreateChallenge} className="challenge-form">
          <input
            type="text"
            placeholder="Title"
            value={newChallenge.title}
            onChange={(e) =>
              setNewChallenge({ ...newChallenge, title: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Description"
            value={newChallenge.description}
            onChange={(e) =>
              setNewChallenge({ ...newChallenge, description: e.target.value })
            }
            required
          ></textarea>
          <input
            type="number"
            placeholder="Points"
            value={newChallenge.points}
            onChange={(e) =>
              setNewChallenge({ ...newChallenge, points: e.target.value })
            }
            required
          />
          <label>
            <input
              type="checkbox"
              checked={newChallenge.isDaily}
              onChange={(e) =>
                setNewChallenge({ ...newChallenge, isDaily: e.target.checked })
              }
            />
            Mark as Daily Challenge
          </label>
          <button type="submit">Create Challenge</button>
        </form>
      </div> */}

      {showConfetti && <Confetti />}
      <h1 className="dashboard-title">
        Welcome, {user?.name || "GreenChamp"} 🌿
      </h1>

      {/* 🔹 Progress Section */}
      <div className="top-dashboard-section">
        <div className="progress-section">
          <h2>
            🌿 Challenge Progress: {completed.length}/{challenges.length}{" "}
            completed
          </h2>
          <div className="progress-bar-wrapper">
            <div
              className="progress-bar"
              style={{
                width: `${(completed.length / challenges.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* 🔹 Badges Section */}
        <div className="badge-section">
          <h2 className="badge-title">🏆 Your Badges</h2>

          <div className="badge-container">
            {[
              {
                name: "Eco Beginner",
                requiredChallenges: 1,
                icon: "🌱",
                description: "Completed 1 challenge",
              },
              {
                name: "Eco Hero",
                requiredChallenges: 5,
                icon: "🏅",
                description: "Completed 5 challenges",
              },
              {
                name: "Green Champ",
                requiredChallenges: 10,
                icon: "🌍",
                description: "Completed 10 challenges",
              },
            ].map((badge) => {
              const earned = badges.find((b) => b.name === badge.name);
              return (
                <div
                  className={`badge-card ${earned ? "earned" : "locked"}`}
                  data-tooltip-id="badge-tooltip"
                  data-tooltip-id-content={
                    earned
                      ? `${badge.name} unlocked! 🎉`
                      : `Locked: ${badge.description}`
                  }
                  key={badge.name}
                  style={{
                    transition: "transform 0.3s ease",
                    transform: earned ? "scale(1.1)" : "scale(1)",
                    cursor: "pointer",
                  }}
                >
                  <div className="badge-icon">
                    {earned ? badge.icon : <FaLock />}
                  </div>
                  <div className="badge-name">{badge.name}</div>
                </div>
              );
            })}
            <Tooltip effect="solid" />
          </div>
        </div>
      </div>

      {/* 🔹 Challenge List Section */}
      <div className="challenge-list">
        {challenges.map((challenge) => {
          const isCompleted = completed.includes(challenge._id);
          return (
            <div className="challenge-card" key={challenge._id}>
              <div className="challenge-title">
                <FaLeaf className="challenge-icon" />
                {challenge.title}
              </div>
              <div className="challenge-description">
                {challenge.description}
              </div>
              <div className="challenge-points">
                <FaStar className="challenge-icon" />
                {challenge.points} points
              </div>
              <button
                className="complete-btn"
                onClick={() => handleComplete(challenge._id)}
                disabled={isCompleted}
              >
                {isCompleted ? "✅ Completed" : "Mark Complete"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
