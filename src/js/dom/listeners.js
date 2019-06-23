import Grid from "./grid";
import { enableButton, disableButton, hideError, showError } from "./elements";

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
      disableButton();
      hideError();
      twitchClient
        .findGame(searchInput.value)
        .then(twitchClient.getStreams)
        .then(res => {
          enableButton();
          searchButton.removeAttribute("disabled");
          if (res.data.length > 0) {
            grid.fill(res, true);
          } else {
            showError(
              "No streams found for that game. Please try a different one.",
            );
          }
        })
        .catch(err => {
          showError(err);
          enableButton();
          searchButton.removeAttribute("disabled");
        });
    }
  });
};

export default initListeners;
