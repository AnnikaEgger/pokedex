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
}

function arrowLeft(index) {
  let newIndex;

  if (index == 0) {
    newIndex = currentPokemons.length - 1;
  } else {
    newIndex = index - 1;
  }

  renderPokemonDialog(newIndex);
}

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

function chooseDetailInfo(info, index) {
  activeDetailInfo = info;
  renderDetailInfo(index);
}

async function renderDetailInfo(index) {
  const DETAIL_INFO_SECTION = document.getElementById("detail-info-section");

  if (activeDetailInfo == "main") {
    await getDetailedInfosMain(index);
    DETAIL_INFO_SECTION.innerHTML = dialogMainTemplate();
  } else if (activeDetailInfo == "stats") {
    await getDetailedInfosStats(index);
    DETAIL_INFO_SECTION.innerHTML = dialogStatsTemplate();
  } else if (activeDetailInfo == "evo-chain") {
    let evoStageFigures = await getEvolutionChain(index);
    renderEvoChain(evoStageFigures);
  }
}

function renderEvoChain(evoStageFigures) {
  const DETAIL_INFO_SECTION = document.getElementById("detail-info-section");
  DETAIL_INFO_SECTION.innerHTML = "";

  for (
    let indexEvoFigure = 0;
    indexEvoFigure < evoStageFigures.length;
    indexEvoFigure++
  ) {
    DETAIL_INFO_SECTION.innerHTML += dialogEvoChainTemplate(
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

function filterEvoStageFigures(evoStageFiguresUnfiltered) {
  const evoStageFigures = evoStageFiguresUnfiltered.filter(
    function checkIfUndefined(evoStageFigure) {
      return evoStageFigure != undefined;
    },
  );
  return evoStageFigures;
}

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
  return (responseToJson = await response.json());
}
