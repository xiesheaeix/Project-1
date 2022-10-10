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
let selectedTiles; // will hold the value of 1 of 2 of tiles clicked
let firstTile; // will hold value of other tile clicked
let winner; // will be set to true if all tiles are matched by end of game
let ignoreClicks;
/*----- cached element references -----*/
const board = document.getElementById('board');
const button = document.getElementById('#reset');

/*----- event listeners -----*/
board.addEventListener('click', handleClick);
//button.addEventListener('click', init);

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
//console.log(curTile);
tiles[curTile].show = true;
if (firstTile) {
    if (tiles[curTile].color === firstTile.color) {
        console.log('its a match');
        firstTile.matched = tiles.matched = true;
    } else { 
        console.log('not a match');
        //setTimeout(, 500); needs to be passed a function to keep tiles 
    }
    firstTile = null;
} else {
    firstTile = tiles[curTile];
}

render();
}

function isAMatch() {
 
    render();
}

function renderBoard() {
    tiles.forEach(function(tile, idx) {
        const tileId = `tile${idx}`;
        const tileEl = document.getElementById(tileId);
        tiles[idx].show ? 
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
    //console.log(tiles);
    return tiles;
}

function render() {
    renderBoard();
}
