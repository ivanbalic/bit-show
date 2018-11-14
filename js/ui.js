const $gallery = $('.row');


const displayShow = (show) => {
    const $cardDiv = $('<div>');
    const cardHtml = `<img class="card-img-top" src=${show.image.medium} alt="Card image cap">
    <div class="card-body">
    <p class="card-text">${show.name}</p>
    </div>`
    $cardDiv.attr("class", "card");
    $cardDiv.html(cardHtml);
    $gallery.append($cardDiv);
}

export {
    displayShow
}