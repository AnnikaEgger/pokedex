const POKEMON_DIALOG = document.getElementById("pokemon-dialog");

function openPokemonDialog(index) {
  renderPokemonDialog(index);
  POKEMON_DIALOG.showModal();
}

function renderPokemonDialog(index) {
  //   let pok = document.getElementById("body");
  POKEMON_DIALOG.innerHTML = pokemonDialogTemplate(index);
}

// POKEMON_DIALOG.addEventListener("click", (event) => {
//   if (event.target === POKEMON_DIALOG) {
//     POKEMON_DIALOG.close();
//   }
// });
