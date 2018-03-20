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
    //console.log(" The connection is made");
    showItem();
});

function showItem() {
    console.log("These are all the items we are selling\n");
    connection.query("SELECT * FROM product", function(err, res) {
      if (err){ throw err;} else{
        //   var itemId=[];
        //   var proName =[];
        //   var pr =[];
      // Log all results of the SELECT statement
    //   var data;
    //   for (var i=0; i< res.length; i++){
    //     //  data = [
    //     //     { id: res[i].item_id, proName: res[i].item_id, pr: res[i].price}
    //     //   ]
    //     data =[itemId.push(res[i].item_id),
    //     proName.push(res[i].product_name),
    //     pr.push(res[i].price)];


    //     }
    //     console.log(data)
    //     console.log(proName)
    //     console.log(pr)
        // console.log(res)
          var t = new Table
           
          res.forEach(function(product) {
            t.cell('Product Id',product.item_id)
            t.cell('Description',product.product_name)
            t.cell('Price',product.price)
            t.newRow()
          })
           
          console.log(t.toString())

      console.log("Lets go shopping");
      startShopping();
      }
    });
  }
  function startShopping() {
    inquirer.prompt([
        {
            type: "input",
            message: "What Id would you like to buy ? ",
            name: "userItemId"
        },
        {
            type: "input",
            message: "How many units of item are you buying ? ",
            name: "userUnitProduct"
        }
    ]).then(function (data) {
        var query = connection.query(
            "SELECT * FROM product  WHERE ?",
            {
                item_id: data.userItemId
            },
            function (err, res) {
                //console.log("check this"+res);
                console.log(res[0].stock_quantity);
                console.log(data.userUnitProduct);
                console.log( res[0].price);
                if (res[0].stock_quantity > parseFloat(data.userUnitProduct)) {
                    console.log("Yes we have your product, lets pay");
                    var totalCost =(data.userUnitProduct)*(res[0].price);
                    //updateing the price
                   // var st_q=(stock_quantity-parseFloat(data.userUnitProduct));
                    var query = connection.query(
                        "UPDATE product SET ? WHERE ?",
                        [
                            {
                                stock_quantity : (res[0].stock_quantity-parseFloat(data.userUnitProduct)),
                                product_sales : totalCost
                            },
                            {
                                item_id : data.userItemId

                            }

                        ], function (err, res) {
                            console.log(" item updated!\n");
                            console.log(" Your total amount is : "+ totalCost);
                            connection.end();
                        }
                    )
                } else {
                    console.log("Sorry Insufficient quantity!");
                    connection.end();
                }

            }
        )

    })

}

  