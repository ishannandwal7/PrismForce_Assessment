const fs = require("fs");

function generateBalanceSheet(inputData) {
  const data = JSON.parse(inputData);
  const expense = data.expenseData;
  const revenue = data.revenueData;

  const balanceSheet = {};

  expense.forEach((expense) => {
    const date = new Date(expense.startDate);
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!balanceSheet[monthYear]) {
      balanceSheet[monthYear] = {
        amount: 0,
        startDate: `${date.getFullYear()}-${date.getMonth() + 1}-01T00:00:00.000Z`,
      };
    }

    balanceSheet[monthYear].amount -= expense.amount;
  });

  revenue.forEach((revenue) => {
    const date = new Date(revenue.startDate);
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!balanceSheet[monthYear]) {
      balanceSheet[monthYear] = {
        amount: 0,
        startDate: `${date.getFullYear()}-${date.getMonth() + 1}-01T00:00:00.000Z`,
      };
    }

    balanceSheet[monthYear].amount += revenue.amount;
  });

  const earliestMonth = new Date(Object.keys(balanceSheet).sort()[0]);
  const latestMonth = new Date(Object.keys(balanceSheet).sort().reverse()[0]);

  const currentDate = new Date(earliestMonth);
  currentDate.setDate(1);
  currentDate.setMonth(currentDate.getMonth() + 1);

  while (currentDate <= latestMonth) {
    const monthYear = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`;
    if (!balanceSheet[monthYear]) {
      balanceSheet[monthYear] = {
        amount: 0,
        startDate: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-01T00:00:00.000Z`,
      };
    }
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  const balanceSheetArray = Object.values(balanceSheet).sort((a, b) =>
    a.startDate.localeCompare(b.startDate)
  );

  const output = {
    balance: balanceSheetArray,
  };

  return JSON.stringify(output, null, 2);
}


//TESSTing for Sample DAta
let inputFile = '1-input.json';
let input = fs.readFileSync(inputFile);
let balanceSheet = generateBalanceSheet(input);
console.log(balanceSheet);

inputFile = '2-input.json';
input = fs.readFileSync(inputFile);
balanceSheet = generateBalanceSheet(input);
console.log(balanceSheet);
