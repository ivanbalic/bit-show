const fetchData = (displayShows) => {

    const LIST_OF_SHOWS_ENDPOINT = "http://api.tvmaze.com/shows";

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

        console.log(listOfShows);
        displayShows(listOfShows);
    });

    request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}

export {
    fetchData
}