let contenedor = document.getElementById("contenedor");
let pokemon = {};

const traer_datos = (id) => {
  fetch("https://pokeapi.co/api/v2/pokemon/" + id)
    .then((response) => response.json())
    .then((data) => {
      pokemon = data;
      pintar_datos();
      //console.log(pokemon.abilities);
    })
    .catch((error) => console.log(error));
};

const pintar_datos = () => {
  contenedor.innerHTML = "";
  contenedor.insertAdjacentHTML(
    "beforeend",
    `
        <img src="${pokemon.sprites.front_default}">
        <h1>${pokemon.name}</h1>
        <div>
            Habilidades: 
            ${pokemon.abilities.map((e) => e.ability.name)}
        </div>
    `
  );
  contenedor.insertAdjacentHTML(
    "beforeend",
    `
    <button id="random">Generar Pokémon</button>
  `
  );
  let rand_btn = document.getElementById("random");
  rand_btn.addEventListener("click", () => {
    traer_datos(aleatorio_entre(1, 100));
  });
};

const aleatorio_entre = (min, max) => {
  return Math.ceil(Math.random() * (max - min) + min);
};

traer_datos(1);

// Theme Switcher Logic
const themeSwitcherButton = document.getElementById('theme-switcher');
const bodyElement = document.body;

function applyTheme(theme) {
  bodyElement.classList.remove('light-mode', 'dark-mode'); // Remove any existing theme class
  if (theme === 'dark') {
    bodyElement.classList.add('dark-mode');
  } else {
    bodyElement.classList.add('light-mode');
  }
}

// Load saved theme or default to light
let savedTheme = localStorage.getItem('theme');
if (!savedTheme) {
  savedTheme = 'light'; // Default to light
  localStorage.setItem('theme', savedTheme); // Save the default
}
applyTheme(savedTheme);

// Event listener for the button
if (themeSwitcherButton) { // Check if button exists
  themeSwitcherButton.addEventListener('click', () => {
    let newTheme = bodyElement.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}
