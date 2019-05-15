const inquirer = require('inquirer');
const mysql = require('mysql');

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Zancha7edd",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Hello! Welcome to Bamazon");
  console.log('\n===================\n');
  beginApp();
});

function beginApp() {
  let product = "";
  let userAmt = "";
  let inStock = "";
  let price = "";
  let query = "SELECT id, product_name, price, stock_quantity FROM products";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Price: " + res[i].price + " || In-Stock: " + res[i].stock_quantity);
      };

      console.log('\n===================\n');

      inquirer
      .prompt ([
        {
          name: "item",
          type: "input",
          message: "What item would you like to purchase? Enter the ID number here (only one product at a time): "
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like? "
        }
      ])
      .then(function(response) {
        product = response.item;

        userAmt = response.quantity;

        inStock = res[response.item - 1].stock_quantity;
        price = res[response.item - 1].price;


        if (userAmt > inStock) {
          console.log("Insuffecient quantity! We only have " + inStock + " in stock. Sorry for the inconvenience, please try again!");
          console.log('\n===================\n');
        }
        else if (inStock >= userAmt) {
          console.log("The total cost of your purchase is $" + (price * userAmt));
          console.log('\n===================\n');
          function newPurchase() {
            let newAmt = inStock - userAmt;
            let update = "UPDATE products SET stock_quantity = " + newAmt + " WHERE id = " + (product);
            connection.query(update, function(err, res) {
              console.log(newAmt + " left in stock");
            })
          }
          newPurchase();
        }

        beginApp();
      });
    })
  }
