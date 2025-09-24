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
          margin: "50px auto", // Center horizontally
          width: "100%",
          maxWidth: "1200px", // Optional: Limit the maximum width
          padding: "10px",
          marginBottom:"50px",
           // Add some padding for spacing
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

      {results.length > 0 && (
        <ul style={{ marginTop: 20 , marginLeft: 150}}>
          {results.map((user) => (
            <li key={user.id} style={{ marginBottom: 10 }}>
              {user.username} ({user.email})
              <button
                onClick={() => navigateToChat(user.id)}
                style={{ marginLeft: 10 }}
              >
                Chat
              </button>
            </li>
          ))}
        </ul>
      )}

      {!loading && results.length === 0 && query && !error && (
        <p style={{marginTop:"40px", marginLeft:"130px"}}>No users found for "{query}"</p>
      )}
    </motion.div>
  );
};

export default SearchUsers;
