import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
    if (username === 'admin' && password === 'password') {
      onLogin(username);
    } else {
      alert('Invalid username or password');
    }
  };

  return (
  <p>  <h1>Todo Management Application</h1>
    <div className="login-form">
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text" required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password" required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div></p>
  );
};

export default Login;
