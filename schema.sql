DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INT NOT NULL PRIMARY KEY, -- primary key column
    product_name VARCHAR (100) NULL,
    department_name VARCHAR (100) NULL,
    price DECIMAL (10,4) NULL,
    stock_quantity INT NULL,
    product_sales DECIMAL(15,4) NULL
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES 
    (1, "Intel i9 9900k", "CPU", 479.99, 13),
    (2, "Nvidia GTX 2080 Ti", "GPU", 799.99, 30),
    (3, "ASUS Z399 motherboard", "Motherboard", 159.99, 27),
    (4, "Corsair H150i", "CPU water cooler", 100.99, 48),
    (5, "Kingston DDR4 2133 Memory 8GB", "RAM", 79.99, 100),
    (6, "Samsung 850 Pro 256GB", "SSD", 203.40, 30),
    (7, "Fractal Design - Meshify C ATX Mid Tower Case", "Case", 84.85, 58),
    (8, "EVGA - SuperNOVA GS 550W 80+ Gold Certified", "PSU", 89.89, 42),
    (9, "LG 25UM56-P", "Monitor", 147.70, 36),
    (10, "Corsair - STRAFE RGB Wired Gaming Keyboard", "Keyboard", 174.79, 64);