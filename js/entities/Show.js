class Show {
  constructor(title, overview, images, id, seasons, casts, rating, genres) {
    this.id = id;
    this.casts = casts;
    this.title = title;
    this.genres = genres;
    this.images = images;
    this.rating = rating;
    this.seasons = seasons;
    this.overview = overview;
  }
  getNumberOfSeasons() {
    return this.seasons.length;
  }
}

export default Show;
