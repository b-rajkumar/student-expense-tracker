const signOutUser = () => {
  localStorage.removeItem("name");
  location.assign("../index.html");
};

const setupSignOutButton = () => {
  const signOutButton = document.querySelector("#sign-out-btn");
  signOutButton.onclick = signOutUser;
};

const main = () => {
  const user = localStorage.getItem("name");
  if (!user) return location.assign("./sign-in.html");
  setupSignOutButton();
};

window.onload = main;
