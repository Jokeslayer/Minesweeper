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

    const DIFFICULTY_SETTINGS = {
        'beginner'      : [9,9,10],
        'intermediate'  : [16,16,40],
        'expert'        : [16,30,99]
    };

/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    CELL CLASS
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/

    class CELL{
        constructor(col,row){
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
    let board;                
    let difficulty;           //determines the size of the game board
    let winner = null;        // null = no winner, 1 or -1 winner, T = tied game
    let gameOver = false;     // boolean which determines whether a bomb has been clicked on
  
/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    CACHED ELEMENTS
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/
  
    const playAgainBtn = document.querySelector('button');
  
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
        winner = null;
        render();
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
    
    function handleChoice(event){
    }

    function handleSweep(event){
    }

    function flag(event){
    }
    
    function getWinner(){
    }