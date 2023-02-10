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
 db.promise().query ('SELECT * FROM department')
  
 .then (([data]) => {
  console.log("\n")
  console.table(data)
})
.then (initialize ())
}

 
function viewRoles() {
  db.promise().query ('SELECT * FROM role')
  
  .then (([data]) => {
    console.log("\n")
    console.table(data)
  })
  .then (initialize ())
  }
  
  
  function viewEmployees() {
  db.query ('SELECT * FROM employee')
   
  .then (([data]) => {
    console.log("\n")
    console.table(data)
  })
  .then (initialize ())
  }

function addDepartment() {
  
  const addDepartment = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'userchoice',
        message: "What department would you like to add?",
        choices: 
        ["Please "]
    }
  ])
  }
}

function addRole() {
  const addRole = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'userchoice',
        message: "What role would you like to add?",
        choices: 
        ["Please "]
    }
  ])
  }
}

function addEmployee() {
  const addEmployee = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'userchoice',
        message: "What employee would you like to add?",
        choices: 
        ["Please "]
    }
  ])
  }
}

function updateEmployeeRole() {
  
}

initialize();



