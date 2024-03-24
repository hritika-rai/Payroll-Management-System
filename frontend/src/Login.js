import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import './styles/login.css';
import styles from './styles/login.css'; 

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      props.setIsAuthenticated(true);
    }
  }, [props]);


  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      props.setIsAuthenticated(true);

      localStorage.setItem('isAuthenticated', 'true');

      alert('Login successful!');
      navigate('/admin'); // Redirect to admin page
    } else {
      alert('Invalid username or password. Please try again.');
    }
  };

  return (
    // <div className="login-app">
    //   <div className="login-container">
    <div className={styles.loginApp}>
      <div className={styles.loginContainer}>
        <div className="center-text">
          <h1>Welcome to EzPay</h1>
          <h4>Sign in to your Account</h4>
        </div>
        <div>
          <label className="left-align">
            Username:
            <input
              className="login-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className="left-align">
            Password:
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div className="login-options">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember Me
          </label>
          <span className="forget-password">Forget password?</span>
        </div>
        {/* <button className="login-button" onClick={handleLogin}>
          Login
        </button> */}
        <button className={styles.loginButton} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
