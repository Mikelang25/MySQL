DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db; 

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    stock_quantity INT NOT NULL,
    total_sales DECIMAL(20,2) NOT NULL DEFAULT 0,
    PRIMARY KEY(item_id)
);

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(20,2) NOT NULL DEFAULT 0,
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name,over_head_costs)
VALUES ("home",3000);

INSERT INTO departments (department_name,over_head_costs)
VALUES ("recreation",1400);

INSERT INTO departments (department_name,over_head_costs)
VALUES ("kitchen",1200);


INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("bike","recreation",199.99,50);

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("baseball bats","recreation",399.99,150);

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("couch","home",999.99,200);

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("lamp","home",59.99,30);

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("rug","home",100.99,25);

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("soccer ball","recreation",49.99,250);

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("lawn mower","home",499.99,15);

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("oven","kitchen",799.99,15);

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("refrigerator","kichen",1199.99,20);

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("bowling shoes","recreation",79.99,150);

