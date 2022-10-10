/*----- constants -----*/

const CARD_BACK = 'https://i.imgur.com/kMgzjoV.png';

const TILEBOARD = [
{'img': 'https://i.imgur.com/IxA6abS.png', 'matched': false},
{'img': 'https://i.imgur.com/rjbdewk.png', 'matched': false},
{'img': 'https://i.imgur.com/iYdIKbg.png', 'matched': false},
{'img': 'https://i.imgur.com/1VLycTU.png', 'matched': false},
{'img': 'https://i.imgur.com/YDiDLca.png', 'matched': false},
{'img': 'https://i.imgur.com/7CaJBtw.png', 'matched': false},
{'img': 'https://i.imgur.com/hNmaXyS.png', 'matched': false},
{'img': 'https://i.imgur.com/qqxYTKG.png', 'matched': false},
];

/*----- app's state (variables) -----*/
let tiles; // object holding the 16 tiles with their properties set to the value of background color they will have, contains matching tiles
let firstTile; // will hold value of other tile clicked
let winner; // will be set to true if all tiles are matched by end of game
let ignoreClicks;
//let gameOver;
let matchedTiles = [];
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
    //winner = false;
    wrongClicks = 0;
    document.querySelector('h4').innerText = '';
    render();
}


function handleClick(evt) {
const curTile = parseInt(evt.target.id);
if(isNaN(curTile) || ignoreClicks || winner) return;
tiles[curTile].matched = true;
if (firstTile) {
    let tempTiles = [];
    tempTiles.push(firstTile);
    tempTiles.push(tiles[curTile]);
    if (tiles[curTile].img === firstTile.img) {
        document.querySelector('h4').innerText = 'its a match';
        tempTiles[0].matched = true;
        tempTiles[1].matched = true;
        matchedTiles.push(...tempTiles);
    } else { 
        wrongClicks ++;
        document.querySelector('h4').innerText = 'its NOT match';
        setTimeout(function flipTiles() {
            tempTiles[0].matched = false;
            tempTiles[1].matched = false;
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


/*
function isWinner() {
    if (tiles.matched === true && wrongClicks <= 5){
        console.log('winner');
        winner = true;
    } else {
        console.log('lost');
        return winner = false;
    }
    render();
}
*/

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
    tiles.forEach(function(tile, idx) {
        const imgEl = document.getElementById(idx);
        const src = (tile.matched || tile === firstTile) ? tile.img: CARD_BACK;
        imgEl.src = src;
    });
    document.querySelector('.bad-clicks').innerText = `Wrong clicks : ${wrongClicks}`;
    //button.style.visibility = winner ? 'visible' : 'hidden';
}
