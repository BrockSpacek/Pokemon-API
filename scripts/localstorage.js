function saveToLocalStorage(pokemon){

    let pokemonArr = getFromLocalStorage();

    if(!pokemonArr.includes(pokemon)){
        pokemonArr.push(pokemon);
    }

    localStorage.setItem('pokemon', JSON.stringify(pokemonArr));

}

function getFromLocalStorage(){
    let localStorageData = localStorage.getItem('pokemon');

    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(pokemon){

    let localStorageData = getFromLocalStorage();

    let pokemonIndex = localStorageData.indexOf(pokemon);

    localStorageData.splice(pokemonIndex, 1);

    localStorage.setItem('pokemon', JSON.stringify(localStorageData));
}



export{ saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage }