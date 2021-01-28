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
  return `${currency}${amount.toFixed(2)}`;
}

module.exports = {
  getBalance,
  withdraw,
  deposit,
  validatePin,
  currency,
};
