"use strict";

const account = require("./account");
const wallet = require("./wallet");
const currency = "$";

function getBalance() {
  return formatCurrency(account.balance);
}

function withdraw(amount) {
  amount = parseFloat(amount);

  if (haveSufficientFunds(amount)) {
    account.balance -= amount;
    wallet.balance += amount;

    return true;
  }

  return false;
}

function deposit(amount) {
  account.balance += parseFloat(amount);
  wallet.balance -= parseFloat(amount);

  return true;
}

function validatePin(pin) {
  return account.pin === pin;
}

function haveSufficientFunds(amount) {
  return account.balance >= amount;
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
