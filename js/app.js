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

const onSearchSuccess = listOfShows => {
  ui.displaySearch(listOfShows, onClickHandler);
};

const homePageSuccess = listOfShows => {
  ui.displayHomePage(listOfShows, onClickHandler);
};

const onClickHandler = event => {
  localStorage.setItem("id", $(event.target).attr("data-id"));
  window.location.href = "./getMoreInfo.html";
};

const moreInfoSuccess = showInstance => {
  ui.displayMoreInfo(showInstance);
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
  const moreInfoPromise = data.fetchMoreInfo();

  moreInfoPromise.then(showInstance => {
    moreInfoSuccess(showInstance);
  });
  setUpEventListener();
};

const aboutPageInit = () => {
  setUpEventListeners();
};

export { homePageInit, moreInfoInit, aboutPageInit };
