const $gallery = $('.row');
const $list = $('ul');
const $searchInput = $('input');
const $main = $('main');

const getSearchValue = () => {

    return $searchInput.val();
};

const displayShow = (show) => {
    const $cardDiv = $('<div>');
    const cardHtml = `<img data-id="${show.id}" class="card-img-top" src=${show.image.medium} alt="Card image cap">
    <div class="card-body">
    <p data-id="${show.id}" class="card-text">${show.name}</p>
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
            listItemsHtml += `<li data-id="${show.show.id}" class="list-group-item">${show.show.name}</li>`;
        }
    }
    $list.html(listItemsHtml);
};

const displayMoreInfo = show => {

    const { title, seasons, casts, details, images } = show;
    const { medium, original } = images;
    const $container = $('<div>');
    const $title = $('<h1>');
    const $image = $('<img>');
    const $seasonList = $('<ul>');
    const $castList = $('<ul>');
    const $details = $('<div>');

    $container.attr('class', 'container');
    $title.text(title);
    $image.attr('src', original);
    $seasonList.html(createListItems(seasons));
    $castList.html(createListItems(casts));
    $details.html(details);

    $container.append($title);
    $container.append($image);
    $container.append($seasonList);
    $container.append($castList);
    $container.append($details);

    $main.append($container);
    console.log(show);

};

const createListItems = array => {
    let listHtml = "";
    for (let i = 0; i < array.length; i++) {
        const element = array[i];

        listHtml += `<li>${element.getInfo()}</li>`;
    }
    return listHtml;
};


export {
    displayShow,
    displaySearch,
    getSearchValue,
    displayMoreInfo
}