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
/* 
    createAdjNumbers(){

        this.adjMineCount = this.adjMineCount + checkNeighbor(this.row++,this.col);
        console.log(this.adjMineCount)
        this.adjMineCount = this.adjMineCount + checkNeighbor(this.row++,this.col--);
        this.adjMineCount = this.adjMineCount + checkNeighbor(this.row++,this.col++);
        this.adjMineCount = this.adjMineCount + checkNeighbor(this.row--,this.col);
        this.adjMineCount = this.adjMineCount + checkNeighbor(this.row--,this.col--);
        this.adjMineCount = this.adjMineCount + checkNeighbor(this.row--,this.col++);
        this.adjMineCount = this.adjMineCount + checkNeighbor(this.row,this.col--);
        this.adjMineCount = this.adjMineCount + checkNeighbor(this.row,this.col++);
    }

    checkNeighbor(r,c){
        if(r < 0 || r >= board.length || c < 0 || c >= board[r].length) return 0;
        if(board[r][c].isMine) return 1;
        return 0;
    } */
    

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

playAgainBtnEl.addEventListener('click',init);
newGameBtnEl.addEventListener('click',init);
difficultyBtnEl.addEventListener('click',toggle_game_menu);
instructionBtnEl.addEventListener('click',toggle_instructions);

/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
FUNCTIONS
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/
init();

// Initialize state and call render
function init() {
    console.log('push the button')
    timerEl.innerHTML='';
    boardEl.innerHTML = '';
    board = [];
    difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    if(difficulty === "custom"){
        let boardSize = customRow.value*customHeight.value;
        const mines = generateMines()
        createBoard(customRow.value,customHeight.value,customMines.value);

    }
    else{
        createBoard(DIF_SET[difficulty][0],DIF_SET[difficulty][1],DIF_SET[difficulty][2]);
    }    
    winner = null;
    gameOver = false;
    render();
}

function getWinner(){
    for(let r=0;r<board.length;r++){
        for(let c=0;c<board[r].length;c++){
            if(board[r][c].isMine) continue;
            if(board[r][c].isRevealed) continue;
            if(board[r][c].isRevealed===false)return false;
        }
    }
    return true
}


//digitalize state
function render(){
    renderBoard();
}

function renderBoard(arr){
    count =1;
    for(let r=0;r<row;r++){
        board[r]=[];
        let row_index = document.createElement('tr');
        boardEl.appendChild(row_index);
        row_index.id=`r${r}`;
        for(let c=0;c<col;c++){
            board[r][c]=new Cell(r,c,count);
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

function renderMessage(){
}


function createBoard(row,col,mines){
    
    
    createStatus(mines);
    createCells(row,col,coordinates);
    //populateAdjNumbers(row,col);
}

function createCells(row,col,arr){
    count =1;
    for(let r=0;r<row;r++){
        board[r]=[];
 
        boardEl.appendChild(row_index);
        row_index.id=`r${r}`;
        for(let c=0;c<col;c++){
            board[r][c]=new Cell(r,c,count);
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

/* function populateAdjNumbers(row, col){
    for(let r=0;r<board.length;r++){
        for(let c=0;c<board[r].length;c++){
            board[r][c].createAdjNumbers();
            console.log(board[r][c].adjMineCount);
        }
    }
} */

function handleChoice(event){
    
    let index = event.target.id;
    let loc = getCoordinates(index);
    console.log(board[loc[0]][loc[1]].ro)
    if(board[loc[0]][loc[1]]){
        gameOver=true;
    }
    else if(board[loc[0]][loc[1]].isRevealed===false){
        board[loc[0]][loc[1]].isRevealed = true;
    }
    render();
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

function generateMines(total, boardSize){
    let rands = [];
    while(rands.length < total){
        const r = Math.floor(Math.random() * boardSize);
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
    timerEl.innerHTML='';
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

function getCoordinates(target){
    let chop = target.split('');
    let result = [chop[1],chop[3]];
    result = result.map(Number);
    return result
}

