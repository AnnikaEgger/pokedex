function pokemonThumbnailArticleTemplate(index) {
  return `<article class="pokemon-article">
    <section class="article-top">
      <p>#${index + 1}</p>
      <h2>
      ${String(pokemons[index].name).charAt(0).toUpperCase() + String(pokemons[index].name).slice(1)}
      </h2>
    </section>
    <section id= "${"img-section" + index}" 
      class="pokemon-img-section-front ${pokemons[index].types[0].type.name}">
      <img src="${pokemons[index].sprites.other.home.front_default}" alt="" class="pokemon-img">
    </section>
        
  </article>`;
}
