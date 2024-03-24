import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import './styles/login.css';
import styles from './styles/login.css'; 
import axios from 'axios'

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); 
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    const isEmpAuthenticated = localStorage.getItem('isEmpAuthenticated');
    if (isEmpAuthenticated === 'true') {
      props.setIsEmpAuthenticated(true);
    }
  }, [props]);


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/loginemployee', {
        username,
        password,
      });

      console.log(response.data.success);
  
      if (response.data.success) {
        // Extract empId from the server response
        const empId = username;

        // Store empId in localStorage
        localStorage.setItem('empId', empId);
        props.setIsEmpAuthenticated(true);
        localStorage.setItem('isEmpAuthenticated', 'true');
        alert('Login successful!');
        navigate('/home');
      } else {
        console.log('here1');
        alert('Invalid username or password. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
        setErrorMessage(error.response.data.error);
      }else{
        console.log('here2');
        console.error('Error during login:', error.message);
      }
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
            Employee ID:
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
        {errorMessage && (
        <div style={{ color: 'white', marginTop: '15px', textAlign: 'center' }}>
          {errorMessage}
        </div>)}
        </div>
      </div>
      
  );
};

export default Login;
