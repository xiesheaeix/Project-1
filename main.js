/*----- constants -----*/
const HIDDENTILE = 'imgs/star.png';

/*----- app's state (variables) -----*/
let tileBoard; // object holding the 16 tiles with their properties set to the value of background color they will have, contains matching tiles
let selectedTile1; // will hold the value of 1 of 2 of tiles clicked
let selectedTile2; // will hold value of other tile clicked
let winner; // will be set to true if all tiles are matched by end of game
let matched; // will be set to true or false depending on if properties of selectedTile1 & 2 are equal to each other

/*----- cached element references -----*/
const board = document.getElementById('board');
const button = document.getElementById('button');

/*----- event listeners -----*/
board.addEventListener('click', handleClick);
//button.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
    tileBoard = [
        {'tile': 0, 'color': 'orange', 'show': false},
        {'tile': 1, 'color': 'orange', 'show': false},
        {'tile': 2, 'color': 'pink', 'show': false},
        {'tile': 3, 'color': 'pink', 'show': false},
        {'tile': 4, 'color': 'green', 'show': false},
        {'tile': 5, 'color': 'green', 'show': false},
        {'tile': 6, 'color': 'yellow', 'show': false},
        {'tile': 7, 'color': 'yellow', 'show': false},
        {'tile': 8, 'color': 'blue', 'show': false},
        {'tile': 9, 'color': 'blue', 'show': false},
        {'tile': 10, 'color': 'red', 'show': false},
        {'tile': 11, 'color': 'red', 'show': false},
        {'tile': 12, 'color': 'gray', 'show': false},
        {'tile': 13, 'color': 'gray', 'show': false},
        {'tile': 14, 'color': 'purple', 'show': false},
        {'tile': 15, 'color': 'purple', 'show': false},
    ];
    matched = false;
    winner = false;
    shuffleTiles();
    render();
}


function handleClick(evt) {
let curTile = evt.target.id.match(/\d+/g);
if(curTile === 'board') return;
tileBoard[curTile].show = true;
render();
}


function shuffleTiles() {
    let curIdx = tileBoard.length;
    while (curIdx--) {
       let rand =  Math.floor(Math.random() * curIdx);
       [tileBoard[curIdx], tileBoard[rand]] = [tileBoard[rand], tileBoard[curIdx]];
    }
    return tileBoard;
}


function renderBoard() {
    for (let i = 0; i < tileBoard.length; i++) { // idx returns the index of tileBoard array
        const tileId = `tile${i}`;
        const tileEl = document.getElementById(tileId);
        tileBoard[i].show ? 
        tileEl.style.backgroundColor = tileBoard[i].color : 
        tileEl.style.backgroundColor = 'white';
    }
}

function render() {
    renderBoard();
}
