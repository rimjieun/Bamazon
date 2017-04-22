INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple", "Food, Household & Pets", 1.00, 50), ("Banana", "Food, Household & Pets", 0.85, 50),
("Cat Food", "Food, Household & Pets", 11.99, 50), ("Dog Food", "Food, Household & Pets", 11.99, 50),
("Earrings", "Clothing, Shoes & Jewelry", 8.99, 50), ("Football", "Sports, Fitness & Outdoors", 6.99, 50),
("Gouda Cheese", "Food, Household & Pets", 12.99, 50), ("Hershey's Kisses", "Food, Household & Pets", 0.20, 50),
("Ice Cream", "Food, Household & Pets", 4.99, 50), ("Jalapeno", "Food, Household & Pets", 0.50, 50),
("Kite", "Toys & Video Games", 12.99, 50), ("Lisinopril", "Pharmacy, Health & Beauty", 9.99, 50),
("Metformin", "Pharmacy, Health & Beauty", 9.99, 50), ("Nutella", "Food, Household & Pets", 4.99, 50);

SELECT * FROM products;

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Electronics & Office", 300), ("Movies, Music & Books", 100),
("Home, Furniture & Appliances", 500), ("Clothing, Shoes & Jewelry", 200),
("Toys & Video Games", 100), ("Food, Household & Pets", 500),
("Pharmacy, Health & Beauty", 600), ("Sports, Fitness & Outdoors", 300);

SELECT * FROM departments;