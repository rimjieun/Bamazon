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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple", "Produce", 1.00, 50), ("Banana", "Produce", 0.85, 50),
("Cat Food", "Pet Care", 11.99, 50), ("Dog Food", "Pet Care", 11.99, 50),
("Earrings", "Jewelry", 8.99, 50), ("Foodball", "Sports", 6.99, 50),
("Gouda Cheese", "Dairy", 12.99, 50), ("Hershey's Kisses", "Candy", 0.20, 50),
("Ice Cream", "Dessert", 4.99, 40), ("Jalapeno", "Produce", 0.50, 50);