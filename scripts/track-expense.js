const signOutUser = () => {
  localStorage.removeItem("name");
  location.assign("../index.html");
};

const toCaptialize = text => {
  const head = text[0];
  const tail = text.slice(1);

  return `${head.toUpperCase()}${tail.toLowerCase()}`;
};

const setupSignOutButton = () => {
  const signOutButton = document.querySelector("#sign-out-btn");
  signOutButton.onclick = signOutUser;
};

const displayCategoryName = name => {
  const categoryName = toCaptialize(name);
  const categoryHeaderContainer = document.querySelector("#category-header");
  categoryHeaderContainer.innerText = `${categoryName} Expenses`;
  document.querySelector("#expense-section").style.display = "flex";
};

const setupCategory = () => {
  const categorySelector = document.querySelector("#categories");
  categorySelector.addEventListener("change", () => {
    displayCategoryName(categorySelector.value);
  });
};

const displayAddExpensePopup = () => {
  const addExpensePopup = document.querySelector("#add-expense-popup-page");

  addExpensePopup.style.display = "flex";
};

const setupAddExpenseButton = () => {
  const addExpenseButton = document.querySelector("#add-expense-btn");

  addExpenseButton.onclick = () => displayAddExpensePopup();
};

const setupExpensePopupPage = () => {
  const addExpensePopup = document.querySelector("#add-expense-popup-page");

  addExpensePopup.onclick = e => {
    if (e.target === addExpensePopup) {
      addExpensePopup.style.display = "none";
    }
  };
};

const main = () => {
  const user = localStorage.getItem("name");
  if (!user) return location.assign("./sign-in.html");

  setupCategory();
  setupSignOutButton();
  setupAddExpenseButton();
  setupExpensePopupPage();
};

window.onload = main;
