const addExpenseClass = listItem => {
  listItem.classList.add("expense");
};

const getDateDiff = date => {
  const [year, month, day] = date.split("-");
  const [currentDay, currentMonth, currentYear] = new Date()
    .toLocaleDateString()
    .split("/");

  return (
    new Date(currentYear, +currentMonth - 1, currentDay) -
    new Date(year, +month - 1, day)
  );
};

const generateDateString = date => {
  const dateStringLookUp = {
    86400000: "Yesterday",
    0: "Today",
  };

  const diff = getDateDiff(date);
  return dateStringLookUp[diff] || date;
};

const createDateElement = date => {
  const dateElement = document.createElement("span");
  const dateString = generateDateString(date);

  dateElement.innerText = dateString;

  return dateElement;
};

const createTitleElement = title => {
  const titleElement = document.createElement("span");
  titleElement.innerText = title;

  return titleElement;
};

const createAmountElement = amount => {
  const amountElement = document.createElement("span");
  amountElement.innerText = `${amount}`;
  amountElement.setAttribute("contenteditable", true);

  return amountElement;
};

const createExpenseElement = ({ title, amount, date, id }) => {
  const listItem = document.createElement("li");
  const dateElement = createDateElement(date);
  const titleElement = createTitleElement(title);
  const amountElement = createAmountElement(amount);
  amountElement.addEventListener("focusout", () => {
    const newAmount = +amountElement.innerText;
    if (amount) {
      fetch("/expenses", {
        method: "PATCH",
        body: JSON.stringify({
          id,
          amount: newAmount,
        }),
        headers: {
          "content-type": "application/json",
        },
      }).then(() => {
        location.reload();
      });
    }
  });

  listItem.append(dateElement, titleElement, amountElement);
  addExpenseClass(listItem);
  return listItem;
};

// eslint-disable-next-line no-unused-vars
const render = ({ details }, from, to) => {
  const fromDateValue = new Date(from).valueOf();
  const toDateValue = new Date(to).valueOf();
  const expensesSection = document.querySelector("#expenses");
  expensesSection.innerHTML = "";
  const totalExpenseElement = document.querySelector("#total-expense");
  const filteredExpenses = details.filter(({ date }) => {
    const expenseDate = new Date(date);
    const expenseDateValue = expenseDate.valueOf();
    return expenseDateValue >= fromDateValue && expenseDateValue <= toDateValue;
  });

  const expenseElements = filteredExpenses.map(createExpenseElement);
  const totalExpense = filteredExpenses
    .map(expense => expense.amount)
    .reduce((a, b) => a + b, 0);
  expensesSection.append(...expenseElements);
  totalExpenseElement.innerText = totalExpense;
};
