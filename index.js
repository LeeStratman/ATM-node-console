const atm = require("./atm");
const prompt = require("prompt-sync")();

function app() {
  do {
    var pin = requestPIN();
  } while (!atm.validatePin(pin));

  return userMenu();
}

function requestPIN() {
  return prompt("Please enter your PIN: ", { echo: "*" });
}

function userMenu() {
  displayMainMenu();

  let action = prompt("Please select an option above. ");
  let amount = 0;

  switch (action.toLowerCase().trim()) {
    case "1":
      console.log(atm.getBalance());
      break;
    case "2":
      amount = promptFor(
        `Enter amount to withdraw: ${atm.currency}`,
        isValidAmount
      );
      atm.withdraw(amount);
      break;
    case "3":
      amount = promptFor(
        `Enter amount to deposit: ${atm.currency}`,
        isValidAmount
      );
      atm.deposit(amount);
      break;
    case "4":
      return;
      break;
    case "exit":
      return;
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

function promptFor(question, valid) {
  do {
    var response = prompt(question);
  } while (!response || !valid(response));
  return response;
}

function isValidAmount(input) {
  let float = parseFloat(input);
  return !isNaN(float) && float > 0 && isFixed(input, 2);
}

function isFixed(input, decimalPlaces) {
  let decimals = String(input).split(".");

  if (
    decimals.length === 1 ||
    (decimals.length > 1 && decimals[1].length <= decimalPlaces)
  ) {
    return true;
  }

  return false;
}

app();
