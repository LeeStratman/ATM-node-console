"use strict";

const atm = require("./atm");
const prompt = require("prompt-sync")();

function app() {
  promptFor("Please enter your PIN: ", atm.validatePin, { echo: "*" });

  return userMenu();
}

function userMenu() {
  displayMainMenu();

  let action = prompt("Please select an option above. ");

  switch (action.toString().trim()) {
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
      break;
    default:
      return userMenu();
  }

  return userMenu();
}

function displayMainMenu() {
  console.log("1: Balance");
  console.log("2: Withdraw");
  console.log("3: Deposit");
  console.log("4: Exit");
}

function withdraw() {
  let amount = promptFor(
    `Enter amount to withdraw: ${atm.currency}`,
    isValidAmount
  );

  if (atm.withdraw(amount)) {
    receipt();
  } else {
    displayError("INSUFFICIENT FUNDS.");
  }
}

function deposit() {
  let amount = promptFor(
    `Enter amount to deposit: ${atm.currency}`,
    isValidAmount
  );

  if (atm.deposit(amount)) {
    receipt();
  } else {
    displayError("DEPOSIT UNSUCCESSFUL");
  }
}

function receipt() {
  console.log("1: Yes");
  console.log("2: No");
  let receipt = promptFor("Do you want a receipt? ", yesNo);

  if (receipt.trim() == "1") {
    displayReceipt();
  }
}

function displayBalance() {
  console.log("Available Balance: ", atm.getBalance());
}

function displayReceipt() {
  let [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
  let [hour, minute, second] = new Date()
    .toLocaleTimeString("en-US")
    .split(/:| /);
  console.log("");
  console.log("##############################");
  console.log("Common Cents Bank Receipt");
  console.log("Date:", `${month}/${date}/${year}`);
  console.log("Time:", `${hour}:${minute}`);
  console.log("");
  displayBalance();
  console.log("##############################");
  console.log("");
}

function displayError(message) {
  console.log("Error: ", message);
}

function promptFor(question, valid, options = {}) {
  do {
    var response = prompt(question, options);
  } while (!response || !valid(response));
  return response;
}

function yesNo(input) {
  input = input.trim();
  return input === "1" || input === "2";
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
  let decimals = String(input).split(".");

  return decimals.length == 1 || decimals[1].length == decimalPlaces;
}

function sanitizeInput(input) {
  return String(input).toLowerCase().trim();
}

function exit() {
  console.log("Have a great day!");
}

app();
