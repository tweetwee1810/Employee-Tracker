const inquirer = require('inquirer');
const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      password: 'Tacomacc253@',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );
  

function initialize () {
  inquirer 
    .prompt([
      {
      type: 'list',
      name: 'userchoice',
      message: "What would you like to do?",
      choices: 
      ["view all departments", "view all roles","view all employees", "add a department", "add a role", " add an employee", "update an employee role"]
      }
    ])
    .then ((data) => {
      console.log(data)
      switch (data.userchoice) {
        case "view all departments":
          viewDepartments();
          break;
        case "view all roles":
          viewRoles();
          break;
        case "view all employees":
          viewEmployees();
          break;
        case "add a department":
          addDepartment();
          break;
        case "add a role":
          addRole();
          break;
        case " add an employee":
          addEmployee();
          break;
        case "update an employee role":
          updateEmployeeRole();
          break;
        default:
          console.log("Invalid choice.");
      }
    });
}

function viewDepartments() {
 db.query ('SELECT * FROM department', (err, rows) => {
  if (err) {
    console.log(err);
  }
  // console.log(rows);
 inquirer 
 .prompt(([
    {
    type: 'list',
    name: 'departmentChoices',
    message: "What would you like to choose?",
    choices: 
    ["Sales", "Engineering", "Finance", "Legal"]
    }
  ]))
  .then ((data) => {
    // console.log(data)
 })
})}
 
function viewRoles() {
  db.query ('SELECT * FROM role', (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log(rows);
   inquirer 
   .prompt(([
      {
      type: 'list',
      name: 'roleChoices',
      message: "What would you like to choose?",
      choices: 
      ["job title", "role id", "the department id", "the salary"]
      }
    ]))
    .then ((data) => {
      console.log(data)
   })
  })
}
// employee ids, first names, last names, job titles, departments, salaries, and managers
function viewEmployees() {
  db.query ('SELECT * FROM employee', (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log(rows);
   inquirer 
   .prompt(([
      {
      type: 'list',
      name: 'employeeChoices',
      message: "What would you like to choose?",
      choices: 
      ["employee id", "first name", "last name", "job titles", "the salary"]
      }
    ]))
    .then ((data) => {
      console.log(data)
   })
  })
}

function addDepartment() {
  
}

function addRole() {
 
}

function addEmployee() {
 
}

function updateEmployeeRole() {
  // code to update an employee role
}

initialize();



// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role