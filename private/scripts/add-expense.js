const getCookies = () => {
  const cookies = document.cookie.split("; ").map(cookie => cookie.split("="));
  return Object.fromEntries(cookies);
};

const addBackBtnListener = () => {
  const backBtn = document.querySelector("#back-btn");
  backBtn.onclick = () => location.replace("/pages/expenses.html");
};

const postExpense = () => {
  const title = document.querySelector("#expense-title-text-box").value;
  const amount = document.querySelector("#expense-amount-text-box").value;
  const date = document.querySelector("#expense-date-text-box").value;
  const cookies = getCookies();
  if (!cookies.category) {
    location.replace("/pages/expenses.html");
    return;
  }

  const request = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      title,
      amount: parseInt(amount),
      date,
      category: cookies.category,
    }),
  };

  fetch("/expenses", request).then(res => {
    if (res.status === 201) {
      location.replace("/pages/expenses.html");
      return;
    }

    alert("Server Error");
  });
};

const toCaptialize = text => {
  return text[0].toUpperCase() + text.slice(1);
};

const main = () => {
  const form = document.querySelector("#add-expense-form");
  const category = document.querySelector("#category");
  const cookies = getCookies();
  category.innerText = toCaptialize(cookies.category);

  addBackBtnListener();

  form.onsubmit = event => {
    event.preventDefault();
    postExpense();
  };
};
window.onload = main;
