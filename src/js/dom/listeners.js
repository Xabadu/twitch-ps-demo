import Grid from "./grid";
import {
  hideError,
  hideLoadingSpinner,
  showError,
  showLoadingSpinner,
} from "./notifications";

const initListeners = twitchClient => {
  const closeAlert = document.querySelector("#close-alert");
  const searchButton = document.querySelector("#search-button");
  const searchInput = document.querySelector("#search-input");
  const grid = new Grid();

  closeAlert.addEventListener("click", () => {
    hideError();
  });

  searchButton.addEventListener("click", e => {
    e.preventDefault();
    if (searchInput.value !== "") {
      searchButton.setAttribute("disabled", true);
      hideError();
      showLoadingSpinner();
      twitchClient
        .findGame(searchInput.value)
        .then(twitchClient.getStreams)
        .then(res => {
          hideLoadingSpinner();
          grid.fill(res);
        })
        .catch(err => {
          hideLoadingSpinner();
          showError(err);
        });
      searchButton.removeAttribute("disabled");
    }
  });
};

export default initListeners;
