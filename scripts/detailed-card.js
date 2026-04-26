let activeDetailInfo = "main";
let mainInfos = {};
let stats = {};
const POKEMON_DIALOG = document.getElementById("pokemon-dialog");

// rendering and opening dialog
function openPokemonDialog(index) {
  renderPokemonDialog(index);
  POKEMON_DIALOG.showModal();
}

function renderPokemonDialog(index) {
  POKEMON_DIALOG.innerHTML = pokemonDialogTemplate(index);
  renderDetailInfo(index);
}

// switch to pokemon to the left
function arrowLeft(index) {
  let newIndex;

  if (index == 0) {
    newIndex = currentPokemons.length - 1;
  } else {
    newIndex = index - 1;
  }

  renderPokemonDialog(newIndex);
}

// switch to pokemon to the right
function arrowRight(index) {
  let newIndex;

  if (index == currentPokemons.length - 1) {
    newIndex = 0;
  } else {
    newIndex = index + 1;
  }

  renderPokemonDialog(newIndex);
}

POKEMON_DIALOG.addEventListener("click", (event) => {
  if (event.target === POKEMON_DIALOG) {
    POKEMON_DIALOG.close();
    activeDetailInfo = "main";
  }
});

// choosing detail info based on which button is being clicked (main, stats or evo-chain)
function chooseDetailInfo(info, index) {
  activeDetailInfo = info;
  renderDetailInfo(index);
}

// render the correct detail info
async function renderDetailInfo(index) {
  updateBorderBottom();

  switch (activeDetailInfo) {
    case "main":
      await renderDetailMainStats(
        index,
        "getDetailedInfosMain()",
        "dialogMainTemplate()",
      );
      break;
    case "stats":
      await renderDetailMainStats(
        index,
        getDetailedInfosStats(index),
        dialogStatsTemplate(),
      );
      break;
    case "evo-chain":
      await loadEvoChain(index);
      break;
  }
}

async function renderDetailMainStats(index, getInfo, htmlTemplate) {
  const DETAIL_INFO_SECTION = document.getElementById("detail-info-section");
  await getInfo;
  DETAIL_INFO_SECTION.innerHTML = htmlTemplate;
}

// async function renderMain(index) {
//   const DETAIL_INFO_SECTION = document.getElementById("detail-info-section");
//   await getDetailedInfosMain(index);
//   DETAIL_INFO_SECTION.innerHTML = dialogMainTemplate();
// }

// async function renderStats(index) {
//   const DETAIL_INFO_SECTION = document.getElementById("detail-info-section");
//   await getDetailedInfosStats(index);
//   DETAIL_INFO_SECTION.innerHTML = dialogStatsTemplate();
// }

// get and render evo chain, show loading spinner while waiting
async function loadEvoChain(index) {
  const DETAIL_INFO_SECTION = document.getElementById("detail-info-section");
  showLoadingSpinnerEvo();
  let evoStageFigures = await getEvolutionChain(index);
  hideLoadingSpinnerEvo();
  renderEvoChain(evoStageFigures);
}

// turning border-bottom-color of pressed button to red
function updateBorderBottom() {
  const MAIN_BTN = document.getElementById("main-btn");
  const STATS_BTN = document.getElementById("stats-btn");
  const EVO_CHAIN_BTN = document.getElementById("evo-chain-btn");

  switch (activeDetailInfo) {
    case "main":
      STATS_BTN.style.borderBottom = "";
      EVO_CHAIN_BTN.style.borderBottom = "";
      MAIN_BTN.style.borderBottom = "2px solid rgb(248, 79, 79)";
      break;
    case "stats":
      MAIN_BTN.style.borderBottom = "";
      EVO_CHAIN_BTN.style.borderBottom = "";
      STATS_BTN.style.borderBottom = "2px solid rgb(248, 79, 79)";
      break;
    case "evo-chain":
      MAIN_BTN.style.borderBottom = "";
      STATS_BTN.style.borderBottom = "";
      EVO_CHAIN_BTN.style.borderBottom = "2px solid rgb(248, 79, 79)";
      break;
  }
}

function showLoadingSpinnerEvo() {
  const DETAIL_INFO_SECTION = document.getElementById("detail-info-section");
  DETAIL_INFO_SECTION.innerHTML = loadingSpinnerTemplate();
}

