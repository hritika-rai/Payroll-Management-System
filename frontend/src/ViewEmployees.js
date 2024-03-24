import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import LogoutButton from './LogoutButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewEmployees = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated || isAuthenticated !== 'true') {
      navigate('/login');
    }
    else {
      // Fetch employee data when the component mounts
      fetchEmployeeData();
    }
  }, [navigate]);

  const [employeeList, setEmployeeList] = useState([]);


  // Function to fetch employee data
  const fetchEmployeeData = async () => {
    try {
      const response = await Axios.get('http://localhost:3001/admin/view-employees');
      const formattedData = response.data.map((employee) => {
        // Format date strings to exclude time
        const formattedEmployee = employee.map((value, index) => {
          if (index === 5 || index === 9) {
            // Index 5 is Date of Birth, and Index 9 is Start Date
            return new Date(value).toLocaleDateString();
          }
          return value;
        });
        return formattedEmployee;
      });

      // Sort the data by Employee ID (assuming Employee ID is at index 0)
      const sortedData = formattedData.sort((a, b) => a[0] - b[0]);

      setEmployeeList(sortedData);
      console.log(sortedData);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // Function to handle employee deletion
  const handleDeleteEmployee = async (employeeId) => {
    try {
       // Make a DELETE request to the backend to delete the employee
       await Axios.delete(`http://localhost:3001/admin/delete-employee/${employeeId}`);
       // After successful deletion, fetch updated data
       toast.success('Employee deleted successfully!', { 
        position: "top-right" ,
        style: { background: '#ffffff', color: 'black' }, 
        progressClassName: 'toast-progress-blue',
        progressStyle: { background: 'blue' },
        iconTheme: { primary: '#02004B', secondary: '#red' }
      });
       fetchEmployeeData();
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast.error('Error deleting employee!', { 
        position: "top-right" ,
        style: { background: '#ffffff', color: 'black' }, 
        progressClassName: 'toast-progress-blue',
        progressStyle: { background: 'blue' }
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '1200px', maxHeight:'600px', margin: 'auto', marginTop: '100px', textAlign: 'center' }}>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <LogoutButton setIsAuthenticated={setIsAuthenticated} handleLogout={handleLogout} />
      </div>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>View Employees</h2>
      <div style={{ overflowX: 'auto', margin: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Employee ID</th>
              <th style={tableHeaderStyle}>First Name</th>
              <th style={tableHeaderStyle}>Last Name</th>
              <th style={tableHeaderStyle}>Gender</th>
              <th style={tableHeaderStyle}>CNIC</th>
              <th style={tableHeaderStyle}>Date of Birth</th>
              <th style={tableHeaderStyle}>Phone Number</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Address</th>
              <th style={tableHeaderStyle}>Start Date</th>
              <th style={tableHeaderStyle}>Salary</th>
              <th style={tableHeaderStyle}>Department ID</th>
              <th style={tableHeaderStyle}>Employee Password</th>
              <th style={tableHeaderStyle}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map((employee) => (
              <tr key={employee[0]}>
                {employee.map((value, index) => (
                  <td key={index} style={tableCellStyle}>{value}</td>
                ))}
                <td>
                  <button
                    style={{ padding: '5px 10px', borderRadius: '5px', background: 'red', color: 'white', cursor: 'pointer' }}
                    onClick={() => handleDeleteEmployee(employee[0])}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginBottom: '20px' }}></div>
      <ToastContainer />
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

export default ViewEmployees;