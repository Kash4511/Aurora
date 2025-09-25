import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from './components/Navigation';
import { motion } from "framer-motion";
import TopBar from "./components/T"; // Fixed import path



const SearchUsers = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("access_token") || null;

  const searchUsers = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    const token = getToken();
    if (!token) {
      setError("You must be logged in to search users");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://aurora-vtm6.onrender.com/chat/users/?search=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResults(response.data);
    } catch (err) {
      console.error("Error searching users:", err.response?.data || err.message);
      setError("Failed to search users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const navigateToChat = (userId) => {
    navigate(`/chat/${userId}`);
  };

return (
  <motion.div style={{ padding: 40 }}>
    <TopBar title="Search Users" />
    <Navigation />

    {/* Search bar */}
    <motion.div
      id="search"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        display: "flex",
        backgroundColor: "black",
        borderRadius: "15px",
        justifyContent: "center",
        alignItems: "center",
        margin: "50px auto",
        width: "100%",
        maxWidth: "1200px",
        padding: "10px",
        marginBottom: "50px",
      }}
    >
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={handleSearch}
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "16px",
          outline: "none",
          padding: "5px 10px",
        }}
      />
      <button
        onClick={searchUsers}
        style={{
          marginLeft: "10px",
          padding: "8px 16px",
          backgroundColor: "#86B66F",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </motion.div>

    {error && <p style={{ color: "red" }}>{error}</p>}

    {/* Results */}
    {results.length > 0 && (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
          marginTop: "20px",
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "1200px",
        }}
      >
        {results.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: "#222",
              borderRadius: "12px",
              padding: "15px",
              display: "flex",
              alignItems: "center",
              color: "white",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundColor: "#555",
                backgroundImage: user.avatar
                  ? `url(${user.avatar})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                marginRight: "15px",
              }}
            >
              {!user.avatar && (
                <span
                  style={{
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    fontSize: "18px",
                  }}
                >
                  {user.username?.[0]?.toUpperCase() || "U"}
                </span>
              )}
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>{user.username}</h3>
              <p style={{ margin: 0, fontSize: "14px", color: "#ccc" }}>
                {user.email}
              </p>
            </div>

            {/* Status + Chat Button */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: user.is_online ? "lightgreen" : "gray",
                  marginBottom: "8px",
                }}
              >
                {user.is_online ? "Online" : "Offline"}
              </span>
              <button
                onClick={() => navigateToChat(user.id)}
                style={{
                  backgroundColor: "#86B66F",
                  border: "none",
                  borderRadius: "5px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                Chat
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    )}

    {!loading && results.length === 0 && query.trim() && !error && (
      <p style={{ marginTop: "40px", marginLeft: "130px" }}>
        No users found for "{query}"
      </p>
    )}
  </motion.div>
);
};

export default SearchUsers;