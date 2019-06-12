class Season {
  constructor(premiereDate, endDate) {
    this.premiereDate = premiereDate;
    this.endDate = endDate;
  }
  getInfo = () => {
    return `${this.premiereDate} - ${this.endDate}`;
  };
}

export default Season;
