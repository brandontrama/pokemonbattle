
// plays the background wild battle music
var music = new Audio('audios/music/pokemon_red_wildbattlemusic.mp3');
music.volume = 0.5;
music.play();

// grabs the query param that specifies the player's pokemon
var searchParams = new URLSearchParams(window.location.search);
var player = searchParams.get('pokemon').toUpperCase();

let opponent;

// assigns the opponent according to the player
chooseOpponent(player);

// displays both player and opponent's pokemon
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
    ["TACKLE", 40], // each move has a name and dmg value [name, dmg]
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

// replaces battle menu with fight menu
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

// attacks a pokemon with the specified move depending on target
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

// heals a pokemon depending on the target
function heal(target) {
    switch (target) {
        case 'opponent':
            opponentHealth += 20;
            console.log("Opponent health: " + opponentHealth);
            opponentHealthBar.className = `progress-bar p${opponentHealth}`;
            break;
        case 'player':
            playerHealth += 20;
            console.log("Player health: " + playerHealth)
            playerHealthBar.className = `progress-bar p${playerHealth}`;
            break;
    }
}

// shows the list of items available to use (in this case only a base potion)
function showItems() {
    let ul = document.createElement('ul');
    ul.className = 'framed buttons compact';
    let li = document.createElement('li');
    let potionBtn = document.createElement('button');
    potionBtn.appendChild(document.createTextNode("Potion"));
    potionBtn.addEventListener("click", () => {
        heal('player');
        returnToMenu();
    });
    li.appendChild(potionBtn);
    ul.appendChild(li);
    battleOptions.replaceChildren(ul);
}

// reverts the menu back to the default 4 options [fight, pkmn (not implemented), item, run]
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
    itemBtn.addEventListener("click", showItems);
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
