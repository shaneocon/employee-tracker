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
            
            default:
                connection.end()
                break;
            
        }
    }).catch((error) => {
        console.log(error);
    })
}
// JOIN employee, department, and role TABLES TOGETHER HERE 
function viewEmployees() {
    console.log("\nViewing employees\n");

    var query = 
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
      ON m.id = e.manager_id`;

    connection.query(query, function (err, data) {
        console.table(data);
        menu();
    })

}
    

function viewDepartments() {
    console.log("\nViewing departments\n");

    var query = "SELECT * FROM department";

    connection.query(query, function (err, data) {
        console.table(data);
        menu();
    })
}
function viewRoles() {
    console.log("\nViewing roles\n");

    var query = `SELECT e.id, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
      ON m.id = e.manager_id`;

    connection.query(query, function (err, data) {
        console.table(data);
        menu();
    })
}
function addEmployee() {
    inquirer.prompt([{
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?"
    },
    {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?"
    },
    {
        name: "roleId",
        type: "number",
        message: "What is the employee's role ID?"
    },
    {
        name: "managerId",
        type: "number",
        message: "What is the manager ID of the new employee?"
    }
    ]).then(function(res) {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [res.firstName, res.lastName, res.roleId, res.managerId], function(err, data) {
            if (err) console.log(err);
            console.table("Successfully Inserted");
            menu();
        })
    })
}

function addDepartment() {
    inquirer.prompt({
        name: "department",
        type: "input",
        message: "Please type name of department you'd like to add"
    }).then(function(res) {
        connection.query("INSERT INTO department (name) VALUES (?)", [res.department], function(err, data) {
            if (err) console.log(err);
            console.table("Successfully Inserted");
            menu();
        })
    })
}
function addRole() {
    inquirer.prompt([
    {
        name: "title",
        type: "input",
        message: "Please enter title: "
    },
    {
        name: "salary",
        type: "input",
        message: "Enter salary for position: "
    },
    {
        name: "department_id",
        type: "number",
        message: "Please enter your unique ID."
    },
    ]).then(function(res) {
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [res.title, res.salary, res.department_id], function(err, data) {
                if (err) console.log(err);
                console.table("Successfully Inserted");
                menu();
            })
        })
}
function updateRole() {
    inquirer.prompt({})
}

// menu() could be used as exit



// Add departments, roles, employees
// View departments, roles, employees
// Update employee roles
// Bonus points if you're able to:
// Update employee managers
// View employees by manager
// Delete departments, roles, and employees
// View the total utilized budget of a department -- ie the combined salaries of all employees in that department
