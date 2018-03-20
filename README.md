# Bamazon
Customer View:
This app will show what are the products we have in the store.
And then prompt users with two messages.

The first  ask them the ID of the product they would like to buy.
The second message will ask how many units of the product they would like to buy.
Once the customer has placed the order, the application check if the store has enough of the product to meet the customer's request.
If not, the app  log a phrase like Insufficient quantity!, and then prevent the order from going through.
However, if the store does have enough of the product, it fulfill the customer's order.
Once the update goes through, the customer see the total cost of their purchase.

Bamazon_Customer Screen Shot: /Users/sumi/Desktop/Vscode/Bamazon/images/Screen Shot 2018-03-19 at 5.16.10 PM.png

Manager View :-
 When you run this application you get a set of menu options:
* View Products for Sale
* View Low Inventory
* Add to Inventory
* Add New Product
If you select View Products for Sale, the app list every available item: the item IDs, names, prices, and quantities.
If you select View Low Inventory, then it  list all items with an inventory count lower than five.
If you select a Add to Inventory, the app display a prompt that will let the manager "add more" of any item currently in the store.
If you select Add New Product, it allow the manager to add a completely new product to the store.

Bamazon_Manager Screen Shot: /Users/sumi/Desktop/Vscode/Bamazon/images/Screen Shot 2018-03-19 at 5.18.59 PM.png

Supervisor View :-
    This application  list a set of menu options:
* View Product Sales by Department
* Create New Department

When a supervisor selects View Product Sales by Department, the app display a summarized table in their terminal/bash window. The total_profit column is calculated on the fly using the difference between over_head_costs and product_sales. total_profit is not stored in any database.

Bamazon_Supervisor Screen Shot: /Users/sumi/Desktop/Vscode/Bamazon/images/Screen Shot 2018-03-19 at 5.20.37 PM.png

Link to see how the application works: https://drive.google.com/file/d/1DN3lTBmE0tJnVUN7zqe5ekHCxWZ8anq1/view
