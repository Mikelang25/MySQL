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
    supervisorActions();
});

function supervisorActions() {
    inquirer
        .prompt({

            name: "supervisorActions",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Product Sales by Department", "Create New Department",
                "Exit"
            ]

        }).then(function (answer) {
            switch (answer.supervisorActions) {
                case "View Product Sales by Department":
                    viewSales();
                    break;
                case "Create New Department":

                    break;
                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function viewSales() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        console.log("\n");
        console.log(data);
    });

}