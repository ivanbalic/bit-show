import * as data from "./data.js";
import * as ui from "./ui.js";

function setUpEventListener() {
  const $searchInput = $("input");

  $searchInput.on("input", onSearchHandler);
  console.log("Event listeners set");
}

const onSearchHandler = () => {
  const searchValue = ui.getSearchValue();
  data.fetchSearchingData(searchValue).then(mappedShows => {
    onSearchSuccess(mappedShows);
  });
};

const handleShowClick = event => {
  const showId = $(event.target).attr("data-id");
  if (showId) {
    localStorage.setItem("id", showId);
    const currentLocation = window.location.href;

    if (!currentLocation.includes("/pages/moreInfo.html")) {
      window.location.href = "./pages/moreInfo.html";
    } else {
      window.location.reload();
    }
  }
};

const handleSeasonClick = ({ target }) => {
  const seasonId = $(target).attr("data-id");
  data.fetchEpisodes(seasonId).then(listOfEpisodes => {
    ui.displayEpisodes(listOfEpisodes, seasonId);
    $(target).off("click", handleSeasonClick);
  });
};

const onSearchSuccess = listOfShows => {
  ui.displaySearch(listOfShows);
  $(".list-group-item").on("click", handleShowClick);
};

const homePageSuccess = listOfShows => {
  ui.displayHomePage(listOfShows);
  $(".card").on("click", handleShowClick);
};

const moreInfoSuccess = showInstance => {
  ui.displayMoreInfo(showInstance);
  $(".season-btn").on("click", handleSeasonClick);
};

const homePageInit = () => {
  console.log("App initialized");
  const homePagePromise = data.fetchHomePage();

  homePagePromise.then(mappedShows => {
    homePageSuccess(mappedShows);
  });
  setUpEventListener();
};

const moreInfoInit = () => {
  const id = localStorage.getItem("id");
  const moreInfoPromise = data.fetchMoreInfo(id);

  moreInfoPromise.then(showInstance => {
    moreInfoSuccess(showInstance);
  });
  setUpEventListener();
};

export { homePageInit, moreInfoInit };
