const $list = $(".list-group");
const $searchInput = $("input");

const createSeasonItems = seasons => {
  let seasonsHtml = "";
  seasons.forEach(season => {
    if (season.premiereDate) {
      seasonsHtml += `<li>${season.getInfo()}</li>`;
    } else {
      seasonsHtml += `<li>TBD</li>`;
    }
  });
  return seasonsHtml;
};

const createCastItem = casts => {
  let imgSrc;
  let castsHtml = "";
  casts.forEach(cast => {
    const { name, role, image } = cast;
    image
      ? (imgSrc = image.medium)
      : (imgSrc =
          "https://thelightingagency.com/wp-content/uploads/2017/01/person-placeholder.jpg");
    castsHtml += `<div class="media col-sm-12 col-md-4 col-lg-3">
      <img src="${imgSrc}" class="mr-3 w-25" alt="character">
      <div class="media-body">
        <h6 class="mt-0">${name}</h6>
        ${role}
        <p><i class="fas fa-birthday-cake"></i> ${cast.getDateOfBirth()}</p>
      </div>
    </div>`;
  });
  return castsHtml;
};

const getSearchValue = () => $searchInput.val();

const displayHomePage = (listOfShows, handleClick) => {
  const $gallery = $(".gallery");
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
  $(".card").on("click", handleClick);
};

const displaySearch = (listOfShows, handleClick) => {
  $list.empty();
  let listItemsHtml = "";
  if (listOfShows.length) {
    listOfShows.forEach(({ title, id }) => {
      listItemsHtml += `<li data-id="${id}" class="list-group-item py-1 px-2 mb-0">${title}</li>`;
    });
  } else {
    listItemsHtml += `<li class="list-group-item mb-0">No Results</li>`;
  }
  $list.html(listItemsHtml);
  $("li").on("click", handleClick);
};

const displayMoreInfo = show => {
  let imageSrc;
  const $hr = $("<hr>");
  const $main = $("main");
  const $title = $("<h1>");
  const $image = $("<img>");
  const $details = $("<div>");
  const $castList = $("<div>");
  const $seasonList = $("<ul>");
  const $infoSection = $("<div>");
  const $castSubtitle = $("<h2>");
  const $seasonSubtitle = $("<h2>");
  const $listContainer = $("<div>");
  const $detailsSection = $("<div>");
  const $imageContainer = $("<div>");
  const $detailsSubtitle = $("<h2>");
  const { title, seasons, casts, details, images } = show;
  images
    ? (imageSrc = images.original)
    : (imageSrc =
        "http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png");

  $title.text(title);

  $image.attr("src", imageSrc);
  $image.attr("class", "img-fluid");
  $imageContainer.attr("class", "col-sm-12 col-md-8");
  $imageContainer.append($image);

  $seasonSubtitle.text(`Seasons(${show.getNumberOfSeasons()})`);
  $seasonList.html(createSeasonItems(seasons));
  $castSubtitle.text("Casts");
  $castList.attr("class", "row");
  $castList.html(createCastItem(casts));
  $detailsSubtitle.text("Overview");
  $details.html(details);

  $listContainer.attr("class", "col-sm-12 col-md-4");
  $listContainer.append($seasonSubtitle);
  $listContainer.append($seasonList);

  $infoSection.attr("class", "row my-3 mx-1");
  $infoSection.append($imageContainer);
  $infoSection.append($listContainer);

  $detailsSection.attr("class", "row my-3 mx-1");
  $detailsSection.append($detailsSubtitle);
  $detailsSection.append($details);

  $main.append($title);
  $main.append($infoSection);
  $main.append($castSubtitle);
  $main.append($castList);
  $main.append($hr);
  $main.append($detailsSection);
};

export { displayHomePage, displaySearch, getSearchValue, displayMoreInfo };
