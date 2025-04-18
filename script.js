
//Create gameboard and populate with empty cells
const createBoard = (function() {
    const rows = 3;
    const columns = 3;
    const board = [];
    
    const setBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i][j] = '';
            }
        }
    };

    setBoard();
   

    //Creates and returns copy of board
    const getBoard = () => board.map(row => [...row]);
    
    let running = true;
    let currentPlayer = "X";
    let moves = 0; 
    
    
    //checks for blank space within range
    const addMarker = (column, row) => {
        const openSpace = (col, rw) => {
            if (rw < 0 || rw >= board.length || col < 0 || col >= board[0].length) {
                console.log("Invalid spot");
                return false;
            }
            
            if (board[row][column] !== ''){
                console.log("Spot filled already");
                return false;
            }
            //returns true if empty
            return board[rw][col] === '';
        }
        //places marker, logs board, increments moves, switches players
        if (openSpace(column, row)){
            board[row][column] = currentPlayer;
            moves++;
            console.log("Marker added!");
            console.log(createBoard.getBoard());
            
            const winCheck = checkWin();
                if (winCheck) {
                    winner = winCheck;
                    running = false;
                    console.log(`Player ${winner} wins!`);
                } else if (moves === 9) {
                    running = false;
                    console.log("Draw game")
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";

                }
            }

        } 

        
    const restartGame = () => {
        setBoard();
        running = true;
        currentPlayer = "X";
        moves = 0; 
        console.log("Game reset!");
        console.log(createBoard.getBoard())
    };

    return {
        getBoard: () => board.map(row => [...row]), addMarker, restartGame
    };
})(); //IIFE

//move(x,y)
const move = createBoard.addMarker;

//check for winning pattern
const checkWin = () => {
    const board = createBoard.getBoard();
    const lines = [
        // Rows
        [ [0,0], [0,1], [0,2] ],
        [ [1,0], [1,1], [1,2] ],
        [ [2,0], [2,1], [2,2] ],
        // Columns
        [ [0,0], [1,0], [2,0] ],
        [ [0,1], [1,1], [2,1] ],
        [ [0,2], [1,2], [2,2] ],
        // Diagonals
        [ [0,0], [1,1], [2,2] ],
        [ [0,2], [1,1], [2,0] ],
    ];
    //check for matches, return player letter if true otherwise false
    for (let line of lines) {
        const [a, b, c] = line;
        if (
            board[a[0]][a[1]] &&
            board[a[0]][a[1]] === board[b[0]][b[1]] &&
            board[a[0]][a[1]] === board[c[0]][c[1]]
        ) {
            return board[a[0]][a[1]];
        }
    }

    return null;
};



move(0,0)
move(0,2)
move(1,0)
move(2,1)
move(2,0)


