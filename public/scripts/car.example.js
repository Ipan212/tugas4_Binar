class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
      <div class='card'>
        <div class='card-body d-flex flex-column justify-content-center align-items-center'>
          <img src="${this.image}" alt="${this.manufacture}" style="width:300px; height:150px; object-fit:cover;'>
          <p class="mt-3">${this.manufacture} ${this.model}/${this.type}</p>
          <p><b>Rp ${this.rentPerDay} / hari</b></p>
          <p>${this.description}</p>
          <p><i class="bi bi-person me-2"></i>${this.capacity} orang</p>
          <p><i class="bi bi-gear me-2"></i>${this.transmission}</p>
          <p><i class="bi bi-calendar me-2"></i>Tahun ${this.year}</p>
          <button class="btn btn-success w-100 mt-auto">Pilih Mobil</button>
        </div>
      </div>
    `;
  }
}
