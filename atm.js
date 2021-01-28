const account = require("./account");

function getBalance() {
  return formatCurrency(account.balance);
}

function withdraw() {}

function deposit() {}

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
