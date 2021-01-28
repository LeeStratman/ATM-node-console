const account = require("./account");

const currency = "$";

function getBalance() {
  console.log("Your balance: ", formatCurrency(account.balance));
}

function withdraw(amount) {
  account.balance -= parseFloat(amount);
  console.log("New balance:", formatCurrency(account.balance));
}

function deposit(amount) {
  account.balance += parseFloat(amount);
  console.log("New balance: ", formatCurrency(account.balance));
}

function validatePin(pin) {
  return account.pin === pin;
}

function formatCurrency(amount) {
  let sign = "";
  if (amount < 0) {
    sign = "-";
    amount = Math.abs(amount);
  }
  return `${sign}${currency}${amount.toFixed(2)}`;
}

module.exports = {
  getBalance,
  withdraw,
  deposit,
  validatePin,
  currency,
};
