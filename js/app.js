import * as data from "./data.js";
import * as ui from "./ui.js";


const init = () => {

    console.log("App initialized");
    setUpEventListener();
    data.fetchData(OnSuccessHandler);
}

function setUpEventListener() {

}

const OnSuccessHandler = (listOfShows) => {
    for (let i = 0; i < 50; i++) {
        const show = listOfShows[i];

        ui.displayShow(show);
    }
};

export { init };