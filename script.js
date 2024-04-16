
const pokemonImages = document.querySelectorAll('.pokemon');
pokemonImages.forEach(img => {
    img.addEventListener("mouseover", handleMouseOver);
    img.addEventListener("mouseleave", handleMouseLeave);
});

var bulbasaurCry = new Audio(`audios/cries/bulbasaur-cry.mp3`);
var charmanderCry = new Audio(`audios/cries/charmander-cry.mp3`);
var squirtleCry = new Audio(`audios/cries/squirtle-cry.mp3`);
bulbasaurCry.volume = 0.1;
charmanderCry.volume = 0.1;
squirtleCry.volume = 0.1;

function handleMouseOver(event) {
    //event.target.classList.add('big');
}

function handleMouseLeave(event) {
    //event.target.classList.remove('big');
}

const pokemonButtons = document.querySelectorAll('.pokemon-buttons');

pokemonButtons.forEach(button => {
    button.addEventListener("click", selectPokemon);
});

let selectedPokemon = null;

function selectPokemon(event) {
    const pokemonId = event.target.id;
    selectedPokemon = pokemonId;
    document.getElementById('confirmation-box').style.display = 'block';
    const pokemonImage = document.getElementById(selectedPokemon);
    pokemonImage.src = `sprites/GenI/front_sprites/anim/${selectedPokemon}_frontsprite[ANIM].png`;
    pokemonImage.classList.add('big');
    switch (selectedPokemon) {
        case 'bulbasaur':
            bulbasaurCry.play();
            break;
        case 'charmander':
            charmanderCry.play();
            break;
        case 'squirtle':
            squirtleCry.play();
            break;
        default:
            break;
    }
}

function confirmSelection(confirm) {
    if (confirm) {
        console.log("Selected Pokemon:", selectedPokemon);
        window.location.href = 'battle.html?pokemon=' + encodeURIComponent(selectedPokemon);
    } else {    
        document.getElementById('confirmation-box').style.display = 'none';
        const pokemonImage = document.getElementById(selectedPokemon);
        pokemonImage.src = `sprites/GenI/front_sprites/reg/${selectedPokemon}_frontsprite.png`;
        pokemonImage.classList.remove('big');
    }
    selectedPokemon = null;
}