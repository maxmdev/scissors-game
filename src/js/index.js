require('./functions.js');
require('../scss/styles.scss');

import { div } from './functions.js';
import { createButton } from './functions.js';
import { heroesMarkup } from './functions.js';
import { selectWeapon } from './functions.js';

// Constants
const timeOut = 2000;
const two = 2;
const three = 3;

// Classes and instances
class Weapon {
    constructor (name) {
        if(!Weapon._WEAPONS) {
            Weapon._WEAPONS = [];
        }
        this.name = name;
        Weapon.WEAPONS.push(this);
    }

    getName() {
        return this.name;
    }

    static get WEAPONS() {
        return Weapon._WEAPONS;
    }
}
class Player {
    constructor(name = 'AI',weapon = this.randomWeapon(Weapon.WEAPONS)) {
        this.name = name;
        this.weapon = weapon;
        this.wins = 0;
    }

    getWins() {
        return this.wins;
    }

    addWins() {
        this.wins++
    }

    setWeapon(weapon) {
        this.weapon = weapon;
    }

    changeRandomWeapon() {
        this.weapon = this.randomWeapon();
    }

    randomWeapon() {
        return Weapon.WEAPONS[Math.floor(Math.random() * Weapon.WEAPONS.length)];
    }

    battle(defender) {
        defender.changeRandomWeapon();
        switch (this.weapon.name) {
            case ''+ defender.weapon.name +'':
                return 'draw';
            case 'rock':
                if (defender.weapon.name === 'paper') {
                    return defender;
                } else {
                    return this;
                }
            case 'paper':
                if (defender.weapon.name === 'scissors') {
                    return defender;
                } else {
                    return this;
                }
            case 'scissors':
                if (defender.weapon.name === 'rock') {
                    return defender;
                } else {
                    return this;
                }
            default:
                return 1;
        }
    }
}

class GameScissors {
    constructor(player) {
        this.player = player;
        this.AI = new Player();
        this.round = 0;
        this.winner = {};
    }

    getRound() {
        return this.round;
    }

    startBattle() {
        this.round++;
        const winner = this.player.battle(this.AI);
        if (winner !== 'draw') {
            winner.wins++;
        }
        return winner;
    }

    getPlayerScore() {
        return this.player.getWins();
    }

    getAiScore() {
        return this.AI.getWins();
    }

    getWinner() {
        if (this.getPlayerScore() > this.getAiScore()) {
            return this.player;
        } else if (this.getPlayerScore() === this.getAiScore()) {
            return {name: 'draw'};
        } else {
            return this.AI;
        }
    }
}

new Weapon('paper');
new Weapon('rock');
new Weapon('scissors');

let selectedWeapon = null;
let currentPlayer = new Player('You');
let Game = new GameScissors(currentPlayer);

// Markup
const appRoot = document.getElementById('appRoot');

const gameHeading = document.createElement('h1');
gameHeading.innerText = 'Let\'s play!';
gameHeading.classList.add('heading');

/// Main game container
const messageContainter = div('messageContainer');
const weaponsContainer = div('weaponsContainer');
const heroesContainer = div('heroesContainer');
const gameMainContainer = div('gameMainContainer');

gameMainContainer.append(weaponsContainer, messageContainter);
heroesContainer.append(heroesMarkup());

Weapon.WEAPONS.forEach(weapon => {
        const weaponButton = div(weapon.name);
        weaponButton.addEventListener('click', (e) => {
            selectedWeapon = selectWeapon(selectedWeapon, e.target);
            renderMain(selectedWeapon);
        });
        weaponsContainer.appendChild(weaponButton);
});


const renderMain = (selectedWeapon) => {
    if (selectedWeapon === null || selectedWeapon === undefined) {
        chooseTheWeapon();
    } else {
        currentPlayer.setWeapon(new Weapon(selectedWeapon.classList[0]));
        showScores();
        startTheRound();
    }
}

const showScores = () => {
    const scoresBlock = div('scoresBlock');
    messageContainter.innerHTML = '';

    const winnerMessage = Game.getWinner().name === 'draw' ? '' : ' has won!';

    scoresBlock.innerHTML =
        '<p>Result: <span>' + Game.getWinner().name + '</span>'+ winnerMessage +'</p>' +
        '<p><span>Your</span> score: ' + Game.getPlayerScore() + '</p>' +
        '<p><span>AI</span> score: ' + Game.getAiScore() + '</p>';
    messageContainter.appendChild(scoresBlock);

    const playAgainButton = createButton('Play');
    playAgainButton.innerText = 'Play more';
    messageContainter.appendChild(playAgainButton);

    playAgainButton.addEventListener('click', () => {
        Game = newGame();
        renderMain();
    })
}

const chooseTheWeapon = () => {
    messageContainter.innerHTML = '<p class="animated">Choose your weapon!</p>';
}

const showWinner = (winner) => {
    if (winner !== 'draw') {
        messageContainter.innerHTML = '<p class="animated"> <span>'+ winner.name +'</span> has won! </p>';
    } else {
        messageContainter.innerHTML = '<p class="animated"> <span>DRAW</span></p>';
    }
}

const startTheRound = () => {
    const startButton = createButton('Start');
    messageContainter.innerHTML = '<p>Your weapon is: <span>'+currentPlayer.weapon.name+'</span></p>';
    messageContainter.append(startButton);

    startButton.addEventListener('click', () => {
        startBattleWithAI();
    });
}

const startBattleWithAI = () => {
    if (Game.getRound() <= two) {
        const winner = Game.startBattle();
        showWinner(winner);
        if (Game.getRound() === three) {
            setTimeout(function () {
                showScores()
            }, timeOut);
        } else {
            setTimeout(function () {
                renderMain()
            }, timeOut);
        }
    } else {
        setTimeout(function () {
            renderMain()
        }, timeOut);
    }
}

const newGame = () => {
    return new GameScissors(new Player('You'));
}

appRoot.append(heroesContainer);
appRoot.appendChild(gameHeading);
appRoot.appendChild(gameMainContainer);

renderMain();