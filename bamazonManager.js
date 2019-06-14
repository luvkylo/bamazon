var mysql = require('mysql');
var inquirer = require("inquirer");

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

function viewProduct() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("-----------------------------------");
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
        connection.end();
    });
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity<=5", function (err, res) {
        if (err) throw err;
        console.log("-----------------------------------");
        console.log("ID | Product name | Department name | Price | Quantity");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
        connection.end();
    });
}

function addInventory() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which product would you like to add intentory to?",
                choices: ["Intel i9 9900k", "Nvidia GTX 2080 Ti", "ASUS Z399 motherboard", "Corsair H150i", "Kingston DDR4 2133 Memory 8GB", "Samsung 850 Pro 256GB", "Fractal Design - Meshify C ATX Mid Tower Case", "EVGA - SuperNOVA GS 550W 80+ Gold Certified", "LG 25UM56-P", "Corsair - STRAFE RGB Wired Gaming Keyboard"],
                name: "Products"
            },
            {
                type: "input",
                message: "How many units would you like to add?",
                name: "units"
            }
        ])
        .then(function (inqResponse) {
            connection.query("SELECT * FROM products WHERE product_name=?", [inqResponse.Products], function (err, res) {
                if (err) throw err;
                units = parseInt(inqResponse.units);

                connection.query("UPDATE products SET ? WHERE ?",
                [{
                    stock_quantity: (res[0].stock_quantity + units)
                }, {
                        product_name: inqResponse.Products
                }], (error, response) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Here is the new quantity for " + inqResponse.Products + "\n");

                        console.log("-----------------------------------");
                        console.log(res[0].item_id + " | " + res[0].product_name + " | " + res[0].department_name + " | " + res[0].price + " | " + (res[0].stock_quantity + units));
                        console.log("-----------------------------------");
                    }
                    connection.end();
                });
            });
        });
}

function addProduct() {
    var department = [];

    connection.query("SELECT * FROM departments", (err, res) => {
        if (err) {
            console.log(err);
            connection.end();
        } else {
            for (var i = 0; i < res.length; i++) {
                department.push(res[i].department_name);
            }
        }
    })
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of this new product?",
                name: "product"
            },
            {
                type: "input",
                message: "What is the product id?",
                name: "id"
            },
            {
                type: "list",
                choices: department,
                message: "What is the name of the department?",
                name: "department"
            },
            {
                type: "input",
                message: "What is the price of the product?",
                name: "price"
            },
            {
                type: "input",
                message: "How many of the product is in the inventory?",
                name: "quantity"
            }
        ])
        .then(function (inqResponse) {
            connection.query("INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES (" + parseInt(inqResponse.id) + ", '" + inqResponse.product + "', '" + inqResponse.department + "', " + parseInt(inqResponse.price) + ", " +  parseInt(inqResponse.quantity) + ")", (error, response) => {
                    if (error) {
                        console.log(error);
                        connection.end();
                    } else {
                        viewProduct()
                    }
                });
        })
}

inquirer
    .prompt([
        {
            type: "list",
            message: "What action would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "action"
        }
    ])
    .then(function (inquirerResponse) {

        connection.connect((error) => {
            if (error) {
                console.error(error);
            } else {
                if (inquirerResponse.action === "View Products for Sale") {
                    viewProduct();
                } else if (inquirerResponse.action === "View Low Inventory") {
                    lowInventory();
                } else if (inquirerResponse.action === "Add to Inventory") {
                    addInventory();
                } else {
                    addProduct();
                }
            }
        });
    });   