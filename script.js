const BASE_URL = "https://pokeapi.co/api/v2/";
let offset = 0;
const LIMIT = 25;

let allPokemons = [];
let currentPokemons = [];

function init() {
  currentPokemons = allPokemons;
  loadPokemon();
}

// get and render pokemons
async function loadPokemon() {
  loadingSpinner("none", "none", "flex");

  let pokemonResponse = await getPokemonInfos(
    BASE_URL + `pokemon?limit=${LIMIT}&offset=${offset}` + ".json",
  );

  for (let index = 0; index < pokemonResponse.results.length; index++) {
    allPokemons.push({
      name: pokemonResponse.results[index].name,
      url: pokemonResponse.results[index].url,
    });
  }

  await pushPokemonBaseInfos();
  loadingSpinner("flex", "", "none");

  renderPokemons();
  renderLoadMoreBtn();
}

function renderLoadMoreBtn() {
  let loadMoreSec = document.getElementById("load-more-section");
  loadMoreSec.innerHTML = loadMoreBtnTemplate();
}

// function showLoadingSpinner() {
//   let pokeSec = document.getElementById("pokemon-section");
//   pokeSec.style.display = "none";

//   let loadMoreSec = document.getElementById("load-more-section");
//   loadMoreSec.style.display = "none";

//   let loadingSpinner = document.getElementById("loading-spinner");
//   loadingSpinner.style.display = "flex";
// }

// function hideLoadingSpinner() {
//   let pokeSec = document.getElementById("pokemon-section");
//   pokeSec.style.display = "flex";

//   let loadMoreSec = document.getElementById("load-more-section");
//   loadMoreSec.style.display = "";

//   let loadingSpinner = document.getElementById("loading-spinner");
//   loadingSpinner.style.display = "none";
// }

function loadingSpinner(pokeSecStyle, loadSecStyle, spinnerStyle) {
  let pokeSec = document.getElementById("pokemon-section");
  pokeSec.style.display = pokeSecStyle;

  let loadMoreSec = document.getElementById("load-more-section");
  loadMoreSec.style.display = loadSecStyle;

  let loadingSpinner = document.getElementById("loading-spinner");
  loadingSpinner.style.display = spinnerStyle;
}

// get and push base information about each pokemon
async function pushPokemonBaseInfos() {
  for (let index = 0; index < allPokemons.length; index++) {
    let pokemonBaseInfos = await getPokemonBaseInfos(allPokemons[index].url);

    let currentObject = allPokemons[index];
    Object.assign(currentObject, pokemonBaseInfos);

    await getPokemonTypesIcons(index);
  }
}

async function getPokemonBaseInfos(path) {
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
    indexType < allPokemons[index].types.length;
    indexType++
  ) {
    let response = await fetch(allPokemons[index].types[indexType].type.url);
    let responseToJson = await response.json();
    let typeIconUrl =
      responseToJson.sprites["generation-vii"]["lets-go-pikachu-lets-go-eevee"]
        .symbol_icon;
    let typeNumber = indexType + 1;

    allPokemons[index]["type" + typeNumber + "_icon"] = typeIconUrl;
  }
}

// render pokemon thumbnails/ small view
function renderPokemons() {
  const POKEMON_SECTION = document.getElementById("pokemon-section");

  POKEMON_SECTION.innerHTML = "";

  for (let index = 0; index < currentPokemons.length; index++) {
    POKEMON_SECTION.innerHTML += pokemonThumbnailArticleTemplate(index);

    const typeSection = document.getElementById("type-section" + index);
    typeSection.innerHTML = renderTypeIcons(index);
  }
}

function renderTypeIcons(index) {
  let returnValue = "";

  for (
    let indexType = 0;
    indexType < currentPokemons[index].types.length;
    indexType++
  ) {
    let typeNumber = indexType + 1;

    returnValue += `<img src="${
      currentPokemons[index]["type" + typeNumber + "_icon"]
    }" alt="Pokemon Type Icon">`;
  }

  return returnValue;
}

// load more pokemon when pressing button "load more"
function loadMorePokemon() {
  offset += LIMIT;
  loadPokemon();
}

// check input if long enough (min 3 letters)
function checkInput() {
  const INPUT_REF = document.getElementById("filter-pokemon-input");
  let inputValue = INPUT_REF.value;
  const MIN_TEXT = document.getElementById("input-min-text");

  if (INPUT_REF.value.length >= 3) {
    MIN_TEXT.classList.add("visibility-hidden");
    filterPokemon(inputValue);
    renderPokemons();
  } else {
    currentPokemons = allPokemons;
    MIN_TEXT.classList.remove("visibility-hidden");
    const NOT_FOUND_TEXT = document.getElementById("no-pkm-found-h2");
    NOT_FOUND_TEXT.classList.add("display-none");

    renderPokemons();
  }
}

// hide text below inputfield when unfocusing it
function hideInputMinText() {
  const MIN_TEXT = document.getElementById("input-min-text");
  MIN_TEXT.classList.add("visibility-hidden");
}

// filter pokemon based on input text, if not display "no pokemon found"
function filterPokemon(inputValue) {
  currentPokemons = allPokemons.filter((obj) => obj.name.includes(inputValue));

  const NOT_FOUND_TEXT = document.getElementById("no-pkm-found-h2");
  if (currentPokemons.length == 0) {
    NOT_FOUND_TEXT.classList.remove("display-none");
  } else {
    NOT_FOUND_TEXT.classList.add("display-none");
  }
}
