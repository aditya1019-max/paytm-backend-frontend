import { useState } from 'react';
import axios from 'axios';
import "../component-css/login.css"

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/v1/user/login', credentials);
      
      // Assuming your backend sends { token: "..." }
      const { token } = res.data;

      // Save token locally for authenticated routes
      localStorage.setItem('token', token);

      alert("✅ Login successful!");
      // Navigate or update state here (e.g., redirect to /dashboard)
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("❌ Login failed. Check your username/password.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
