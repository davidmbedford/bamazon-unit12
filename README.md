# bamazon-unit12
This app uses a CLI to provide a stripped-down online storefront. (The app relies on MySQL, Node.Js, and Javascript).

### What it does
This app has two components:
1. Bamazon Customer
* This component is for users interested in purchasing items through the application. Upon start, they will be displayed with a full stock list and asked what they would like to buy, and how much.
* items purchased will be deducted from the inventory. If there is insufficient stock, the customer will be notified.
2. Bamazon Manager
* This component is for company managers. Upon start, they will be given for options.
1. The option to view all products
2. The option if you all low inventory.
3. The option to add products to inventory.
4. 
  
##### How it works
This app uses Node.js technology to run in the command line. For my project - and all others - I use Git Bash as my CLI.

The project uses javascript and several node packages, including:
* MySql
* Inquirer
