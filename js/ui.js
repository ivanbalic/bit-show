const $gallery = $('.row');
const $list = $('ul');
const $searchInput = $('input');
const $title = $('h1');
const $infoSection = $('.info');
const $deatailsSection = $('.details');
const $listsDiv = $('.lists');

const createListItems = array => {
    let listHtml = "";
    for (let i = 0; i < array.length; i++) {
        const element = array[i];

        if (element.premiereDate || element.name) {
            
            listHtml += `<li>${element.getInfo()}</li>`;
        } else {

            listHtml += `<li>TBD</li>`;
        }
    }
    return listHtml;
};

const getSearchValue = () => {

    return $searchInput.val();
};

const displayHomePage = (show) => {
    const $cardDiv = $('<div>');
    const cardHtml = `<img data-id="${show.id}" class="card-img-top" src=${show.images.medium} alt="Card image cap">
    <div class="card-body">
    <p data-id="${show.id}" class="card-text">${show.title}</p>
    </div>`
    $cardDiv.attr("class", "card");
    $cardDiv.html(cardHtml);
    $gallery.append($cardDiv);
};


const displaySearch = (listOfShows) => {
    $('ul').empty();
    let listItemsHtml = "";
    for (let i = 0; i < 10; i++) {
        const show = listOfShows[i];

        if (!show) {
            listItemsHtml += `<li class="list-group-item">No Results</li>`;
            break;
        } else {
            listItemsHtml += `<li data-id="${show.id}" class="list-group-item">${show.title}</li>`;
        }
    }
    $list.html(listItemsHtml);
};

const displayMoreInfo = show => {

    const { title, seasons, casts, details, images } = show;
    const {original } = images;
    const $image = $('<img>');
    const $seasonSubtitle = $('<h2>');
    const $seasonList = $('<ul>');
    const $castSubtitle = $('<h2>');
    const $castList = $('<ul>');
    const $detailsSubtitle = $('<h2>');
    const $details = $('<div>');

    $title.text(title);
    $image.attr('src', original);
    $seasonSubtitle.text(`Seasons(${seasons.length})`);
    
    $seasonList.html(createListItems(seasons));
    $castSubtitle.text("Cast");
    $castList.html(createListItems(casts));
    $detailsSubtitle.text("Show Details");
    $details.html(details);

    $listsDiv.append($seasonSubtitle);
    $listsDiv.append($seasonList);
    $listsDiv.append($castSubtitle);
    $listsDiv.append($castList);
    
    $infoSection.append($image);
    $infoSection.append($listsDiv);

    
    $deatailsSection.append($detailsSubtitle);
    $deatailsSection.append($details);
};



export {
    displayHomePage,
    displaySearch,
    getSearchValue,
    displayMoreInfo
}