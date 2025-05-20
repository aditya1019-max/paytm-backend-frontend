import React, { useState } from "react";
import axios from "axios";
import "../component-css/profile.css"

const Profile = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleFetchProfile = async () => {
    try {
      if (!token) {
        setError("Please enter a token.");
        return;
      }

      const res = await axios.get("http://localhost:5000/api/v1/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
      setError(""); // Clear any old errors
    } catch (err) {
      setUser(null);
      setError("Failed to fetch profile: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔐 Profile Lookup</h2>
      <input
        type="text"
        placeholder="Enter JWT token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        style={{
          width: "400px",
          padding: "10px",
          marginBottom: "10px",
          display: "block",
        }}
      />
      <button onClick={handleFetchProfile} style={{ padding: "10px 20px" }}>
        Get Profile
      </button>

      {error && <p style={{ color: "red", marginTop: "20px" }}>❌ {error}</p>}

      {user && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Username:</strong> {user.username}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
