import { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const post_url = async () => {
    try {
      const data = { username, password };

      const response = await axios.post(
        'http://127.0.0.1:8000/login/',
        data,
        // {
        //   headers: {
        //     'Content-Type': 'application/json', // Ensure JSON format
        //   },
        // }
      );

      // Handle the response
      console.log("Response:", response.data);
      alert(`Login successful! Welcome, ${response.data.username}`);
    } catch (error) {
      console.error("Error posting data:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <input
        id = "username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        
      />
      <input
        id = "password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button id = "button" onClick={post_url}>Post Data</button>
    </>
  );
}


export default App;
