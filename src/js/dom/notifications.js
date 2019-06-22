const alertContainer = document.querySelector("#alert");
const alertMessage = document.querySelector("#alert-message");
const loadingContainer = document.querySelector("#loading-container");

const hideElement = element => {
  element.classList.replace("fade-in", "fade-out");
  element.classList.replace("shown", "hidden");
};

const showElement = element => {
  element.classList.replace("fade-out", "fade-in");
  element.classList.replace("hidden", "shown");
};

export const hideError = () => {
  alertMessage.innerText = "";
  hideElement(alertContainer);
};

export const showError = message => {
  alertMessage.innerText = message;
  showElement(alertContainer);
};

export const hideLoading = () => {
  hideElement(loadingContainer);
};

export const showLoading = () => {
  showElement(loadingContainer);
};
