import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/ChallengeManager.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("greenchampsToken");

const ChallengeManager = () => {
  const [challenges, setChallenges] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    points: "",
    category: "",
    isDaily: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchChallenges = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/challenges`);
      setChallenges(res.data);
    } catch (err) {
      console.error("Error fetching challenges:", err);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (editingId) {
        // Update
        await axios.put(`${baseURL}/api/challenges/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Create
        await axios.post(`${baseURL}/api/challenges`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      fetchChallenges();
      setShowModal(false);
      setEditingId(null);
      setForm({
        title: "",
        description: "",
        points: "",
        category: "",
        isDaily: false,
      });
    } catch (err) {
      console.error("Error creating/updating challenge:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this challenge?"))
      return;
    try {
      await axios.delete(`${baseURL}/api/challenges/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchChallenges();
    } catch (err) {
      console.error("Error deleting challenge:", err);
    }
  };

  const openEditModal = (challenge) => {
    setForm({
      title: challenge.title,
      description: challenge.description,
      points: challenge.points,
      category: challenge.category,
      isDaily: challenge.isDaily,
    });
    setEditingId(challenge._id);
    setShowModal(true);
  };

  return (
    <div className="admin-container">
      <h1>🌱 Admin Challenge Manager</h1>
      <button className="create-btn" onClick={() => setShowModal(true)}>
        <FaPlus /> Add Challenge
      </button>

      <div className="challenge-list">
        {challenges.map((ch) => (
          <div className="challenge-card" key={ch._id}>
            <h3>{ch.title}</h3>
            <p>{ch.description}</p>
            <p>
              <strong>Points:</strong> {ch.points}
            </p>
            <p>
              <strong>Category:</strong> {ch.category}
            </p>
            <p>
              <strong>Daily:</strong> {ch.isDaily ? "Yes" : "No"}
            </p>
            <div className="card-actions">
              <button onClick={() => openEditModal(ch)}>
                <FaEdit /> Edit
              </button>
              <button onClick={() => handleDelete(ch._id)}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingId ? "Edit Challenge" : "Create Challenge"}</h2>
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleInputChange}
            ></textarea>
            <input
              name="points"
              placeholder="Points"
              type="number"
              value={form.points}
              onChange={handleInputChange}
            />
            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleInputChange}
            />
            <label>
              <input
                type="checkbox"
                name="isDaily"
                checked={form.isDaily}
                onChange={handleInputChange}
              />
              Is Daily Challenge?
            </label>
            <div className="modal-actions">
              <button onClick={handleCreateOrUpdate}>
                {editingId ? "Update" : "Create"}
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeManager;
