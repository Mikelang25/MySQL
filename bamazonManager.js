var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Carnelli7ct!",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    managerActions();
});


function managerActions() {

    inquirer
        .prompt({

            name: "managerActions",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View products for sale", "View Low Inventory",
                "Add to Inventory", "Add New Product", "Exit"
            ]

        }).then(function (answer) {
            switch (answer.managerActions) {
                case "View products for sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addProduct();
                    break;
                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        console.log("\n");
        console.table(data);
        continueActions();
    });
}

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, data) {
        if (err) throw err;
        console.log("\n");
        console.table(data);
        continueActions();
    });
}

function continueActions() {
    inquirer
        .prompt({

            name: "continue",
            type: "list",
            message: "Would you like to do something else?",
            choices: ["Yes", "No"]

        }).then(function (answer) {
            if (answer.continue === "Yes") {
                managerActions();
            } else {
                console.log("\n Have a nice day!")
                connection.end();
            }
        });
}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        console.log("\n");
        console.table(data);
        inquirer
            .prompt([{

                name: "inventory",
                type: "input",
                message: "Please input the ID of the product you would like to increase stock of"
            },
            {
                name: "level",
                type: "input",
                message: "Please provide a new inventory level"

            }]).then(function (answer) {
                connection.query("UPDATE products SET ? WHERE ?",
                    [{
                        stock_quantity: answer.level
                    },
                    {
                        item_id: answer.inventory
                    }],
                    function (err, data) {
                        if (err) throw err;
                        console.log("\nInventory level for your item has been updated")
                        console.log("\n");
                        viewProducts();
                    });
            });
    });
}

function addProduct() {
    connection.query("SELECT * FROM departments", function (err, data) {
        if (err) throw err;
        var departmentsList = [];
        for (var i = 0; i < data.length; i++) {
            departmentsList.push(data[i].department_name)
        }
        inquirer
            .prompt([{

                name: "prodName",
                type: "input",
                message: "Please input the name of the product"
            },
            {
                name: "prodDept",
                type: "list",
                message: "Please assign a department",
                choices: departmentsList
            },
            {
                name: "price",
                type: "input",
                message: "Please provide a price for the item"

            },
            {
                name: "quantity",
                type: "input",
                message: "How much would you like to put in stock?"

            }]).then(function (answer) {

                var newProduct = [
                    answer.prodName,
                    answer.prodDept,
                    answer.price,
                    answer.quantity
                ]

                connection.query("INSERT INTO products (product_Name,department_name,price,stock_quantity) VALUES (?,?,?,?)", newProduct, function (err, data) {
                    if (err) throw err;
                    console.log("\nYour product has been added")
                    viewProducts();
                });
            });


    });
}