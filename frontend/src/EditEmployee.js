import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutButton from './LogoutButton';

const EditEmployee = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated || isAuthenticated !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  const [detailsReady, setDetailsReady] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [checkEmployeeError, setCheckEmployeeError] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    emailAddress: '',
    cnic: '',
    gender: '',
    dob: '',
    departmentID: '',
    employmentStartDate: '',
    salary: '',
  });

  const [departmentOptions, setDepartmentOptions] = useState(['1', '2', '3', '4', '5']);

  const handleChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleCheckEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/check-employee/${employeeId}`);
      const employeeExists = response.data.exists;

      if (employeeExists) {
        const employeeDetails = response.data.details;
        setEmployeeDetails({
          firstName: employeeDetails[1],
          lastName: employeeDetails[2],
          phoneNumber: employeeDetails[6],
          address: employeeDetails[8],
          emailAddress: employeeDetails[7],
          cnic: employeeDetails[4],
          gender: employeeDetails[3],
          // dob: new Date(employeeDetails[5]).toISOString().split('T')[0],
          dob: addOneDay(new Date(employeeDetails[5])).toISOString().split('T')[0],
          departmentID: employeeDetails[11],
          // employmentStartDate: new Date(employeeDetails[9]).toISOString().split('T')[0],
          employmentStartDate: addOneDay(new Date(employeeDetails[9])).toISOString().split('T')[0],
          salary: employeeDetails[10],
        });

        setDetailsReady(true);
        setCheckEmployeeError(null);
      } else {
        setCheckEmployeeError('Enter correct Employee ID.');
      }
    } catch (error) {
      console.error('Error checking employee:', error);
      setCheckEmployeeError('Error fetching employee data. Please try again.');
    }
  };

  const handleSubmit = async () => {
    try {
      if (!detailsReady) {
        toast.error('Please enter employee details before submitting.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log('Please enter employee details before submitting.');
        return;
      }
      const sanitizedGender = typeof employeeDetails.gender === 'string'
        ? employeeDetails.gender.substring(0, 1)
        : '';

      const payload = {
        ...employeeDetails,
        gender: sanitizedGender,
      };

      const response = await axios.put(`http://localhost:3001/edit-employee/${employeeId}`, payload);

      toast.success('Employee details updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const addOneDay = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  };

  const handleLogout = () => {
    console.log('Logging out...');
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div
      style={{
        width: '900px',
        margin: 'auto',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <LogoutButton setIsAuthenticated={setIsAuthenticated} handleLogout={handleLogout} />
      </div>

      <h2 style={{ textAlign: 'center' }}>Edit Employee</h2>

      <div
        style={{
          display: 'grid',
          gap: '10px',
          padding: '15px',
          textAlign: 'center',
          margin: 'auto',
        }}
      >
        <label>
          Employee ID:
          <input
            type="text"
            name="employeeId"
            value={employeeId}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              boxSizing: 'border-box',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginBottom: '10px',
              fontSize: '16px',
            }}
          />
        </label>
        <button
          onClick={handleCheckEmployee}
          style={{
            width: '100%',
            backgroundColor: '#ffffff',
            color: '#02004B',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Check Employee
        </button>

        {checkEmployeeError && (
          <p style={{ color: 'red', margin: '5px 0', fontSize: '16px' }}>
            {checkEmployeeError}
          </p>
        )}
      </div>

      {detailsReady && (
        <div className="input-container">
          <label style={{ fontSize: '16px' }}>
            First Name:
            <input
              type="text"
              name="firstName"
              value={employeeDetails.firstName}
              onChange={(e) => setEmployeeDetails({ ...employeeDetails, firstName: e.target.value })}
              style={{ fontSize: '16px' }} 
            />
          </label>

          <label style={{ fontSize: '16px' }}>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={employeeDetails.lastName}
              onChange={(e) => setEmployeeDetails({ ...employeeDetails, lastName: e.target.value })}
              style={{ fontSize: '16px' }} 
            />
          </label>

          <label style={{ fontSize: '16px' }}>
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={employeeDetails.phoneNumber}
              placeholder="+92XXXXXXXXXX"
              onChange={(e) => setEmployeeDetails({ ...employeeDetails, phoneNumber: e.target.value })}
              style={{ fontSize: '16px' }}
            />
          </label>

          <label style={{ fontSize: '16px' }}>
            Address:
            <input
              type="text"
              name="address"
              value={employeeDetails.address}
              onChange={(e) => setEmployeeDetails({ ...employeeDetails, address: e.target.value })}
              style={{ fontSize: '16px' }} 
            />
          </label>

          <label style={{ fontSize: '16px' }}>
            Email Address:
            <input
              type="text"
              name="emailAddress"
              value={employeeDetails.emailAddress}
              onChange={(e) => setEmployeeDetails({ ...employeeDetails, emailAddress: e.target.value })}
              style={{ fontSize: '16px' }} 
            />
          </label>

          <label style={{ fontSize: '16px' }}>
            CNIC:
            <input
              type="number"
              name="cnic"
              value={employeeDetails.cnic}
              onChange={(e) => setEmployeeDetails({ ...employeeDetails, cnic: e.target.value })}
              style={{ fontSize: '16px' }} 
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>
            Gender:
            <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                name="gender"
                value="M"
                onChange={(e) => setEmployeeDetails({ ...employeeDetails, gender: e.target.value })}
                checked={employeeDetails.gender === 'M'}
              />
              <span style={{ marginLeft: '5px', fontSize: '16px' }}>M</span>
            </div>
            <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                name="gender"
                value="F"
                onChange={(e) => setEmployeeDetails({ ...employeeDetails, gender: e.target.value })}
                checked={employeeDetails.gender === 'F'}
              />
              <span style={{ marginLeft: '5px', fontSize: '16px' }}>F</span>
            </div>
          </label>

          <label style={{ fontSize: '16px' }}>
            Date of Birth:
            <input
              type="date"
              name="dob"
              value={employeeDetails.dob}
              onChange={(e) => setEmployeeDetails({ ...employeeDetails, dob: e.target.value })}
              style={{ fontSize: '16px' }} 
            />
          </label>

          <label style={{ fontSize: '16px' }}>
  Department ID:
  <select
    name="departmentID"
    value={employeeDetails.departmentID}
    onChange={(e) => setEmployeeDetails({ ...employeeDetails, departmentID: e.target.value })}
    style={{
      width: '100%',
      padding: '10px',
      boxSizing: 'border-box',
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginBottom: '10px',
      fontSize: '16px',
    }}
  >
    <option value="">Select Department ID</option>
    {departmentOptions.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
</label>

          <label style={{ fontSize: '16px' }}>
            Employment Start Date:
            <input
              type="date"
              name="employmentStartDate"
              value={employeeDetails.employmentStartDate}
              onChange={(e) => setEmployeeDetails({ ...employeeDetails, employmentStartDate: e.target.value })}
              style={{ fontSize: '16px' }} 
            />
          </label>

          <label style={{ fontSize: '16px' }}>
            Salary:
            <input
              type="number"
              name="salary"
              value={employeeDetails.salary}
              onChange={(e) => setEmployeeDetails({ ...employeeDetails, salary: e.target.value })}
              style={{ fontSize: '16px' }} 
            />
          </label>

          <div
            className="submit-button"
            style={{
              gridTemplateColumns: 'span 2',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '20px',
            }}
          >
            <button
              onClick={handleSubmit}
              style={{
                backgroundColor: '#ffffff',
                color: '#02004B',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px', 
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default EditEmployee;