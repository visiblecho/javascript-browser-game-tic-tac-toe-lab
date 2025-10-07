/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    // horizontally
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // diagonally
    [0, 4, 8],
    [2, 4, 6],
    // vertically
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
]

/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

const boardEl = document.querySelector('#board');
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetEl = document.querySelector('#reset');
console.debug('Caching DOM selectors completed')

/*-------------------------------- Functions --------------------------------*/

const updateBoard = () => {
    board.forEach((element, index) => {
        squareEls[index].textContent = element;
    });
    console.debug('updateBoard completed')
}

const updateMessage = () => {
    let msg = '';
    if (!winner && !tie) msg = `Next turn: ${turn}`
    else if (!winner && tie) msg = 'Tie: Both win'
    else msg = `${turn} has won, congrats!`;
    messageEl.textContent = msg;
    console.debug('updateMessage completed with message as', msg)
}

const render = () => {
    updateBoard();
    updateMessage();
    console.debug('render completed')
}

const init = () => {
    board = [
        '', '', '',
        '', '', '',
        '', '', '',
    ];
    turn = 'X';
    winner = false;
    tie = false;
    console.debug('init completed');
    render();
}

const placePiece = (index) => {
    board[index] = turn;
    console.debug(`placePiece completed with new board as ${board}`);
}

const checkForWinner = () => {
    winningCombos.forEach(combo => {
        const segment = [
            board[combo[0]], board[combo[1]], board[combo[2]]
        ];
        if ((segment[0] !== '') && 
            (segment[0] === segment[1]) &&
            (segment[0] === segment[2])) winner = true;
    })
    console.debug('checkForWinner completed with winner as', winner)
}

const checkForTie = () => {
    if (winner) return;
    hasEmptySquare = board.some((square) => { return square === ''} );
    if (!hasEmptySquare) tie = true;
    console.debug('checkForTie completed with tie as', tie);
}

const switchPlayerTurn = () => {
    if (winner) return;
    if (turn === 'X') {turn = 'O'} else {turn = 'X'};
    console.debug('switchPlayerTurn completed with turn as', turn);
}

const handleClick = (event) => {
    const squareIndex = event.target.id;
    // Leave if the move is invalid because the square is already taken
    // or if there is a winner or a tie
    if (winner || tie ||  board[squareIndex] !== '') return;
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
    console.debug('handleClick completed');
}

/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener('click', (event) => {
    console.log('User clicked on square:', event.target.id);
    handleClick(event)
})

resetEl.addEventListener('click', () => {init()});

init()