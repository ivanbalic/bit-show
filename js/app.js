import * as data from "./data.js";
import * as ui from "./ui.js";


const homePageInit = () => {

    console.log("App initialized");
    data.fetchHomePage(onSuccessHandler);
    setUpEventListener();
}

const moreInfoInit = () => {
    data.fetchMoreInfo(moreInfoSuccess);
}

function setUpEventListener() {
    const $searchInput = $("input");

    $searchInput.on("input", onSearchHandler);
    console.log("Event listeners set");
}

const onSearchHandler = () => {
    const searchValue = ui.getSearchValue();
    data.fetchSearchingData(onSearchSuccess, searchValue);
}

const onSearchSuccess = (listOfShows) => {
    ui.displaySearch(listOfShows);
    const $allListItems = $("li");
    $allListItems.on("click", onClickHandler);
};

const onSuccessHandler = (listOfShows) => {
    for (let i = 0; i < 50; i++) {
        const show = listOfShows[i];

        ui.displayShow(show);
    }
    const $allCards = $(".card");
    $allCards.on("click", onClickHandler);
};

const onClickHandler = (event) => {
    localStorage.setItem('id', $(event.target).attr('data-id'));
    window.location.href = "./getMoreInfo.html";
};

const moreInfoSuccess = (showInstance) => {
    ui.displayMoreInfo(showInstance);
};


export {
    homePageInit,
    moreInfoInit
};