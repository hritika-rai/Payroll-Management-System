// AddEmployeeOvertime.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutButton from './LogoutButton';

const AddEmployeeOvertime = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated || isAuthenticated !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  const [OvertimeData, setOvertimeData] = useState({
    EmpId: '',
    noOfHours: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'noOfHours') {
      // Ensure that "noOfHours" only takes positive numerical values
      const positiveNumber = Math.max(0, parseFloat(value) || 0);
      setOvertimeData((prevData) => ({ ...prevData, [name]: positiveNumber }));
    } else {
      setOvertimeData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  
  const handleSubmit = async () => {
    try {
      setErrorMessage('');
  
      // Validate that "noOfHours" is a positive numerical value
      if (OvertimeData.noOfHours <= 0 || isNaN(OvertimeData.noOfHours)) {
        setErrorMessage('No. of hours must be a positive numerical value.');
        return;
      }
  
      // Make a POST request to the backend endpoint
      const response = await axios.post('http://localhost:3001/add-overtime', OvertimeData);

      toast.success('Overtime added successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
  
      // Assuming the backend sends a success message
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
        toast.error('Error adding overtime', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setErrorMessage(error.response.data.error); // Display the server error message
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    }
  };
  

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div style={{ height: '520px', width: '800px', margin: 'auto', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <LogoutButton setIsAuthenticated={setIsAuthenticated} handleLogout={handleLogout} />
      </div>

      <h2 style={{ textAlign: 'center', fontSize: '30px' }}>Add Employee Overtime</h2>

      <div style={{ display: 'grid', gap: '20px', padding: '10px' }}>
        <label style={{ marginBottom: '-2px', fontSize: '20px', display: 'block' }}>
          Employee ID:
          <input type="text" name="EmpId" value={OvertimeData.EmpId} onChange={handleChange} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', fontSize: '20px' }} />
        </label>
        
        <label style={{ marginBottom: '-2px', fontSize: '20px', display: 'block' }}>
          No. of hours:
          <input type="number" name="noOfHours" value={OvertimeData.noOfHours} onChange={handleChange} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', fontSize: '20px' }}></input>
        </label>

        <label style={{ marginBottom: '-2px', fontSize: '20px', display: 'block' }}>
          Date:
          <input type="date" name="date" value={OvertimeData.startDate} onChange={handleChange} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', fontSize: '20px' }} />
        </label>

        {errorMessage && (
        <div style={{ color: 'white', marginBottom: '-5px', textAlign: 'center' }}>
          {errorMessage}
        </div>
      )}

      </div>

      <div style={{ gridArea: 'span 2', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
        <button style={{ backgroundColor: '#ffffff', color: '#02004B', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '18px' }} onClick={handleSubmit}>Submit</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddEmployeeOvertime;
