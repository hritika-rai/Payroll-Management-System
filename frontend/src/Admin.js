// Admin.js
import React, { useEffect } from 'react';
import { Link, Outlet, Routes, Route, useNavigate } from 'react-router-dom';
import styles from './styles/admin.css';
import AddEmployee from './AddEmployee';
import AddDepartment from './AddDepartment';
import EditEmployee from './EditEmployee';
import AddEmployeeLeave from './AddEmployeeLeave';
import AddEmployeeBonus from './AddEmployeeBonus';
import AddEmployeeOvertime from './AddEmployeeOvertime';
import ViewPayrollSummary from './ViewPayrollSummary';
import LogoutButton from './LogoutButton';
import ViewEmployees from './ViewEmployees';

const Admin = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated || isAuthenticated !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div style={{ height: '520px', width: '800px', margin: 'auto', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative' }}>
      <div className={styles.adminContainer}>
        <h1 style={{ textAlign: 'center' }}>Welcome Admin </h1>
        {/* LogoutButton component here */}
        <div className="logout-button-container">
          {/* Pass setIsAuthenticated and handleLogout to LogoutButton */}
          <LogoutButton setIsAuthenticated={setIsAuthenticated} handleLogout={handleLogout} />
        </div>

        <div className="links-container">
          <div className="link-box">
            <Link to="./add-employee">Add New Employee</Link>
          </div>
          <div className="link-box">
            <Link to="./view-employees">View employees</Link>
          </div>
          <div className="link-box">
            <Link to="./edit-employee">Edit Employee Details</Link>
          </div>
          {/* <div className="link-box">
            <Link to="./add-department">Add New Department</Link>
          </div> */}
          <div className="link-box">
            <Link to="./view-departments">View Departments</Link>
          </div>

          <div className="link-box">
            <Link to="./add-leave">Add Employee Leave</Link>
          </div>
          <div className="link-box">
            <Link to="./add-bonus">Add Employee Bonus</Link>
          </div>
          <div className="link-box">
            <Link to="./add-overtime">Add Employee Overtime</Link>
          </div>
          <div className="link-box">
            <Link to="./payroll-summary">View Payroll Summary</Link>
          </div>
        </div>

        <Outlet />

        <Routes>
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="edit-employee" element={<EditEmployee />} />
          <Route path="add-leave" element={<AddEmployeeLeave />} />
          <Route path="add-bonus" element={<AddEmployeeBonus />} />
          <Route path="add-overtime" element={<AddEmployeeOvertime />} />
          <Route path="payroll-summary" element={<ViewPayrollSummary />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
