const alertContainer = document.querySelector("#alert");
const alertMessage = document.querySelector("#alert-message");
const loadingIcon = document.querySelector("#loading-icon");
const resultsContainer = document.querySelector("#results-container");
const searchButton = document.querySelector("#search-button");
const searchButtonText = document.querySelector("#search-button span");

const hideElement = element => element.classList.add("hidden");

const showElement = element => element.classList.remove("hidden");

export const disableButton = () => {
  searchButtonText.innerText = "";
  searchButton.classList.replace("button-active", "button-inactive");
  showElement(loadingIcon);
};

export const enableButton = () => {
  hideElement(loadingIcon);
  searchButtonText.innerText = "Search";
  searchButton.classList.replace("button-inactive", "button-active");
};

export const hideError = () => {
  alertMessage.innerText = "";
  alertContainer.classList.replace("fade-in", "fade-out");
  alertContainer.classList.replace("shown", "hidden");
};

export const showError = message => {
  alertMessage.innerText = message;
  alertContainer.classList.replace("fade-out", "fade-in");
  alertContainer.classList.replace("hidden", "shown");
};

export const hideResults = () => {
  hideElement(resultsContainer);
};

export const showResults = () => {
  showElement(resultsContainer);
};
