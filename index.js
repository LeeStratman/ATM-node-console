"use strict";

const atm = require("./atm");
const prompt = require("prompt-sync")();
const { printReceipt } = require("./receipt");
const history = [];
const currency = "$";

function app() {
  promptFor("Please enter your PIN: ", atm.validatePin, { echo: "*" });

  return mainMenu();
}

function mainMenu() {
  displayMainMenuOptions();

  let action = prompt("Please select an option above. ");

  switch (sanitizeInput(action)) {
    case "1":
      displayBalance();
      break;
    case "2":
      withdraw();
      break;
    case "3":
      deposit();
      break;
    case "4":
      return exit();
    default:
      return mainMenu();
  }

  return mainMenu();
}

function displayMainMenuOptions() {
  console.log("1: Balance");
  console.log("2: Withdraw");
  console.log("3: Deposit");
  console.log("4: Exit");
}

function withdraw() {
  let amount = promptFor(
    `Enter amount to withdraw: ${currency}`,
    isValidAmount
  );

  amount = convertToFloat(amount);

  if (atm.withdraw(amount)) {
    history.push({ type: "withdraw", amount: formatCurrency(amount) });
    receipt();
  } else {
    displayError("Insufficient Funds");
  }
}

function deposit() {
  let amount = promptFor(`Enter amount to deposit: ${currency}`, isValidAmount);

  amount = convertToFloat(amount);

  if (atm.deposit(amount)) {
    history.push({ type: "deposit", amount: formatCurrency(amount) });
    receipt();
  } else {
    displayError("Deposit Unsuccessful");
  }
}

function receipt() {
  console.log("1: Yes");
  console.log("2: No");
  let receipt = promptFor("Do you want a receipt? ", yesNo);

  if (receipt == "1") {
    printReceipt(displayBalance, displayTransactions);
  }
}

function displayBalance() {
  console.log("Available Balance: ", formatCurrency(atm.getBalance()));
}

function displayTransactions() {
  history.map((transaction) =>
    console.log(`${capitalize(transaction.type)}: ${transaction.amount}`)
  );
  console.log("");
}

function displayError(message) {
  console.log("Error: ", message);
}

function promptFor(question, valid, options = {}) {
  do {
    var response;
    try {
      response = sanitizeInput(prompt(question, options));
    } catch {
      response = "";
    }
  } while (!response || !valid(response));
  return response;
}

function yesNo(input) {
  if (input === "1" || input === "2") {
    return true;
  }

  displayError("Invalid option. Please enter '1' for yes or '2' for no.");
  return false;
}

function isValidAmount(input) {
  let float = parseFloat(input);

  if (!isNaN(float) && float > 0 && hasTwoDecimals(input, 2)) {
    return true;
  }

  displayError("Invalid amount. Please try again.");
  return false;
}

function hasTwoDecimals(input, decimalPlaces) {
  let decimals = input.split(".");

  return decimals.length == 1 || decimals[1].length == decimalPlaces;
}

function sanitizeInput(input) {
  return String(input).toLowerCase().trim();
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function exit() {
  console.log("Have a great day!");
}

function convertToFloat(input) {
  return parseFloat(input);
}

function formatCurrency(amount) {
  let sign = "";
  if (amount < 0) {
    sign = "-";
    amount = Math.abs(amount);
  }
  return `${sign}${currency}${amount.toFixed(2)}`;
}

app();
