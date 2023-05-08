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
  
/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    EVENT LISTENERS
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/

    document.getElementById('board').addEventListener('click',handleChoice);
    document.getElementById('board').addEventListener('contextmenu',flag);
    document.getElementById('board').addEventListener('mousedown',handleSweep);

    playAgainBtn.addEventListener('click',init);
  
/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    FUNCTIONS
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/
    init();
    
    // Initialize state and call render
    function init() {
        difficulty = button_val = document.querySelector('input[name="difficulty"]:checked').value;
        console.log(difficulty);
        createBoard(DIF_SET[difficulty][0],DIF_SET[difficulty][1],DIF_SET[difficulty][2]);
        winner = null;
        gameOver = false;
        render();
    }
    
    function getWinner(){
    }

    //digitalize state
    function render(){
        renderBoard();
        renderControls();
    }
    
    function renderBoard(){

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
        let table = document.createElement('table');
        let count=0;
        for(let r=0;r<row;r++){
            board[r]=[];
            for(let c=0;c<col;c++){
                board[r][c]=new CELL(row,col);
                let cell = document.createElement('div');
                /* console.log('creating new div');
                document.getElementById('board').appendChild(cell);
                console.log('appending div'); */
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
    