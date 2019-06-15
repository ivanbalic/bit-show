import Cast from "./entities/Cast.js";
import Season from "./entities/Season.js";
import Show from "./entities/Show.js";
import { SHOWS_ENDPOINT, SEARCH_SHOWS_ENDPOINT } from "./shared/endpoints.js";

const fetchHomePage = () => {
  return fetch(SHOWS_ENDPOINT)
    .then(listOfShows => {
      return listOfShows.json();
    })
    .then(parsedListOfShows => {
      parsedListOfShows.sort((a, b) => {
        const firstRating = a.rating.average;
        const secondRating = b.rating.average;
        if (firstRating < secondRating) {
          return 1;
        }
        if (firstRating > secondRating) {
          return -1;
        }
        return 0;
      });
      const mappedShows = parsedListOfShows.map(
        ({ name, summary, image, id, rating, genres }) =>
          new Show(name, summary, image, id, null, null, rating.average, genres)
      );
      return mappedShows.slice(0, 50);
    });
};

const fetchSearchingData = searchInput => {
  const SEARCH_QUERY_ENDPOINT = `${SEARCH_SHOWS_ENDPOINT}?q=${searchInput}`;

  return fetch(SEARCH_QUERY_ENDPOINT)
    .then(listOfShows => {
      return listOfShows.json();
    })
    .then(parsedListOfShows => {
      parsedListOfShows.sort((a, b) => {
        const firstRating = a.show.rating.average;
        const secondRating = b.show.rating.average;
        if (firstRating < secondRating) {
          return 1;
        }
        if (firstRating > secondRating) {
          return -1;
        }
        return 0;
      });
      const mappedShows = parsedListOfShows.map(raw => {
        const { show } = raw;
        const { name, summary, image, id } = show;

        return new Show(name, summary, image, id);
      });

      return mappedShows;
    });
};

const fetchMoreInfo = () => {
  const id = localStorage.getItem("id");
  const EMBED_ENDPOINT = `${SHOWS_ENDPOINT}/${id}?embed[]=seasons&embed[]=cast`;

  return fetch(EMBED_ENDPOINT)
    .then(show => {
      return show.json();
    })
    .then(parsedShow => {
      const { name, summary, image, id, _embedded } = parsedShow;
      const { seasons, cast } = _embedded;
      console.log(cast);

      const mappedCasts = cast.map(
        ({ person, character }) =>
          new Cast(
            person.name,
            character.name,
            character.image,
            new Date(person.birthday)
          )
      );
      const mappedSeasons = seasons.map(
        ({ premiereDate, endDate }) =>
          new Season(new Date(premiereDate), new Date(endDate))
      );
      const show = new Show(
        name,
        summary,
        image,
        id,
        mappedSeasons,
        mappedCasts
      );
      return show;
    });
};

export { fetchHomePage, fetchSearchingData, fetchMoreInfo };
