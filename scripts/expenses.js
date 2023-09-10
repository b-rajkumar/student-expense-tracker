const signOutUser = () => {
  localStorage.removeItem("name");
  location.assign("../index.html");
};

const setupSignOutButton = () => {
  const signOutButton = document.querySelector(".auth-link");
  signOutButton.onclick = signOutUser;
};

const main = () => {
  const user = localStorage.getItem("name");
  if (!user) return location.assign("./sign-in.html");
  setupSignOutButton();
};

window.onload = main;
