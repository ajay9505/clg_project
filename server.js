const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change if using a different MySQL username
  password: "", // Change if using a MySQL password
  database: "profile",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:",+ err.stack);
    return;
  }
  console.log("MySQL Connected...");
});

/*// Admin Login Route
app.post('/admin-login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM admin WHERE username = ? AND password = ?';
    
    db.query(query, [username, password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});*/

// User Login API
app.post("/login", (req, res) => {
  const { userId, password } = req.body;
  const sql = "SELECT * FROM users WHERE userId = ? AND password = ?";
  db.query(sql, [userId, password], (err, result) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      if (result.length > 0) {
          res.json({ success: true, message: "Login successful" });
      } else {
          res.status(401).json({ success: false, message: "Invalid credentials" });
      }
  });
});



// API to get students based on department, program, and year
app.get("/get-students", (req, res) => {
  const { department, program, year } = req.query;
  const sql = "SELECT * FROM students WHERE department = ? AND program = ? AND year = ?";
  
  db.query(sql, [department, program, year], (err, results) => {
      if (err) {
          console.error("Error fetching students: " + err);
          res.status(500).send("Database error");
      } else {
          res.json(results);
      }
  });
});

// API to save attendance
app.post("/save-attendance", (req, res) => {
  const attendanceData = req.body;

  const sql = "INSERT INTO attendance (student_id, student_name, department, program, year, date, status) VALUES ?";
  const values = attendanceData.map(student => [
      student.student_id, student.student_name, student.department,
      student.program, student.year, student.date, student.status
  ]);

  db.query(sql, [values], (err, result) => {
      if (err) {
          console.error("Error inserting attendance: " + err);
          res.status(500).send("Database error");
      } else {
          res.send("Attendance saved successfully!");
      }
  });
});

// API to get attendance history
app.get("/attendance-history", (req, res) => {
  const sql = "SELECT * FROM attendance ORDER BY date DESC";
  
  db.query(sql, (err, results) => {
      if (err) {
          console.error("Error fetching history: " + err);
          res.status(500).send("Database error");
      } else {
          res.json(results);
      }
  });
});

// API to clear all attendance records
app.delete("/clear-attendance", (req, res) => {
  const sql = "DELETE FROM attendance";

  db.query(sql, (err, result) => {
      if (err) {
          console.error("Error deleting attendance records: " + err);
          res.status(500).send("Database error");
      } else {
          res.send("All attendance records cleared successfully!");
      }
  });
});


// API route to fetch data
app.get("/result-student_info", (req, res) => {
    //query for results
    const resultQuery = "SELECT * FROM result";
    db.query(resultQuery, (err, result) => {
      if (err) {
          console.error('Error fetching result:', err);
          return res.status(500).json({ error: 'Failed to fetch results' });
      }
      
    // Query for student_info
    const studentQuery = "SELECT * FROM student_info";
     db.query(studentQuery, (err, student_info) => {
         if (err) {
             console.error('Error fetching student_info:', err);
             return res.status(500).json({ error: 'Failed to fetch student_info' });
         }

         // Send data as JSON response
         res.json({ result, student_info });
     });
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
