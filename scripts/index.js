const signOutUser = () => {
  localStorage.removeItem("name");
  window.location.reload();
};

const createSignOutElement = () => {
  const signOutElement = document.createElement("li");
  const anchor = document.createElement("a");

  anchor.innerText = "Sign Out";
  anchor.classList.add("auth-link");
  signOutElement.append(anchor);
  anchor.onclick = signOutUser;

  return signOutElement;
};

const createMessageElement = name => {
  const messageElement = document.createElement("li");
  messageElement.innerText = `Welcome ${name}`;

  return messageElement;
};

const showUserName = name => {
  const authSection = document.querySelector("#auth-section");
  authSection.replaceChildren();

  const messageElement = createMessageElement(name);
  const signOutElement = createSignOutElement();

  authSection.append(messageElement, signOutElement);
};

const main = () => {
  const name = localStorage.getItem("name");
  if (name !== null) showUserName(name);
};

window.onload = main;
