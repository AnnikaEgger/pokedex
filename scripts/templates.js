function pokemonThumbnailArticleTemplate(index) {
  return `<article class="pokemon-article">
  <section class="article-top">
          <p>#${index + 1}</p>
          <h2>${pokemons[index].name}</h2>
        </section>
        
      </article>`;
}
