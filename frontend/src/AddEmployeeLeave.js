// AddEmployeeLeave.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutButton from './LogoutButton';

const AddEmployeeLeave = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated || isAuthenticated !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  const [bonusData, setBonusData] = useState({
    EmpId: '',
    Type: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBonusData((prevData) => ({ ...prevData, [name]: name === 'Type' ? value.toLowerCase() : value }));
  };  

  const handleSubmit = async () => {
    try {
      setErrorMessage('');

      // Check if end date is before start date
      if (new Date(bonusData.endDate) < new Date(bonusData.startDate)) {
        setErrorMessage('End date cannot be before the start date.');
        return;
      }
  
      // Make a POST request to the backend endpoint
      const response = await axios.post('http://localhost:3001/add-leave', bonusData);

      toast.success('Leaves added successfully', {
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
        toast.error('Error adding Leaves', {
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

      <h2 style={{ textAlign: 'center', fontSize: '30px' }}>Add Employee Leave</h2>

      <div style={{ display: 'grid', gap: '20px', padding: '10px' }}>
        <label style={{ marginBottom: '-2px', fontSize: '20px', display: 'block' }}>
          Employee ID:
          <input type="text" name="EmpId" value={bonusData.EmpId} onChange={handleChange} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', fontSize: '20px' }} />
        </label>
        
        <label style={{ marginBottom: '-2px', fontSize: '20px', display: 'block' }}>
          Type of Leave:
          <select name="Type" value={bonusData.Type} onChange={handleChange} placeholder='Add Employee Bonus' style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', fontSize: '20px' }}>
            <option value="vacation">Vacation</option>
            <option value="sick leave">Sick Leave</option>
            <option value="personal leave">Personal Leave</option>
          </select>
        </label>

        <label style={{ marginBottom: '-2px', fontSize: '20px', display: 'block' }}>
          Start Date:
          <input type="date" name="startDate" value={bonusData.startDate} onChange={handleChange} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', fontSize: '20px' }} />
        </label>

        <label style={{ marginBottom: '-2px', fontSize: '20px', display: 'block' }}>
          End Date:
          <input type="date" name="endDate" value={bonusData.endDate} onChange={handleChange} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', fontSize: '20px' }} />
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

export default AddEmployeeLeave;
