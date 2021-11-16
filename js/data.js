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
