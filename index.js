const atm = require("./atm");
const prompt = require("prompt-sync")();

function app() {
  var pin = requestPIN();

  while (!atm.validatePin(pin)) {
    pin = requestPIN();
  }

  return userMenu();
}

function requestPIN() {
  return prompt("Please enter your PIN: ", { echo: "*" });
}

function userMenu() {
  console.log("1: Balance");
  console.log("2: Withdraw");
  console.log("3: Deposit");
  console.log("4: Exit");

  let action = prompt("Please select an option above. ");
  let amount = 0;
  let exit = false;

  switch (action.toLowerCase().trim()) {
    case "1":
      console.log(atm.getBalance());
      break;
    case "2":
      amount = prompt("Enter amount to withdraw: ");
      atm.withdraw(amount);
      break;
    case "3":
      amount = prompt("Enter amount to deposit: ");
      atm.deposit(amount);
      break;
    case "4":
      exit = true;
      break;
    case "exit":
      exit = true;
      break;
    default:
      userMenu();
  }

  if (!exit) {
    userMenu();
  }
}

app();
