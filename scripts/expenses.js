const signOutUser = () => {
  alert("hello");
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

const greetUser = () => {
  const username = localStorage.getItem("name");
  const greetMsgContainer = document.querySelector("#greet-msg");
  greetMsgContainer.innerText = `Hello ${toCaptialize(username)}`;
};

const main = () => {
  const user = localStorage.getItem("name");
  if (!user) return location.assign("./sign-in.html");
  setupSignOutButton();
  greetUser();
};

window.onload = main;
