import React, {useState} from 'react'
import axios from 'axios'

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [first_name, setFirstName] = useState('')
    const post = async () => {
        const data = { username, password, email, first_name }
        try {
            const response = await axios.post('http://127.0.0.1:8000/register/', data);
            console.log('Login Successful', response.data);
            alert('Login Successful');
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login Failed');
        }
    }

  return (
    <div>
        <h1>Register</h1>
        <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
        <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
        <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
        <input
        type="text"
        placeholder="First Name"
        onChange={(e) => setFirstName(e.target.value)}
        
      />
      <DeviceMotionEvent.div>
        
      </DeviceMotionEvent.div>
      <button onClick={post}>Register</button>

    </div>
  )

};
export default Register;