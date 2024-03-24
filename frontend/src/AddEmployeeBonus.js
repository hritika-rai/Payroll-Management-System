// AddEmployeeBonus.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutButton from './LogoutButton';

const AddEmployeeBonus = ({ setIsAuthenticated }) => {
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
    Amount: '',
    Type: '',
    DateReceived: '', // Added DateReceived field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBonusData((prevData) => ({ ...prevData, [name]: name === 'Type' ? value.toLowerCase() : value }));
  };  

  const handleSubmit = async () => {
    try {
      // Make a POST request to the backend endpoint
      const response = await axios.post('http://localhost:3001/add-bonus', bonusData);

      toast.success('Bonus added successfully', {
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
      console.error('Error submitting form:', error);
      setErrorMessage(error.response.data.error);  // Set error message for display
      toast.error('Error adding bonus', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div style={{ height: '530px', width: '800px', margin: 'auto', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <LogoutButton setIsAuthenticated={setIsAuthenticated} handleLogout={handleLogout} />
      </div>

      <h2 style={{ textAlign: 'center', fontSize: '30px' }}>Add Employee Bonus</h2>

      <div style={{ display: 'grid', gap: '20px', padding: '10px' }}>
        <label style={{ marginBottom: '5px', fontSize: '20px', display: 'block' }}>
          Employee ID:
          <input type="text" name="EmpId" value={bonusData.EmpId} onChange={handleChange} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', fontSize: '20px' }} />
        </label>

        <label style={{ marginBottom: '5px', fontSize: '20px', display: 'block' }}>
          Amount:
          <input type="text" name="Amount" value={bonusData.Amount} onChange={handleChange} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', fontSize: '20px' }} />
        </label>

        <label style={{ marginBottom: '10px', fontSize: '20px', display: 'block' }}>
          Type of Bonus:
          <select name="Type" value={bonusData.Type} onChange={handleChange} placeholder='Add Employee Bonus' style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', fontSize: '20px' }}>
            <option value="performance">Performance</option>
            <option value="attendance">Attendance</option>
            <option value="annual">Annual</option>
            <option value="milestone">Milestone</option>
          </select>
        </label>

        <label style={{ marginBottom: '10px', fontSize: '20px', display: 'block' }}>
          Date Received:
          <input type="date" name="DateReceived" value={bonusData.DateReceived} onChange={handleChange} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', fontSize: '20px' }} />
        </label>
      </div>

      {errorMessage && (
        <div style={{ color: 'white', textAlign: 'center', marginTop: '-5px' }}>
        {errorMessage}
      </div>
      )}

      <div style={{ gridArea: 'span 2', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
        <button style={{ backgroundColor: '#ffffff', color: '#02004B', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '18px' }} onClick={handleSubmit}>Submit</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddEmployeeBonus;
