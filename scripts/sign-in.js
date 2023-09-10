const submitSignInForm = () => {
  const name = document.querySelector("#name-text-box").value;
  const password = document.querySelector("#password-text-box").value;
  const users = JSON.parse(localStorage.getItem("users"));

  if (users[name] != password) return alert("Bad Credentials");

  localStorage.setItem("name", name);
  window.location.assign("./expenses.html");
};

const main = () => {
  const signInForm = document.querySelector("#sign-in-form");

  signInForm.onsubmit = event => {
    event.preventDefault();

    submitSignInForm();
  };
};

window.onload = main;
