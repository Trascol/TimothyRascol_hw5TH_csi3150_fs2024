// Now, you don't need to require 'data.js' since it's already globally available
document.getElementById('applyFilters').addEventListener('click', function() {
  applyFilters();
});

function applyFilters() {
  const minYear = parseInt(document.getElementById('minYear').value) || 0;
  const maxYear = parseInt(document.getElementById('maxYear').value) || Infinity;
  const selectedMakes = Array.from(document.getElementById('makes').selectedOptions).map(option => option.value);
  const maxMileage = parseInt(document.getElementById('maxMileage').value) || Infinity;
  const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
  const maxPrice = parseInt(document.getElementById('maxPrice').value) || Infinity;
  const selectedColors = Array.from(document.getElementById('colors').selectedOptions).map(option => option.value);

  console.log(minYear, maxYear, selectedMakes, maxMileage, minPrice, maxPrice, selectedColors); // Debugging line

  const filteredCars = usedCars.filter(car => {
    return (
      car.year >= minYear &&
      car.year <= maxYear &&
      (selectedMakes.length === 0 || selectedMakes.includes(car.make)) &&
      car.mileage <= maxMileage &&
      car.price >= minPrice &&
      car.price <= maxPrice &&
      (selectedColors.length === 0 || selectedColors.includes(car.color))
    );
  });

  console.log(filteredCars); // Debugging line

  // Clear the car list and add filtered cars
  const carList = document.getElementById('carList');
  carList.innerHTML = ''; // CLEAR STUff
  filteredCars.forEach(car => {
    const carCard = createCarCard(car);
    carList.appendChild(carCard);
  });
}

function createCarCard(car) {
  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = `assets/img/${car.year}_${car.make}_${car.color}.jpg`;
  img.alt = "Car-card";
  img.style.width = "100%";

  const title = document.createElement('h1');
  title.textContent = `${car.year} ${car.make} ${car.model}`;

  const color = document.createElement('p');
  color.classList.add('color');
  color.textContent = car.color;

  const price = document.createElement('p');
  price.classList.add('price');
  price.textContent = `$${car.price}`;

  const mileage = document.createElement('p');
  mileage.textContent = `Mileage: ${car.mileage} miles`;

  const button = document.createElement('button');
  button.textContent = "Add to Cart";

  // Add event listener directly to the button
  button.addEventListener('click', function() {
    alert(`Added ${car.year} ${car.make} ${car.model} to cart!`);
  });

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(color);
  card.appendChild(price);
  card.appendChild(mileage);
  card.appendChild(button);

  return card;
}
