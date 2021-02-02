"use strict";

function printReceipt(balance, transactions = () => {}) {
  console.log("");
  console.log("##############################");
  console.log("Common Cents Bank Receipt");
  console.log("Date:", getDate());
  console.log("Time:", getTime());
  console.log("");
  transactions();
  balance();
  console.log("##############################");
  console.log("");
}

function getDate() {
  let [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
  return `${month}/${date}/${year}`;
}

function getTime() {
  let [hour, minute] = new Date().toLocaleTimeString("en-US").split(/:| /);
  return `${hour}:${minute}`;
}

module.exports.printReceipt = printReceipt;
