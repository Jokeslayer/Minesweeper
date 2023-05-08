/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    Constants
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/
const COLORS = {
    '1': 'blue',
    '2': 'green',
    '3': 'red',
    '4': 'darkblue',
    '5': 'darkred',
    '6': 'teal',
    '7': 'black',
    '8': 'grey'
};

const CELL_STATE = {
    '0' : '',
    '-1': 'bomb',
    '1' : 'bomb-adj'
};

const DIF_SET = {
    '0': [9,9,10],
    '1': [16,16,40],
    '2': [16,30,99]
};

/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
CELL CLASS
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/

class CELL{
    constructor(row,col){
        this.column = col;
        this.row = row;
        this.isMine = false;
        this.isRevealed = false;
        this.isFlagged = false;
        this.adjMineCount = 0;
    }

    countAdjacent(){
        
    }

    clear(){

    }
}

/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
STATE VARIABLES
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/
let board=[];                
let difficulty;           //determines the size of the game board
let winner;        // null = no winner, 1 or -1 winner, T = tied game
let gameOver;     // boolean which determines whether a bomb has been clicked on

/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
CACHED ELEMENTS
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/

const playAgainBtn = document.getElementById('smiley_face');
const newGameBtn = document.getElementById('footer');
const gameBtn = document.getElementById('game_toggle');
const instructionBtn = document.getElementById('instruction_toggle');
const boardEl = document.querySelector('#board');

/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
EVENT LISTENERS
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/

document.getElementById('board').addEventListener('click',handleChoice);
document.getElementById('board').addEventListener('contextmenu',flag);
document.getElementById('board').addEventListener('mousedown',handleSweep);

playAgainBtn.addEventListener('click',reset);
newGameBtn.addEventListener('click',reset);
gameBtn.addEventListener('click',toggle_game_menu);
instructionBtn.addEventListener('click',toggle_instructions);

/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
FUNCTIONS
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/
reset();

// Initialize state and call render
function init() {
    
    console.log(board);
    winner = null;
    gameOver = false;
    render();
}

function getWinner(){
}

//digitalize state
function render(){
    renderBoard();
}

function renderBoard(){
    for(let r=0;r<board.length;r++){
        
        for(let c=0;c<board[r].length;c++){
            
        }
    }
}

function renderMessage(){
}

function renderControls() {
}


function createBoard(row,col,mines){
    createCells(row,col);
    createMines(mines);
    calculateAdj();
}

function createCells(row,col){
    for(let r=0;r<row;r++){
        board[r]=[];
        let row_index = document.createElement('tr');
        boardEl.appendChild(row_index);
        row_index.id=`r${r}`;
        for(let c=0;c<col;c++){
            board[r][c]=new CELL(row,col);
            let cell=document.createElement('td');
            cell.id=`r${r}c${c}`;
            row_index.appendChild(cell);
        }
    }
}

function createMines(mines){

}

function calculateAdj(){

}

function handleChoice(event){
}

function handleSweep(event){
}

function flag(event){
}

function toggle_game_menu(event){
    let menu = document.getElementById('options');
    if(menu.style.visibility === 'hidden'){
        menu.style.visibility = 'visible';
    }
    else{
        menu.style.visibility = 'hidden';
    }
}

function toggle_instructions(event){
    let menu = document.getElementById('instructions');
    if(menu.style.visibility === 'hidden'){
        menu.style.visibility = 'visible';
    }
    else{
        menu.style.visibility = 'hidden';
    }
}

function reset(){
    boardEl.innerHTML = '';
    board = [];
    difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    createBoard(DIF_SET[difficulty][0],DIF_SET[difficulty][1],DIF_SET[difficulty][2]);
    init();
}