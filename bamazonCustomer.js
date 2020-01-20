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
            console.log("\n")
            findQuantity(answer.product);
        });
}

function findQuantity(product){

    inquirer
        .prompt({

            name:"quantity",
            type:"input",
            message:"How much would you like to purchase?"

        }).then(function(answer){
            connection.query("SELECT * FROM products WHERE ?",{
                item_id: product
            },function (err, data) {
                if (err) throw err;
                if(data[0].stock_quantity >= answer.quantity){
                    var newQuantity = data[0].stock_quantity - answer.quantity
                    var prodName = data[0].product_name
                    connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity:newQuantity
                        },
                        {
                            item_id: product
                        }
                    ],function (err, data) {
                        if (err) throw err;
                        console.log("\n Thank you for your purchase! \n Enjoy your " + prodName + "\n") 
                        buyAgain();     
                    });
                }else{
                    console.log("\n There is not enough " + data[0].product_name + " in stock. Sorry!")
                    buyAgain();
                }
                
            });            
        });
}

function buyAgain(){

    inquirer
        .prompt({

            name:"continue",
            type:"list",
            message:"Would you like to make another purchase?",
            choices: ["Yes", "No"]

        }).then(function(answer){
            if(answer.continue === "Yes"){
                findProducts();
            }else{
                console.log("\n Please come again!")
                connection.end();
            }
        });
}