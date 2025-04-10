import React from "react";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("greenchampsUser"));

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome, {user?.name || "GreenChamp"} 🌿</h1>
      <p>This is your dashboard.</p>
    </div>
  );
};

export default Dashboard;
