import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchUsers = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Get token from localStorage
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") searchUsers();
  };

  const navigateToChat = (userId) => {
    navigate(`/chat/${userId}`);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Search Users</h2>
      <div>
        <input
          type="text"
          placeholder="Enter username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ padding: 8, fontSize: 16, width: 300 }}
        />
        <button
          onClick={searchUsers}
          style={{ marginLeft: 10, padding: "8px 16px" }}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {results.length > 0 && (
        <ul style={{ marginTop: 20 }}>
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
        <p>No users found for "{query}"</p>
      )}
    </div>
  );
};

export default SearchUsers;
