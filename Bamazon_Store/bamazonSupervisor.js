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

function showMenu() {
  inquirer.prompt([
    {
      name: "supervisorChoice",
      type: "list",
      message: "Select one options",
      choices: [
        "View ProductSales by Department",
        "Create a new Department",
        "Exit"
      ]

    }
  ]).then(function (data) {
    console.log(data.supervisorChoice)
    switch (data.supervisorChoice) {
      case "View ProductSales by Department":
        viewProductSaleByDept();
        break;
      case "Create a new Department":
        createNewDept();
        break;
      case "Exit":
        console.log("\nSee you later\n");
        connection.end();
        process.exit();
        break;
    }
  })
}

function viewProductSaleByDept() {
  console.log("These are all the departments \n");
  var query = "SELECT d.department_id,d.department_name,SUM(d.over_head_cost) as over_head_cost,";
  query += "SUM(p.product_sales) as product_sales, SUM(p.product_sales) -SUM(d.over_head_cost) as total_profit";
  query += " FROM product as p RIGHT JOIN departments as d ON p.department_name = d.department_name ";
  query += "GROUP BY d.department_id ,d.department_name;"

  connection.query(query, function (err, res) {
    if (err) { throw err; }

    else {

      var t = new Table;
      res.forEach(function (product) {
        t.cell('Department _Id', product.department_id);
        t.cell('Department_Name', product.department_name);
        t.cell('Product_sales', product.product_sales);
        t.cell('Over_Head_Cost', product.over_head_cost);
        t.cell('Total_Profit', product.total_profit);


        t.newRow();
      })

      console.log(t.toString());
      // Log all results of the SELECT statement
      // for (var i = 0; i < res.length; i++) {
      //   console.log("\nDepartment _Id : " + res[i].department_id);
      //   console.log("Department_Name : " + res[i].department_name);
      //   console.log("Product_sales : " + res[i].product_sales);
      //   console.log("Over_Head_Cost : " + res[i].over_head_cost);
      //   console.log("Total_Profit: " + res[i].total_profit + "\n");

      // }

    }
    showMenu();
  });

}

function createNewDept() {
  inquirer
    .prompt([
      {
        name: "dept_name",
        type: "input",
        message: "What department would you like to create ? "
      },
      {
        name: "o_h_cost",
        type: "input",
        message: "What is the Over Head Cost ? ",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      //adding a new department
      connection.query(
        "INSERT INTO departments SET ?",
        {
          department_name: answer.dept_name,
          over_head_cost: answer.o_h_cost
        },
        function (err) {
          if (err) { throw err; } else {
            console.log("Your department is added !");
          }

        }

      );
      viewProductSaleByDept();
      showMenu();
    });

}
