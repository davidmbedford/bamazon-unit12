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
    beginManager();
    });

  const viewInventory = function () {
    console.log('\n=========================================');
    console.log('This viewInventory is working!');
    console.log('=========================================\n');

    let query = "SELECT id, product_name, price, stock_quantity FROM products";
    connection.query(query, function(err, res) {
      console.log('\n=========================================');
      for (var i = 0; i < res.length; i++) {
        console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Price: " + res[i].price + " || In-Stock: " + res[i].stock_quantity);
      };
      console.log('=========================================\n');
    })
  };

  const viewLowInventory = function () {
    console.log('\n=========================================');
    console.log('This viewLow  is working!');
    console.log('=========================================\n');
    //beginManager();
  };

  const addInventory = function () {
    console.log('\n=========================================');
    console.log('This addInventory is working!');
    console.log('=========================================\n');
    //beginManager();
  };

  const addProduct = function () {
    console.log('\n=========================================');
    console.log('This addProduct is working!');
    console.log('=========================================\n');
    //beginManager();
  };
}
