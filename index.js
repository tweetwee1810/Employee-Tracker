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


function initialize() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'userchoice',
        message: "What would you like to do?",
        choices:
          ["view all departments", "view all roles", "view all employees", "add a department", "add a role", " add an employee", "update an employee role"]
      }
    ])
    .then((data) => {
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
  db.promise().query('SELECT * FROM department')

    .then(([data]) => {
      console.log("\n")
      console.table(data)
    })
    .then(initialize())
}


function viewRoles() {
  db.promise().query('SELECT * FROM role')

    .then(([data]) => {
      console.log("\n")
      console.table(data)
    })
    .then(initialize())
}


function viewEmployees() {
  db.promise().query('SELECT * FROM employee')

    .then(([data]) => {
      console.log("\n")
      console.table(data)
    })
    .then(initialize())
}

function addDepartment() {

  inquirer.prompt([
    {
      type: 'input',
      name: 'department_name',
      message: "What is the name of department you would like to add?",
      validate: function (input) {
        return !!(input) || "Please enter the name of department";
      }
    },

  ])
    .then((response) => {
      const newDepartment = response.department_name;
      db.query("INSERT INTO department (name) VALUES (?)", [newDepartment], (error, results) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Your new department has been added successfully.');
          initialize();
        }
      });
    });
}
//WHEN I choose to add a role
//THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
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
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: "What is the employee's first name",
      validate: function (input) {
        return !!(input) || "Please enter the first name";
      }
    },
    {
      type: 'input',
      name: 'last_name',
      message: "What is the employee's last name",
      validate: function (input) {
        return !!(input) || "Please enter the last name.";
      }
    },
    {
      type: 'input',
      name: 'role_id',
      message: "What is the role_id belong to the employee?",
      validate: function (input) {
        return !!(input) || "Please enter the employee's role_id";
      }
    },
    {
      type: 'input',
      name: 'manager_id',
      message: "What is the manager_id belong to the employee? Press Enter to leave it blank",
      default: null
    }
  ])
    .then((response) => {
      const newFirstName = response.first_name;
      const newLastName = response.last_name;
      const newRoleId = response.role_id;
      const newManagerId = response.manager_id || null;
      db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [newFirstName, newLastName, newRoleId, newManagerId], (error, results) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Your new employee has been added successfully.');
          initialize();
        }
      });
    });
}
//WHEN I choose to update an employee role
//THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

function updateEmployeeRole() {
 
      db.query("SELECT first_name, last_name FROM employee", (error, results) => {
        if (error) {
          console.error(error);
        } else {
          const employee = results.map(result => result.first_name + " " + result.last_name + " ");
          db.query("SELECT title FROM role", (error, results) => {
            if (error) {
              console.error(error);
            } else {
              const role = results.map(result => result.title);
          inquirer.prompt([
            {
              type: 'list',
              name: 'update',
              message: "Which employee would you like to update?",
              choices: employee
            },
            {
              type: 'list',
              name: 'role',
              message: 'Which role do you want to assign with the selected employee?',
              choices: role
            }
          ])
            .then((response) => {
              const updatedEmployee = response.update;
              const newRole = response.role;
              const [firstName, lastName] = updatedEmployee.split(' ');
              db.query("UPDATE employee SET role = ? WHERE first_name = ? AND last_name = ?", [newRole, firstName, lastName], (error, results) => {
                if (error) {
                  console.error(error);
                } else {
                  console.log('Your new employee has been updated successfully.');
                  initialize();
                }
              });
            });
        }
      });
    }
  });
}



initialize();



