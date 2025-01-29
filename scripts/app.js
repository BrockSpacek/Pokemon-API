// alert("This site only includes the first five generations of Pokemon")

let PokemonName = document.getElementById("PokemonName");
let PokemonType = document.getElementById("PokemonType");
let PokemonLocation = document.getElementById("PokemonLocation");
let PokemonId = document.getElementById("PokemonId");
let PokemonMoves = document.getElementById("PokemonMoves");
let PokemonAbilities = document.getElementById("PokemonAbilities");
let PokemonEvolution = document.getElementById("PokemonEvolution");
let PokemonImage = document.getElementById("PokemonImage");

let Pokedex = document.getElementById("Pokedex");
let PokemonInput = document.getElementById("PokemonInput");

let randomBtn = document.getElementById("randomBtn")
let heartBtn = document.getElementById("heartBtn")
let shinyBtn = document.getElementById("shinyBtn")
let getFavBtn = document.getElementById("getFavBtn")

const PokemonNameApi = async (names) => {
  const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${names}`);
  const data = await promise.json();
  console.log(data);
  return data;
};

let nameOfPokemon = "";
let idOfPokemon = 0;
let abilitiesOfPokemon = [];
let movesOfPokemon = [];
let typesOfPokemon = [];
let locationOfPokemon = "";
let imageOfPokemon;
let evolutionsOfPokemon = [];

let isGenOneThroughFive = false;

Pokedex.addEventListener("keydown", async (event) => {
  nameOfPokemon = "";
  idOfPokemon = 0;
  abilitiesOfPokemon = [];
  movesOfPokemon = [];
  typesOfPokemon = [];
  locationOfPokemon = "";

  isGenOneThroughFive = false;

  if (event.key === "Enter" && PokemonInput.value !== "") {
    let data = await PokemonNameApi(PokemonInput.value);

    if (data.id > 649) {
      console.log("That pokemon is not in our Pokedex! Please try again");
    } else {
      isGenOneThroughFive = true;
    }

    if (isGenOneThroughFive == true) {
      nameOfPokemon = data.name[0].toUpperCase() + data.name.slice(1);
      idOfPokemon = `#${data.id}`;

      data.types.forEach((types) => {
        typesOfPokemon.push(types.type.name);
      });

      data.abilities.forEach((abilities) => {
        abilitiesOfPokemon.push(abilities.ability.name);
      });

      data.moves.forEach((moves) => {
        movesOfPokemon.push(moves.move.name);
      });

      PokemonName.innerText = nameOfPokemon;
      PokemonId.innerText = idOfPokemon;
      PokemonType.innerText = typesOfPokemon.join(" | ");
      PokemonAbilities.innerText = abilitiesOfPokemon.join(" | ");
      PokemonMoves.innerText = movesOfPokemon.join(" | ");
      PokemonImage.src = data.sprites.front_default;
    }
  }
});



/*  async function PokeLogic(){

if (isGenOneThroughFive == true) {
    nameOfPokemon = data.name[0].toUpperCase() + data.name.slice(1);
    idOfPokemon = data.id;

    data.types.forEach((types) => {
      typesOfPokemon.push(types.type.name);
    });

    data.abilities.forEach((abilities) => {
      abilitiesOfPokemon.push(abilities.ability.name);
    });

    data.moves.forEach((moves) => {
      movesOfPokemon.push(moves.move.name);
    });

    PokemonName.innerText = nameOfPokemon;
    PokemonId.innerText = idOfPokemon;
    PokemonType.innerText = typesOfPokemon.join(" | ");
    PokemonAbilities.innerText = abilitiesOfPokemon.join(" | ");
    PokemonMoves.innerText = movesOfPokemon.join(" | ");
    PokemonImage.src = data.sprites.front_default;
  }
}
  */