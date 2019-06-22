import Grid from "./grid";

const initListeners = twitchClient => {
  const closeAlert = document.querySelector("#close-alert");
  const searchButton = document.querySelector("#search-button");
  const searchInput = document.querySelector("#search-input");
  const grid = new Grid();

  closeAlert.addEventListener("click", () => {
    // hide alert
  });

  searchButton.addEventListener("click", e => {
    e.preventDefault();
    if (searchInput.value !== "") {
      searchButton.setAttribute("disabled", true);
      // Hide error
      // Sanitize value
      // Display loading
      twitchClient
        .findGame(searchInput.value)
        .then(twitchClient.getStreams)
        .then(res => grid.fill(res));
      searchButton.removeAttribute("disabled");
    }
  });
};

export default initListeners;
