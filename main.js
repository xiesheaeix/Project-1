/*----- constants -----*/

const CARD_BACK = 'imgs/back.jpg';
const NOT_MATCH = new Audio('imgs/slice.wav');
const START_AUDIO = new Audio('imgs/creepyGirl.wav');
const LOST_AUDIO = new Audio('imgs/scream.wav');

const TILEBOARD = [
    { 'img': 'imgs/01.jpg', 'matched': false },
    { 'img': 'imgs/06.jpg', 'matched': false },
    { 'img': 'imgs/15.jpg', 'matched': false },
    { 'img': 'imgs/36.jpg', 'matched': false },
    { 'img': 'imgs/47.jpg', 'matched': false },
    { 'img': 'imgs/59.jpg', 'matched': false },
    { 'img': 'imgs/68.jpg', 'matched': false },
    { 'img': 'imgs/76.jpg', 'matched': false },
];

/*----- app's state (variables) -----*/
let tiles; // object holding the 16 tiles with their properties set to the value of background color they will have, contains matching tiles
let firstTile; // will hold value of other tile clicked
let secondTile;
let winner;
let wrongGuesses;

/*----- cached element references -----*/
const board = document.querySelector('main');
const button = document.querySelector('button');

/*----- event listeners -----*/
board.addEventListener('click', handleClick);
button.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
    tiles = shuffleTiles();
    firstTile = null;
    secondTile = null;
    winner = null;
    wrongGuesses = 0;
    document.querySelector('h4').innerText = "Let's Play A Game...";
    document.querySelector('#scare').style.visibility = 'hidden';
    START_AUDIO.play();
    render();
}

function shuffleTiles() {
    let tempTiles = [];
    let tiles = [];
    for (let tile of TILEBOARD) {
        tempTiles.push({ ...tile }, { ...tile });
    }
    while (tempTiles.length) {
        let rand = Math.floor(Math.random() * tempTiles.length);
        let tile = tempTiles.splice(rand, 1)[0];
        tiles.push(tile);
    }
    return tiles;
}

function handleClick(evt) {
    const curTile = parseInt(evt.target.id);
    // Gaurds
    if (isNaN(curTile) || tiles[curTile].matched === true || winner !== null) return;
    if (firstTile) {
        secondTile = tiles[curTile];
        if (firstTile.img === secondTile.img) {
            document.querySelector('h4').innerText = "It's a Match";
            firstTile.matched = secondTile.matched = true;
        } else {
            wrongGuesses++;
            document.querySelector('h4').innerText = "It's NOT a Match";
            setTimeout(function flipTiles() {
                NOT_MATCH.play();
                firstTile = null;
                secondTile = null;
                render();
            }, 500);
        }
    } else {
        firstTile = tiles[curTile];
    }
    winner = getWinner();
    render();
}


function getWinner() {
    let allTilesMatched = tiles.every((tile) => tile.matched);
    if (allTilesMatched && wrongGuesses <= 10) return true;
    if (wrongGuesses >= 10) return false;
}


function render() {
    tiles.forEach(function (tile, idx) {
        const imgEl = document.getElementById(idx);
        const src = (tile.matched || tile === firstTile || tile === secondTile) ? tile.img : CARD_BACK;
        imgEl.src = src;
    });
    button.style.visibility = winner === null ? 'hidden' : 'visible';
    document.querySelector('.bad-clicks').innerText = `Wrong Guesses : ${wrongGuesses}`;
    if (winner) {
        document.querySelector('h4').innerText = 'You Won!!!';
    } else if (winner === false) {
        NOT_MATCH.pause();
        LOST_AUDIO.play();
        document.querySelector('#scare').style.visibility = 'visible';
        document.querySelector('h4').innerText = 'You Lost!!! Try again...';
    } else return winner = null;
}
