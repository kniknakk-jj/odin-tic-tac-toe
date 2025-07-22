// script.js

// Gameboard Module
const Gameboard = (() => {
  const board = Array(9).fill(null);

  const getBoard = () => [...board];

  const setCell = (index, mark) => {
    if (!board[index]) {
      board[index] = mark;
      return true;
    }
    return false;
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) board[i] = null;
  };

  return { getBoard, setCell, reset };
})();

// Player Factory
const Player = (name, mark) => {
  return { name, mark };
};

// Game Controller Module
const GameController = (() => {
  const playerX = Player('Player X', 'X');
  const playerO = Player('Player O', 'O');
  let currentPlayer = playerX;

  const cells = document.querySelectorAll('[data-cell]');
  const restartBtn = document.getElementById('restartButton');

  const startGame = () => {
    cells.forEach((cell, index) => {
      cell.textContent = '';
      cell.classList.remove('x', 'o');
      cell.addEventListener('click', () => handleTurn(cell, index), { once: true });
    });
    Gameboard.reset();
    currentPlayer = playerX;
  };

  const handleTurn = (cell, index) => {
    if (Gameboard.setCell(index, currentPlayer.mark)) {
      cell.textContent = currentPlayer.mark;
      cell.classList.add(currentPlayer.mark.toLowerCase());

      if (checkWin(currentPlayer.mark)) {
        setTimeout(() => alert(`${currentPlayer.name} wins!`), 100);
        return;
      }

      if (isDraw()) {
        setTimeout(() => alert("It's a draw!"), 100);
        return;
      }

      currentPlayer = currentPlayer === playerX ? playerO : playerX;
    }
  };

  const checkWin = (mark) => {
    const b = Gameboard.getBoard();
    const winCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    return winCombos.some(combo => combo.every(i => b[i] === mark));
  };

  const isDraw = () => {
    return Gameboard.getBoard().every(cell => cell !== null);
  };

  restartBtn.addEventListener('click', startGame);

  return { startGame };
})();

// Start the game when script loads
GameController.startGame();
