/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    Constants
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/
const AUDIO = new Audio('AV/wtf_boom.mp3');

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

class Cell{
    constructor(row,col,num){
        this.column = col;
        this.row = row;
        this.coordinate=num;
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

const playAgainBtnEl = document.getElementById('smiley_face');
const newGameBtnEl = document.getElementById('footer');
const difficultyBtnEl = document.getElementById('game_toggle');
const instructionBtnEl = document.getElementById('instruction_toggle');
const boardEl = document.getElementById('board');
const mineCounterEl = document.getElementById('mine_count');
const timerEl = document.getElementById('timer');

const customRow = document.getElementById('row');
const customHeight = document.getElementById('height');
const customMines = document.getElementById('mines');

/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
EVENT LISTENERS
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/

document.getElementById('board').addEventListener('click',handleChoice);
document.getElementById('board').addEventListener('contextmenu',flag);
document.getElementById('board').addEventListener('mousedown',handleSweep);

playAgainBtnEl.addEventListener('click',reset);
newGameBtnEl.addEventListener('click',reset);
difficultyBtnEl.addEventListener('click',toggle_game_menu);
instructionBtnEl.addEventListener('click',toggle_instructions);

/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
FUNCTIONS
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/
reset();

// Initialize state and call render
function init() {
    
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

function renderControls(){
}


function createBoard(row,col,mines){
    
    let boardSize = row*col;
    const coordinates = generateMines(mines, boardSize);
    createStatus(mines);
    createCells(row,col,coordinates);
    calculateAdj();
}

function createCells(row,col,arr){
    count =1;
    for(let r=1;r<(row+1);r++){
        board[r]=[];
        let row_index = document.createElement('tr');
        boardEl.appendChild(row_index);
        row_index.id=`r${r}`;
        for(let c=1;c<(col+1);c++){
            board[r][c]=new Cell(row,col,count);
            let cell=document.createElement('td');
            cell.id=`r${r}c${c}`;
            cell.classList.add('tile');
            if(arr.includes(count)){
                board[r][c].isMine=true;
                let content = document.createElement('img');
                content.setAttribute("src", "AV/bomb.png");
                
                cell.appendChild(content);
            }
            row_index.appendChild(cell);
            count++;
        }
    }
}

function calculateAdj(){

}

function handleChoice(event){
    let index = event.target.id;
    console.log("Handle Choice: "+index);
}

function handleSweep(event){
 //   console.log("Handle sweep: "+event.target);
}

function flag(event){
    //console.log("Handle flag: "+event.target);
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
    console.log(customHeight.value);
    console.log(customRow.value);
    difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    console.log(difficulty);
    if(difficulty === "custom"){
        createBoard(customRow.value,customHeight.value,customMines.value);
    }
    else{
        createBoard(DIF_SET[difficulty][0],DIF_SET[difficulty][1],DIF_SET[difficulty][2]);
    }
}

  function generateMines(total, size){
    let rands = [];
    while(rands.length < total){
        const r = Math.floor(Math.random() * size);
        if(rands.indexOf(r)!==-1){
            continue;
        }
        else{
            rands.push(r);
        }
    }
    return rands;
} 

function createStatus(mines){
    mineCounterEl.innerText = mines;
    let elapsedTime = 0;
    timerEl.innerHTML = elapsedTime;
    const timerId = setInterval(function() {
      if (elapsedTime < 1000){
        if(gameOver)return;
        timerEl.innerText = elapsedTime;
        elapsedTime++;
        }
        else{
          clearInterval(timerId);  // BUG FIX
        }
     }, 1000);
  }
