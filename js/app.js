import * as data from "./data.js";
import * as ui from "./ui.js";



function setUpEventListener() {
    const $searchInput = $("input");

    $searchInput.on("input", onSearchHandler);
    console.log("Event listeners set");
}

const onSearchHandler = () => {
    const searchValue = ui.getSearchValue();
    const searchingDataPromise = data.fetchSearchingData(searchValue);
    
    searchingDataPromise.then( mappedShows => {
        onSearchSuccess(mappedShows);
    });
}

const onSearchSuccess = (listOfShows) => {
    ui.displaySearch(listOfShows);
    const $allListItems = $("li");
    $allListItems.on("click", onClickHandler);
};

const homePageSuccess = (listOfShows) => {
    for (let i = 0; i < 50; i++) {
        const show = listOfShows[i];
        
        ui.displayHomePage(show);
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

const homePageInit = () => {

    console.log("App initialized");
    const homePagePromise = data.fetchHomePage();

    homePagePromise.then( mappedShows => {
        homePageSuccess(mappedShows);
    });
    setUpEventListener();
}

const moreInfoInit = () => {

    const moreInfoPromise = data.fetchMoreInfo();

    moreInfoPromise.then( showInstance => {
        moreInfoSuccess(showInstance);
    });
    setUpEventListener();
}

export {
    homePageInit,
    moreInfoInit
};