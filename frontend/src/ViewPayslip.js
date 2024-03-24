// ViewPayslip.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFViewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Payslip from './Payslip';

const ViewPayslip = () => {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [payrollData, setPayrollData] = useState(null);
  const [error, setError] = useState(null);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    console.log('Payroll Data in useEffect:', payrollData);
  }, [payrollData]);

  const handleSubmit = async () => {
    console.log(`Submitted: Month - ${selectedMonth}, Year - ${selectedYear}`);
    
    const empId = localStorage.getItem('empId');

    try {
      const response = await axios.post('http://localhost:3001/home/view-payslip', {
        empId: parseInt(empId),
        month: selectedMonth,
        year: parseInt(selectedYear),
      });

      setPayrollData(response.data);

      if (response.data && response.data.success) {
        if (response.data.data.length === 0) {
          setError('Sorry, No Payroll Data Available for the Selected Month!');
        } else {
          setError(null);
        }
      } else {
        setError('Error fetching payroll data.');
      }

      console.log('Payroll Data:', response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Selected month and year are earlier than employee start date');
      } else {
        setError('Error fetching payroll data.');
      }

      console.error('Error fetching payroll data:', error);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const renderPayslip = () => {
    return <Payslip payrollData={payrollData} />;
  };

  return (
    <div style={{ height: '550px', width: '750px', margin: 'auto', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative' }}>
      <div style={{ maxWidth: '650px', margin: '0 auto' }}>
        <h2 style={{marginTop: '3px'}}>View Payslip</h2>
        <h4 style={{marginTop: '-15px', textAlign: 'center' }}>Enter the Month and Year to View Payroll Details</h4>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <div style={{ flex: 1, marginRight: '0px' }}>
            <label htmlFor="month" style={{ display: 'block', marginBottom: '5px' }}>
              Month:
            </label>
            <select
              id="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              {monthNames.map((month, index) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1, marginLeft: '10px' }}>
            <label htmlFor="year" style={{ display: 'block', marginBottom: '5px' }}>
              Year:
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={handleYearChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              {Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, index) => (
                <option key={2000 + index} value={2000 + index}>
                  {2000 + index}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: '#3498db',
              color: '#fff',
              padding: '10px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom:'10px'
            }}
          >
            Submit
          </button>
        </div>
        
        {error && <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</div>}
        
        {/* {renderPayslip()} */}
        <Payslip payrollData={payrollData} />
      </div>
    </div>
  );
};

export default ViewPayslip;
