import React from "react";
import ChallengeManager from "./ChallengeManager";
import "../../styles/AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Panel</h1>
      <ChallengeManager />
    </div>
  );
};

export default AdminDashboard;
