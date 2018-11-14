import * as data from "./data.js";
import * as ui from "./ui.js";


const init = () => {

    console.log("App initialized");
    setUpEventListener();
    data.fetchData(ui.displayShow);
}

function setUpEventListener() {

}

export { init };