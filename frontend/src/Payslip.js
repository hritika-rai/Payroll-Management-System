// Payslip.js

import React from 'react';

const Payslip = ({ payrollData }) => {
  console.log('Payslip Component - Payroll Data:', payrollData);

  console.log('in payslip.js');

  if (!payrollData || !payrollData.success || !Array.isArray(payrollData.data) || payrollData.data.length === 0) {
    console.log('inside if');
    return ;
    // <div>No payroll data available</div>;
  }

  const [emp_id, emp_name, salary, pay_Id, month, processingDate, bonus, leaves, tax, overtime, netSalary] = payrollData.data[0];

  const totalAdditions = bonus + overtime;
  const totalDeductions = leaves + tax;

  return (
    <div style={{ marginTop: '15px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px', maxWidth: '600px', margin: 'auto', backgroundColor: 'white', color: 'black' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: '1' }}>
          <strong>Company Name:</strong> EzPay
        </div>
        <div style={{ flex: '1', textAlign: 'right' }}>
          <strong>Payroll ID:</strong> {pay_Id}
        </div>
      </div>

      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: '1' }}>
          <strong>Employee Name:</strong> {emp_name}
        </div>
        <div style={{ flex: '1', textAlign: 'right' }}>
          <strong>Employee ID:</strong> {emp_id}
        </div>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <strong>Gross Salary:</strong>
        <div style={{ textAlign: 'right' }}>Rs {salary}</div>
      </div>

      <div style={{ marginTop: '10px' }}>
        <strong>Additions:</strong>
        <div style={{ marginLeft: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>Bonus:</div>
            <div style={{ textAlign: 'right' }}>Rs {bonus}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>Overtime:</div>
            <div style={{ textAlign: 'right' }}>Rs {overtime}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '-20px' }}>
            <strong>Total Additions:</strong>
            <div style={{ textAlign: 'right' }}>Rs {totalAdditions}</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '10px' }}>
        <strong>Deductions:</strong>
        <div style={{ marginLeft: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>Leaves:</div>
            <div style={{ textAlign: 'right' }}>Rs {leaves}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>Tax:</div>
            <div style={{ textAlign: 'right' }}>Rs {tax}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '-20px' }}>
            <strong>Total Deductions:</strong>
            <div style={{ textAlign: 'right' }}>Rs {totalDeductions}</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <strong>Net Salary:</strong>
        <div style={{ textAlign: 'right' }}>Rs {netSalary}</div>
      </div>

    </div>
  );
};

export default Payslip;
