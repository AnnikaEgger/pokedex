let activeDetailInfo = "main";
let mainInfos = {};
let stats = {};
const POKEMON_DIALOG = document.getElementById("pokemon-dialog");

function openPokemonDialog(index) {
  renderPokemonDialog(index);
  POKEMON_DIALOG.showModal();
}

function renderPokemonDialog(index) {
  POKEMON_DIALOG.innerHTML = pokemonDialogTemplate(index);
  renderDetailInfo(index);
  getEvolutionChain(index);
  // getDetailedInfosMain(index);
}

// POKEMON_DIALOG.addEventListener("click", (event) => {
//   if (event.target === POKEMON_DIALOG) {
//     POKEMON_DIALOG.close();
// when closing dialog: clear mainInfos, statsInfos, etc.
//   }
// });

function chooseDetailInfo(info, index) {
  activeDetailInfo = info;
  // renderPokemonDialog(index);
  renderDetailInfo(index);
}

async function renderDetailInfo(index) {
  let detailInfoSection = document.getElementById("detail-info-section");
  let mainBtn = document.getElementById("main-btn");

  if (activeDetailInfo == "main") {
    await getDetailedInfosMain(index);
    detailInfoSection.innerHTML = dialogMainTemplate();
  } else if (activeDetailInfo == "stats") {
    await getDetailedInfosStats(index);
    detailInfoSection.innerHTML = dialogStatsTemplate();
  } else if (activeDetailInfo == "evo-chain") {
    detailInfoSection.innerHTML = dialogEvoChainTemplate();
  }
}

async function getDetailedInfosMain(index) {
  let response = await fetch(pokemons[index].url);
  responseToJson = await response.json();

  let abilities = [];

  for (
    let indexAbility = 0;
    indexAbility < responseToJson.abilities.length;
    indexAbility++
  ) {
    abilities.push(responseToJson.abilities[indexAbility].ability.name);
  }

  mainInfos = {
    height: responseToJson.height,
    weight: responseToJson.weight,
    base_experience: responseToJson.base_experience,
    abilities: abilities,
  };
}

async function getDetailedInfosStats(index) {
  let response = await fetch(pokemons[index].url);
  responseToJson = await response.json();

  console.log(responseToJson);

  stats = {
    hp: responseToJson.stats[0].base_stat,
    attack: responseToJson.stats[1].base_stat,
    defense: responseToJson.stats[2].base_stat,
    special_attack: responseToJson.stats[3].base_stat,
    special_defense: responseToJson.stats[4].base_stat,
    speed: responseToJson.stats[5].base_stat,
  };
}

// get pokemon --> get species --> evolution-chain/X/

async function getEvolutionChain(index) {
  let allInfos = await getPokemonInfos(pokemons[index].url);
  console.log(allInfos);

  let speciesInfos = await getPokemonInfos(allInfos.species.url);
  console.log(speciesInfos);

  let evoChainInfos = await getPokemonInfos(speciesInfos.evolution_chain.url);
  console.log(evoChainInfos);

  let evoStage1Img = getEvoStageImg(evoChainInfos, 1);
  let evoStage2Img = getEvoStageImg(evoChainInfos, 2);
  let evoStage3Img = getEvoStageImg(evoChainInfos, 3);

  let evStage1Name = evoChainInfos.chain.species.name;
  console.log(evStage1Name);

  let evStage1Infos = await getPokemonInfos(
    BASE_URL + "pokemon/" + evStage1Name,
  );
  console.log(evStage1Infos);

  let evStage1Img = evStage1Infos.sprites.other.home.front_default;
  console.log(evStage1Img);

  // let evStage1Species = evoChainInfos.chain.species.url;

  // let evStage1Pokemon = await getPokemonInfos(evoChainInfos.chain.species.url);
  // console.log(evStage1Pokemon);

  // let evStage2;
  // let evStage3;
}

async function getEvoStageImg(evoChainInfos, stage) {
  // path to the name is different for each stage
  if (stage == 1) {
    evStageName = evoChainInfos.chain.species.name;
  } else if (stage == 2) {
    evStageName = "";
  } else if (stage == 3) {
    evStageName = "";
  }

  let evStageInfos = await getPokemonInfos(BASE_URL + "pokemon/" + evStageName);
  console.log(evStageInfos);

  return (evStageImg = evStageInfos.sprites.other.home.front_default);
  console.log(evStageImg);
}

async function getPokemonInfos(path) {
  let response = await fetch(path);
  return (responseToJson = await response.json());
}
