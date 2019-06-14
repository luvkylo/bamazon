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

function readAll() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price);
        }
        console.log("-----------------------------------");
        connection.end();
    });
}

function UpdateQuantity(product, quantity, sales) {
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: quantity,
                product_sales: sales
            },
            {
                product_name: product
            }
        ], (error, response) => {
        if (error) {
            console.log(error);
        } else {
            readAll();
        }
    });
}

function purchase() {
    var products = [];

    connection.query("SELECT * FROM products", (err, res) => {
        if (err) {
            console.log(err);
            connection.end();
        } else {
            for (var i = 0; i < res.length; i++) {
                products.push(res[i].product_name);
            }
            inquirer
                .prompt([
                    {
                        type: "list",
                        message: "What is the product you would like to buy?",
                        choices: products,
                        name: "Products"
                    },
                    {
                        type: "input",
                        message: "How many units would you like to buy?",
                        name: "units"
                    }
                ])
                .then(function (inquirerResponse) {
        
                    connection.query("SELECT * FROM products WHERE product_name=?", [inquirerResponse.Products], function (err, res) {
                        if (err) throw err;
                        units = parseInt(inquirerResponse.units);
                        if (res[0].product_sales === null) {
                            var sales = 0;
                        } else {
                            var sales = res[0].product_sales
                        }
                        if (res[0].stock_quantity >= units) {
                            console.log("\nYou have bought " + inquirerResponse.Products + " for " + units + " units.\n");
                            console.log("Your total cost for this purchase is $" + (units * res[0].price));
                            console.log("-----------------------------------");
                            UpdateQuantity(inquirerResponse.Products, (res[0].stock_quantity - units), (sales + (units * res[0].price)));
                        } else {
                            console.log("Insufficient quantity!")
                            connection.end();
                        }
                    });
                });   
        }
    })

}

connection.connect((error) => {
    if (error) {
        console.error(error);
    } else {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price);
            }
            console.log("-----------------------------------");
            purchase();
        });
    }
});