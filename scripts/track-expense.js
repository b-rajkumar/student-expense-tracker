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
};

const setupCategory = () => {
  const categorySelector = document.querySelector("#categories");
  categorySelector.addEventListener("change", () => {
    displayCategoryName(categorySelector.value);
  });
};

const main = () => {
  const user = localStorage.getItem("name");
  if (!user) return location.assign("./sign-in.html");
  setupSignOutButton();
  setupCategory();
};

window.onload = main;
