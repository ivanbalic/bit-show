class Cast {
    constructor(name, role) {
        this.name = name;
        this.role = role;
    }

    getInfo() {
        return `${this.name} as ${this.role}`;
    }
}

export default Cast;