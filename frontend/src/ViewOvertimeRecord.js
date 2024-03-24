import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewOvertimeRecord = ({ setIsEmpAuthenticated }) => {
  const navigate = useNavigate();

  const [overtimeRecords, setOvertimeRecords] = useState([]);

  const fetchOvertimeRecords = async () => {
    try {
      const empId = localStorage.getItem('empId');

      if (!empId) {
        console.error('empId is not available');
        return;
      }

      const response = await Axios.get(`http://localhost:3001/home/view-overtime-record/${empId}`);
      console.log(response.data);

      // Sort the overtimeRecords based on the 'Overtime Date' in descending order
      const sortedOvertimeRecords = response.data.sort((a, b) => new Date(b[0]) - new Date(a[0]));

      setOvertimeRecords(sortedOvertimeRecords);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };


  useEffect(() => {
    console.log("here");
    const isEmpAuthenticated = localStorage.getItem('isEmpAuthenticated');

    if (!isEmpAuthenticated || isEmpAuthenticated !== 'true') {
      console.log("here in if");
      navigate('/login-employee');
    } else {
      console.log("here in else");
      // Fetch department data when the component mounts
      fetchOvertimeRecords();
    }
  }, [navigate]);

 


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  
  return (
    <div style={{ height: '500px', width: '1000px', margin: 'auto', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}> Overtime Records </h2>
      <div style={{ overflowX: 'auto', margin: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Overtime Date</th>
              <th style={tableHeaderStyle}>No. of Hours</th>
            </tr>
          </thead>
          <tbody>
            {overtimeRecords.map((overtime, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
                {overtime.map((value, columnIndex) => (
                  <td key={columnIndex} style={{ ...tableCellStyle, textAlign: 'center' }}>
                    {columnIndex === 0 ? new Date(value).toLocaleDateString('en-GB') : value}
                  </td>
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

export default ViewOvertimeRecord;
