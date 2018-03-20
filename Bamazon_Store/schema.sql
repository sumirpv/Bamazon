
CREATE DATABASE IF NOT EXISTS bamazon;
use bamazon;


CREATE TABLE product(
	item_id int NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,	
	department_name VARCHAR(50) NOT NULL,
	price DECIMAL(10,2) NULL,
	stock_quantity INTEGER,
	PRIMARY KEY(item_id)
);

DESCRIBE product;

SELECT * FROM product;

INSERT INTO  `product` ( product_name,department_name,price,stock_quantity)
VALUES ("Lego","Toys",35.5,20),("Crayon","Toys",.99,23),("Nerf guns","Toys",12.78,10),
		("Ice Cream","Food",12.99,8),("Chips","Food",1.50,11),("Bread","Food",1.99,14),
		("Soil","Garden",3.45,5),("Sprinklers","Garden",23,3),("Hose","Garden",19.70,5),
		("Table","Furniture",390, 23),("Chair","Furniture",260.78,23),("Bed","Furniture",689.90,6);

 SELECT * FROM product; 
UPDATE product SET stock_quantity=(stock_quantity+3)  WHERE product_name ="Bed";

use bamazon;
CREATE TABLE departments(
	department_id int NOT NULL  PRIMARY KEY AUTO_INCREMENT,
	department_name VARCHAR(50) NOT NULL,
	over_head_cost DECIMAL(10,2) NULL
	
);
DESCRIBE departments;
SELECT * FROM departments;

/* UPDATE product SET product_name="Sprinklers" WHERE item_id = 8; */


INSERT INTO departments (department_name,over_head_cost)
VALUES ("Toys",100),("Food",100),("Garden",200),("Furniture",1000),("Home",100),("Books",100);

UPDATE departments SET department_name="Toys" WHERE department_id =1; 

ALTER TABLE product
ADD product_sales DECIMAL(10,2) ;

SELECT d.department_id,d.department_name,SUM(d.over_head_cost),SUM(p.product_sales)
FROM product as p
LEFT JOIN departments as d
ON p.department_name = d.department_name
GROUP BY d.department_id ,d.department_name;


SELECT d.department_id,d.department_name,SUM(d.over_head_cost),SUM(p.product_sales), SUM(p.product_sales) -SUM(d.over_head_cost) as total_profit
FROM product as p
LEFT JOIN departments as d
ON p.department_name = d.department_name
GROUP BY d.department_id ,d.department_name;

SELECT d.department_id,d.department_name,SUM(d.over_head_cost),SUM(p.product_sales), SUM(p.product_sales) -SUM(d.over_head_cost) as total_profit
FROM product as p
RIGHT JOIN departments as d
ON p.department_name = d.department_name
GROUP BY d.department_id ,d.department_name;

SELECT d.department_id,d.department_name,SUM(d.over_head_cost),SUM(p.product_sales), SUM(p.product_sales) -SUM(d.over_head_cost) as total_profit
FROM product as p
FULL OUTER JOIN departments as d
ON p.department_name = d.department_name
GROUP BY d.department_id ,d.department_name;


