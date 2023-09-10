const submitSignUpForm = () => {
  const name = document.querySelector("#name-text-box").value;
  const password = document.querySelector("#password-text-box").value;
  const users = JSON.parse(localStorage.getItem("users"));

  if (name in users) return alert("Username Already Exists");

  users[name] = password.toString();
  localStorage.setItem("users", JSON.stringify(users));
  location.assign("../pages/expenses.html");
};

const main = () => {
  const signUpForm = document.querySelector("#sign-up-form");

  signUpForm.onsubmit = event => {
    event.preventDefault();

    submitSignUpForm();
  };
};

window.onload = main;
