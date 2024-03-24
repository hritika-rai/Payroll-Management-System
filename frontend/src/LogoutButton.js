// LogoutButton.js
import React from 'react';

const LogoutButton = ({ setIsAuthenticated, handleLogout }) => {
  return (
    <button 
    style={{
      fontSize: '18px', 
    }}
      className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
