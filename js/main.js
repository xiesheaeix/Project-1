/*----- constants -----*/

const CARD_BACK = 'imgs/back.jpg';
const NOT_MATCH = new Audio('sounds/slice.wav');
const START_AUDIO = new Audio('sounds/creepyGirl.wav');
const LOST_AUDIO = new Audio('sounds/scream.wav');

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
let firstTile; // will hold value of first tile clicked
let secondTile; // hold value of second tile clicked
let winner; // true, false or null
let wrongGuesses; // keep track of number of wrong guesses
let easyNumGuesses;
let hardNumGuesses;

/*----- cached element references -----*/
const board = document.querySelector('.board');
const resetBtn = document.querySelector('.reset-button');
const messageEl = document.querySelector('h4');
const scare = document.querySelector('#scare');
const levelBtn = document.querySelector('.level');
const guessCount = document.querySelector('.bad-clicks');

/*----- event listeners -----*/
document.querySelector('.board').addEventListener('click', handleClick);
resetBtn.addEventListener('click', init);
levelBtn.addEventListener('click', chooseLevel);

/*----- functions -----*/
init();

function init() {
    tiles = shuffleTiles();
    firstTile = null;
    secondTile = null;
    winner = null;
    wrongGuesses = 0;
    easyNumGuesses = null;
    hardNumGuesses = null;
    messageEl.innerText = 'Lets play a game';
    board.style.visibility = 'hidden';
    scare.style.visibility = 'hidden';
    resetBtn.style.visibility = 'hidden';
    guessCount.style.visibility = 'hidden';
    levelBtn.style.visibility = 'visible';
    render();
}

function chooseLevel(evt) {
    if (evt.target.tagName === 'BUTTON') {
        board.style.visibility = 'visible';
        guessCount.style.visibility = 'visible';
        START_AUDIO.play();
        if (evt.target.innerText === 'Easy') {
            messageEl.innerText = '10 guesses only!!!';
            easyNumGuesses = true;
        } else if (evt.target.innerText === 'Hard') {
            messageEl.innerText = '5 guesses only!!!';
            hardNumGuesses = true;
        }
        levelBtn.style.visibility = 'hidden'; 
    }
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
        if (firstTile === secondTile) return; // ignore when clicking same tile twice
        if (firstTile.img === secondTile.img) {
            messageEl.innerText = "It's a Match";
            firstTile.matched = secondTile.matched = true;
            firstTile = null;
        } else {
            wrongGuesses++;
            messageEl.innerText = "It's NOT a Match";
            setTimeout(function flipTiles() {
                NOT_MATCH.play();
                firstTile = null;
                secondTile = null;
                render();
            }, 600);
        }
    } else {
        firstTile = tiles[curTile];
    }
    winner = getWinner();
    render();
}

function getWinner() {
    if (easyNumGuesses) {
        let allTilesMatched = tiles.every((tile) => tile.matched);
        if (allTilesMatched && wrongGuesses <= 10) return true;
        if (wrongGuesses >= 10) return false;
    } else if (hardNumGuesses) {
        let allTilesMatched = tiles.every((tile) => tile.matched);
        if (allTilesMatched && wrongGuesses <= 5) return true;
        if (wrongGuesses >= 5) return false;
    }
}

function render() {
    tiles.forEach(function (tile, idx) {
        const imgEl = document.getElementById(idx);
        const src = (tile.matched || tile === firstTile || tile === secondTile) ? tile.img : CARD_BACK;
        imgEl.src = src;
    });
    guessCount.innerText = `Wrong Guesses : ${wrongGuesses}`;
    winner == null ? resetBtn.style.visibility = 'hidden' : resetBtn.style.visibility = 'visible';
    if (winner) {
        messageEl.innerText = 'You Won!!!';
    } else if (winner === false) {
        NOT_MATCH.pause();
        LOST_AUDIO.play();
        scare.style.visibility = 'visible';
        messageEl.innerText = 'You Lost!!! Try again...';
    } else return winner = null;
}
