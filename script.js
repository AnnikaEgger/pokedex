const BASE_URL = "https://pokeapi.co/api/v2/";
let pokemons = [];

async function onloadFunc() {
  let pokemonResponse = await getAllPokemon("pokemon?limit=3&offset=0");

  for (let index = 0; index < pokemonResponse.results.length; index++) {
    pokemons.push({
      name: pokemonResponse.results[index].name,
      url: pokemonResponse.results[index].url,
    });
  }

  pushPokemonInfos();
  //   pushPokemonImgUrl();
  console.log(pokemons);
  renderPokemons();
}

async function pushPokemonInfos() {
  for (let index = 0; index < pokemons.length; index++) {
    let pokemonInfo = await getPokemonInfos(pokemons[index].url);
    let pokemonImgUrl = await getPokemonInfos(pokemonInfo.forms[0].url);

    let currentObject = pokemons[index];
    Object.assign(currentObject, pokemonInfo);
  }
}

async function pushPokemonImgUrl() {
  for (let index = 0; index < pokemons.length; index++) {
    d;
    let pokemonImgUrl = await getPokemonInfos(pokemons[index].forms[0].url);
    let currentObject = pokemons[index];
    Object.assign(currentObject, pokemonImgUrl);
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

function renderPokemons() {
  let main = document.getElementById("main");
  for (let index = 0; index < pokemons.length; index++) {
    main.innerHTML += pokemonThumbnailArticleTemplate(index);
  }
}

async function getPokemonImgUrl() {
  let response = await fetch(path);
  return (responseToJson = await response.json());
}
