import Cast from "./entities/Cast.js";
import Season from "./entities/Season.js";
import Show from "./entities/Show.js";


const LIST_OF_SHOWS_ENDPOINT = "http://api.tvmaze.com/shows";

const fetchHomePage = (onSuccessHandler) => {

    const request = $.ajax({
        url: LIST_OF_SHOWS_ENDPOINT,
        method: "GET"
    });

    request.done(function (listOfShows) {

        listOfShows.sort(function (a, b) {
            if (a.rating.average < b.rating.average) {
                return 1;
            }
            if (a.rating.average > b.rating.average) {
                return -1;
            }
            return 0;
        });

        onSuccessHandler(listOfShows);

    });

    request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}

const fetchSearchingData = (onSearchSuccess, searchInput) => {

    const SEARCH_ENDPOINT = `http://api.tvmaze.com/search/shows?q=${searchInput}`;

    const request = $.ajax({
        url: SEARCH_ENDPOINT,
        method: "GET"
    });

    request.done(function (listOfShows) {

        onSearchSuccess(listOfShows);

    });

    request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });

};

const fetchMoreInfo = (moreInfoSuccess) => {

    const id = localStorage.getItem('id');

    const EMBED_ENDPOINT = `http://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast`;

    const request = $.ajax({
        url: EMBED_ENDPOINT,
        method: 'GET'
    });

    request.done(function (response) {

        const { name, summary, image, _embedded } = response;

        const { seasons, cast } = _embedded;

        const show = new Show(name, summary, image);

        const mappedCasts = cast.map(cast => new Cast(cast.person.name, cast.character.name));
        const mappedSeasons = seasons.map(season => new Season(season.premiereDate, season.endDate));

        show.seasons = mappedSeasons;
        show.casts = mappedCasts;

        moreInfoSuccess(show);

        console.log(response);
    });

    request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });

};

export {
    fetchHomePage,
    fetchSearchingData,
    fetchMoreInfo
}