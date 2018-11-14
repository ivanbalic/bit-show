const $gallery = $('.row');
const $list = $('ul');
const $searchInput = $('input');

const getSearchValue = () => {

    return $searchInput.val();
}

const displayShow = (show) => {
    const $cardDiv = $('<div>');
    const cardHtml = `<img class="card-img-top" src=${show.image.medium} alt="Card image cap">
    <div class="card-body">
    <p class="card-text">${show.name}</p>
    </div>`
    $cardDiv.attr("class", "card");
    $cardDiv.attr("data-id", `"${show.id}"`);
    $cardDiv.html(cardHtml);
    $gallery.append($cardDiv);
}


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
}


export {
    displayShow,
    displaySearch,
    getSearchValue
}