class Season {
  constructor(premiereDate, endDate) {
    this.premiereDate = premiereDate;
    this.endDate = endDate;
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
