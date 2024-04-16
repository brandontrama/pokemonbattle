
var searchParams = new URLSearchParams(window.location.search);
var player = searchParams.get('pokemon').toUpperCase();

let opponent;

chooseOpponent(player);

const playerPokemon = document.getElementById('players-pokemon');
playerPokemon.setAttribute('src', `sprites/Gen I/back_sprites/${player}_backsprite.png`);
const opponentPokemon = document.getElementById('opponents-pokemon');
opponentPokemon.setAttribute('src', `sprites/Gen I/front_sprites/reg/${opponent}_frontsprite.png`);

const playerHealthLabel = document.getElementById('player-health-label');
playerHealthLabel.appendChild(document.createTextNode(`${player}` + `:`));
const opponentHealthLabel = document.getElementById('opponent-health-label');
opponentHealthLabel.appendChild(document.createTextNode(`${opponent}` + `:`));

// assigns the correct opponent based on the player based on type-opposites
function chooseOpponent(player) {
    switch (player) {
        case 'BULBASAUR':
            opponent = 'CHARMANDER';
            break;
        case 'CHARMANDER':
            opponent = 'SQUIRTLE';
            break;
        case 'SQUIRTLE':
            opponent = 'BULBASAUR';
    }
}

const battleButtons = document.querySelectorAll('.battle-buttons');

const fightButton = document.getElementById('fight-button');
fightButton.addEventListener("click", fight);


