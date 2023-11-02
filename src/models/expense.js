class Expense {
  #title;
  #amount;
  #date;
  #id;
  #username;
  #category;

  constructor(category, title, amount, date, id, username) {
    this.#title = title;
    this.#amount = amount;
    this.#date = date;
    this.#id = id;
    this.#username = username;
    this.#category = category;
  }

  modifyExpense(amount) {
    this.#amount = amount;
  }

  get details() {
    return {
      title: this.#title,
      amount: this.#amount,
      date: this.#date,
      id: this.#id,
      username: this.#username,
      category: this.#category,
    };
  }
}

module.exports = Expense;
