// script.js

const cells = document.querySelectorAll('[data-cell]');
const restartBtn = document.getElementById('restartButton');
let xTurn = true;

// Game board array: index 0-8 for 3x3 grid
let gameBoard = Array(9).fill(null);

function handleClick(e) {
  const cell = e.target;
  const index = Array.from(cells).indexOf(cell);

  // Don't allow override
  if (gameBoard[index]) return;

  const mark = xTurn ? 'X' : 'O';

  // Update DOM
  cell.textContent = mark;
  cell.classList.add(mark.toLowerCase());

  // Update board state
  gameBoard[index] = mark;

  // Toggle turn
  xTurn = !xTurn;
}

function restartGame() {
  gameBoard.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
  xTurn = true;
}

// Attach event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
