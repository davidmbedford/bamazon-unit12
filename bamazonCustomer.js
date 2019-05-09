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
let query = "SELECT id, product_name, price, stock_quantity  FROM products";
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
        console.log(response.item);
        console.log(response.quantity);
        let inStock = res[response.item - 1].stock_quantity;
        console.log(inStock);
        let price = res[response.item - 1].price;
        console.log(price);

        if (response.quantity > inStock) {
          console.log("Insuffecient quantity! We only have " + inStock + " in stock. Sorry for the inconvenience, please try again!");
          console.log('\n===================\n');
          beginApp();
        }
        else if (inStock >= response.quantity) {
          console.log("The total cost of your purchase is " + (price * response.quantity));
          console.log('\n===================\n');
          beginApp();
        }
      });
    })
  }
