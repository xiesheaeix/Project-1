/*----- constants -----*/
const TILEBOARD = [{'color': 'orange', 'show': false, 'matched': false},
{'color': 'pink', 'show': false, 'matched': false},
{'color': 'green', 'show': false, 'matched': false},
{'color': 'yellow', 'show': false, 'matched': false},
{'color': 'blue', 'show': false, 'matched': false},
{'color': 'red', 'show': false, 'matched': false},
{'color': 'gray', 'show': false, 'matched': false},
{'color': 'purple', 'show': false, 'matched': false},
];

/*----- app's state (variables) -----*/
let tiles; // object holding the 16 tiles with their properties set to the value of background color they will have, contains matching tiles
//let selectedTiles; // will hold the value of 1 of 2 of tiles clicked
let firstTile; // will hold value of other tile clicked
let winner; // will be set to true if all tiles are matched by end of game
let ignoreClicks;
let matchedTiles = [];

/*----- cached element references -----*/
const board = document.getElementById('board');
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
    render();
}


function handleClick(evt) {
const curTile = evt.target.id.match(/\d+/g);
if(curTile === 'board' || ignoreClicks) return;
tiles[curTile].show = true;

if (firstTile) {
    let tempTiles = [];
    tempTiles.push(firstTile);
    tempTiles.push(tiles[curTile]);
    if (tiles[curTile].color === firstTile.color) {
        document.querySelector('h4').innerText = 'its a match';
        tempTiles[0].matched = true;
        tempTiles[1].matched = true;
        matchedTiles.push(...tempTiles);
        console.log(matchedTiles);
    } else { 
        document.querySelector('h4').innerText = 'its NOT match';
        setTimeout(function flipTiles() {
            tempTiles[0].show = false;
            tempTiles[1].show = false;
            render();
            tempTiles = [];
        }, 500);
    }
    firstTile = null;
} else {
    firstTile = tiles[curTile];
}
render();
}

const isWinner = tiles.every((tile) => {
    tiles.matched = true; return winner = true;
});

function renderBoard() {
    tiles.forEach(function(tile, idx) {
        const tileId = `tile${idx}`;
        const tileEl = document.getElementById(tileId);
        (tiles[idx].show || tile === firstTile) ? 
        tileEl.style.backgroundColor = tiles[idx].color : 
        tileEl.style.backgroundColor = 'white';
    });
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
    if (winner === true) {
        document.querySelector('h4').innerText = 'You Win!';
    }
    renderBoard();
}
