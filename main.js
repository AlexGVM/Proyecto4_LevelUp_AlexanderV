const pokemonContainer = document.getElementById("pokemon-container")
const spinner = document.getElementById("spinner")


var numIdPokemon = 0;
var numIdPokemon1 = [];

randomPokemon1()

function apiPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => {
        createPokemon(data);
        spinner.style.display = "none";
    })
}

function randomPokemon1(){
    spinner.style.display = "block";
    for (let i = 0; i < 6 ; i++){
        numIdPokemon1.push(Math.floor(Math.random()*890))
    }
    numIdPokemon1.forEach(x => {
        apiPokemon(x);
    });
}

function createPokemon(pokemon){

    const backCard = document.createElement("div");
    backCard.classList.add("flip-card");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    backCard.appendChild(cardContainer);

    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;

    imgContainer.appendChild(sprite);

    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;

    card.appendChild(imgContainer);
    card.appendChild(number);
    card.appendChild(name);

    const cardBack = document.createElement("div");
    cardBack.classList.add("pokemon-block-back");
    cardBack.appendChild(progressPercents(pokemon.stats));

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(backCard);
}

function progressPercents(stats) {

    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");
  
    //traer solamente 3 datos
    for (let i = 0; i < 3; i++) {
        
      const stat = stats[i];
  
      const percentStat = stat.base_stat + "%";
      const statContainer = document.createElement("stat-container");
      statContainer.classList.add("stat-container");
  
      const statName = document.createElement("p");
      statName.textContent = stat.stat.name.toUpperCase();
  
      
      const progress = document.createElement("div");
      progress.classList.add("progress1");
  
      const progressPercent = document.createElement("div");
      progressPercent.classList.add("progress-percent");
      progressPercent.textContent = percentStat;
  
      progress.appendChild(progressPercent);
      statContainer.appendChild(statName);
      statContainer.appendChild(progress);

      statContainer.style.display = "flex";
      statContainer.style.justifyContent = "center";
      statContainer.style.justifyItems = "center";
      statName.style.paddingRight = "40px";

      statsContainer.appendChild(statContainer);
    
    }
  
    return statsContainer;
  }