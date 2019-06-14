USE bamazon;

CREATE TABLE departments
(
    department_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    -- primary key column
    department_name VARCHAR (100) NULL,
    over_head_cost DECIMAL (15,4) NULL
);

INSERT INTO departments
    (department_name, over_head_cost)
VALUES
    ("CPU", 10000),
    ("GPU", 12460),
    ("Motherboard", 5600),
    ("CPU water cooler", 7000),
    ("RAM", 1200),
    ("SSD", 4217),
    ("Case", 1940),
    ("PSU", 3600),
    ("Monitor", 2567),
    ("Keyboard", 874),
    ("Others", 5639);