function hideLoadingSpinnerEvo() {
  const DETAIL_INFO_SECTION = document.getElementById("detail-info-section");
  DETAIL_INFO_SECTION.innerHTML = "";
}

function renderEvoChain(evoStageFigures) {
  const DETAIL_INFO_SECTION = document.getElementById("detail-info-section");
  DETAIL_INFO_SECTION.innerHTML = "";

  for (
    let indexEvoFigure = 0;
    indexEvoFigure < evoStageFigures.length;
    indexEvoFigure++
  ) {
    DETAIL_INFO_SECTION.innerHTML += dialogEvoChainFigureTemplate(
      evoStageFigures,
      indexEvoFigure,
    );
    if (indexEvoFigure !== evoStageFigures.length - 1) {
      DETAIL_INFO_SECTION.innerHTML += EvoChainArrowSvgTemplate();
    }
  }
}

async function getDetailedInfosMain(index) {
  let allInfos = await getPokemonInfos(currentPokemons[index].url);
  let abilities = [];

  for (
    let indexAbility = 0;
    indexAbility < allInfos.abilities.length;
    indexAbility++
  ) {
    abilities.push(allInfos.abilities[indexAbility].ability.name);
  }

  mainInfos = {
    height: allInfos.height,
    weight: allInfos.weight,
    base_experience: allInfos.base_experience,
    abilities: abilities,
  };

  console.log(mainInfos);
}

async function getDetailedInfosStats(index) {
  let allInfos = await getPokemonInfos(currentPokemons[index].url);

  stats = {
    hp: allInfos.stats[0].base_stat,
    attack: allInfos.stats[1].base_stat,
    defense: allInfos.stats[2].base_stat,
    special_attack: allInfos.stats[3].base_stat,
    special_defense: allInfos.stats[4].base_stat,
    speed: allInfos.stats[5].base_stat,
  };
}

async function getEvolutionChain(index) {
  const allInfos = await getPokemonInfos(currentPokemons[index].url);
  const speciesInfos = await getPokemonInfos(allInfos.species.url);
  const evoChainInfos = await getPokemonInfos(speciesInfos.evolution_chain.url);

  const evoStage1Figure = await getEvoStageFigure(evoChainInfos, 1);
  const evoStage2Figure = await getEvoStageFigure(evoChainInfos, 2);
  const evoStage3Figure = await getEvoStageFigure(evoChainInfos, 3);

  let evoStageFiguresUnfiltered = [];
  evoStageFiguresUnfiltered.push(
    evoStage1Figure,
    evoStage2Figure,
    evoStage3Figure,
  );
  return filterEvoStageFigures(evoStageFiguresUnfiltered);
}

async function getEvoStageFigure(evoChainInfos, stage) {
  let evStageName = getEvStageName(evoChainInfos, stage);

  if (evStageName) {
    let evStageInfos = await getPokemonInfos(
      BASE_URL + "pokemon/" + evStageName,
    );
    let evStageFigure = {
      img_url: evStageInfos.sprites.other.home.front_default,
      name: evStageName,
    };
    return evStageFigure;
  } else {
    return;
  }
}

// filtering out undefined evo stage figures
function filterEvoStageFigures(evoStageFiguresUnfiltered) {
  const evoStageFigures = evoStageFiguresUnfiltered.filter(
    function checkIfUndefined(evoStageFigure) {
      return evoStageFigure != undefined;
    },
  );
  return evoStageFigures;
}

// getting pokemons name of each evolution stage
function getEvStageName(evoChainInfos, stage) {
  if (stage == 1) {
    return evoChainInfos.chain.species.name;
  } else if (stage == 2 && evoChainInfos.chain.evolves_to.length > 0) {
    return evoChainInfos.chain.evolves_to[0].species.name;
  } else if (
    stage == 3 &&
    evoChainInfos.chain.evolves_to.length > 0 &&
    evoChainInfos.chain.evolves_to[0].evolves_to.length > 0
  ) {
    return evoChainInfos.chain.evolves_to[0].evolves_to[0].species.name;
  }
}

async function getPokemonInfos(path) {
  let response = await fetch(path);
  let responseToJson = await response.json();
  console.log(responseToJson);

  return responseToJson;
}
