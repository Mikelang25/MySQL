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
    findProducts();
});

function findProducts() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;

        console.table(data);
        locateProduct();        
    });
}


function locateProduct() {

    inquirer
        .prompt({

            name:"product",
            type:"input",
            message:"Please input the ID of the product you wish to purchase"

        }).then(function(answer){
            console.log("You Want to Buy " + answer.product)
            findQuantity();
        });
}

function findQuantity(){

    inquirer
        .prompt({

            name:"quantity",
            type:"input",
            message:"How much would you like to purchase?"

        }).then(function(answer){
            console.log("You Want to Buy " + answer.quantity)
            connection.end();
        });
}