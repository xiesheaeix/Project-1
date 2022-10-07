/*----- constants -----*/
const HIDDENTILE = 'imgs/star.png';

/*----- app's state (variables) -----*/
let tileboard; // object holding the 16 tiles with their properties set to the value of background color they will have, contains matching tiles
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
        {'tile1': 'orange'},
        {'tile2': 'orange'},
        {'tile3': 'pink'},
        {'tile4': 'pink'},
        {'tile5': 'green'},
        {'tile6': 'green'}, 
        {'tile7': 'yellow'}, 
        {'tile8': 'yellow'},
        {'tile9': 'blue'}, 
        {'tile10': 'blue'},
        {'tile11': 'red'}, 
        {'tile12': 'red'},
        {'tile13': 'gray'},
        {'tile14': 'gray'}, 
        {'tile15': 'purple'},
        {'tile16': 'purple'},
    ];
    matched = false;
    winner = false;
    render();
}


function handleClick(evt) {


}

function renderBoard() {

}

function render() {
    renderBoard();
}
