import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import LogoutButton from './LogoutButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewPayrollSummary = ({ setIsAuthenticated }) => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [payrollSummaryList, setPayrollSummaryList] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(true); // Ensure this line is present

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const getInitials = (fullName) => {
    const names = fullName.split(' ');
    return names.map((name) => name[0]).join('').toUpperCase();
  };

  const circleStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#3498db', // You can set the desired background color
    display: 'inline-block',
    color: '#fff',
    textAlign: 'center',
    lineHeight: '30px',
    marginRight: '10px',
  };

  const handleSubmit = async () => {
    try {
      const response = await Axios.get(`http://localhost:3001/admin/payroll-summary/${selectedYear}/${selectedMonth}`);
      const formattedData = response.data.map((payrollSummary) => payrollSummary);
  
      setPayrollSummaryList(formattedData);
      setDataAvailable(formattedData.length > 0);

      console.log(formattedData);
    } catch (error) {
      console.error('Error fetching payroll summary:', error);
    }
  };
  
  
  
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    // Add logic to redirect or navigate to the login page
  };

  useEffect(() => {
    // Fetch month and year options when the component mounts
    // Add logic to fetch month and year options from the server if needed
  }, []);

  // Array of month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
  <div style={{ maxWidth: '1200px', maxHeight: '600px', margin: 'auto', marginTop: '100px', textAlign: 'center' }}>
    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
      <LogoutButton setIsAuthenticated={setIsAuthenticated} handleLogout={handleLogout} />
    </div>
    <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>View Payroll Summary</h2>

    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ marginRight: '10px', flex: 1 }}>
        <label htmlFor="month" style={{ display: 'block', marginBottom: '5px', fontSize: '16px' }}>
          Select Month:
        </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
        >
          {monthNames.map((month, index) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginRight: '10px', flex: 1 }}>
        <label htmlFor="year" style={{ display: 'block', marginBottom: '5px', fontSize: '16px' }}>
          Select Year:
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
        >
          {Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, index) => (
            <option key={2000 + index} value={2000 + index}>
              {2000 + index}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: '#3498db',
          color: '#fff',
          padding: '10px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          alignSelf: 'flex-end',
        }}
      >
        Submit
      </button>
    </div>

    {dataAvailable ? (
      <div style={{ overflowX: 'auto', margin: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
            <tr>
              <th style={tableHeaderStyle}>Payroll ID</th>
              <th style={tableHeaderStyle}>Employee ID</th>
              <th style={tableHeaderStyle}>Full Name</th>
              <th style={tableHeaderStyle}>Payroll Month</th>
              <th style={tableHeaderStyle}>Processing Date</th>
              <th style={tableHeaderStyle}>Gross Salary</th>
              <th style={tableHeaderStyle}>
      Additions <span role="img" aria-label="upward-arrow" style={{ color: 'green' }}>⬆️</span>
    </th>
    <th style={tableHeaderStyle}>
      Deductions <span role="img" aria-label="downward-arrow" style={{ color: 'red' }}>⬇️</span>
    </th>
              <th style={tableHeaderStyle}>Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {payrollSummaryList.map((payrollSummary) => (
              <tr key={payrollSummary[0]}>
                <td style={tableCellStyle}>
                  <div style={circleStyle}>{getInitials(payrollSummary[2])}</div>
                  {payrollSummary[0]}
                  </td>
    <td style={tableCellStyle}>{payrollSummary[1]}</td> {/* Employee ID */}
    <td style={tableCellStyle}>{payrollSummary[2]}</td> {/* Full Name */}
    <td style={tableCellStyle}>{payrollSummary[3]}</td> {/* Payroll Month */}
    <td style={tableCellStyle}>{new Date(payrollSummary[4]).toLocaleDateString()}</td> {/* Processing Date */}
    <td style={tableCellStyle}>{payrollSummary[5]}</td> {/* Salary */}
    <td style={tableCellStyle}>{payrollSummary[6]}</td> {/* Additions */}
    <td style={tableCellStyle}>{payrollSummary[7]}</td> {/* Deductions */}
    <td style={tableCellStyle}>{payrollSummary[8]}</td> {/* Net Salary */}
  </tr>
))}
          </tbody>
        </table>
      </div>
    ) : (
      <div >
      No data available for the selected month and year.
      </div>
    )}

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

export default ViewPayrollSummary;
