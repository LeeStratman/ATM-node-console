const account = require("./account");

function getBalance() {
  return account.balance;
}

function withdraw() {}

function deposit() {}

function validatePin(pin) {
  return account.pin === pin;
}

module.exports = {
  getBalance,
  withdraw,
  deposit,
  validatePin,
};