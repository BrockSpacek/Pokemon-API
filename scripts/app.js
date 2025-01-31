// alert("This site only includes the first five generations of Pokemon")


import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from "./localstorage.js";

// Element IDs
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
let favoriteTab = document.getElementById('favoriteTab');

let randomBtn = document.getElementById("randomBtn");
let heartBtn = document.getElementById("heartBtn");
let shinyBtn = document.getElementById("shinyBtn");
let getFavBtn = document.getElementById("getFavBtn");


// API Fetch
const PokemonNameApi = async (names) => {
  const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${names}`);
  const data = await promise.json();
  console.log(data);
  return data;
};

const LocationApi = async (idOfPokemon) => {
    const promise = await fetch (`https://pokeapi.co/api/v2/pokemon/${idOfPokemon}/encounters`);
    const locationData = await promise.json();
    console.log(locationData);
    return locationData;
}


const getPokemonApi = async(pokemon) =>{
    const fetchData = await fetch (`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`)
    const data = await fetchData.json()

    return data
}
const getEvolutionApi = async(evolutionChain) =>{
    const fetchData = await fetch(evolutionChain)
    const data = await fetchData.json()

    return data
}

// Global Variables
let nameOfPokemon = "";
let idOfPokemon = 0;
let abilitiesOfPokemon = [];
let movesOfPokemon = [];
let typesOfPokemon = [];
let locationOfPokemon = [];
let evolutionsOfPokemon = [];
let shinyImage = "";
let dullImage = "";
let evolutionChain= "";

let isGenOneThroughFive = false;
let favoritesIsOpen = false;


// Reset Function 

function PokeClear(){
    nameOfPokemon = "";
    idOfPokemon = 0;
    abilitiesOfPokemon = [];
    movesOfPokemon = [];
    typesOfPokemon = [];
    locationOfPokemon = [];
    evolutionsOfPokemon = [];
    shinyImage = "";
    dullImage = "";

    
    isGenOneThroughFive = false;

    favoritesIsOpen = false;
}

// Search Function

Pokedex.addEventListener("keydown", async (event) => {
    PokeClear();

  if (event.key === "Enter" && PokemonInput.value !== "") {
    PokeLogic(PokemonInput.value);
  }
});

// Button Press

shinyBtn.addEventListener("click", () => {
  if (PokemonImage.src == dullImage) {
    PokemonImage.src = shinyImage;
  } else {
    PokemonImage.src = dullImage;
  }
});

randomBtn.addEventListener("click", async()=>{
    let randomID = Math.floor(Math.random() * 649);

    PokeClear();
    PokeLogic(randomID)
})

getFavBtn.addEventListener("click", () => {
    if (!favoritesIsOpen) {
        favoritesIsOpen = true;
        favoriteTab.classList.remove("hide");
        favoriteTab.classList.add("show");
    } else {
        favoritesIsOpen = false;
        favoriteTab.classList.remove("show");
        favoriteTab.classList.add("hide");
    }

})



// Search Logic

async function PokeLogic(pokeSearch) {
    let data = await PokemonNameApi(pokeSearch);
  
    if (data.id > 649) {
        console.log("That pokemon is not in our Pokedex! Please try again");
        return;
    } else {
        isGenOneThroughFive = true;
    }

    if (isGenOneThroughFive) {
        nameOfPokemon = data.name[0].toUpperCase() + data.name.slice(1);

        updateHeartButtonState(); 

        idOfPokemon = data.id;

        let locationData = await LocationApi(idOfPokemon);
        let speciesData = await getPokemonApi(pokeSearch); 


    console.log(speciesData)
   

    data.types.forEach((types) => {
      types.type.name[0].toUpperCase() + types.type.name.slice(1);
      typesOfPokemon.push(
        types.type.name[0].toUpperCase() + types.type.name.slice(1)
      );
    });

    data.abilities.forEach((abilities) => {
        abilities.ability.name.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        abilitiesOfPokemon.push(abilities.ability.name.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "));
    });

    data.moves.forEach((moves) => {
        moves.move.name.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        movesOfPokemon.push(moves.move.name.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "))
    });

    if (locationData.length > 0) {
        locationData[0].location_area.name.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

        locationOfPokemon.push(locationData[0].location_area.name.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "))
        PokemonLocation.innerText = `Locations: ${locationOfPokemon}`     
    }
    else
    {
        PokemonLocation.innerText = " Locations: N/A"
    }

    shinyImage = data.sprites.front_shiny;
    dullImage = data.sprites.front_default;

    PokemonName.innerText = nameOfPokemon;
    PokemonId.innerText = `#${idOfPokemon}`;
  
    PokemonType.innerText = `Types: ${typesOfPokemon.join(" | ")}`;
    PokemonAbilities.innerText = abilitiesOfPokemon.join(" | ");
    PokemonMoves.innerText = movesOfPokemon.join(" | ");
    PokemonImage.src = dullImage;
  }
}

PokeLogic("Bulbasaur");


// Local Storage

function isPokemonFavorited(pokemonName) {
    const favorites = getFromLocalStorage();
    return favorites.includes(pokemonName);
}


const storedValue = document.getElementById('storedValue');

heartBtn.addEventListener('click', () => {
    
    if(!isPokemonFavorited(nameOfPokemon)) {
        saveToLocalStorage(nameOfPokemon);
        console.log(`Added to Favorites ${nameOfPokemon}`);
        
        heartBtn.classList.add('favorited');
    } else {
        removeFromLocalStorage(nameOfPokemon);
        console.log(`Removed from Favorites: ${nameOfPokemon}`);
        
        heartBtn.classList.remove('favorited');
    }
    loadFavorites();
});

async function loadFavorites() {
    const storedFavorites = getFromLocalStorage();
    storedValue.innerHTML = '';  
    
    for (const pokemon of storedFavorites) {
        const pTag = document.createElement('p');
        const removeButton = document.createElement('button');
        removeButton.innerText = "X";
        removeButton.classList.add('m-2');

        removeButton.addEventListener('click', (e) => {
            removeFromLocalStorage(pokemon);
          
            if (pokemon === nameOfPokemon) {
                heartBtn.classList.remove('favorited');
            }
            loadFavorites();
        });

        pTag.className = "text-center text-white ";
        pTag.innerText = pokemon;
        pTag.appendChild(removeButton);
        storedValue.appendChild(pTag);
    }
}

function updateHeartButtonState() {
    if (isPokemonFavorited(nameOfPokemon)) {
        heartBtn.classList.add('favorited');
    } else {
        heartBtn.classList.remove('favorited');
    }
}

loadFavorites();


