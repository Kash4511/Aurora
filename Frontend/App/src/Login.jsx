import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const post = async () => {
    const data = { username, password };
    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', data);
      console.log('Login Successful', response.data);
      alert('Login Successful');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login Failed');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={post}>Login</button>
    </div>
  );
}

export default Login;