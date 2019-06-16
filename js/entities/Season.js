class Season {
  constructor(id, premiereDate, endDate, number, numberOfEpisodes) {
    this.id = id;
    this.number = number;
    this.endDate = endDate;
    this.premiereDate = premiereDate;
    this.numberOfEpisodes = numberOfEpisodes;
  }
  getInfo() {
    return `${this.premiereDate.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })} - ${this.endDate.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })}`;
  }
}

export default Season;
