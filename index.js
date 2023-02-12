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
        name: 'department',
        message: "Which department you would like to add?",
        validate: function (input) {
          return !!(input) || "Please enter the department.";
        }
      }
    ])
  }
}

function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: "What is the title of the role you would like to add?",
      validate: function (input) {
        return !!(input) || "Please enter the title.";
      }
    },
    {
      type: 'input',
      name: 'salary',
      message: "What is the salary of the role you would like to add?",
      validate: function (input) {
        return !!(input) || "Please enter the salary.";
      }
    },
    {
      type: 'input',
      name: 'department_id',
      message: "What is the department ID of the role you would like to add?",
      validate: function (input) {
        return !!(input) || "Please enter the department ID.";
      }
    }
  ])
  .then((response) => {
    const newRoleTitle = response.title;
    const newRoleSalary = response.salary;
    const newRoleDepartmentId = response.department_id;
    db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [newRoleTitle, newRoleSalary, newRoleDepartmentId], (error, results) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Your new role has been added successfully.');
        initialize();
      }
    });
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the name of the employee you would like to add?",
      validate: function (input) {
        return !!(input) || "Please enter the name of the employee.";
      }
    }
  ])
  .then((response) => {
    const newEmployee = response.name;
    db.query("INSERT INTO employee (first_name, last_name) VALUES (?)", [newEmployee], (error, results) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Your new employee has been added successfully.');
        initialize();
      }
    });
  });
}

function updateEmployeeRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'update',
      message: "What is the name of the employee you would like to update?",
      validate: function (input) {
        return !!(input) || "Please enter the name of the employee you want to update.";
      }
    }
  ])
}

initialize();



