const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3001;


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'Tacomacc253@',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  