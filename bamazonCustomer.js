const inquirer = require('inquirer');
const mysql = require('mysql');

//list inventory on init: id, name, price

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Zancha7edd",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Hello! Its working.");
  beginApp();
});

function beginApp() {
let query = "SELECT id, product_name, price FROM products";
console.log(query);
  connection.query(query, function(err, res) {
    console.log(res);
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Price: " + res[i].price);
      };
    })
  }


// inquirer
//   .prompt ([

//     {
//       //ask what they want
//     },
//     {
//       //ask how many they want
//     }
//   ])
//   .then(function(response) {
//     //if (enough)
//     //// buy
//     // else
//     //// insuffecient quantity
//     //////try again

//   })
