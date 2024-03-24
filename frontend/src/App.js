// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExPay from './EzPay';
import Admin from './Admin';
import Login from './Login';
import LoginEmployee from './LoginEmployee';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import AddEmployeeLeave from './AddEmployeeLeave';
import AddEmployeeBonus from './AddEmployeeBonus';
import AddEmployeeOvertime from './AddEmployeeOvertime';
import ViewPayrollSummary from './ViewPayrollSummary';
import AddDepartment from './AddDepartment';
import ViewEmployees from './ViewEmployees';
import ViewDepartment from './ViewDepartment';
import Home from './Home'
import UpdatePersonalInfo from './UpdatePersonalInfo';
import ViewPayslip from './ViewPayslip';
import ViewLeaveRecord from './ViewLeaveRecord';
import ViewBonusRecord from './ViewBonusRecord';
import ViewOvertimeRecord from './ViewOvertimeRecord';
import Ezpay from './EzPay';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEmpAuthenticated, setIsEmpAuthenticated] = useState(false);


  return (
    <Router>
      <Routes>
      <Route
          path="/"
          element={<Ezpay />}
        />
        <Route
          path="/Login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/admin/*"
          element={
            isAuthenticated ? (
              <Admin setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        <Route
          path="/admin/add-employee"
          element={
            isAuthenticated ? (
              <AddEmployee setIsAuthenticated={setIsAuthenticated}/>
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        <Route
          path="/admin/add-department"
          element={
            isAuthenticated ? (
              <AddDepartment setIsAuthenticated={setIsAuthenticated}/>
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        <Route
          path="/admin/edit-employee"
          element={
            isAuthenticated ? (
              <EditEmployee setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/admin/add-leave"
          element={
            isAuthenticated ? (
              <AddEmployeeLeave setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/admin/add-bonus"
          element={
            isAuthenticated ? (
              <AddEmployeeBonus setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/admin/add-overtime"
          element={
            isAuthenticated ? (
              <AddEmployeeOvertime setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/admin/payroll-summary/"
          element={
            isAuthenticated ? (
              <ViewPayrollSummary setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/admin/view-employees"
          element={
            isAuthenticated ? (
              <ViewEmployees setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/admin/view-departments"
          element={
            isAuthenticated ? (
              <ViewDepartment setIsAuthenticated={setIsAuthenticated}/>
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/login-employee"
          element={<LoginEmployee setIsEmpAuthenticated={setIsEmpAuthenticated}/>}
        />
        <Route
          path="/home/*"
          element={
            isEmpAuthenticated ? (
              <Home setIsEmpAuthenticated={setIsEmpAuthenticated} />
            ) : (
              <LoginEmployee setIsEmpAuthenticated={setIsEmpAuthenticated} />
            )
          }
        />

        <Route
          path="/home/update-personal-info"
          element={
            isEmpAuthenticated ? (
              <UpdatePersonalInfo setIsEmpAuthenticated={setIsEmpAuthenticated}/>
            ) : (
              <LoginEmployee setIsEmpAuthenticated={setIsEmpAuthenticated} />
            )
          }
        />

        <Route
          path="/home/view-payslip"
          element={
            isEmpAuthenticated ? (
              <ViewPayslip setIsEmpAuthenticated={setIsEmpAuthenticated}/>
            ) : (
              <LoginEmployee setIsEmpAuthenticated={setIsEmpAuthenticated} />
            )
          }
        />

        <Route
          path="/home/view-leave-record"
          element={
            isEmpAuthenticated ? (
              <ViewLeaveRecord setIsEmpAuthenticated={setIsEmpAuthenticated} />
            ) : (
              <LoginEmployee setIsEmpAuthenticated={setIsEmpAuthenticated} />
            )
          }
        />
        <Route
          path="/home/view-bonus-record"
          element={
            isEmpAuthenticated ? (
              <ViewBonusRecord setIsEmpAuthenticated={setIsEmpAuthenticated} />
            ) : (
              <LoginEmployee setIsEmpAuthenticated={setIsEmpAuthenticated} />
            )
          }
        />
        <Route
          path="/home/view-overtime-record"
          element={
            isEmpAuthenticated ? (
              <ViewOvertimeRecord setIsEmpAuthenticated={setIsEmpAuthenticated} />
            ) : (
              <LoginEmployee setIsEmpAuthenticated={setIsEmpAuthenticated} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

