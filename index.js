const inquirer = require('inquirer');
const mysql = require('mysql2');
var figlet = require('figlet');

figlet.text('Employee Tracker', {
  font: 'caligraphy',
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 160,
  whitespaceBreak: true
}, function(err, data) {
  if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
  }
  console.log(data);
});
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
          ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "\n"]
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
  db.promise().query(`
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    LEFT JOIN department ON role.department_id = department.id;
  `)
    .then(([data]) => {
      console.log("\n");
      console.table(data);
      initialize();
    })
    .catch((error) => {
      console.log(error);
      initialize();
    });
}



function viewEmployees() {
  db.promise().query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id;
  `)
    .then(([data]) => {
      console.log("\n");
      console.table(data);
    })
    .catch((error) => {
      console.log(error);
      initialize();
    });
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



const updateEmployeeRole = () => {
  db.promise().query('SELECT * from employee')
  .then(([res]) => {
    inquirer.prompt([
      {type: 'list',
      name: 'employee',
      message: 'Which employee are you updating?',
      choices: res.map(({first_name, last_name, id}) => ({name: `${first_name} ${last_name}`, value: id}))
    }
    ]).then((res) => {
      const newEmployee = res.employee
      db.promise().query("SELECT role.id, role.title FROM role")
      .then(([res]) => {
        inquirer.prompt([
          {
            type: 'list',
            name: 'roleOptions',
            message: 'what is the new role?',
            choices: res.map(({title, id}) => ({name: title, value: id}))
          }
        ]).then((response) => {
          db.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [response.roleOptions, newEmployee])
          .then(console.log('employee updated'))
          .then(initialize())
        })
      })
    })
  })
}


initialize();



