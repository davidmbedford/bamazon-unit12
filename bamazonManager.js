const inquirer = require('inquirer');
const mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: 'Zancha7edd',
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Hello! Welcome to Bamazon');
  console.log('\n===================\n');
  beginManager();
});

function beginManager() {
inquirer
  .prompt([

    {
      type: 'list',
      message: 'Would you like to ... ?',
      choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
      name: 'command'
    }

  ])
  .then(function(response) {
    let command = response.command;

    if (command === 'View Products for Sale') {
      viewInventory();
    } else if (command === 'View Low Inventory') {
      viewLowInventory();
    } else if (command === 'Add to Inventory') {
      addInventory();
    } else if (command === 'Add New Product') {
      addProduct();
    }
    });
  };

  const viewInventory = function () {
    console.log('\n=========================================');
    console.log('Here is what you have in stock!');
    console.log('=========================================\n');

    let query = "SELECT id, product_name, price, department_name, stock_quantity FROM products";
    connection.query(query, function(err, res) {
      console.log('\n=========================================');
      for (var i = 0; i < res.length; i++) {
        console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Dept Name: " + res[i].department_name + " || Price: " + res[i].price + " || In-Stock: " + res[i].stock_quantity);
      };
      console.log('=========================================\n');

      beginManager();
    })
  };

  const viewLowInventory = function () {
    console.log('\n=========================================');
    console.log('Here is what you are running low on! Everything listed has a stock quantity at or below 5 units.');
    console.log('=========================================\n');

    let query = "SELECT id, product_name, price, department_name, stock_quantity FROM products";
    connection.query(query, function(err, res) {
      console.log('\n=========================================');
      for (var i = 0; i < res.length; i++) {
        if (res[i].stock_quantity <= 5) {
          console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Dept Name: " + res[i].department_name + " || Price: " + res[i].price + " || In-Stock: " + res[i].stock_quantity);
        }
      };
      console.log('=========================================\n');

      beginManager();
    })
  };

  const addInventory = function () {
    console.log('\n=========================================');
    console.log('Seems like you got a new shipment!');
    console.log('=========================================\n');

    let query = "SELECT id, product_name, department_name, price, stock_quantity FROM products";
    connection.query(query, function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Dept Name: " + res[i].department_name + " || Price: " + res[i].price + " || In-Stock: " + res[i].stock_quantity);
        };

      console.log('\n===================\n');

    inquirer
    .prompt ([
      {
        name: "item",
        type: "input",
        message: "What item would you like to stock up on? Enter ID number: "
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to add?"
      }
    ])
    .then(function(response) {
      product = response.item;
      userAmt = response.quantity;
      inStock = res[product - 1].stock_quantity;

      function updateQuantity() {
          let newAmt = (parseInt(inStock) + parseInt(userAmt));
          let update = "UPDATE products SET stock_quantity = " + newAmt + " WHERE id = " + (product);
          connection.query(update, function(err, res) {
            console.log(newAmt + " left in stock")
            });
          console.log('=========================================\n');
        };

      updateQuantity();
      beginManager();

      });

    });
  };


  const addProduct = function () {
    console.log('\n=========================================');
    console.log('Whats new in stock, doc?');
    console.log('=========================================\n');

    inquirer
    .prompt ([
      {
        name: "productName",
        type: "input",
        message: "What item would you like to add to inventory? Enter product name: "
      },
      {
        name: "departmentName",
        type: "input",
        message: "Where should this product be added? Enter department name: "
      },
      {
        name: "price",
        type: "input",
        message: "What is the price of this product? Enter price: "
      },
      {
        name: "stockQuantity",
        type: "input",
        message: "How many would you like to add? Enter stock quantity: "
      }
    ])
    .then(function(response) {
      console.log(response.productName);
      console.log(response.departmentName);
      console.log(response.price);
      console.log(response.stockQuantity);

      let query = connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: response.productName,
          department_name: response.departmentName,
          price: response.price,
          stock_quantity: response.stockQuantity
        },
        function(err, res) {
          console.log(res.affectedRows + " product inserted!\n");
          // Call updateProduct AFTER the INSERT completes
          beginManager();
        });
      })

  };
