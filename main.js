/*----- constants -----*/

const CARD_BACK = 'imgs/back.jpg';
const AUDIO = new Audio('imgs/slice.wav');

const TILEBOARD = [
{'img': 'imgs/01.jpg', 'matched': false},
{'img': 'imgs/06.jpg', 'matched': false},
{'img': 'imgs/15.jpg', 'matched': false},
{'img': 'imgs/36.jpg', 'matched': false},
{'img': 'imgs/47.jpg', 'matched': false},
{'img': 'imgs/59.jpg', 'matched': false},
{'img': 'imgs/68.jpg', 'matched': false},
{'img': 'imgs/76.jpg', 'matched': false},
];

/*----- app's state (variables) -----*/
let tiles; // object holding the 16 tiles with their properties set to the value of background color they will have, contains matching tiles
let firstTile; // will hold value of other tile clicked
let winner; // will be set to true if all tiles are matched by end of game
let wrongClicks;

/*
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
    winner = false;
    wrongClicks = 0;
    render();
}


function handleClick(evt) {
const curTile = parseInt(evt.target.id);
if(isNaN(curTile) || tiles[curTile].matched === true || winner) return;
tiles[curTile].matched = true;
if (firstTile) {
    let tempTiles = [];
    tempTiles.push(firstTile);
    tempTiles.push(tiles[curTile]);
    if (tiles[curTile].img === firstTile.img) {
        document.querySelector('h4').innerText = 'its a match';
        tempTiles[0].matched = true;
        tempTiles[1].matched = true;
    } else { 
        wrongClicks ++;
        document.querySelector('h4').innerText = 'its NOT match';
        setTimeout(function flipTiles() {
            tempTiles[0].matched = false;
            tempTiles[1].matched = false;
            AUDIO.currentTime = 0;
            AUDIO.play();
            render();
            tempTiles = [];
        }, 300);
    }
    firstTile = null;
} else {
    firstTile = tiles[curTile];
}
render();
}


function isWinner() {
 //if every tile in tiles array is matched before 10 clicks
 // winner is set to true
    render();
}

function shuffleTiles() {
    let tempTiles = [];
    let tiles = [];
    for (let tile of TILEBOARD) {
        tempTiles.push({...tile}, {...tile});
    }
    while (tempTiles.length) {
        let rand =  Math.floor(Math.random() * tempTiles.length); 
        let tile = tempTiles.splice(rand, 1)[0];
        tiles.push(tile);
    }
    return tiles;
}

function render() {
    tiles.forEach(function(tile, idx) {
        const imgEl = document.getElementById(idx);
        const src = (tile.matched || tile === firstTile) ? tile.img: CARD_BACK;
        imgEl.src = src;
    });
    document.querySelector('.bad-clicks').innerText = `Wrong clicks : ${wrongClicks}`;
    button.disabled = !winner;
    //button.style.visibility = winner ? 'visible' : 'hidden';
}
