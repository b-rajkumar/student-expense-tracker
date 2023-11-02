class Expenses {
  #expenses;

  constructor(expenses = []) {
    this.#expenses = expenses;
  }

  add(expense) {
    this.#expenses.push(expense);
  }

  #calculateTotalExpense(details) {
    return details.reduce((totalExpense, expense) => {
      return totalExpense + expense.amount;
    }, 0);
  }

  getDetails(name, category) {
    const userExpenses = this.#expenses.filter(
      expense =>
        expense.details.username === name &&
        expense.details.category === category
    );

    const details = userExpenses.map(expense => expense.details);
    const totalExpense = this.#calculateTotalExpense(details);

    return { details, totalExpense };
  }

  getCategoryDetails(name) {
    const userExpenses = this.#expenses.filter(
      expense => expense.details.username === name
    );
    const details = userExpenses.map(expense => expense.details);

    return details;
  }

  modifyExpense(name, id, amount) {
    try {
      const userExpenses = this.#expenses.filter(
        expense => expense.details.username === name
      );
      const expense = userExpenses.find(expense => expense.details.id === id);
      expense.modifyExpense(amount);
    } catch (e) {
      console.error(e.message);
    }
  }

  get allDetails() {
    return this.#expenses.map(expense => expense.details);
  }
}

module.exports = Expenses;
