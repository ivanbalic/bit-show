class Season {
    constructor(premiereDate, endDate, number) {
        this.premiereDate = premiereDate,
            this.endDate = endDate,
            this.number = number
    }

    getInfo() {
        return `${this.premiereDate} - ${this.endDate}`;
    }
}

export default Season;