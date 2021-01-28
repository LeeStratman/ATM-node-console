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
  console.log("1: Balance");
  console.log("2: Withdraw");
  console.log("3: Deposit");
  console.log("4: Exit");

  let action = prompt("Please select an option above.");
  let amount = 0;
  switch (action.toLowerCase().trim()) {
    case "1":
      console.log(atm.getBalance());
      break;
    case "2":
      amount = prompt("Enter amount to Withdraw?");
      atm.withdraw(amount);
      break;
    case "3":
      console.log("Deposit");
      break;
    case "4":
      console.log("Exit");
      return;
    default:
      userMenu();
  }
}

app();
