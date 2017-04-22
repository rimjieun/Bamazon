CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
	item_id int AUTO_INCREMENT NOT NULL,
    product_name varchar(100) NOT NULL,
    department_name varchar(100) NOT NULL,
    price decimal(10,2) NOT NULL,
    stock_quantity integer(10) DEFAULT 0,
    PRIMARY KEY (item_id)
);

USE Bamazon;

ALTER TABLE products
ADD product_sales decimal(10,2) DEFAULT 0;

USE Bamazon;

CREATE TABLE departments (
	department_id int AUTO_INCREMENT NOT NULL,
    department_name varchar(100) NOT NULL,
    overhead_costs decimal(10,2) NOT NULL,
    total_sales decimal(10,2) DEFAULT 0,
    PRIMARY KEY (department_id)
);
