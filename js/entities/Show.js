class Show {
  constructor(title, details, images, id, seasons, casts, rating, genres) {
    this.id = id;
    this.casts = casts;
    this.title = title;
    this.genres = genres;
    this.images = images;
    this.rating = rating;
    this.details = details;
    this.seasons = seasons;
  }
  getNumberOfSeasons() {
    return this.seasons.length;
  }
}

export default Show;
