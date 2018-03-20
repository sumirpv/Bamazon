var mysql = require("mysql");
var inquirer = require('inquirer');
const cTable = require('console.table');
var Table = require('easy-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(" The connection is made");
    showMenu();
    // addInventry();
    //addNewProduct();
});

function showMenu(){
    inquirer.prompt([
        {
            name : "userChoice",
            type :"list",
            message : "Select one options",
            choices : [
                "View Product for Sale",
                "View Low Inventry",
                "Add to Inventry",
                "Add New Product",
                "Exit"
            ]
            
        }
    ]).then(function(data){
       switch(data.userChoice){
           case "View Product for Sale":
           viewProductSale();
           break;
           case "View Low Inventry" :
           viewLowInventry();
           break;
           case "Add to Inventry" :
           addInventry();
           break;
           case "Add New Product" :
           addNewProduct();
           break;
           case "Exit":
           console.log("See you later");
           connection.end();
           process.exit();
           break;
       }
    })
}
function viewProductSale(){
    console.log("These are all the items\n");
    connection.query("SELECT * FROM product", function(err, res) {
      if (err){ throw err;} else{
      // Log all results of the SELECT statement
      var t = new Table;
           
      res.forEach(function(product) {
        t.cell('Product Id',product.item_id);
        t.cell('Description',product.product_name);
        t.cell('Price',product.price);
        t.cell('Quantity',product.stock_quantity);

        t.newRow();
      })
       
      console.log(t.toString());

    //   for (var i=0; i< res.length; i++){
    //   console.log("\nId : "+res[i].item_id);
    //   console.log("Name : "+res[i].product_name);
    //   console.log("Price : "+res[i].price);
    //   console.log("Quantity : "+res[i].stock_quantity +"\n");

    //   }
      }
      showMenu();
    });
}

function viewLowInventry(){
    console.log("\nThese are all the items we are running low \n");
    connection.query("SELECT * FROM product", function(err, res) {
      if (err){ throw err;} else{
          //getting all the item using for
          var t = new Table;
           
          res.forEach(function(product) {
            if (product.stock_quantity < 10){  
            t.cell('Product Id',product.item_id);
            t.cell('Description',product.product_name);
            t.cell('Price',product.price);
            t.cell('Quantity',product.stock_quantity);
    
            t.newRow();
            }
          })
           
          console.log(t.toString());
        // for (var i=0; i< res.length; i++){
        //     //checking if the quantity is less than 5
        //     if (res[i].stock_quantity < 5){    
        //     console.log("Id : "+res[i].item_id);
        //     console.log("Name : "+res[i].product_name);
        //     console.log("Price : "+res[i].price);
        //     console.log("Quantity : "+res[i].stock_quantity +"\n");
        //     }
        // }
      }
      showMenu();
    });
}
function addInventry() {
    console.log("Pick an item you wan to add more");
    var itemArray = [];
    connection.query("SELECT * FROM product", function(err, res) {
        if (err){ throw err;} else{
        // Log all results of the SELECT statement
        for (var i=0; i< res.length; i++){
        // console.log("\nId : "+res[i].item_id);
        itemArray.push(res[i].product_name);
        }
        }
        //console.log(itemArray);
        inquirer.prompt([
            {
                name :"updateItem",
                type :"list",
                message :"Which item you want to order more ?",
                choices : itemArray
            },
            {
                name :"updateQuantity",
                type : "input",
                message : "How many you want to order ?"
            }
        ]).then( function(data){
            console.log("You are ordering  " + data.updateItem +"   "+data.updateQuantity+"  quantity ");
            var query="UPDATE product SET stock_quantity = stock_quantity + " +data.updateQuantity+ " WHERE  ?";
            connection.query (query,
                [ {
                    product_name  : data.updateItem 
                }]
                , function(error,res){
                    if( error) {
                        throw error;
                    }else{
                        var item = data.updateItem;
                        var quantity = data.updateQuantity;
                        console.log(" its updating" + item + quantity);
                        connection.query("SELECT * FROM product WHERE ? ",{
                            product_name :item
                        }, function(err, res) {
                            if (err){ throw err;} else{

                                var t = new Table;
                                res.forEach(function(product) {
                                    t.cell('Product Id',product.item_id);
                                    t.cell('Description',product.product_name);
                                    t.cell('Price',product.price);
                                    t.cell('Quantity',product.stock_quantity);
                            
                                    t.newRow();
                                  })
                                   
                                  console.log(t.toString());
                                // for (var i=0; i< res.length; i++){
                                //     //checking if the quantity is less than 5 
                                //     console.log("Id : "+res[i].item_id);
                                //     console.log("Name : "+res[i].product_name);
                                //     console.log("Price : "+res[i].price);
                                //     console.log("Quantity : "+res[i].stock_quantity +"\n");  
                                // }


                            }
                            showMenu();
                          });       
                    }

                })

        })
      });

}
//add new product function
function addNewProduct(){
    inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "What is the product you would like to add?"
      },
      {
        name: "department",
        type: "input",
        message: "What department would you like to place your product in ?"
      },
      {
        name: "product_price",
        type: "input",
        message: "What is the price of the product ?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "How much quantity you want to order ?",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO product SET ?",
        {
          product_name: answer.product,
          department_name : answer.department,
          price : answer.product_price,
          stock_quantity : answer.quantity
        },
        function(err) {
          if (err) {throw err;}else{
    
          console.log("Your product is added !");
          viewProductSale();
          }
          showMenu();
        }
      );
    });
}