/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    Constants
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/
const AUDIO = new Audio('av_files/wtf_boom.mp3');

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
    }
}

/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
STATE VARIABLES
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/
let board=[];                
let difficulty;           //determines the size of the game board
let winner;        // null = no winner, 1 or -1 winner, T = tied game
let gameOver;     // boolean which determines whether a bomb has been clicked on
let mineList = []


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
        mineList = generateMines(customMines.value,boardSize);
        createBoard(customRow.value,customHeight.value,customMines.value);

    }
    else{
        let boardSize = DIF_SET[difficulty][0]*DIF_SET[difficulty][1];
        mineList = generateMines(DIF_SET[difficulty][2],boardSize);
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

function renderBoard(){
    boardEl.innerHTML='';
    count =1;
    for(let r=0;r<board.length;r++){
        let row_index = document.createElement('tr');
        boardEl.appendChild(row_index);
        row_index.id=`r${r}`;
        for(let c=0;c<board[r].length;c++){
            let cell=document.createElement('td');
            cell.id=`r${r}c${c}`;
            cell.classList.add('tile');
            if (board[r][c].isRevealed){
                cell.style.boxShadow = 'none';
                if(mineList.includes(count)){
                    let content = document.createElement('img');
                    content.setAttribute("src", "av_files/bomb.png");
                    cell.appendChild(content);
                }
                if(board[r][c].adjMineCount > 0){
                    cell.innerText = board[r][c].adjMineCount;
                    cell.style.color = COLORS[board[r][c].adjMineCount];
                    cell.classList.add('adj_num');
                }
            }
            if(board[r][c].isFlagged){
                let content = document.createElement('img');
                content.setAttribute("src", "av_files/flag.png");
                cell.appendChild(content);
            }
            
            row_index.appendChild(cell);
            count++;
        }
    }
}



function createBoard(row,col,mines){    
    createStatus(mines);
    createCells(row,col);
    populateAdjNumbers(row,col);
    render();
}

function createCells(row,col){
    count =1;
    for(let r=0;r<row;r++){
        board[r]=[];
        for(let c=0;c<col;c++){
            board[r][c]=new Cell(r,c,count);
            if(mineList.includes(count)){
                board[r][c].isMine=true;
            
            }
            count++;
        }
    }
}

 function populateAdjNumbers(row, col){
    for(let r=0;r<board.length;r++){
        for(let c=0;c<board[r].length;c++){
            let adj = createAdjNumbers(r,c);
            board[r][c].adjMineCount = adj;
        }
    }
}

function createAdjNumbers(row,col){
    let adjMineCount = 0;
    if(board[row][col].isMine) return;
    adjMineCount += checkNeighbor((row+1),col);
    adjMineCount += checkNeighbor((row+1),(col-1));
    adjMineCount += checkNeighbor((row+1),(col+1));
    adjMineCount += checkNeighbor((row-1),col);
    adjMineCount += checkNeighbor((row-1),(col-1));
    adjMineCount += checkNeighbor((row-1),(col+1));
    adjMineCount += checkNeighbor(row,(col-1));
    adjMineCount += checkNeighbor(row,(col+1));

    return adjMineCount;
}

function checkNeighbor(r,c){
    if (r < 0 || r >= board.length || c < 0 || c >= board[r].length) return 0;

    if (board[r][c].isMine){
      return 1;  
    } 
    return 0;
}

function handleChoice(event){
    let index;
    if (event.target.tagName === 'IMG'){
        index = event.target.parentElement.id;
    } else {
        index = event.target.id;
    }
    let loc = getCoordinates(index);
    console.log(board[loc[0]][loc[1]]);
    if (board[loc[0]][loc[1]].isFlagged || board[loc[0]][loc[1]].isRevealed){
        return;
    }else if(board[loc[0]][loc[1]].isMine){
        board[loc[0]][loc[1]].isRevealed = true;
        gameOver = true;
    } else if(board[loc[0]][loc[1]].adjMineCount === 0){
        reveal(board[loc[0]][loc[1]]);
    }
    else {
        board[loc[0]][loc[1]].isRevealed = true;
    }
    render();
}

function flag(event){
    event.preventDefault();
    let index;
    if (event.target.tagName === 'IMG'){
        index = event.target.parentElement.id;
    } else {
        index = event.target.id;
    }
    let loc = getCoordinates(index);
    if(board[loc[0]][loc[1]].isRevealed) return;
    else{
        console.log('flagging')
        board[loc[0]][loc[1]].isFlagged = !board[loc[0]][loc[1]].isFlagged;
    }

    render();
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

function reveal(cell){
    let neighbor;
    cell.isRevealed = true;
    if(cell.adjMineCount === 0){
        if(isInBounds(board[cell.row+1][cell.col])){
            revealNeighbor(board[cell.row+1][cell.col]);
        }

        if(isInBounds(board[cell.row+1][cell.col-1])){
            revealNeighbor(board[cell.row+1][cell.col-1]);
        }

        if(isInBounds(board[cell.row+1][cell.col+1])){
            revealNeighbor(board[cell.row+1][cell.col+1]);
        }

        if(isInBounds(board[cell.row-1][cell.col])){
            revealNeighbor(board[cell.row-1][cell.col]);
        }

        if(isInBounds(board[cell.row-1][cell.col-1])){
            revealNeighbor(board[cell.row-1][cell.col-1]);
        }

        if(isInBounds(board[cell.row-1][cell.col+1])){
            revealNeighbor(board[cell.row-1][cell.col+1]);
        }

        if(isInBounds(board[cell.row][cell.col-1])){
            revealNeighbor(board[cell.row][cell.col-1]);
        }

        if(isInBounds(board[cell.row][cell.col+1])){
            revealNeighbor(board[cell.row][cell.col+1]);
        }
    }
}

function revealNeighbor(cell){
    if ((board[cell.row][cell.col].isRevealed===false) && (board[cell.row][cell.col].isMine ===false)){
      return reveal(cell);  
    } 
    return;
}

function isInBounds(row, col) {
    return (row >= 0 && row < board.length && col >= 0 && col < board[0].length);
  }
  