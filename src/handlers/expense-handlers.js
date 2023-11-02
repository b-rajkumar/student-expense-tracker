const Expense = require("../models/expense");

const sendExpenseAdded = (req, res, expenseId, totalExpense) => {
  res.status(201).json({ expenseId, totalExpense });
};

const handleAddExpense = (req, res) => {
  const { expenses, idGenerator, dataStorage } = req.app;
  const { title, amount, date, category } = req.body;
  const { name } = req.cookies;

  const expenseId = idGenerator.generateExpenseId();

  const expense = new Expense(category, title, amount, date, expenseId, name);
  expenses.add(expense);

  const { totalExpense } = expenses.getDetails(name);
  dataStorage.storeExpenses(expenses.allDetails, () =>
    sendExpenseAdded(req, res, expenseId, totalExpense)
  );
};

const handleGetExpenses = (req, res) => {
  const { expenses } = req.app;
  const { name } = req.cookies;
  const category = req.params.category;

  res.json(expenses.getDetails(name, category));
};

const handleGetAllExpenses = (req, res) => {
  const { expenses } = req.app;
  const { name } = req.cookies;

  res.json(expenses.getCategoryDetails(name));
};

const serveAddExpensePage = (req, res) => {
  res.cookie("category", req.params.category);
  res.sendFile(process.env.PWD + "/private/pages/add-expense.html");
};

const handleModifyExpense = (req, res) => {
  const { expenses } = req.app;
  const { name } = req.cookies;
  const { id, amount } = req.body;
  expenses.modifyExpense(name, id, amount);

  res.sendStatus(200);
};

module.exports = {
  handleAddExpense,
  handleGetExpenses,
  serveAddExpensePage,
  handleGetAllExpenses,
  handleModifyExpense,
};
