import Cast from "./entities/Cast.js";
import Season from "./entities/Season.js";
import Show from "./entities/Show.js";


const LIST_OF_SHOWS_ENDPOINT = "http://api.tvmaze.com/shows";

const fetchHomePage = () => {

    const homePagePromise = fetch(LIST_OF_SHOWS_ENDPOINT)
        .then(listOfShows => {

            return listOfShows.json();
        })
        .then(parsedListOfShows => {

            parsedListOfShows.sort(function (a, b) {
                if (a.rating.average < b.rating.average) {
                    return 1;
                }
                if (a.rating.average > b.rating.average) {
                    return -1;
                }
                return 0;
            });

            const mappedShows = parsedListOfShows.map(show => {
                const {
                    name,
                    summary,
                    image,
                    id
                } = show;

                return new Show(name, summary, image, id);
            });

            return mappedShows;
        });

    return homePagePromise;
}

const fetchSearchingData = (searchInput) => {

    const SEARCH_ENDPOINT = `http://api.tvmaze.com/search/shows?q=${searchInput}`;

    const searchingDataPromise = fetch(SEARCH_ENDPOINT)
        .then(listOfShows => {

            return listOfShows.json();
        })
        .then(parsedListOfShows => {

            parsedListOfShows.sort(function (a, b) {
                if (a.show.rating.average < b.show.rating.average) {
                    return 1;
                }
                if (a.show.rating.average > b.show.rating.average) {
                    return -1;
                }
                return 0;
            });

            const mappedShows = parsedListOfShows.map(raw => {
                const {
                    show
                } = raw;
                const {
                    name,
                    summary,
                    image,
                    id
                } = show;

                return new Show(name, summary, image, id);
            });

            return mappedShows;
        });

    return searchingDataPromise;
};

const fetchMoreInfo = () => {

    const id = localStorage.getItem('id');

    const EMBED_ENDPOINT = `http://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast`;

    const moreInfoPromise = fetch(EMBED_ENDPOINT)
        .then(response => {
            return response.json();
        })
        .then( parsedResponse => {

            const {
                name,
                summary,
                image,
                id,
                _embedded
            } = parsedResponse;
            const {
                seasons,
                cast
            } = _embedded;
    
            const show = new Show(name, summary, image, id);
    
            const mappedCasts = cast.map(cast => new Cast(cast.person.name, cast.character.name));
            const mappedSeasons = seasons.map(season => new Season(season.premiereDate, season.endDate));
    
            show.seasons = mappedSeasons;
            show.casts = mappedCasts;

            return show;
        });

        return moreInfoPromise;
};

export {
    fetchHomePage,
    fetchSearchingData,
    fetchMoreInfo
}