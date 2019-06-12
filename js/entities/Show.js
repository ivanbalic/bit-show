class Show {
  constructor(title, details, images, id, seasons, casts) {
    this.title = title;
    this.details = details;
    this.images = images;
    this.id = id;
    this.seasons = seasons;
    this.casts = casts;
  }
  getNumberOfSeasons = () => {
    return this.seasons.length;
  };
}

export default Show;
