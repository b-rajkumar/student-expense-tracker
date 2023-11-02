const getCookies = () => {
  const cookies = document.cookie.split("; ").map(cookie => cookie.split("="));
  return Object.fromEntries(cookies);
};

const fetchAddExpensePage = () => {
  const category = document.querySelector("#categories").value;
  location.assign(`/pages/add-expense/${category}`);
};

const createMessageElement = name => {
  const messageElement = document.createElement("span");
  messageElement.innerText = `👤 ${name}`;

  return messageElement;
};

const showUserName = name => {
  const authSection = document.querySelector("#auth-section");
  const messageElement = createMessageElement(name);

  authSection.prepend(messageElement);
};

const addListeners = () => {
  const addExpenseBtn = document.querySelector("#add-expense-btn");
  addExpenseBtn.onclick = () => fetchAddExpensePage();
};

const fetchExpenses = (category, from, to) => {
  fetch(`/expenses/${category}`)
    .then(res => res.json())
    .then(expensesDetails => render(expensesDetails, from, to));
};

const validateUsername = () => {
  fetch("/validate-username")
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(({ name }) => showUserName(name));
};

const toCaptialize = text => {
  const head = text[0];
  const tail = text.slice(1);

  return `${head.toUpperCase()}${tail.toLowerCase()}`;
};

const displayCategoryName = name => {
  const categoryName = toCaptialize(name);
  const categoryHeaderContainer = document.querySelector("#category-header");
  categoryHeaderContainer.innerText = `${categoryName} Expenses`;
  document.querySelector("#expense-section").style.display = "flex";
};

const setupSelectors = () => {
  const categorySelector = document.querySelector("#categories");
  const from = document.querySelector("#from");
  const to = document.querySelector("#to");

  categorySelector.addEventListener("change", () => {
    displayCategoryName(categorySelector.value);
    fetchExpenses(categorySelector.value, from.value, to.value);
  });

  from.addEventListener("change", () =>
    fetchExpenses(categorySelector.value, from.value, to.value)
  );

  to.addEventListener("change", () =>
    fetchExpenses(categorySelector.value, from.value, to.value)
  );
};

const getCategoryDetails = details => {
  const categoryExpenses = {};
  for (const expense of details) {
    let total = categoryExpenses[expense.category] || 0;
    total += expense.amount;
    categoryExpenses[expense.category] = total;
  }

  return categoryExpenses;
};

const setupRepresentButton = () => {
  const from = document.querySelector("#from");
  const to = document.querySelector("#to");
  const representButton = document.querySelector("#represent-btn");
  representButton.onclick = () => {
    const popup = document.querySelector(".popup");
    popup.classList.remove("hide");
    popup.onclick = e => {
      if (e.target === popup) {
        popup.classList.add("hide");
      }
    };
    fetch("/expenses")
      .then(res => res.json())
      .then(details => {
        const fromDateValue = new Date(from.value).valueOf();
        const toDateValue = new Date(to.value).valueOf();
        const expenses = details.filter(({ date }) => {
          const expenseDate = new Date(date);
          const expenseDateValue = expenseDate.valueOf();
          return (
            expenseDateValue >= fromDateValue && expenseDateValue <= toDateValue
          );
        });
        renderPieChart(getCategoryDetails(expenses));
      });
  };
};

// eslint-disable-next-line max-statements
const main = () => {
  addListeners();
  validateUsername();
  setupSelectors();
  const [to] = new Date().toISOString().split("T");
  const [from] = new Date(new Date().valueOf() - 604800000)
    .toISOString()
    .split("T");

  const fromElement = document.querySelector("#from");
  const toElement = document.querySelector("#to");
  fromElement.value = from;
  toElement.value = to;

  const categorySelector = document.querySelector("#categories");
  const cookies = getCookies();
  if (cookies.category) {
    categorySelector.value = cookies.category;
    displayCategoryName(categorySelector.value);
    fetchExpenses(categorySelector.value, from, to);
  }
  setupRepresentButton();
};

window.onload = main;
