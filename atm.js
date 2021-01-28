const account = require("./account");

const currency = "$";

function getBalance() {
  return formatCurrency(account.balance);
}

function withdraw(amount) {
  account.balance -= parseFloat(amount);
  console.log("New balance: ", formatCurrency(account.balance));
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
  }
  return `${sign}${currency}${Math.abs(amount.toFixed(2))}`;
}

module.exports = {
  getBalance,
  withdraw,
  deposit,
  validatePin,
  currency,
};
