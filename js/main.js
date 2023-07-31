/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    Constants
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/
const AUDIO = new Audio('av_files/wtf_boom.mp3');

//Color code for the numbers that denote the number of Adjacent mines
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

//these are the length, width, and number of mines for the preprogrammed
//beginner, intermediate, and expert difficulty settings
const DIF_SET = {
    '0': [9, 9, 10],
    '1': [16, 16, 40],
    '2': [16, 30, 99]
};

/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
CELL CLASS
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/

class Cell {
    constructor(row, col, num) {
        this.col = col;
        this.row = row;
        this.coordinate = num;
        this.isMine = false;
        this.isRevealed = false;
        this.isFlagged = false;
        this.adjMineCount = 0;
        this.id = `r${row}c${col}`;
    }

}

/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
STATE VARIABLES
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/
let board;
let winner;         //false by default, set to true when the game is over
let gameOver;       //false by default. Changed to true when you click a Mine 
let mineList;  //list of random numbers that correspond to the coordinates of the mines
let mineNum;    //the number of mines on the board
let elapsedTime;
let gameTime;
let firstClick;
let difficulty;

/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
CACHED ELEMENTS
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/

const playAgainBtnEl = document.getElementById('smiley_face');
const newGameBtnEl = document.getElementById('footer');
const difficultyBtnEl = document.getElementById('game_toggle');
const instructionBtnEl = document.getElementById('instruction_toggle');
const closeBtnEl1 = document.getElementById('x1');
const closeBtnEl2 = document.getElementById('x2');
const boardEl = document.getElementById('board');
const mineCounterEl = document.getElementById('mine_count');
const timerEl = document.getElementById('timer');

const optionsMenuEl = document.getElementById('options');
const instructionsMenuEl = document.getElementById('instructions');
const customRow = document.getElementById('row');
const customHeight = document.getElementById('height');
const customMines = document.getElementById('mines');

/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
EVENT LISTENERS
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/

//Event Listeners for left and right clicking on the board
boardEl.addEventListener('click', handleChoice);
boardEl.addEventListener('contextmenu', flag);

//Event listeners for game Buttons
playAgainBtnEl.addEventListener('click', init);
newGameBtnEl.addEventListener('click', init);
difficultyBtnEl.addEventListener('click', (event) => {toggler(event, optionsMenuEl);});
instructionBtnEl.addEventListener('click', (event) => {toggler(event, instructionsMenuEl);});

closeBtnEl1.addEventListener('click', (event) => {toggler(event, optionsMenuEl);});
closeBtnEl2.addEventListener('click', (event) => {toggler(event, instructionsMenuEl);});

/*
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
FUNCTIONS
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/
init();

// Initialize state and call render
function init() {
    boardEl.innerHTML = '';
    firstClick= true;
    board = [];
    mineList = [];
    winner = false;
    gameOver = false;
    mineNum = 0;
    elapsedTime = 0;
    difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    console.log(difficulty)
    if (difficulty === "custom") {
        let boardSize = customRow.value * customHeight.value;
        mineList = generateMines(customMines.value, boardSize);
        createBoard(customRow.value, customHeight.value, customMines.value);
        mineNum = customMines.value;
    }
    else {
        let boardSize = DIF_SET[difficulty][0] * DIF_SET[difficulty][1];
        mineList = generateMines(DIF_SET[difficulty][2], boardSize);
        createBoard(DIF_SET[difficulty][0], DIF_SET[difficulty][1], DIF_SET[difficulty][2]);
        mineNum = DIF_SET[difficulty][2];
    }
    render();
}

//digitalize state
function render() {
    if (winner) {
        document.getElementById("icon").setAttribute("src", "av_files/sunglasses.png");
        timerOn = false;
    }
    else if (gameOver) {
        AUDIO.play();
        document.getElementById("icon").setAttribute("src", "av_files/dizzy-face.png");
    } else document.getElementById("icon").setAttribute("src", "av_files/smiley_face.png");

    count = 1;
    boardEl.innerHTML = '';
    for (let r = 0; r < board.length; r++) {
        let row_index = document.createElement('tr');
        boardEl.appendChild(row_index);
        row_index.id = `r${r}`;
        for (let c = 0; c < board[r].length; c++) {
            let cellEl = document.createElement('td');
            cellEl.id = `r${r}c${c}`;
            cellEl.classList.add('tile');
            if (board[r][c].isRevealed) {
                cellEl.style.boxShadow = 'none';
                if (board[r][c].adjMineCount > 0) {
                    cellEl.innerText = board[r][c].adjMineCount;
                    cellEl.style.color = COLORS[board[r][c].adjMineCount];
                    cellEl.classList.add('adj_num');
                }
            }
            if (board[r][c].isFlagged) {
                let content = document.createElement('img');
                content.setAttribute("src", "av_files/flag.png");
                cellEl.appendChild(content);
            }
            if (gameOver && mineList.includes(count)) {
                let content = document.createElement('img');
                content.setAttribute("src", "av_files/explosion.png");
                cellEl.appendChild(content);
            }
            count++;
            row_index.appendChild(cellEl);
        }
    }
}

function toggler(event, arg) {
    if (arg.style.visibility === 'hidden') {
        arg.style.visibility = 'visible';
    } else {
        arg.style.visibility = 'hidden';
    }
}

/*-------------------------------------------------------------------------------------------------------------
STATE CREATION FUNCTIONS
---------------------------------------------------------------------------------------------------------------*/

