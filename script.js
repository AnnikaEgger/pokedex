const BASE_URL = "https://pokeapi.co/api/v2/";
let offset = 0;

let pokemons = [];

async function onloadFunc() {
  let pokemonResponse = await getAllPokemon(
    `pokemon?limit=20&offset=${offset}`,
  );

  for (let index = 0; index < pokemonResponse.results.length; index++) {
    pokemons.push({
      name: pokemonResponse.results[index].name,
      url: pokemonResponse.results[index].url,
    });
  }

  await pushPokemonBaseInfos();
  console.log(pokemons);

  renderPokemons();
  console.log(pokemons);
}

async function pushPokemonBaseInfos() {
  for (let index = 0; index < pokemons.length; index++) {
    let pokemonBaseInfos = await getPokemonInfos(pokemons[index].url);

    let currentObject = pokemons[index];
    Object.assign(currentObject, pokemonBaseInfos);

    await getPokemonTypesIcons(index);
  }
}

async function getAllPokemon(path) {
  let response = await fetch(BASE_URL + path + ".json");
  return (responseToJson = await response.json());
}

async function getPokemonInfos(path) {
  let response = await fetch(path);
  responseToJson = await response.json();
  return (baseInfos = {
    id: responseToJson.id,
    base_sprite: responseToJson.sprites.other.home.front_default,
    types: responseToJson.types,
  });
}

async function getPokemonTypesIcons(index) {
  for (
    let indexType = 0;
    indexType < pokemons[index].types.length;
    indexType++
  ) {
    let response = await fetch(pokemons[index].types[indexType].type.url);
    let responseToJson = await response.json();
    let typeIconUrl =
      responseToJson.sprites["generation-vii"]["lets-go-pikachu-lets-go-eevee"]
        .symbol_icon;
    let typeNumber = indexType + 1;

    pokemons[index]["type" + typeNumber + "_icon"] = typeIconUrl;
  }
}

function renderPokemons() {
  let main = document.getElementById("main");
  for (let index = 0; index < pokemons.length; index++) {
    main.innerHTML += pokemonThumbnailArticleTemplate(index);
    renderTypeIcons(index);
  }
}

function renderTypeIcons(index) {
  let typeSection = document.getElementById("type-section" + index);

  for (
    let indexType = 0;
    indexType < pokemons[index].types.length;
    indexType++
  ) {
    let typeNumber = indexType + 1;

    return `<img src="${
      pokemons[index]["type" + typeNumber + "_icon"]
    }" alt="Pokemon Type Icon">`;
  }
}
