/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    
    ]

/*---------------------------- Variables (state) ----------------------------*/

/*a. Use a variable named board to represent the state of the squares on the board.

b. Use a variable named turn to track whose turn it is.

c. Use a variable named winner to represent if anyone has won yet.

d. Use a variable named tie to represent if the game has ended in a tie.*/

let board;

let turn;

let winner;

let tie;


/*------------------------ Cached Element References ------------------------*/
/*a. In a constant called squareEls, store the nine elements representing the squares on the page.

b. In a constant called messageEl, store the element that displays the game’s status on the page.*/

const messageEl = document.getElementById('message');


const squares = document.querySelectorAll('.sqr');

//. Store the new reset button element as a cached element reference in a constant named resetBtnEl.

const resetBtnEl = document.getElementById('reset');

/* a. In a constant called winningCombos, define the eight possible winning combinations as an array of arrays.*/






/*-------------------------------- Functions --------------------------------*/
/* a. Create a function called init.

b. Call the init function when the app loads.
c. Set the board variable to an array containing nine empty strings ('') representing empty squares.
d. Set the turn to X - this will represent player X.
e. Set the winner to false.
f. Set tie to false.
g. Call a function named render() at the end of the init() function.
*/


function init () {

board = ['', '', '', '', '', '', '', '',''];
turn = 'X';
winner = null;
tie = false;
render ();
}



init ();

/*a. Create a function called render, then set it aside for now.

b. Create a function called updateBoard.

c. In the updateBoard function, loop over board and for each element:
Use the current index of the iteration to access the corresponding square in the squareEls.
Style that square however you wish, dependent on the value contained in the current cell being iterated over
d. Create a function called updateMessage.

e. In updateMessage, render a message based on the current game state:

If both winner and tie have a value of false (meaning the game is still in progress), render whose turn it is.
If winner is false, but tie is true, render a tie message.
Otherwise, render a congratulatory message to the player that has won.
f. Invoke both the updateBoard and the updateMessage functions inside your render function.
*/

function render () {
    updateBoard();
    updateMessage();
}


function updateBoard () {

board.forEach((value, index) => {
    squares[index].textContent = value;
});
}


function updateMessage() {
    if (winner) {
      messageEl.textContent = `Congratulations, ${turn} wins!`;
    } else if (tie) {
      messageEl.textContent = "It's a tie!";
    } else {
      messageEl.textContent = `It's ${turn}'s turn`;
    }
  }



  function placePiece (index) {
    board[index] = turn;
  // For testing, log the updated board array
  console.log(board);
}

  function checkForWinner() {
      for (let combo of winningCombos) {
        const [a, b, c] = combo;

    /*Check the following for each of the eight winning combinations:

Check to see if the value held in the first position is not an empty string ''.

Also, check to see if the value held in the first position equals the value held in the second position.

Also, check to see if the value held in the first position equals the value held in the third position.

If those three conditions are all true, then someone has won. Set winner to true.

*/ 
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
    }
  }
}


  function checkTie() {
    if (board.every((square) => square !== '') && !winner) {
      tie = true;
    }
  }
   

  function switchPlayerTurn() {
    if (winner) return; // Exit if there is a winner
  
    // Switch turn between 'X' and 'O'
    turn = turn === 'X' ? 'O' : 'X';
  // 💡 For testing purposes, add a console log for turn after you’ve updated the turn state.
    console.log(`It's now ${turn}'s turn.`);
  }


  function handleClick(event) {
    //  Obtain the index of the clicked square. To do this, get the index from an id assigned to the target element in the HTML. Assign this to a constant called squareIndex.
    const squareIndex = parseInt(event.target.id);
  
    // Check if the square is empty and there's no winner yet
    if (board[squareIndex] === '' && !winner) {
      // Update the board with the current player's move
      board[squareIndex] = turn;

      placePiece(squareIndex);

      checkForWinner();

      checkTie();

      switchPlayerTurn();

      render();
    }
}
  
function resetGame() {
    init(); // Call init to reset the game
  }



/*----------------------------- Event Listeners -----------------------------*/


//Option 1: Add an event listener to each of the existing squareEls with a loop. Set up the event listener to respond to the 'click' event. The event listener should call the handleClick function you created in step 6a.


squares.forEach((square) => {
    square.addEventListener('click', handleClick);

});

resetBtnEl.addEventListener('click', resetGame);