import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UpdatePersonalInfo = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [cnic, setCnic] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Assuming you have stored empId in localStorage
  const empId = localStorage.getItem('empId');

  useEffect(() => {
    // Fetch existing employee data when component mounts
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/home/get-employee/${empId}`);
        const employeeData = response.data.details;

        // Destructure the array and set state variables
        const [firstName, lastName, phoneNumber, address, cnic, gender, emailAddress, dob] = employeeData;

        setFirstName(firstName);
        setLastName(lastName);
        setGender(gender);
        setCnic(cnic);
        setDob(dob);
        setPhoneNumber(phoneNumber);
        setEmailAddress(emailAddress);
        setAddress(address);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    if (empId) {
      fetchEmployeeData();
    }
  }, [empId]);

  const handleUpdatePersonalInfo = async () => {
    try {
      // Format the date manually
      const formattedDate = `${dob.substring(0, 4)}-${dob.substring(5, 7)}-${dob.substring(8, 10)}`;

      const response = await axios.put(`http://localhost:3001/home/update-personal-info/${empId}`, {
        firstName,
        lastName,
        gender,
        cnic,
        dob: formattedDate,
        phoneNumber,
        emailAddress,
        address,
      });

      console.log(response.data);

      // Inside handleUpdatePersonalInfo function, after the axios.put call
      toast.success('Personal information updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });


      // Handle success scenario here, e.g., show a success message
    } catch (error) {
      console.error('Error updating personal information:', error.response.data.error);
      setErrorMessage(error.response.data.error);
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
  
  return (
    <div
      style={{
        width: '900px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        textAlign: 'left',
      }}
    >
      <h2 style={{ gridColumn: 'span 2', textAlign: 'center' }}>Update Personal Information</h2>
  
      <div>
        <label style={{ fontSize: '18px' }}>
          First Name:
          <br />
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', fontSize: '16px', marginBottom:'25px' }}
          />
        </label>
  
        <label style={{ fontSize: '18px', display: 'flex', alignItems: 'center' }}>
    Gender:
    <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
      <input
        type="radio"
        name="gender"
        value="M"
        checked={gender === 'M'}
        onChange={() => setGender('M')}
        style={{ marginRight: '5px' }}
      />
      <span style={{ fontSize: '16px' }}>M</span>
    </div>
    <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
      <input
        type="radio"
        name="gender"
        value="F"
        checked={gender === 'F'}
        onChange={() => setGender('F')}
        style={{ marginRight: '5px' }}
      />
      <span style={{ fontSize: '16px' }}>F</span>
    </div>
  </label>
  
        <label style={{ fontSize: '18px', marginTop:'24px' }}>
          Phone Number:
          <br />
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', fontSize: '16px' }}
          />
        </label>
  
        <label style={{ fontSize: '18px' }}>
          Email Address:
          <br />
          <input
            type="text"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', fontSize: '16px' }}
          />
        </label>
      </div>
  
      <div>
        <label style={{ fontSize: '18px' }}>
          Last Name:
          <br />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', fontSize: '16px' }}
          />
        </label>
  
        <label style={{ fontSize: '18px' }}>
          CNIC:
          <br />
          <input
            type="text"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', fontSize: '16px' }}
          />
        </label>
  
        <label style={{ fontSize: '18px' }}>
          Date of Birth:
          <br />
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', fontSize: '16px' }}
          />
        </label>
  
        <label style={{ fontSize: '18px' }}>
          Address:
          <br />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', fontSize: '16px' }}
          />
        </label>
      </div>
  
      {errorMessage && (
        <p
          style={{
            gridColumn: 'span 2',
            color: 'red',
            margin: '5px 0',
            fontSize: '18px',
            textAlign: 'center',
          }}
        >
          {errorMessage}
        </p>
      )}
  
      <div
        style={{
          gridColumn: 'span 2',
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
          onClick={handleUpdatePersonalInfo}
          style={{
            backgroundColor: '#ffffff',
            color: '#02004B',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '18px',
          }}
        >
          Update
        </button>
      </div>
      <ToastContainer />
    </div>
  );
    

};

export default UpdatePersonalInfo;
