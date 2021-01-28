const account = require("./account");

function getBalance() {
  return formatCurrency(account.balance);
}

function withdraw(amount) {
  account.balance -= Number(amount);
  console.log("New balance: ", formatCurrency(account.balance));
}

function deposit(amount) {
  account.balance += Number(amount);
  console.log("New balance: ", formatCurrency(account.balance));
}

function validatePin(pin) {
  return account.pin === pin;
}

function formatCurrency(amount) {
  return `${account.currency}${amount.toFixed(2)}`;
}

module.exports = {
  getBalance,
  withdraw,
  deposit,
  validatePin,
};
