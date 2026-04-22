function pokemonThumbnailArticleTemplate(index) {
  return `<button onclick="openPokemonDialog(${index})" class="pokemon-btn">
  <article class="pokemon-article">

    <section class="article-top">
      <p>#${pokemons[index].id}</p>
      <h2>
      ${String(pokemons[index].name).charAt(0).toUpperCase() + String(pokemons[index].name).slice(1)}
      </h2>
    </section>

    <section id= "${"img-section" + index}" 
      class="pokemon-img-section-front ${pokemons[index].types[0].type.name}">
      <img src="${pokemons[index].base_sprite}" alt="" class="pokemon-img">
    </section>
        
    <section id="${"type-section" + index}" class="type-section">
    ${renderTypeIcons(index)}
    </section>

  </article>
  </button>`;
}

function pokemonDialogTemplate(index) {
  return ` <article class="pokemon-article">

    <section class="article-top">
      <p>#${pokemons[index].id}</p>
      <h2>
      ${String(pokemons[index].name).charAt(0).toUpperCase() + String(pokemons[index].name).slice(1)}
      </h2>
    </section>

    <section id= "${"img-section" + index}" 
      class="pokemon-img-section-detailed ${pokemons[index].types[0].type.name}">
      <img src="${pokemons[index].base_sprite}" alt="" class="pokemon-img-detailed">
    </section>
        
    <section id="${"type-section" + index}" class="type-section">
    ${renderTypeIcons(index)}
    </section>

  </article>
  
  
         <section class="dialog-btn-section">
        <button id="main-btn" onclick="chooseDetailInfo('main', ${index})"  class="btn-main">main</button
        ><button id="stats-btn" onclick="chooseDetailInfo('stats', ${index})" class="btn-stats">stats</button
        ><button id="evo-chain-btn" onclick="chooseDetailInfo('evo-chain', ${index})" class="btn-evo-chain">evo chain</button>
      </section>
      
    <section id="detail-info-section" class="detail-info-section">
    </section>
    
    <section class="dialog-arrow-btn-section">
     <button><img src="../assets/icons/arrow-left.svg" alt="" /></button>
      <button><img src="../assets/icons/arrow-right.svg" alt="" /></button>
      </section>`;
}

function dialogMainTemplate() {
  return `<table class="main-info-table">
        <tr>
          <th>Height:</th>
          <td>${mainInfos.height * 10 + "cm"}</td>
        </tr>
        <tr>
          <th>Weight:</th>
          <td>${mainInfos.weight + "kg"}</td>
        </tr>
        <tr>
          <th>Base Experience:</th>
          <td>${mainInfos.base_experience}</td>
        </tr>
        <tr>
          <th>Abilities:</th>
          <td>${mainInfos.abilities.join(", ")}</td>
        </tr>
      </table>`;
}

function dialogStatsTemplate() {
  return `   <table class="stats-table">
        <tr>
          <th>hp</th>
          <td><progress id="hp-progress" max="100" value="${stats.hp}"></progress></td>
        </tr>
        <tr>
          <th>attack</th>
          <td>
            <progress id="attack-progress" max="100" value="${stats.attack}"></progress>
          </td>
        </tr>
        <tr>
          <th>defense</th>
          <td>
            <progress id="defense-progress" max="100" value="${stats.defense}"></progress>
          </td>
        </tr>
        <tr>
          <th>special-attack</th>
          <td>
            <progress
              id="special-attack-progress"
              max="100"
              value="${stats.special_attack}"
            ></progress>
          </td>
        </tr>
        <tr>
          <th>special-defense</th>
          <td>
            <progress
              id="special-defense-progress"
              max="100"
              value="${stats.special_defense}"
            ></progress>
          </td>
        </tr>
        <tr>
          <th>speed</th>
          <td>
            <progress id="speed-progress" max="100" value="${stats.speed}"></progress>
          </td>
        </tr>
      </table>`;
}

function dialogEvoChainTemplate(evoStageFigures, indexEvoFigure) {
  return `
  <figure class="evo-figure">
      <img class="evo-chain-img" src="${evoStageFigures[indexEvoFigure].img_url}" alt="" />
    <figcaption>${evoStageFigures[indexEvoFigure].name.charAt(0).toUpperCase() + evoStageFigures[indexEvoFigure].name.slice(1)}</figcaption>
  </figure>`;
}

function EvoChainArrowSvgTemplate() {
  return `<svg class="evo-arrow" width="48px" height="48px" viewBox="0 -0.5 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="si-glyph si-glyph-two-arrow-right">
    
    <title>1133</title>
    
    <defs>

</defs>
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(1.000000, 3.000000)" fill="white">
            <path d="M11.83,4.999 L8.086,10 L12.025,10 L15.969,4.999 L11.927,0.03 L8.009,0.03 L7.998,0.041 L11.83,4.999 Z" class="si-glyph-fill">

</path>
            <path d="M4.047,4.999 L0.096,10 L4.034,10 L8,4.999 L3.935,0.03 L0.018,0.03 L0.008,0.041 L4.047,4.999 Z" class="si-glyph-fill">

</path>
        </g>
    </g>
</svg>`;
}