//defines the JS data for the game for the render function base itself off
function createBoard(row, col, mines) {
    mineCounterEl.innerText = mines;
    mineNum = mines;
    createCells(row, col);
    createAdjNumbers(row, col);
    render();
}

//populates the board variable with a 2d array of Cell objects
//helper function of createBoard
function createCells(row, col) {
    count = 1;
    for (let r = 0; r < row; r++) {
        board[r] = [];
        for (let c = 0; c < col; c++) {
            board[r][c] = new Cell(r, c, count);
            if (mineList.includes(count)) {
                board[r][c].isMine = true;
            }
            count++;
        }
    }
}

//iterates through board and calculates each Cell's adjMineCount class attribute
//helper function of createBoard
function createAdjNumbers() {
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[r].length; c++) {
            if (board[r][c].isMine) continue;
            board[r][c].adjMineCount += checkNeighbor(r + 1, c);
            board[r][c].adjMineCount += checkNeighbor(r + 1, c - 1);
            board[r][c].adjMineCount += checkNeighbor(r + 1, c + 1);
            board[r][c].adjMineCount += checkNeighbor(r - 1, c);
            board[r][c].adjMineCount += checkNeighbor(r - 1, c - 1);
            board[r][c].adjMineCount += checkNeighbor(r - 1, c + 1);
            board[r][c].adjMineCount += checkNeighbor(r, c - 1);
            board[r][c].adjMineCount += checkNeighbor(r, c + 1);
        }
    }
}

//creates a list of unique random numbers each 
//less than boardSize, which become the coordinates for the 
//mines of the current game
function generateMines(total, boardSize) {
    let rands = [];
    while (rands.length < total) {
        const r = Math.floor(Math.random() * boardSize);
        if (rands.indexOf(r) !== -1) {
            continue;
        }
        else {
            rands.push(r);
        }
    }
    return rands;
}

//
function startTimer(){
    const timerId = setInterval(function () {
        if (elapsedTime < 1000) {
            if (gameOver || winner) {
                gameTime=elapsedTime;
                elapsedTime = 0;
                return;
            }
            timerEl.innerText = elapsedTime;
            elapsedTime++;
        }
        else {
            clearInterval(timerId);  // BUG FIX
        }
    }, 1000);
}

/*-------------------------------------------------------------------------------------------------------------
RECURSIVE REVEAL FUNCTION AND HELPERS
---------------------------------------------------------------------------------------------------------------*/

