export default class Grid {
  constructor() {
    this.data = [];
    this.imageSizes = {
      width: 300,
      height: 167,
    };
    this.pagination = "";
    this.page = {
      offset: 0,
    };
  }

  cleanUp() {
    const container = document.querySelector("#cards-container");
    const statsContainer = document.querySelector("#stats-container");
    statsContainer.classList.add("hidden");
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  createGridElement(row) {
    const mainContainer = document.createElement("div");
    const imageContainer = document.createElement("div");
    const image = document.createElement("img");
    const dataContainer = document.createElement("div");
    const dataTitle = document.createElement("h2");
    const dataMetadata = document.createElement("p");
    const dataDescription = document.createElement("p");

    const thumbnailURL = row.thumbnail_url.split("{width}x{height}");
    image.src = `${thumbnailURL[0]}${this.imageSizes.width}x${
      this.imageSizes.height
    }${thumbnailURL[1]}`;
    dataTitle.innerText = row.title;
    dataMetadata.innerText = `SUPER GAME - ${row.viewer_count} viewers`;
    dataDescription.innerText = "Description!";

    imageContainer.append(image);
    dataContainer.append(dataTitle);
    dataContainer.append(dataMetadata);
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

    const total = this.page.offset + this.data.length;

    statsCountText.innerText = `Showing results from ${this.page.offset} to ${total}`;
    statsCount.append(statsCountText);

    if (this.page.offset > 0) {
      const previousResultsLink = document.createElement("a");
      const previousResultsIcon = document.createElement("i");
      const previousResultsText = document.createElement("p");

      previousResultsIcon.classList.add("fas");
      previousResultsIcon.classList.add("fa-chevron-left");
      previousResultsText.innerText = "Previous";

      previousResultsLink.append(previousResultsIcon);
      previousResultsLink.append(previousResultsText);

      statsPagination.append(previousResultsLink);
    }

    if (this.pagination.cursor) {
      const nextResultsLink = document.createElement("a");
      const nextResultsIcon = document.createElement("i");
      const nextResultsText = document.createElement("p");

      nextResultsIcon.classList.add("fas");
      nextResultsIcon.classList.add("fa-chevron-right");
      nextResultsText.innerText = "Next";

      nextResultsLink.append(nextResultsText);
      nextResultsLink.append(nextResultsIcon);

      statsPagination.append(nextResultsLink);
    }

    statsCount.setAttribute("id", "stats-count");
    statsPagination.setAttribute("id", "stats-pagination");

    statsContainer.append(statsCount);
    statsContainer.append(statsPagination);
  }

  fill(response) {
    this.data = response.data;
    this.pagination = response.pagination;

    this.cleanUp();
    this.createPagination();
    const cardsContainer = document.querySelector("#cards-container");
    this.data.forEach(row => {
      const card = this.createGridElement(row);
      cardsContainer.append(card);
    });
  }
}
