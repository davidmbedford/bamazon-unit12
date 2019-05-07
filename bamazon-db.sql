CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL, 
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(6, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL
);



