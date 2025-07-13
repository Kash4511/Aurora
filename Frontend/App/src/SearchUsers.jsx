import React, { useState } from 'react';

const SearchUsers = () => {
  const [query, setQuery] = useState('');
  // Placeholder for user search results
  return (
    <div style={{ padding: 40 }}>
      <h2>Search Users</h2>
      <input
        type="text"
        placeholder="Enter username..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ padding: 8, fontSize: 16, width: 300 }}
      />
      <div style={{ marginTop: 20 }}>
        {/* User results would go here */}
        <p>Results will appear here.</p>
      </div>
    </div>
  );
};

export default SearchUsers; 