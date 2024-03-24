// Home.js
import React, { useEffect } from 'react';
import { Link, Outlet, Routes, Route, useNavigate } from 'react-router-dom';
import UpdatePersonalInfo from './UpdatePersonalInfo';
import ViewPayslip from './ViewPayslip';
import ViewLeaveRecord from './ViewLeaveRecord';
import ViewBonusRecord from './ViewBonusRecord';
import ViewOvertimeRecord from './ViewOvertimeRecord';
import LogoutButton from './LogoutButton';
import styles from './styles/admin.css';


const Home = ({ setIsEmpAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isEmpAuthenticated = localStorage.getItem('isEmpAuthenticated');

    if (!isEmpAuthenticated || isEmpAuthenticated !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    setIsEmpAuthenticated(false);
    localStorage.removeItem('isEmpAuthenticated');
    navigate('/');
  };

  return (
    <div style={{ height: '480px', width: '500px', margin: 'auto', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative' }}>
      <div className={styles.adminContainer}>
        <h1 style={{ textAlign: 'center' }}>Welcome! </h1>
        {/* LogoutButton component here */}
        <div className="logout-button-container">
          {/* Pass setIsEmpAuthenticated and handleLogout to LogoutButton */}
          <LogoutButton setIsEmpAuthenticated={setIsEmpAuthenticated} handleLogout={handleLogout} />
        </div>

        <div className="links-container" style={{ textAlign: 'center' }}>
          <div className="link-box">
            <Link to="./update-personal-info">Update Personal Info</Link>
          </div>
          <div className="link-box">
            <Link to="./view-payslip">View Payslip</Link>
          </div>
          <div className="link-box">
            <Link to="./view-leave-record">View Leave Record</Link>
          </div>
          <div className="link-box">
            <Link to="./view-bonus-record">View Bonus Record</Link>
          </div>
          <div className="link-box">
            <Link to="./view-overtime-record">View Overtime Record</Link>
          </div>
        </div>

        <Outlet />

        <Routes>
          <Route path="update-personal-info" element={<UpdatePersonalInfo />} />
          <Route path="view-payslip" element={<ViewPayslip />} />
          <Route path="view-leave-record" element={<ViewLeaveRecord />} />
          <Route path="view-bonus-record" element={<ViewBonusRecord />} />
          <Route path="view-overtime-record" element={<ViewOvertimeRecord />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
