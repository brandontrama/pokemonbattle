
// plays the background wild battle music
var music = new Audio('audios/music/pokemon_red_wildbattlemusic.mp3');
music.volume = 0.5;
music.play();

// grabs the query param that specifies the player's pokemon
var searchParams = new URLSearchParams(window.location.search);
var player = searchParams.get('monster').toUpperCase();

let opponent;

// assigns the opponent according to the player
chooseOpponent(player);

// displays both player and opponent's pokemon
const playerPokemon = document.getElementById('players-pokemon');
playerPokemon.setAttribute('src', `sprites/back_sprites/${player}_back.png`);
const opponentPokemon = document.getElementById('opponents-pokemon');
opponentPokemon.setAttribute('src', `sprites/front_sprites/reg/${opponent}.png`);

const playerHealthLabel = document.getElementById('player-health-label');
playerHealthLabel.appendChild(document.createTextNode(`${player}` + `:`));
const opponentHealthLabel = document.getElementById('opponent-health-label');
opponentHealthLabel.appendChild(document.createTextNode(`${opponent}` + `:`));

// assigns the correct opponent based on the player based on type-opposites
function chooseOpponent(player) {
    switch (player) {
        case 'PETALPUFF':
            opponent = 'FLAMETAIL';
            break;
        case 'FLAMETAIL':
            opponent = 'SPLASHSHELL';
            break;
        case 'SPLASHSHELL':
            opponent = 'PETALPUFF';
            break;
    }
}

const battleOptions = document.getElementById('battle-options');
returnToMenu();

// each move has a name, dmg, and pp (uses) value [name, dmg, pp]
var PETALPUFF_MOVES = [];
var FLAMETAIL_MOVES = [];
var SPLASHSHELL_MOVES = [];

// fetches the file created by the server and turns it into an array of moves
const moves = fetch('./pokemonMoves.json')
    .then((response) => response.json())
    .then(data => {
        const moves = data;
        PETALPUFF_MOVES = [
            moves[829], // Tackle
            moves[896], // Vine Whip
            moves[646]  // Razor Leaf
        ];
        FLAMETAIL_MOVES = [
            moves[829], // Tackle
            moves[694], // Scratch
            moves[219]  // Ember
        ];
        SPLASHSHELL_MOVES = [
            moves[829], // Tackle
            moves[60],  // Bite
            moves[902]  // Water Gun
        ];
        console.log(PETALPUFF_MOVES);
        console.log(FLAMETAIL_MOVES);
        console.log(SPLASHSHELL_MOVES);
    });

// replaces battle menu with fight menu
function fight() {
    let moveList = document.createElement('ul');
    moveList.className = 'framed buttons compact';
    switch (player) {
        case 'PETALPUFF':
            PETALPUFF_MOVES.forEach(move => {
                console.log(move.name);
                let li = document.createElement('li');
                let moveButton = document.createElement('button');
                moveButton.setAttribute('id', move.name);
                moveButton.appendChild(document.createTextNode(move.name));
                moveButton.addEventListener("click", () => {
                    attack(move, 'opponent');
                    setTimeout(() => {
                        // opponent gets their turn 3 seconds after player attacks
                        let rand = Math.floor(Math.random() * 2);
                        attack(FLAMETAIL_MOVES[rand], 'player');
                        returnToMenu();
                    }, 2000);
                });
                li.appendChild(moveButton);
                moveList.appendChild(li);
            });
            break;
        case 'FLAMETAIL':
            FLAMETAIL_MOVES.forEach(move => {
                console.log(move.name);
                let li = document.createElement('li');
                let moveButton = document.createElement('button');
                moveButton.setAttribute('id', move.name);
                moveButton.appendChild(document.createTextNode(move.name));
                moveButton.addEventListener("click", () => {
                    attack(move, 'opponent');
                    setTimeout(() => {
                        // opponent gets their turn 3 seconds after player attacks
                        let rand = Math.floor(Math.random() * 2);
                        attack(SPLASHSHELL_MOVES[rand], 'player');
                        returnToMenu();
                    }, 2000);
                });
                li.appendChild(moveButton);
                moveList.appendChild(li);
            });
                break;
        case 'SPLASHSHELL':
            SPLASHSHELL_MOVES.forEach(move => {
                console.log(move.name);
                let li = document.createElement('li');
                let moveButton = document.createElement('button');
                moveButton.setAttribute('id', move.name);
                moveButton.appendChild(document.createTextNode(move.name));
                moveButton.addEventListener("click", () => {
                    attack(move, 'opponent');

                    setTimeout(() => {
                        // opponent gets their turn 3 seconds after player attacks
                        let rand = Math.floor(Math.random() * 2);
                        attack(FLAMETAIL_MOVES[rand], 'player');
                        returnToMenu();
                    }, 2000);
                });
                li.appendChild(moveButton);
                moveList.appendChild(li);
            });
            break;
    }
    battleOptions.replaceChildren(moveList);
}

let playerHealth = 100;
let opponentHealth = 100;
const playerHealthBar = document.getElementById('player-health');
const opponentHealthBar = document.getElementById('opponent-health');

