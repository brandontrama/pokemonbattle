
var music = new Audio('audios/music/pokemon_red_wildbattlemusic.mp3');
music.volume = 0.5;
music.play();

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
            break;
    }
}

const battleOptions = document.getElementById('battle-options');
returnToMenu();

var bulbasaurMoves = [
    ["TACKLE", 40],
    ["VINE WHIP", 45]
];
var squirtleMoves = [
    ["TACKLE", 40],
    ["WATER GUN", 40]
];
var charmanderMoves = [
    ["TACKLE", 40],
    ["EMBER", 40]
];

var moves = [bulbasaurMoves, squirtleMoves, charmanderMoves];

function fight() {
    let moveList = document.createElement('ul');
    moveList.className = 'framed buttons compact';
    switch (player) {
        case 'BULBASAUR':
            bulbasaurMoves.forEach(move => {
                console.log(move[0]);
                let li = document.createElement('li');
                let moveButton = document.createElement('button');
                moveButton.setAttribute('id', move[0]);
                moveButton.appendChild(document.createTextNode(move[0]));
                moveButton.addEventListener("click", () => {
                    attack(move, 'opponent');
                    returnToMenu();
                });
                li.appendChild(moveButton);
                moveList.appendChild(li);
            });
            break;
        case 'SQUIRTLE':
            squirtleMoves.forEach(move => {
                console.log(move[0]);
                let li = document.createElement('li');
                let moveButton = document.createElement('button');
                moveButton.setAttribute('id', move[0]);
                moveButton.appendChild(document.createTextNode(move[0]));
                moveButton.addEventListener("click", () => {
                    attack(move, 'opponent');
                    returnToMenu();
                });
                li.appendChild(moveButton);
                moveList.appendChild(li);
            });
            break;
        case 'CHARMANDER':
            charmanderMoves.forEach(move => {
                console.log(move[0]);
                let li = document.createElement('li');
                let moveButton = document.createElement('button');
                moveButton.setAttribute('id', move[0]);
                moveButton.appendChild(document.createTextNode(move[0]));
                moveButton.addEventListener("click", () => {
                    attack(move, 'opponent');
                    returnToMenu();
                });
                li.appendChild(moveButton);
                moveList.appendChild(li);
            });
            break;
    }
    battleOptions.replaceChildren(moveList);
}

let playerHealth, opponentHealth = 100;
const playerHealthBar = document.getElementById('player-health');
const opponentHealthBar = document.getElementById('opponent-health');

function attack(move, target) {
    switch (target) {
        case 'opponent':
            opponentHealth -= move[1];
            console.log("Opponent health: " + opponentHealth);
            opponentHealthBar.className = `progress-bar p${opponentHealth}`;
            break;
        case 'player':
            playerHealth -= move[1];
            console.log("Player health: " + playerHealth)
            playerHealthBar.className = `progress-bar p${playerHealth}`;
            break;
    }
}

function returnToMenu() {
    let battlePrompt = document.createElement('h3');
    battlePrompt.appendChild(document.createTextNode('What would you like to do?'));

    let options = document.createElement('ul');
    options.className = 'framed buttons compact';
    let fightItem = document.createElement('li');
    let fightBtn = document.createElement('button');
    fightBtn.setAttribute('id', 'fight-button');
    fightBtn.appendChild(document.createTextNode('Fight'));
    fightBtn.addEventListener("click", fight);
    fightItem.appendChild(fightBtn);

    let pkmn = document.createElement('li');
    let pkmnBtn = document.createElement('button');
    pkmnBtn.className = 'pokemon';
    pkmnBtn.appendChild(document.createTextNode('PKMN'));
    pkmn.appendChild(pkmnBtn);

    let item = document.createElement('li');
    let itemBtn = document.createElement('button');
    itemBtn.appendChild(document.createTextNode('Item'));
    item.appendChild(itemBtn);

    let run = document.createElement('li');
    let runBtn = document.createElement('button');
    runBtn.appendChild(document.createTextNode('Run'));
    runBtn.addEventListener("click", () => {
        window.location.href = 'index.html';
    });
    run.appendChild(runBtn);

    options.appendChild(fightItem);
    options.appendChild(pkmn);
    options.appendChild(item);
    options.appendChild(run);
    battleOptions.replaceChildren(battlePrompt, options);
}
