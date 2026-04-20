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
        <button class="btn-main">main</button
        ><button class="btn-stats">stats</button
        ><button class="btn-evo-chain">evo chain</button>
      </section>
      
    <section class="detail-info-section">
       ${dialogStatsTemplate()}
    </section>
    
    <section class="dialog-arrow-btn-section">
     <button><img src="../assets/icons/arrow-left.svg" alt="" /></button>
      <button><img src="../assets/icons/arrow-right.svg" alt="" /></button>
      </section>`;
}

function dialogMainTemplate() {
  return `<table class="main-info-table">
        <tr>
          <td>Height:</td>
          <td></td>
        </tr>
        <tr>
          <td>Weight:</td>
          <td></td>
        </tr>
        <tr>
          <td>Base Experience:</td>
          <td></td>
        </tr>
        <tr>
          <td>Abilities:</td>
          <td></td>
        </tr>
      </table>`;
}

function dialogStatsTemplate() {
  return `   <table>
        <tr>
          <td>hp</td>
          <td><progress id="hp-progress" max="100" value="10"></progress></td>
        </tr>
        <tr>
          <td>attack</td>
          <td>
            <progress id="attack-progress" max="100" value="10"></progress>
          </td>
        </tr>
        <tr>
          <td>defense</td>
          <td>
            <progress id="defense-progress" max="100" value="10"></progress>
          </td>
        </tr>
        <tr>
          <td>special-attack</td>
          <td>
            <progress
              id="special-attack-progress"
              max="100"
              value="10"
            ></progress>
          </td>
        </tr>
        <tr>
          <td>special-defense</td>
          <td>
            <progress
              id="special-defense-progress"
              max="100"
              value="10"
            ></progress>
          </td>
        </tr>
        <tr>
          <td>speed</td>
          <td>
            <progress id="speed-progress" max="100" value="10"></progress>
          </td>
        </tr>
      </table>`;
}

function dialogEvoChainTemplate() {}
