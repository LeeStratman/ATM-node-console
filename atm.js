const account = require("./account");
const wallet = require("./wallet");
const currency = "$";

function getBalance() {
  return formatCurrency(account.balance);
}

function withdraw(amount) {
  account.balance -= parseFloat(amount);
  wallet.balance += parseFloat(amount);
  console.log("Wallet: ", wallet.balance);
  return getBalance();
}

function deposit(amount) {
  account.balance += parseFloat(amount);
  wallet.balance -= parseFloat(amount);

  return getBalance();
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
