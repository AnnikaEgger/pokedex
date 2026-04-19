const BASE_URL = "https://pokeapi.co/api/v2/";
let pokemons = [];

async function onloadFunc() {
  let pokemonResponse = await getAllPokemon("pokemon?limit=8&offset=20");

  for (let index = 0; index < pokemonResponse.results.length; index++) {
    pokemons.push({
      name: pokemonResponse.results[index].name,
      url: pokemonResponse.results[index].url,
    });
  }

  await pushPokemonInfos();
  // await getPokemonType();
  console.log(pokemons);
  renderPokemons();
}

async function pushPokemonInfos() {
  for (let index = 0; index < pokemons.length; index++) {
    let pokemonInfo = await getPokemonInfos(pokemons[index].url);

    let currentObject = pokemons[index];
    Object.assign(currentObject, pokemonInfo);
  }
}

async function getAllPokemon(path) {
  let response = await fetch(BASE_URL + path + ".json");
  return (responseToJson = await response.json());
}

async function getPokemonInfos(path) {
  let response = await fetch(path);
  return (responseToJson = await response.json());
}

// async function getPokemonType(index) {
//   for (
//     let indexType = 0;
//     indexType < pokemons[index].types.length;
//     indexType++
//   ) {
//     let response = await fetch(pokemons[index].types[indexType].type.url);
//     let responseToJson = await response.json();
//     let typeSpritesJson = await responseToJson.sprites;

//     pokemon[0].types.push(typeSpritesJson);
//   }
// }

async function getPokemonType(index) {
  for (
    let indexType = 0;
    indexType < pokemons[index].types.length;
    indexType++
  ) {
    let response = await fetch(pokemons[index].types[indexType].type.url);
    let responseToJson = await response.json();
    let typeSpritesJson = await responseToJson.sprites;

    pokemon[0].types.push(typeSpritesJson);
  }
}

function addTypeClasses(index) {
  for (
    let indexType = 0;
    indexType < pokemons[index].types.length;
    indexType++
  ) {
    let imgSection = document.getElementById("img-section" + index);
  }
}

function renderPokemons() {
  let main = document.getElementById("main");
  for (let index = 0; index < pokemons.length; index++) {
    main.innerHTML += pokemonThumbnailArticleTemplate(index);

    // if (pokemons[index].types[0].type.name == "grass") {
    //   let imgSection = document.getElementById("img-section");
    //   imgSection.classList.add("grass-background");
    // }
  }
}
