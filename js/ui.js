const $list = $(".list-group");
const $searchInput = $("input");

const getSearchValue = () => {
  console.log($searchInput.val());
  return $searchInput.val();
};

const createSeasonItems = seasons => {
  let seasonsHtml = "";
  if (seasons.length) {
    seasons.forEach(season => {
      const { id, number } = season;
      seasonsHtml += `
      <div class="card season-item rounded bg-dark">
        <div class="card-header" id="season${number}">
          <h6 class="mb-0 ">
            <strong class="">Season ${number}</strong>
          </h6>
          <p class=''>${season.getInfo()}</p>
          <button class="btn btn-link season-btn p-0 text-warning" type="button" data-toggle="collapse" data-target="#season${id}" aria-expanded="false" aria-controls="season${id}" data-id="${id}">
            See episodes...
          </button>
        </div>
    
        <div id="season${id}" class="collapse" aria-labelledby="season${number}" data-parent="#accordionExample">
          <div class="card-body bg-light" id="${id}">
          <div class="row">
            <div class="spinner-border text-dark mx-auto mt-4" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          </div>
        </div>
      </div>`;
    });
  } else {
    seasonsHtml += `<h4 class="mb-0 ">
          No data about seasons
          </h4>`;
  }
  return seasonsHtml;
};

const displayEpisodes = (listOfEpisodes, seasonId) => {
  const $episodeContainer = $(`#${seasonId}`);
  $episodeContainer.empty();
  let episodeHtml = "";
  listOfEpisodes.forEach(({ name, number, summary }) => {
    const $summary = $(summary);
    episodeHtml += `<hr class="hr-black">
    <h5 class="card-title  mt-3 mb-0 text-dark">${name}</h5>
    <small class="text-success">Episode ${number ? number : "-"}</small>
    <p class="text-dark">${
      $summary.html() ? $summary.html() : "No info about summary"
    }</p>`;
  });
  $episodeContainer.html(episodeHtml);
};

const createCastItem = casts => {
  let imgSrc;
  let castsHtml = "<div class='row'>";
  if (casts.length) {
    casts.forEach(cast => {
      const { name, role, image } = cast;
      image
        ? (imgSrc = image.medium)
        : (imgSrc =
            "https://thelightingagency.com/wp-content/uploads/2017/01/person-placeholder.jpg");
      castsHtml += `<div class="media col-sm-12 col-md-4 col-lg-3 mb-2">
        <img src="${imgSrc}" class="mr-3 w-25" alt="character">
        <div class="media-body">
          <h6 class="mt-0">${name}</h6>
          as ${role}
          <p><i class="fas fa-birthday-cake"></i> ${cast.getDateOfBirth()}</p>
        </div>
      </div>`;
    });
  } else {
    castsHtml += `<p>No info</p>`;
  }
  return (castsHtml += "</div>");
};

const displayHomePage = listOfShows => {
  const $gallery = $(".gallery");
  $gallery.empty();
  listOfShows.forEach(({ id, title, images, rating, genres }) => {
    const $cardDiv = $("<div>");
    let genreHtml = "";
    genres.forEach(genre => {
      genreHtml += `<span class="badge badge-pill border border-success text-success m-1">${genre}</span>`;
    });
    const cardHtml = `<img data-id="${id}" class="card-img-top rounded-top" src=${
      images.medium
    } alt="show cover">
      <div class="card-body border bg-light border rounded-bottom">
      <h4 data-id="${id}" class="card-title text-dark">${title}</h4>
      <p class="car-text text-dark"><i class="fas fa-star text-warning"></i> ${rating}<small class='text-muted'>/10</small></p>
      ${genreHtml}
      </div>`;
    $cardDiv.attr(
      "class",
      "card col-sm-12 col-md-6 col-lg-4 px-1 my-3 border-0"
    );
    $cardDiv.html(cardHtml);
    $gallery.append($cardDiv);
  });
};

const displaySearch = listOfShows => {
  $list.empty();
  let listItemsHtml = "";
  if (listOfShows.length) {
    listOfShows.forEach(({ title, id }) => {
      listItemsHtml += `<li data-id="${id}" class="list-group-item py-1 px-2 mb-0">${title}</li>`;
    });
  }
  $list.html(listItemsHtml);
};

const displayMoreInfo = show => {
  let imageSrc;
  const $hr1 = $("<hr>");
  const $hr2 = $("<hr>");
  const $main = $("main");
  const $title = $("<h1>");
  const $image = $("<img>");
  const $castList = $("<div>");
  const $seasonList = $("<div>");
  const $infoSection = $("<div>");
  const $castSubtitle = $("<h2>");
  const $overviewText = $("<div>");
  const $seasonSubtitle = $("<h2>");
  const $castContainer = $("<div>");
  const $imageContainer = $("<div>");
  const $seasonContainer = $("<div>");
  const $overviewSection = $("<div>");
  const $overviewSubtitle = $("<h2>");
  const { title, seasons, casts, overview, images } = show;
  images
    ? (imageSrc = images.original)
    : (imageSrc =
        "http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png");

  $title.text(title);
  $image.attr("src", imageSrc);
  $image.attr("class", "img-fluid");
  $seasonSubtitle.text(`Seasons(${show.getNumberOfSeasons()})`);
  $seasonList.html(createSeasonItems(seasons));
  $castSubtitle.attr("class", "col-12");
  $castSubtitle.text("Casts");
  $castList.attr("id", "accordionExample");
  $castList.attr("class", "col-12 accordion");
  $castList.html(createCastItem(casts));
  $overviewSubtitle.text("Overview");
  $overviewSubtitle.attr("class", "col-12 px-0");
  $overviewText.html(overview ? overview : "<p>No info</P>");
  $overviewText.attr("class", "col-12 px-0");

  $imageContainer.append($image);
  $imageContainer.attr("class", "col-sm-12 col-md-8");

  $seasonContainer.attr("class", "col-sm-12 col-md-4 px-0");
  $seasonContainer.append($seasonSubtitle);
  $seasonContainer.append($seasonList);

  $infoSection.attr("class", "row my-3 mx-1");
  $infoSection.append($imageContainer);
  $infoSection.append($seasonContainer);

  $overviewSection.attr("class", "row my-3 mx-1");
  $overviewSection.append($overviewSubtitle);
  $overviewSection.append($overviewText);

  $castContainer.attr("class", "row");
  $castContainer.append($castSubtitle);
  $castContainer.append($castList);

  $main.empty();
  $main.append($title);
  $main.append($infoSection);
  $main.append($hr1.attr("class", "hr-white"));
  $main.append($castContainer);
  $main.append($hr2.attr("class", "hr-white"));
  $main.append($overviewSection);
};

export {
  displayHomePage,
  displaySearch,
  getSearchValue,
  displayMoreInfo,
  displayEpisodes
};
