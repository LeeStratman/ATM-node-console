"use strict";

const account = require("./account");
const wallet = require("./wallet");

function getBalance() {
  return account.balance;
}

function withdraw(amount) {
  if (haveSufficientFunds(amount)) {
    account.balance -= amount;
    wallet.balance += amount;

    return true;
  }

  return false;
}

function deposit(amount) {
  account.balance += amount;
  wallet.balance -= amount;

  return true;
}

function validatePin(pin) {
  return account.pin === pin;
}

function haveSufficientFunds(amount) {
  return account.balance >= amount;
}

module.exports = {
  getBalance,
  withdraw,
  deposit,
  validatePin,
};
