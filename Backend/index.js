// index.js
const express = require("express");
const app = express();
const oracledb = require("oracledb");
const cors = require("cors");
const port = 3001;

app.use(cors());
app.use(express.json());

const dbConfig = {
  user: "c##project",
  password: "project",
  connectString: "localhost/orcl",
};

async function initialize() {
  try {
    await oracledb.createPool(dbConfig);
  } catch (err) {
    console.error("Error creating a connection pool: " + err.message);
  }
}

initialize();

// Endpoint to handle adding an employee
app.post('/add-employee', async (req, res) => {
  let connection;
  try {
    const { firstName, lastName, gender, cnic, dob, phoneNumber, emailAddress, address, employmentStartDate, salary, departmentID } = req.body;

    // Log received data from the frontend
    console.log('Received data from frontend:', req.body);

    connection = await oracledb.getConnection();

    // Assuming there's a sequence for emp_id and a trigger to populate it
    await connection.execute(
      `INSERT INTO employee (fname, lname, gender, cnic, dob, phone_num, email, address, emp_start_date, salary, dep_id, emp_password) 
   VALUES (:firstName, :lastName, :gender, :cnic, TO_DATE(:dob, 'YYYY-MM-DD'), :phoneNumber, :emailAddress, :address, TO_DATE(:employmentStartDate, 'YYYY-MM-DD'), :salary, :departmentID, '12345678')`,
  {
    firstName,
    lastName,
    gender,
    cnic,
    dob,
    phoneNumber,
    emailAddress,
    address,
    employmentStartDate,
    salary,
    departmentID,
  },
  { autoCommit: true }
);

    // Select query to retrieve the inserted data
    const result = await connection.execute(
      'SELECT * FROM employee'
    );

    console.log('Employee added successfully. Inserted data:', result.rows);
    

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error adding employee:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
  finally {
    if (connection) {
      try {
        await connection.close(); // Release the connection back to the pool
      } catch (err) {
        console.error("Error closing Oracle connection:", err.message);
      }
    }
  }
});

// Endpoint to handle adding a department
app.post('/add-department', async (req, res) => {
  let connection;
  try {
    const { DepName, Description } = req.body;

    // Check if DepName is provided and not null or empty
    if (!DepName && DepName !== null && DepName.trim() === '') {
      throw new Error('Department Name cannot be empty.');
    }

    // Log received data from the frontend
    console.log('Received data from frontend:', req.body);

     connection = await oracledb.getConnection();

    // Assuming there's a sequence for dep_id and a trigger to populate it
    await connection.execute(
      `INSERT INTO department (dep_name, dep_desc) VALUES (:DepName, :Description)`,
      { DepName, Description },
      { autoCommit: true }
    );

    // Select query to retrieve the inserted data
    const result = await connection.execute(
       'SELECT * FROM department',
    );

    console.log('Department added successfully. Inserted data:', result.rows);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error adding department:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
  finally {
    if (connection) {
      try {
        await connection.close(); // Release the connection back to the pool
      } catch (err) {
        console.error("Error closing Oracle connection:", err.message);
      }
    }
  }
});

// Endpoint to handle adding employee bonus
app.post('/add-bonus', async (req, res) => {
  let connection;
  try {
    const { EmpId, Amount, Type, DateReceived } = req.body;

    // Log received data from the frontend
    console.log('Received data from frontend:', req.body);

     connection = await oracledb.getConnection();

    const empQuery = 'SELECT COUNT(*) FROM employee WHERE emp_id = :EmpId';
    const empResult = await connection.execute(empQuery, { EmpId });

    if (empResult.rows[0][0] === 0) {
      // Employee with the provided EmpId does not exist
      console.log('here')
      throw new Error(`Employee with ID ${EmpId} does not exist.`);
    }

    // Retrieve bonus_id from bonus table based on bonus_type
    const bonusQuery = 'SELECT bonus_id FROM bonus WHERE bonus_type = :Type';
    const bonusResult = await connection.execute(bonusQuery, { Type });
    
    if (bonusResult.rows.length === 0) {
      // throw new Error(`Bonus type '${Type}' not found.`);
      return res.status(404).json({ success: false, error: `Bonus type '${Type}' not found.` });
    }

    const bonusId = bonusResult.rows[0][0];
    
    // Print bonus_id on the console
    console.log('Retrieved bonus_id:', bonusId);

    // Insert data into bonus_record tableS
    await connection.execute(
      `INSERT INTO bonus_record (bonus_id, emp_id, b_date, amount) VALUES (:bonusId, :EmpId, TO_DATE(:DateReceived, 'YYYY-MM-DD'), :Amount)`,
      { bonusId, EmpId, DateReceived, Amount },
      { autoCommit: true }
    );

    // Select query to retrieve the inserted data
    const result = await connection.execute(
      'SELECT * FROM bonus_record WHERE bonus_id = :bonusId',
      { bonusId } // This should match the bind placeholder in the SQL statement
    );

    console.log('Employee bonus added successfully. Inserted data:', result.rows);

    res.status(201).json({ success: true });
    await connection.close();
  } catch (error) {
    console.error('Error adding employee bonus:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
  finally {
    if (connection) {
      try {
        await connection.close(); // Release the connection back to the pool
      } catch (err) {
        console.error("Error closing Oracle connection:", err.message);
      }
    }
  }
});

// Endpoint to handle adding employee leave
app.post('/add-leave', async (req, res) => {
  let connection;
  try {
    const { EmpId, Type, startDate, endDate } = req.body;

    // Log received data from the frontend
    console.log('Received data from frontend:', req.body);

     connection = await oracledb.getConnection();

    const empQuery = 'SELECT COUNT(*) FROM employee WHERE emp_id = :EmpId';
    const empResult = await connection.execute(empQuery, { EmpId });

    if (empResult.rows[0][0] === 0) {
      // Employee with the provided EmpId does not exist
      throw new Error(`Employee with ID ${EmpId} does not exist.`);
    }

    // Retrieve leave_id from leave table based on leave_type
    const leaveQuery = 'SELECT leave_id FROM leave WHERE leave_type = :Type';
    const leaveResult = await connection.execute(leaveQuery, { Type });

    if (leaveResult.rows.length === 0) {
      throw new Error(`Leave type '${Type}' not found.`);
    }

    const leaveId = leaveResult.rows[0][0];

    // Print leave_id on the console
    console.log('Retrieved leave_id:', leaveId);

    // Insert data into leave_record table
    await connection.execute(
      `INSERT INTO leave_record (leave_id, emp_id, start_date, end_date) 
      VALUES (:leaveId, :EmpId, TO_DATE(:StartDate, 'YYYY-MM-DD'), TO_DATE(:EndDate, 'YYYY-MM-DD'))`,
      { leaveId, EmpId, StartDate: startDate, EndDate: endDate },
      { autoCommit: true }
    );

    console.log('Employee leave added successfully.');

    // Select query to retrieve the inserted data
    const result = await connection.execute(
      // 'SELECT * FROM bonus_record WHERE bonus_id = :bonusId',
      'SELECT * FROM leave_record'
    );

    console.log('Inserted data:', result.rows);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error adding employee leave:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
  finally {
    if (connection) {
      try {
        await connection.close(); // Release the connection back to the pool
      } catch (err) {
        console.error("Error closing Oracle connection:", err.message);
      }
    }
  }
});

// Endpoint to handle adding employee overtime
app.post('/add-overtime', async (req, res) => {
  let connection;
  try {
    const { EmpId, noOfHours, date } = req.body;

    // Log received data from the frontend
    console.log('Received data from frontend:', req.body);

     connection = await oracledb.getConnection();

    const empQuery = 'SELECT COUNT(*) FROM employee WHERE emp_id = :EmpId';
    const empResult = await connection.execute(empQuery, { EmpId });

    if (empResult.rows[0][0] === 0) {
      // Employee with the provided EmpId does not exist
      throw new Error(`Employee with ID ${EmpId} does not exist.`);
    }

  
    // Update the execute function with explicit bind variables
    await connection.execute(
      `INSERT INTO overtime_record (emp_id, o_date, no_of_hours) VALUES (:1, TO_DATE(:2, 'YYYY-MM-DD'), :3)`,
      [EmpId, date, noOfHours],
      { autoCommit: true }
    );

    // Select query to retrieve the inserted data
    const result = await connection.execute(
      'SELECT emp_id, o_date, no_of_hours FROM overtime_record',
    );

    console.log('Employee overtime added successfully. Inserted data:', result.rows);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error adding employee overtime:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
  finally {
    if (connection) {
      try {
        await connection.close(); // Release the connection back to the pool
      } catch (err) {
        console.error("Error closing Oracle connection:", err.message);
      }
    }
  }
});

// Endpoint to handle fetching employee data
app.get('/admin/view-employees', async (req, res) => {
  let connection;
  try {
     connection = await oracledb.getConnection();
    const result = await connection.execute('SELECT * FROM employee');
    const employees = result.rows;

    // Send the employee data as a response
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employee data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  finally {
    if (connection) {
      try {
        await connection.close(); // Release the connection back to the pool
      } catch (err) {
        console.error("Error closing Oracle connection:", err.message);
      }
    }
  }
});

// Endpoint to handle fetching department data
app.get('/admin/view-departments', async (req, res) => {
  let connection;
  try {
     connection = await oracledb.getConnection();
    const result = await connection.execute('SELECT * FROM department');
    const department = result.rows;

    // Send the employee data as a response
    res.status(200).json(department);
  } catch (error) {
    console.error('Error fetching department data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  finally {
    if (connection) {
      try {
        await connection.close(); // Release the connection back to the pool
      } catch (err) {
        console.error("Error closing Oracle connection:", err.message);
      }
    }
  }
});

// Endpoint for deleting an employee
app.delete('/admin/delete-employee/:id', async (req, res) => {
  const employeeId = req.params.id;
  let connection;
  try {
     connection = await oracledb.getConnection();
    // Assuming you have an "employees" table with a primary key "EMP_ID"
    const result = await connection.execute(`DELETE FROM employee WHERE EMP_ID = :id`, [employeeId], { autoCommit: true });

    if (result.rowsAffected && result.rowsAffected === 1) {
      res.status(200).send('Employee deleted successfully');
    } else {
      res.status(404).send('Employee not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting employee');
  }
  finally {
    if (connection) {
      try {
        await connection.close(); // Release the connection back to the pool
      } catch (err) {
        console.error("Error closing Oracle connection:", err.message);
      }
    }
  }
});

// Endpoint to check if an employee exists
app.get('/check-employee/:employeeId', async (req, res) => {
  let connection;
  try {
    const { employeeId } = req.params;

    // Perform a query to check if the employee with the given ID exists
     connection = await oracledb.getConnection();

    const result = await connection.execute(
      'SELECT * FROM employee WHERE emp_id = :employeeId',
      { employeeId }
    );

    const employeeExists = result.rows.length > 0;

    if (employeeExists) {
      // If the employee exists, send details
      const employeeDetails = result.rows[0];
      res.status(200).json({ exists: true, details: employeeDetails });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking employee:', error.message);
    res.status(500).json({ error: error.message });
  }
  finally {
    if (connection) {
      try {
        await connection.close(); // Release the connection back to the pool
      } catch (err) {
        console.error("Error closing Oracle connection:", err.message);
      }
    }
  }
});

// Endpoint to update employee details
app.put('/edit-employee/:employeeId', async (req, res) => {
  let connection;

  try {
    const { employeeId } = req.params;
    const {
      firstName,
      lastName,
      gender,
      cnic,
      dob,
      phoneNumber,
      emailAddress,
      address,
      employmentStartDate,
      salary,
      departmentID,
    } = req.body;

    // Log received data from the frontend
    console.log('Received data from frontend:', req.body);

     connection = await oracledb.getConnection();

    await connection.execute(
      `UPDATE employee 
       SET fname = :firstName,
           lname = :lastName,
           gender = :gender,
           cnic = :cnic,
           dob = TO_DATE(:dob, 'YYYY-MM-DD'),
           phone_num = :phoneNumber,
           email = :emailAddress,
           address = :address,
           emp_start_date = TO_DATE(:employmentStartDate, 'YYYY-MM-DD'),
           salary = :salary,
           dep_id = :departmentID
       WHERE emp_id = :employeeId`,
      {
        employeeId: parseInt(employeeId), // Ensure employeeId is converted to a number
        firstName,
        lastName,
        gender,
        cnic,
        dob,
        phoneNumber,
        emailAddress,
        address,
        employmentStartDate,
        salary,
        departmentID,
      },
      { autoCommit: true }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating employee:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
  finally {
    if (connection) {
      try {
        await connection.close(); // Release the connection back to the pool
      } catch (err) {
        console.error("Error closing Oracle connection:", err.message);
      }
    }
  }
});

app.post('/loginemployee', async (req, res) => {
  let connection;
  try {
    const { username, password } = req.body;

  // Log received data from the frontend
    console.log('Received data from frontend:', req.body);  
    connection = await oracledb.getConnection();

    const empQuery = `SELECT emp_password FROM employee WHERE emp_id = :username`;     
    const empResult = await connection.execute(empQuery, { username });

    if (empResult.rows.length === 1) {
      const empId = username;
      const storedPassword = empResult.rows[0][0];
      console.log('Retrieved password:', storedPassword);
      console.log('empId:', username);


      if (password === storedPassword) {
        console.log('here');
        res.status(200).json({ success: true });
        console.log('here2');
      } else {
        console.log('here3');
        throw new Error(`Invalid username or password`);
        res.status(401).json({ success: false, error: 'Invalid username or password' });
      }
    } else {
      console.log('here4');
      res.status(401).json({ success: false, error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing Oracle connection:', err.message);
      }
    }
  }
});

app.get('/home/view-bonus-record/:empId', async (req, res) => {
  let connection;
  try {
    const { empId } = req.params;
    console.log(empId);

    connection = await oracledb.getConnection();

    // Query to retrieve bonus records for the specified employee
    const query = 'SELECT bonus_type, b_date, amount FROM bonus_record join bonus on bonus.bonus_id = bonus_record.bonus_id WHERE emp_id = :empId';
    
    const result = await connection.execute(query, { empId });

    const bonusRecords = result.rows;
    console.log(result.rows);

    res.status(200).json(bonusRecords);
    console.log("hi");
  } catch (error) {
    console.error('Error fetching bonus records:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing Oracle connection:", err.message);
      }
    }
  }
});

app.get('/home/view-leave-record/:empId', async (req, res) => {
  let connection;
  try {
    const { empId } = req.params;
    console.log(empId);

    connection = await oracledb.getConnection();

    // Query to retrieve bonus records for the specified employee
    const query = 'SELECT leave_type, start_date, end_date FROM leave_record join leave on leave.leave_id = leave_record.leave_id WHERE emp_id = :empId';
    
    const result = await connection.execute(query, { empId });

    const bonusRecords = result.rows;
    console.log(result.rows);

    res.status(200).json(bonusRecords);
    console.log("hi");
  } catch (error) {
    console.error('Error fetching leave records:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing Oracle connection:", err.message);
      }
    }
  }
});

app.get('/home/view-overtime-record/:empId', async (req, res) => {
  let connection;
  try {
    const { empId } = req.params;
    console.log(empId);

    connection = await oracledb.getConnection();

    // Query to retrieve bonus records for the specified employee
    const query = 'SELECT o_date, no_of_hours FROM overtime_record WHERE emp_id = :empId';
    
    const result = await connection.execute(query, { empId });

    const OvertimeRecords = result.rows;
    console.log(result.rows);

    res.status(200).json(OvertimeRecords);
    console.log("hi");
  } catch (error) {
    console.error('Error fetching overtime records:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing Oracle connection:", err.message);
      }
    }
  }
});

app.post('/home/view-payslip', async (req, res) => {
  let connection;
  try {
    const { empId, month, year } = req.body;

    // Log received data from the frontend
    console.log('Received data from frontend:', req.body);
    console.log('Data types:', typeof empId, typeof month, typeof year);

    connection = await oracledb.getConnection();

    // Retrieve the employee's start date from the database
    const employeeResult = await connection.execute(
      'SELECT emp_start_date FROM employee WHERE emp_id = :empId',
      { empId }
    );

    console.log (employeeResult);

    const empStartDate = employeeResult.rows[0][0];

    console.log(empStartDate);

    console.log('\n');

    // Check if the selected month and year are earlier than the employee's start date
    const selectedDate = new Date(`${year}-${month}-01`);
    const employeeStartDate = new Date(empStartDate);

    console.log(selectedDate);

    console.log('\n');
    console.log('\n');

    console.log(employeeStartDate);

    console.log('\n');

    if (selectedDate < employeeStartDate) {
      console.log('inside if')
      return res.status(400).json({ success: false, error: 'Selected month and year are earlier than employee start date' });
    }

    // // Check if the entry already exists in the payroll table
    // const checkResult = await connection.execute(
    //   'SELECT COUNT(*) FROM payroll WHERE emp_id = :empId AND p_month = :month AND p_year = :year',
    //   { empId, month, year }
    // );

    // const entryExists = checkResult.rows[0][0] > 0;

    // console.log('Count done:', checkResult.rows[0][0]);

    // if (!entryExists) {
    //   console.log('inside if');
      await connection.execute(
        'BEGIN calculate_salary(:p_emp_id, :p_month, :p_year); END;',
        { p_emp_id: empId, p_month: month, p_year: year },
        { autoCommit: true }
      );

    //   console.log('calculate salary done;');
    // }

    // Query to retrieve payroll information after the procedure execution
    const result = await connection.execute(
      `SELECT payroll.emp_id, fname || ' ' || lname ,salary, pay_id, p_month, processing_date, bonus, leaves, tax, overtime, net_salary  
       FROM employee
       JOIN payroll ON employee.emp_id = payroll.emp_id
       WHERE payroll.emp_id = :empId AND p_month = :month AND p_year = :year`,
      { empId, month, year }
    );

    console.log('select done;');

    const payrollData = result.rows;

    console.log('Payroll information fetched successfully:', payrollData);

    res.status(200).json({ success: true, data: payrollData });
  } catch (error) {
    console.error('Error calculating salary:', error.message);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing Oracle connection:", err.message);
      }
    }
  }
});

app.get('/admin/payroll-summary/:year/:month', async (req, res) => {
  let connection;
  try {
    const { year, month } = req.params;

    connection = await oracledb.getConnection();
    const result = await connection.execute(`
      SELECT
        p.pay_id, 
        e.emp_id,
        e.fname || ' ' || e.lname AS full_name,
        p.p_month || ' ' || p.p_year AS month,
        p.processing_date,
        e.salary,
        (p.bonus + p.overtime) AS additions,
        (p.leaves + p.tax) AS deductions,
        p.net_salary
      FROM
        payroll p
      JOIN
        employee e ON p.emp_id = e.emp_id
      WHERE
        p.p_year = :year
        AND p.p_month = :month
        ORDER BY
        TO_NUMBER(p.pay_id) ASC
    `, {
      year: parseInt(year), // Convert year to number
      month,
    });

    const payroll = result.rows;

    res.status(200).json(payroll);
  } catch (error) {
    console.error('Error fetching Payroll summary:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (connection) {
      try {
        await connection.close(); // Release the connection back to the pool
      } catch (err) {
        console.error("Error closing Oracle connection:", err.message);
      }
    }
  }
});

// GET employee details
app.get('/home/get-employee/:employeeId', async (req, res) => {
  let connection;
  const { employeeId } = req.params;

  try {
     connection = await oracledb.getConnection();

    const result = await connection.execute(
      `SELECT FNAME, LNAME, phone_num, ADDRESS, CNIC, GENDER,email, TO_CHAR(DOB, 'YYYY-MM-DD') AS DOB
      FROM EMPLOYEE
      WHERE EMP_ID = :employeeId`,
      { employeeId }
    );

      const employeeDetails = result.rows[0];
      res.status(200).json({ exists: true, details: employeeDetails });

  } catch (error) {
    console.error('Error in fetching employee details:', error.message);
    res.status(500).json({ error: error.message });
  }
  finally {
    if (connection) {
      try {
        await connection.close(); // Release the connection back to the pool
      } catch (err) {
        console.error("Error closing Oracle connection:", err.message);
      }
    }
  }
});
   
// PUT update employee details
app.put('/home/update-personal-info/:employeeId', async (req, res) => {
  
  let connection;

  try {
    const { employeeId } = req.params;
    const {
      firstName,
      lastName,
      gender,
      cnic,
      dob,
      phoneNumber,
      emailAddress,
      address,

    } = req.body;

    // Log received data from the frontend
    console.log('Received data from frontend:', req.body);

     connection = await oracledb.getConnection();

    await connection.execute(
      `UPDATE employee 
       SET fname = :firstName,
           lname = :lastName,
           gender = :gender,
           cnic = :cnic,
           dob = TO_DATE(:dob, 'YYYY-MM-DD'),
           phone_num = :phoneNumber,
           email = :emailAddress,
           address = :address
       WHERE emp_id = :employeeId`,
      {
        employeeId: parseInt(employeeId), // Ensure employeeId is converted to a number
        firstName,
        lastName,
        gender,
        cnic,
        dob,
        phoneNumber,
        emailAddress,
        address
      },
      { autoCommit: true }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating employee:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
  finally {
    if (connection) {
      try {
        await connection.close(); // Release the connection back to the pool
      } catch (err) {
        console.error("Error closing Oracle connection:", err.message);
      }
    }
  }
});
  
  
  
  
  
  
  
  
  

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
