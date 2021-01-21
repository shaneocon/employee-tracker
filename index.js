const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: employeesDB
});

connection.connect(function(err) {
    if (err) throw err;
    menu();
});

function menu() {
    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Employees",
            "View Departments",
            "View Roles",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Update Role",
            "Exit"
        ],
    }).then(answers => {
        console.log(answers.choice);
        switch(answers.choice) {
            case "View Employees":
                viewEmployees()
                break;
        }
    })
}
function viewEmployees() {}
function viewDepartments() {}
function viewRoles() {}
function addEmployee() {}
function addDepartment() {}
function addRole() {}
function updateRole() {}
function exit() {}
// menu() could be used as exit



// Add departments, roles, employees
// View departments, roles, employees
// Update employee roles
// Bonus points if you're able to:
// Update employee managers
// View employees by manager
// Delete departments, roles, and employees
// View the total utilized budget of a department -- ie the combined salaries of all employees in that department
