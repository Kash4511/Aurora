import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchUsers = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("access"); // or however you store it

  const searchUsers = async () => {
    const res = await fetch(`http://127.0.0.1:8000/chat/search-users/?q=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setResults(data);
  };

  const handleChat = (userId) => {
    navigate(`/chat/${userId}`);
  };

  return (
    <div>
      <h2>🔍 Search Users to Chat</h2>
      <input
        type="text"
        placeholder="Search by username"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchUsers}>Search</button>

      <ul>
        {results.map((user) => (
          <li key={user.id}>
            {user.username}
            <button onClick={() => handleChat(user.id)}>Chat 💬</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchUsers;
