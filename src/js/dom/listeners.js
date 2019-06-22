import Grid from "./grid";
import {
  hideError,
  hideLoading,
  showError,
  showLoading,
} from "./notifications";

const initListeners = twitchClient => {
  const closeAlert = document.querySelector("#close-alert");
  const searchButton = document.querySelector("#search-button");
  const searchInput = document.querySelector("#search-input");
  const grid = new Grid(twitchClient);

  closeAlert.addEventListener("click", () => {
    hideError();
  });

  searchButton.addEventListener("click", e => {
    e.preventDefault();
    if (searchInput.value !== "") {
      searchButton.setAttribute("disabled", true);
      hideError();
      showLoading();
      twitchClient
        .findGame(searchInput.value)
        .then(twitchClient.getStreams)
        .then(res => {
          hideLoading();
          grid.fill(res);
        })
        .catch(err => {
          hideLoading();
          showError(err);
        });
      searchButton.removeAttribute("disabled");
    }
  });
};

export default initListeners;
