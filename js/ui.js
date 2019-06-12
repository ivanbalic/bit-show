const $list = $(".list-group");
const $searchInput = $("input");

const createListItems = array => {
  let listHtml = "";
  array.forEach(({ name, premiereDate, getInfo }) => {
    if (premiereDate || name) {
      listHtml += `<li>${getInfo()}</li>`;
    } else {
      listHtml += `<li>TBD</li>`;
    }
  });
  return listHtml;
};

const getSearchValue = () => $searchInput.val();

const displayHomePage = (listOfShows, handleClick) => {
  const $gallery = $(".gallery");
  listOfShows.forEach(({ id, title, images }) => {
    const $cardDiv = $("<div>");
    const cardHtml = `<img data-id="${id}" class="card-img-top" src=${
      images.medium
    } alt="Card image cap">
      <div class="card-body">
      <p data-id="${id}" class="card-text">${title}</p>
      </div>`;
    $cardDiv.attr("class", "card col-sm-12 col-md-6 col-lg-4");
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
      listItemsHtml += `<li data-id="${id}" class="list-group-item p-1 border-bottom">${title}</li>`;
    });
  } else {
    listItemsHtml += `<li class="list-group-item">No Results</li>`;
  }
  $list.html(listItemsHtml);
  $("li").on("click", handleClick);
};

const displayMoreInfo = ({
  title,
  seasons,
  casts,
  details,
  images,
  getNumberOfSeasons
}) => {
  const $main = $("main");
  const $infoSection = $("<div>");
  const $detailsSection = $("<div>");
  const $listsDiv = $("div");
  const $title = $("<h1>");
  const $image = $("<img>");
  const $imageContainer = $("<div>");
  const $seasonSubtitle = $("<h2>");
  const $seasonList = $("<ul>");
  const $castSubtitle = $("<h2>");
  const $castList = $("<ul>");
  const $detailsSubtitle = $("<h2>");
  const $details = $("<div>");
  let imageSrc;
  images
    ? (imageSrc = images.original)
    : (imageSrc =
        "http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png");

  $title.text(title);

  $image.attr("src", imageSrc);
  $image.attr("class", "img-fluid");
  $imageContainer.attr("class", "col-sm-12 col-md-8");
  $imageContainer.append($image);

  $seasonSubtitle.text(`Seasons(${getNumberOfSeasons()})`);
  $seasonList.html(createListItems(seasons));
  $castSubtitle.text("Cast");
  $castList.html(createListItems(casts));
  $detailsSubtitle.text("Show Details");
  $details.html(details);

  $listsDiv.attr("class", "col-sm-12 col-md-4");
  $listsDiv.append($seasonSubtitle);
  $listsDiv.append($seasonList);
  $listsDiv.append($castSubtitle);
  $listsDiv.append($castList);

  $infoSection.attr("class", "row my-3 mx-1");
  $infoSection.append($imageContainer);
  $infoSection.append($listsDiv);

  $detailsSection.attr("class", "row my-3 mx-1");
  $detailsSection.append($detailsSubtitle);
  $detailsSection.append($details);

  $main.append($title);
  $main.append($infoSection);
  $main.append($detailsSection);
};

export { displayHomePage, displaySearch, getSearchValue, displayMoreInfo };
