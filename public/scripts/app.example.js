class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.countResult = document.getElementById("count-result");
    this.filterButton = document.getElementById("filter-btn")
  }

  async init() {
    // Register click listener
    this.clearButton.onclick = () => {
      this.clear();
      this.countResult.innerHTML = ""
    }
    this.filterButton.onclick = () => {
      let filterByDriver = (document.getElementById("driver").value) === 'true';

      let filterByDate = document.getElementById("date").value
      const newDate = new Date(filterByDate)

      let filterByHour = document.getElementById("time").value
      let filterByPass = document.getElementById("passenger").value;
      this.getCarByFilter(filterByDriver, newDate.toLocaleDateString(), parseInt(filterByHour), parseInt(filterByPass));
      // let HeadCar = document.querySelector("#mobil");
      //   HeadCar.style.display = "none"
      // let HeadTitle = document.querySelector(".Header-Title");
      // HeadTitle.style.display = "none"
      // let Header = document.querySelector(".Header");
      // Header.style.height = "70px"
    }
  }

  run = () => {
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.classList.add("col-lg-4","col-md-6", "col-sm-12", "col-12", "my-2", "d-flex", "align-items-stretch", "justify-content-center");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
    this.run();
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };

  async getCarByFilter(avail, date, time, capacity) {
    let data;
    console.log('availe', avail);
    console.log('date', date);
    console.log('time', time);
    console.log('cap', capacity == NaN);
    if (isNaN(capacity)) {
      data = await Binar.listCars((car) => car.available === avail && (car.availableAt.toLocaleDateString() >= date && car.availableAt.getHours() >= time))
    } else {
      data = await Binar.listCars((car) => car.available === avail && car.capacity >= capacity && (car.availableAt.toLocaleDateString() >= date && car.availableAt.getHours() >= time))
    }
    
    Car.init(data)

    this.countResult.innerHTML = `<b>Hasil :</b> ${data.length} mobil ditemukan`;

    this.clear();
    this.run();
  }
}
