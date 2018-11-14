const $gallery = $('.row');


const displayShow = (listOfShows) => {
    let galleryHtml = "";
    for (let i = 0; i < listOfShows.length; i++) {
        const show = listOfShows[i];
        const cardHtml = `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src=${show.image.medium} alt="Card image cap">
        <div class="card-body">
            <p class="card-text">${show.name}</p>
        </div>
    </div>`

        galleryHtml += cardHtml;
    }
    $gallery.html(galleryHtml);
}

export {
    displayShow
}