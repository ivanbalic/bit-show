const LIST_OF_SHOWS_ENDPOINT = "http://api.tvmaze.com/shows";

const fetchData = (onSuccessHandler) => {

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

export {
    fetchData,
    fetchSearchingData
}