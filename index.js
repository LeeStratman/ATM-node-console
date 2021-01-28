const atm = require("./atm");
const prompt = require("prompt-sync")();

function app() {
  var pin = requestPIN();

  while (!atm.validatePin(pin)) {
    pin = requestPIN();
  }

  userMenu();
}

function requestPIN() {
  return prompt("Please enter your PIN: ", { echo: "*" });
}

function userMenu() {
  console.log("Main Menu");
}

app();
