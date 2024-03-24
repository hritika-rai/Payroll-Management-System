import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import LogoutButton from './LogoutButton';

const ViewDepartments = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [departmentList, setDepartmentList] = useState([]);


  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated || isAuthenticated !== 'true') {
      navigate('/login');
    } else {
      // Fetch department data when the component mounts
      fetchDepartmentData();
    }
  }, [navigate]);


  // Function to fetch department data
  const fetchDepartmentData = async () => {
    try {
      const response = await Axios.get('http://localhost:3001/admin/view-departments');

      setDepartmentList(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  
  return (
    <div style={{ height: '500px', width: '1200px', margin: 'auto', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative' }}>
      {/*LogoutButton component here */}
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <LogoutButton setIsAuthenticated={setIsAuthenticated} handleLogout={handleLogout} />
      </div>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>View Departments</h2>
      <div style={{ overflowX: 'auto', margin: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse',marginBottom: '40px' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Department ID</th>
              <th style={tableHeaderStyle}>Department Name</th>
              <th style={tableHeaderStyle}>Department Description</th>
            </tr>
          </thead>
          <tbody>
          {departmentList.map((department) => (
              <tr key={department[0]}>
                {department.map((value, index) => (
                  <td key={index} style={tableCellStyle}>{value}</td>
                ))}

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginBottom: '20px' }}></div>
    </div>
  );
};

const tableHeaderStyle = {
  padding: '15px',
  borderBottom: '1px solid #ccc',
};

const tableCellStyle = {
  padding: '15px',
  borderBottom: '1px solid #ccc',
};

export default ViewDepartments;
