import {
  disableButton,
  enableButton,
  showResults,
  hideResults,
} from "./elements";

const STREAM_BASE_URL = "https://www.twitch.tv/";

export default class Grid {
  constructor(twitchClient) {
    this.data = [];
    this.imageSizes = {
      width: 300,
      height: 167,
    };
    this.imagesLoaded = 0;
    this.pageSize = 0;
    this.pagination = "";
    this.offset = 0;
    this.twitchClient = twitchClient;
  }

  cleanUp() {
    const container = document.querySelector("#cards-container");
    const statsContainer = document.querySelector("#stats-container");
    while (statsContainer.firstChild) {
      statsContainer.removeChild(statsContainer.firstChild);
    }
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  createGridElement(row) {
    const mainContainer = document.createElement("div");
    const imageContainer = document.createElement("div");
    const imageLink = document.createElement("a");
    const image = document.createElement("img");
    const dataContainer = document.createElement("div");
    const dataTitleLink = document.createElement("a");
    const dataTitle = document.createElement("h2");
    const gameMetadata = document.createElement("span");
    const viewersMetadata = document.createElement("span");
    const dataDescription = document.createElement("p");
    const iconGame = document.createElement("i");
    const iconViewers = document.createElement("i");

    mainContainer.classList.add("hidden");
    dataTitleLink.href = `${STREAM_BASE_URL}${row.user_name}`;
    imageLink.href = `${STREAM_BASE_URL}${row.user_name}`;

    const thumbnailURL = row.thumbnail_url.split("{width}x{height}");
    image.src = `${thumbnailURL[0]}${this.imageSizes.width}x${
      this.imageSizes.height
    }${thumbnailURL[1]}`;
    image.addEventListener("load", () => {
      mainContainer.classList.replace("hidden", "fade-in");
      this.imagesLoaded += 1;
      if (this.imagesLoaded === 1) {
        showResults();
      }
      if (this.imagesLoaded === this.pageSize) {
        enableButton();
      }
    });

    dataTitle.innerText = row.title;
    iconGame.classList.add("fa");
    iconGame.classList.add("fa-gamepad");
    iconViewers.classList.add("fa");
    iconViewers.classList.add("fa-users");

    gameMetadata.append(iconGame);
    gameMetadata.append(` ${localStorage.getItem("gameName")} • `);

    viewersMetadata.append(iconViewers);
    viewersMetadata.append(` ${row.viewer_count} viewers.`);

    dataDescription.innerText = "Description!";

    imageLink.append(image);
    imageContainer.append(imageLink);
    dataTitleLink.append(dataTitle);
    dataContainer.append(dataTitleLink);
    dataContainer.append(gameMetadata);
    dataContainer.append(viewersMetadata);
    dataContainer.append(dataDescription);

    mainContainer.append(imageContainer);
    mainContainer.append(dataContainer);

    mainContainer.classList.add("card");
    imageContainer.classList.add("card-image");
    dataContainer.classList.add("card-data");

    return mainContainer;
  }

  createPagination() {
    const statsContainer = document.querySelector("#stats-container");
    const statsCount = document.createElement("div");
    const statsPagination = document.createElement("div");
    const statsCountText = document.createElement("p");

    const total = this.offset + this.data.length;

    statsCountText.innerText = `Showing results from ${this.offset} to ${total}`;
    statsCount.append(statsCountText);

    if (this.offset > 0) {
      const previousResultsLink = document.createElement("a");
      const previousResultsIcon = document.createElement("i");
      const previousResultsText = document.createElement("p");

      previousResultsIcon.classList.add("fas");
      previousResultsIcon.classList.add("fa-chevron-left");
      previousResultsText.innerText = "Previous";

      previousResultsLink.classList.add("pagination-link");
      previousResultsLink.append(previousResultsIcon);
      previousResultsLink.append(previousResultsText);
      previousResultsLink.href = "#";

      previousResultsLink.addEventListener("click", () => {
        this.offset = this.offset - this.data.length;
        const prevPage = JSON.parse(localStorage.getItem("prevPage"));
        this.fill(prevPage);
      });

      statsPagination.append(previousResultsLink);
    }

    if (this.offset > 0 && this.pagination.cursor) {
      const separator = document.createElement("span");
      separator.innerText = "••";
      separator.classList.add("pagination-separator");
      statsPagination.append(separator);
    }

    if (this.pageSize === 20 || (this.pageSize < 20 && this.offset > 20)) {
      const nextResultsLink = document.createElement("a");
      const nextResultsIcon = document.createElement("i");
      const nextResultsText = document.createElement("p");

      nextResultsIcon.classList.add("fas");
      nextResultsIcon.classList.add("fa-chevron-right");
      nextResultsText.innerText = "Next";

      nextResultsLink.classList.add("pagination-link");
      nextResultsLink.append(nextResultsText);
      nextResultsLink.append(nextResultsIcon);
      nextResultsLink.href = "#";

      nextResultsLink.addEventListener("click", () => {
        this.offset = this.offset + this.data.length;
        const prevPageData = JSON.stringify({
          data: this.data,
          pagination: this.pagination,
        });
        localStorage.setItem("prevPage", prevPageData);
        const nextPage = JSON.parse(localStorage.getItem("nextPage"));
        this.fill(nextPage);
      });

      statsPagination.append(nextResultsLink);
    }

    statsCount.setAttribute("id", "stats-count");
    statsPagination.setAttribute("id", "stats-pagination");

    statsContainer.append(statsCount);
    statsContainer.append(statsPagination);
    statsContainer.classList.remove("hidden");
    statsContainer.classList.add("shown");
  }

  fill(response, reset = false) {
    if (reset) {
      this.offset = 0;
    }

    this.imagesLoaded = 0;
    this.data = response.data;
    this.pagination = response.pagination;
    this.pageSize = this.data.length;

    hideResults();
    disableButton();
    this.cleanUp();
    this.createPagination();

    const cardsContainer = document.querySelector("#cards-container");
    this.data.forEach(row => {
      const card = this.createGridElement(row);
      cardsContainer.append(card);
    });

    this.prefetchPreviousPage();
    this.prefetchNextPage();
  }

  prefetchNextPage() {
    if (!this.pagination.cursor) {
      return false;
    }
    return this.twitchClient
      .prefetchNextPage(this.pagination.cursor)
      .then(res => localStorage.setItem("nextPage", JSON.stringify(res)));
  }

  prefetchPreviousPage() {
    if (this.offset === 0) {
      return false;
    }
    return this.twitchClient
      .prefetchPreviousPage(this.pagination.cursor)
      .then(res => localStorage.setItem("prevPage", JSON.stringify(res)));
  }
}
