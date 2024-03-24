// AddEmployee.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import styles from './styles/addemployee.css'; 
import LogoutButton from './LogoutButton'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEmployee = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated || isAuthenticated !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    cnic: '',
    address: '',
    phoneNumber: '',
    emailAddress: '',
    employmentStartDate: '',
    salary: '',
    departmentID: '',
  });

  const [departmentOptions, setDepartmentOptions] = useState([1, 2, 3, 4, 5]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Make a POST request to the backend endpoint
      const response = await axios.post('http://localhost:3001/add-employee', employeeData);

      // Assuming the backend sends a success message
      console.log(response.data);
      toast.success('Employee added successfully!', { position: 'top-right' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error adding employee!', { position: 'top-right' });
      // Handle error, e.g., show an error message to the user
    }
  };


  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div className="add-employee-container">
      {/* Include the LogoutButton component here */}
      <div className="top-right">
        <LogoutButton setIsAuthenticated={setIsAuthenticated} handleLogout={handleLogout} />
      </div>
      
      <h2>Add Employee</h2>

      <div className="input-container">
        <label>
          First Name:
          <input type="text" name="firstName" value={employeeData.firstName} onChange={handleChange} />
        </label>

        <label>
          Last Name:
          <input  type="text" name="lastName" value={employeeData.lastName} onChange={handleChange} />
        </label>

        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={employeeData.phoneNumber}     placeholder="0XXXXXXXXXX" onChange={handleChange} />
        </label>

        <label>
          Address:
          <input type="text" name="address" value={employeeData.address} onChange={handleChange} />
        </label>

        <label>
          Email Address:
          <input type="text" name="emailAddress" value={employeeData.emailAddress} onChange={handleChange} />
        </label>

        <label>
          CNIC:
          <input type="integer" name="cnic" value={employeeData.cnic} onChange={handleChange} />
        </label>

        <label style={{ display: 'flex', alignItems: 'center' }}>
          Gender:
          <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
            <input type="radio" name="gender" value="M" onChange={handleChange} />
            <span style={{ marginLeft: '5px' }}>M</span>
          </div>
          <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
            <input type="radio" name="gender" value="F" onChange={handleChange} />
            <span style={{ marginLeft: '5px' }}>F</span>
          </div>
        </label>

        <label>
          Date of Birth:
          <input type="date" name="dob" value={employeeData.dob} onChange={handleChange} />
        </label>

        <label>
          Department ID:
          <select name="departmentID" value={employeeData.departmentID} onChange={handleChange}>
            <option value="">Select Department ID</option>
            {departmentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Employment Start Date:
          <input type="date" name="employmentStartDate" value={employeeData.employmentStartDate} onChange={handleChange} />
        </label>

        <label>
          Salary:
          <input type="number" name="salary" value={employeeData.salary} onChange={handleChange} />
        </label>

      </div>
      <div className="submit-button">
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddEmployee;