// recursively reveals all tiles adjacent to blank (0 adjacent mines)
// tiles
function reveal(cell) {
    cell.isRevealed = true;
    if (cell.adjMineCount === 0) {

        if (isInBounds((cell.row + 1), cell.col)) {
            revealNeighbor(board[cell.row + 1][cell.col]);
        }

        if (isInBounds((cell.row + 1), (cell.col - 1))) {
            revealNeighbor(board[cell.row + 1][cell.col - 1]);
        }

        if (isInBounds((cell.row + 1), (cell.col + 1))) {
            revealNeighbor(board[cell.row + 1][cell.col + 1]);
        }

        if (isInBounds((cell.row - 1), cell.col)) {
            revealNeighbor(board[cell.row - 1][cell.col]);
        }

        if (isInBounds((cell.row - 1), (cell.col - 1))) {
            revealNeighbor(board[cell.row - 1][cell.col - 1]);
        }

        if (isInBounds((cell.row - 1), (cell.col + 1))) {
            revealNeighbor(board[cell.row - 1][cell.col + 1]);
        }

        if (isInBounds(cell.row, (cell.col - 1))) {
            revealNeighbor(board[cell.row][cell.col - 1]);
        }

        if (isInBounds(cell.row, (cell.col + 1))) {
            revealNeighbor(board[cell.row][cell.col + 1]);
        }
    }
    return;
}

//assists the reveal function by ending the recursive loop if it encounters a cell with a mine
//continues the recursive loop if not
function revealNeighbor(cell) {
    if ((board[cell.row][cell.col].isRevealed === false) && (board[cell.row][cell.col].isMine === false)) {
        return reveal(cell);
    }
    return;
}

//assists the revealNeighbor function by checking ensure that it doesnt try
//to reveal non-existant cells outside the dimensions of board
function isInBounds(row, col) {
    return (row >= 0 && row < board.length && col >= 0 && col < board[0].length);
}

/*-------------------------------------------------------------------------------------------------------------
EVENT HANDLER FUNCTIONS
---------------------------------------------------------------------------------------------------------------*/

//checks if the row and column #s passed in go out of bounds
//helper function of createAdjNumbers
function checkNeighbor(r, c) {
    if (!isInBounds(r, c)) return 0;

    if (board[r][c].isMine) {
        return 1;
    }
    return 0;
}

//checks to see that the only unrevealed squares on the board
// are the mines. if so, it changes winner to true
function checkWinner() {
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[r].length; c++) {
            if (board[r][c].isRevealed === false && board[r][c].isMine === true) continue;
            if (board[r][c].isRevealed === false) return;
        }
    }
    winner = true;
}

//handles left clicks 
function handleChoice(event) {
    let index = event.target.tagName === 'IMG' ? event.target.parentElement.id : event.target.id;
    const row = parseInt(index[1]);
    const col = parseInt(index[3]);
    if(firstClick){
        startTimer();
        while(board[row][col].isMine ===true || board[row][col].adjMineCount !== 0){
            if (difficulty === "custom") {
                let boardSize = customRow.value * customHeight.value;
                mineList = generateMines(customMines.value, boardSize);
                createBoard(customRow.value, customHeight.value, customMines.value);
                mineNum = customMines.value;
            }
            else {
                let boardSize = DIF_SET[difficulty][0] * DIF_SET[difficulty][1];
                mineList = generateMines(DIF_SET[difficulty][2], boardSize);
                createBoard(DIF_SET[difficulty][0], DIF_SET[difficulty][1], DIF_SET[difficulty][2]);
                mineNum = DIF_SET[difficulty][2];
            }
        }
        firstClick = false;
        reveal(board[row][col]);
        render();    
    }
    if (board[row][col].isFlagged || board[row][col].isRevealed || winner || gameOver) return;
    board[row][col].isRevealed = true;
    if (board[row][col].isMine) {
        gameOver = true;
        
    } else if (board[row][col].adjMineCount === 0) {
        reveal(board[row][col]);
    }
    checkWinner();
    render();
}

//handles right clicks
function flag(event) {
    event.preventDefault();
    let index = event.target.tagName === 'IMG' ? event.target.parentElement.id : event.target.id;
    const row = parseInt(index[1]);
    const col = parseInt(index[3]);
    if (board[row][col].isRevealed || winner || gameOver) return;
    board[row][col].isFlagged = !board[row][col].isFlagged;
    board[row][col].isFlagged ? mineCounterEl.innerText = --mineNum : mineCounterEl.innerText = ++mineNum;;
    render();
}

