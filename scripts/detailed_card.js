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

POKEMON_DIALOG.addEventListener("click", (event) => {
  if (event.target === POKEMON_DIALOG) {
    POKEMON_DIALOG.close();
    // when closing dialog: clear mainInfos, statsInfos, etc.
  }
});

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
    let evoStageFigures = await getEvolutionChain(index);

    detailInfoSection.innerHTML = "";

    for (
      let indexEvoFigure = 0;
      indexEvoFigure < evoStageFigures.length;
      indexEvoFigure++
    ) {
      detailInfoSection.innerHTML += `  <figure>
      <img class="evo-chain-img" src="${evoStageFigures[indexEvoFigure].img_url}" alt="" />
    <figcaption>${evoStageFigures[indexEvoFigure].name}</figcaption>
  </figure>`;
    }
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

  let speciesInfos = await getPokemonInfos(allInfos.species.url);

  let evoChainInfos = await getPokemonInfos(speciesInfos.evolution_chain.url);
  console.log(evoChainInfos);

  let evoStage1Figure = await getEvoStageImg(evoChainInfos, 1);
  let evoStage2Figure = await getEvoStageImg(evoChainInfos, 2);
  let evoStage3Figure = await getEvoStageImg(evoChainInfos, 3);

  evoStageFiguresUnfiltered = [];
  evoStageFiguresUnfiltered.push(
    evoStage1Figure,
    evoStage2Figure,
    evoStage3Figure,
  );
  let evoStageFigures = evoStageFiguresUnfiltered.filter(
    function checkIfUndefined(evoStageFigure) {
      return evoStageFigure != undefined;
    },
  );

  console.log(evoStageFigures);

  return evoStageFigures;
}

async function getEvoStageImg(evoChainInfos, stage) {
  // path to the name is different for each stage
  if (stage == 1) {
    evStageName = evoChainInfos.chain.species.name;
  } else if (stage == 2 && evoChainInfos.chain.evolves_to.length > 0) {
    evStageName = evoChainInfos.chain.evolves_to[0].species.name;
  } else if (
    stage == 3 &&
    evoChainInfos.chain.evolves_to.length > 0 &&
    evoChainInfos.chain.evolves_to[0].evolves_to.length > 0
  ) {
    evStageName = evoChainInfos.chain.evolves_to[0].evolves_to[0].species.name;
  } else {
    return;
  }

  let evStageInfos = await getPokemonInfos(BASE_URL + "pokemon/" + evStageName);

  let evStageFigure = {
    img_url: evStageInfos.sprites.other.home.front_default,
    name: evStageInfos.name,
  };
  console.log(evStageFigure);
  return evStageFigure;
}

async function getPokemonInfos(path) {
  let response = await fetch(path);
  return (responseToJson = await response.json());
}
