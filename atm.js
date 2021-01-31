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
    account.history.push({ type: "withdraw", amount: formatCurrency(amount) });
    return true;
  }

  return false;
}

function deposit(amount) {
  amount = parseFloat(amount);
  account.balance += amount;
  wallet.balance -= amount;
  account.history.push({ type: "deposit", amount: formatCurrency(amount) });

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

function getHistory() {
  return account.history;
}

module.exports = {
  getBalance,
  withdraw,
  deposit,
  validatePin,
  currency,
  getHistory,
};
