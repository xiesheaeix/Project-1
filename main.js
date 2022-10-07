/*----- constants -----*/
const HIDDENTILE = 'imgs/star.png';

/*----- app's state (variables) -----*/
let tileBoard; // object holding the 16 tiles with their properties set to the value of background color they will have, contains matching tiles
let selectedTile1; // will hold the value of 1 of 2 of tiles clicked
let selectedTile2; // will hold value of other tile clicked
let winner; // will be set to true if all tiles are matched by end of game
let matched; // will be set to true or false depending on if properties of selectedTile1 & 2 are equal to each other

/*----- cached element references -----*/


/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleClick);

/*----- functions -----*/
init();

function init() {
    tileBoard = [
        {'tile': 0, 'color': 'orange'},
        {'tile': 1, 'color': 'orange'},
        {'tile': 2, 'color': 'pink'},
        {'tile': 3, 'color': 'pink'},
        {'tile': 4, 'color': 'green'},
        {'tile': 5, 'color': 'green'},
        {'tile': 6, 'color': 'yellow'},
        {'tile': 7, 'color': 'yellow'},
        {'tile': 8, 'color': 'blue'},
        {'tile': 9, 'color': 'blue'},
        {'tile': 10, 'color': 'red'},
        {'tile': 11, 'color': 'red'},
        {'tile': 12, 'color': 'gray'},
        {'tile': 13, 'color': 'gray'},
        {'tile': 14, 'color': 'purple'},
        {'tile': 15, 'color': 'purple'},
    ];
    matched = false;
    winner = false;
    render();
}


function handleClick(evt) {


}

function renderBoard() {
    for (let idx in tileBoard) { // idx returns the index of tileBoard array
        const tileId = `tile${idx}`;
        const tile = document.getElementById(tileId);
       tile.style.backgroundColor = tileBoard[idx].color;
    }
}

function render() {
    renderBoard();
}
