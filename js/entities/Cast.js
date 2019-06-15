class Cast {
  constructor(name, role, image, dateOfBirth) {
    this.name = name;
    this.role = role;
    this.image = image;
    this.dateOfBirth = dateOfBirth;
  }
  getDateOfBirth() {
    return this.dateOfBirth.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
}

export default Cast;
