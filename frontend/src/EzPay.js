// EzPay.js

import React from 'react';
import { Link } from 'react-router-dom';

const Ezpay = () => {
  return (
    <div style={{ height: '300px', width: '500px', margin: 'auto', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative' }}>
      <h2 style={{ marginTop: '50px', marginBottom: '50px' }}>Welcome to EzPay</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Link to="/login">
          <button style={{ width: '200px', padding: '10px', margin: '10px 0', fontSize: '16px', fontWeight: 'bold', color: '#fff', backgroundColor: '#3498db', border: 'none', borderRadius: '5px', cursor: 'pointer', textDecoration: 'none' }}>Admin</button>
        </Link>
        <Link to="/login-employee">
          <button style={{ width: '200px', padding: '10px', margin: '10px 0', fontSize: '16px', fontWeight: 'bold', color: '#fff', backgroundColor: '#3498db', border: 'none', borderRadius: '5px', cursor: 'pointer', textDecoration: 'none' }}>Employee</button>
        </Link>
      </div>
    </div>
  );
};

export default Ezpay;
