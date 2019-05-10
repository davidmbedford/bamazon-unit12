const inquirer = require('inquirer');
const mysql = require('mysql');

let inStock = "";

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