// attacks a pokemon with the specified move depending on target
function attack(move, target) {
    switch (target) {
        case 'opponent':
            console.log(target);
            opponentHealth -= move.dmg;
            console.log("Opponent health: " + opponentHealth);
            opponentHealthBar.className = `progress-bar p${opponentHealth}`;
            playerAtkAnim();
            let playerAtkMsg = document.createElement('h3');
            playerAtkMsg.appendChild(document.createTextNode(`${player} used ${move.name}!`));
            console.log(playerAtkMsg.textContent);
            battleOptions.replaceChildren(playerAtkMsg);
            break;
        case 'player':
            console.log(target);
            playerHealth -= move.dmg;
            console.log("Player health: " + playerHealth)
            playerHealthBar.className = `progress-bar p${playerHealth}`;
            opponentAtkAnim();
            let oppAtkMsg = document.createElement('h3');
            oppAtkMsg.appendChild(document.createTextNode(`${opponent} used ${move.name}!`));
            console.log(oppAtkMsg.textContent);
            battleOptions.replaceChildren(oppAtkMsg);
            break;
    }
    if (playerHealth <= 0) {
        console.log('You fainted!');
        // let defeatMsg = document.createElement('h3');
        // defeatMsg.appendChild(document.createTextNode('You fainted!'));
        // battleOptions.replaceChildren(defeatMsg);
        alert('You fainted!');
        timer();
        window.location.href = "index.html";
    } else if (opponentHealth <= 0) {
        console.log("Opponent's monster fainted. You won!");
        // let victoryMsg = document.createElement('h3');
        // victoryMsg.appendChild(document.createTextNode("Opponent's pokemon fainted. You won!"));
        // battleOptions.replaceChildren(victoryMsg);
        timer();
        alert("Opponent's monster fainted. You won!")
        window.location.href = "index.html";
    }
}

// heals a pokemon depending on the target
function heal(target) {
    switch (target) {
        case 'opponent':
            if (opponentHealth === 0) {
                let didntWork = document.createElement('h3');
                didntWork.appendChild(document.createTextNode("It didn't work..."));
                console.log(didntWork.textContent);
                battleOptions.replaceChildren(didntWork);
            } else if (opponentHealth > 80) {
                opponentHealth = 100;
                console.log("Opponent health: " + opponentHealth);
                opponentHealthBar.className = `progress-bar p${opponentHealth}`;
            } else {
                opponentHealth += 40;
                console.log("Opponent health: " + opponentHealth);
                opponentHealthBar.className = `progress-bar p${opponentHealth}`;
                let oppHeal = document.createElement('h3');
                oppHeal.appendChild(document.createTextNode(`${opponent} used Potion!`));
                console.log(oppHeal.textContent);
                battleOptions.replaceChildren(oppHeal);
            }
            break;
        case 'player':
            if (playerHealth === 100) {
                let battlePrompt = document.createElement('h3');
                battlePrompt.appendChild(document.createTextNode('It didn\'t work...'));
                battleOptions.replaceChildren(battlePrompt);
            } else if (playerHealth > 80) {
                playerHealth = 100;
                console.log("Player health: " + playerHealth);
                playerHealthBar.className = `progress-bar p${playerHealth}`;
            } else {
                playerHealth += 40;
                console.log("Player health: " + playerHealth)
                playerHealthBar.className = `progress-bar p${playerHealth}`;
                let playerHeal = document.createElement('h3');
                playerHeal.appendChild(document.createTextNode(`${player} used Potion!`));
                console.log(playerHeal.textContent);
                battleOptions.replaceChildren(playerHeal);
            }
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
        timer();
        setTimeout(() => {
            // opponent gets their turn 3 seconds after player heals
            let rand = Math.floor(Math.random() * 2);
            switch (opponent) {
                case 'PETALPUFF':
                    attack(PETALPUFF_MOVES[rand], 'player');
                    break;
                case 'FLAMETAIL':
                    attack(FLAMETAIL_MOVES[rand], 'player');
                    break;
                case 'SPLASHSHELL':
                    attack(SPLASHSHELL_MOVES[rand], 'player');
                    break;
            }
            returnToMenu();
        }, 2000);
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
    //pkmnBtn.className = 'pokemon';
    pkmnBtn.appendChild(document.createTextNode('Monsters'));
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
        alert("You got away safely!");
        window.location.href = 'index.html';
    });
    run.appendChild(runBtn);

    options.appendChild(fightItem);
    options.appendChild(pkmn);
    options.appendChild(item);
    options.appendChild(run);
    battleOptions.replaceChildren(battlePrompt, options);
}

function timer() {
    setTimeout(() => {console.log("Wait 3 seconds...");}, 3000);
}

function playerAtkAnim() {
    playerPokemon.classList.remove('moveBack');
    playerPokemon.classList.add('moveForward');
    opponentPokemon.classList.remove('unhit');
    opponentPokemon.classList.add('opponentHit');
    setTimeout(() => {
        console.log("Player Attacking...");
        playerPokemon.classList.remove('moveForward');
        playerPokemon.classList.add('moveBack');
        opponentPokemon.classList.remove('opponentHit');
        opponentPokemon.classList.add('unhit');
    }, 250);
}

function opponentAtkAnim() {
    opponentPokemon.classList.remove('moveBack');
    opponentPokemon.classList.add('moveBackward');
    playerPokemon.classList.remove('unhit');
    playerPokemon.classList.add('playerHit');
    setTimeout(() => {
        console.log("Opponent Attacking...");
        opponentPokemon.classList.remove('moveBackward');
        opponentPokemon.classList.add('moveBack');
        playerPokemon.classList.remove('playerHit');
        playerPokemon.classList.add('unhit');
    }, 250);
}