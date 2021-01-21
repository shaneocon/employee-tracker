const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employeesDB"
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
        console.table(answers.choice);
        switch(answers.choice) {
            case "View Employees":
                viewEmployees()
                break;

            case "View Departments":
                viewDepartments()
                break;

            case "View Roles":
                viewRoles()
                break;

            case "Add Employee":
                addEmployee()
                break;

            case "Add Department":
                addDepartment()
                break;

            case "Add Role":
                addRole()
                break;

            case "Update Role":
                updateRole()
                break;
            
        }
    }).catch((error) => {
        console.log(error);
    })
}
function viewEmployees() {
    var query = "SELECT * FROM employee";
    connection.query(query, function (err, data){
        console.table(data);
        menu();
    })

}
    

function viewDepartments() {}
function viewRoles() {}
function addEmployee() {}
function addDepartment() {}
function addRole() {}
function updateRole() {}

// menu() could be used as exit



// Add departments, roles, employees
// View departments, roles, employees
// Update employee roles
// Bonus points if you're able to:
// Update employee managers
// View employees by manager
// Delete departments, roles, and employees
// View the total utilized budget of a department -- ie the combined salaries of all employees in that department
