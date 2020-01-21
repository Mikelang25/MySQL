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
                    addDepartment();
                    break;
                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function viewSales() {
    connection.query("SELECT departments.department_id, departments.department_name, SUM(products.total_sales) AS product_sales, departments.over_head_costs AS over_head_costs , SUM(products.total_sales) - departments.over_head_costs AS total_profit " +    
                    "FROM products INNER JOIN departments ON products.department_name = departments.department_Name GROUP BY departments.department_name", function (err, data) {
        if (err) throw err;
        console.log("\n");
        console.table(data);
        supervisorActions();
    });
}

function addDepartment(){

    inquirer
    .prompt([{

        name:"department",
        type:"input",
        message:"What is the name of your new department?",
    },
    {
        name:"cost",
        type:"input",
        message:"What are the overhead costs associated with this department?"

    }]).then(function(answer){

        connection.query("INSERT INTO departments (department_name, over_head_costs) VALUES (?,?)",
        [
            answer.department,
            answer.cost
        ]
        ,function (err, data) {
        if (err) throw err;
        console.log("\n");
        console.table("Your new department has been successfully added!\n");
        supervisorActions();
        });
    }); 
}