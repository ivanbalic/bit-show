import * as data from "./data.js";
import * as ui from "./ui.js";


const init = () => {

    console.log("App initialized");
    data.fetchData(onSuccessHandler);
    setUpEventListener();
}

function setUpEventListener() {

    const $allImages = $("img");
    const $searchBtn = $("button");
    const $searchInput = $("input");

    $allImages.on("click", function () {

    });

    $searchBtn.on("click", onSearchHandler);

    $searchInput.on("input", onSearchHandler);

}

const onSearchHandler = () => {
    const searchValue = ui.getSearchValue();
    data.fetchSearchingData(onSearchSuccess, searchValue);
}

const onSearchSuccess = (listOfShows) => {
    console.log(listOfShows);
    ui.displaySearch(listOfShows);
};
const onSuccessHandler = (listOfShows) => {
    for (let i = 0; i < 50; i++) {
        const show = listOfShows[i];

        ui.displayShow(show);
    }
};

export { init };