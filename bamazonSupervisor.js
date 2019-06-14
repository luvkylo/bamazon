var mysql = require('mysql');
var inquirer = require("inquirer");
var table = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "19971124s030111",
    database: "bamazon"
});

function viewSales(params) {
    connection.query("SELECT department_id, department_name, over_head_cost, SUM(IFNULL(product_sales, 0)) AS product_sales, SUM(IFNULL(product_sales, 0) - over_head_cost) AS total_profit FROM departments LEFT JOIN products USING(department_name) GROUP BY department_id, department_name", function (err, res) {
        if (err) {
            console.log(err);
            connection.end();
        } else {
            console.table(res);
            connection.end();
        }
    });
}

function create() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the department name?",
                name: "name"
            }, {
                type: "input",
                message: "What is the overhead cost?",
                name: "cost"
            }
        ])
        .then(function (inqresponse) {
            connection.query("INSERT INTO departments (department_name, over_head_cost) VALUES ('" + inqresponse.name + "', " + parseInt(inqresponse.cost) + ")", (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("\n" + inqresponse.name + " has been added to the table! \n");
                    connection.end();
                }
            });
        });
}

inquirer
    .prompt([
        {
            type: "list",
            choices: 
            [
                "View Product Sales by Department",
                "Create New Department"
            ],
            message: "What would you like to do?",
            name: "choice"
        }
    ])
    .then(function (inqresponse) {
        if (inqresponse.choice === "View Product Sales by Department") {
            viewSales();
        } else {
            create();
        }
    });