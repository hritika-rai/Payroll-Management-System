// AddDepartment.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import LogoutButton from './LogoutButton'; 
//import styles from './styles/adddepartment.css'; 

const AddDepartment = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated || isAuthenticated !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  const [departmentData, setDepartmentData] = useState({
    DepName: '',
    Description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Make a POST request to the backend endpoint
      const response = await axios.post('http://localhost:3001/add-department', departmentData);

      // Assuming the backend sends a success message
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };
  return (
    <div style={{ height: '450px', width: '800px', margin: 'auto', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative' }}>
      {/* Include the LogoutButton component here */}
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <LogoutButton setIsAuthenticated={setIsAuthenticated} handleLogout={handleLogout} />
      </div>
      
      <h2 style={{ textAlign: 'center', fontSize: '30px' }}>Add Department</h2>

      <div style={{ display: 'grid', gap: '20px', padding: '10px' }}>
        <label style={{ marginBottom: '15px', fontSize: '30px', display: 'block' }}>
          Department Name:
          <input type="text" name="DepName" value={departmentData.DepName} onChange={handleChange} style={{ width: '100%', padding: '20px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', fontSize: '20px', marginBottom: '10px' }} />
        </label>

        <label style={{ marginBottom: '15px', fontSize: '30px', display: 'block' }}>
          Description:
          <input type="text" name="Description" value={departmentData.Description} onChange={handleChange} style={{ width: '100%', padding: '20px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', fontSize: '20px', marginBottom: '20px' }} />
        </label>
      </div>

      <div style={{ gridArea: 'span 2', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
        <button style={{ backgroundColor: '#ffffff', color: '#02004B', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '18px' }} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AddDepartment;