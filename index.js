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
      displayBalance();
      break;
    case "2":
      withdraw();
      break;
    case "3":
      deposit();
      break;
    case "4":
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

function withdraw() {
  amount = promptFor(
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
  amount = promptFor(`Enter amount to deposit: ${atm.currency}`, isValidAmount);

  if (atm.deposit(amount)) {
    receipt();
  } else {
    displayError("DEPOSIT UNSUCCESSFUL");
  }
}

function receipt() {
  console.log("1: Yes");
  console.log("2: No");
  let receipt = promptFor("Would you like a receipt? ", yesNo);

  if (receipt.trim() == "1") {
    displayReceipt();
  }
}

function displayBalance(amount) {
  console.log("Balance: ", atm.getBalance());
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
  console.log("Available Balance:", atm.getBalance());
  console.log("##############################");
  console.log("");
}

function displayError(message) {
  console.log("Error: ", message);
}

function promptFor(question, valid) {
  do {
    var response = prompt(question);
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

  if (decimals.length == 1 || decimals[1].length == decimalPlaces) {
    return true;
  }

  return false;
}

app();
