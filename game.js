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
  const reset = () => board.fill(null);
  return { getBoard, setCell, reset };
})();

const Player = (name, mark) => ({ name, mark });

const GameController = (() => {
  let playerX = Player("Player X", "X");
  let playerO = Player("Player O", "O");
  let currentPlayer = playerX;
  let scores = { x: 0, o: 0, draw: 0 };

  const boardElement = document.getElementById('board');
  const restartBtn = document.getElementById('restartButton');
  const nameForm = document.getElementById('nameForm');
  const statusDiv = document.getElementById('gameStatus') || createStatusDiv();
  const scoreXElement = document.getElementById('scoreX');
  const scoreOElement = document.getElementById('scoreO');
  const scoreDrawElement = document.getElementById('scoreDraw');

  let cells = [];

  function createStatusDiv() {
    const status = document.createElement('div');
    status.id = 'gameStatus';
    status.style.marginBottom = '10px';
    status.style.fontWeight = 'bold';
    status.style.color = '#333';
    boardElement.parentNode.insertBefore(status, boardElement);
    return status;
  }

  function createCells() {
    boardElement.innerHTML = '';
    cells = [];
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-cell', '');
      boardElement.appendChild(cell);
      cells.push(cell);
    }
  }

  const updateStatus = () => {
    statusDiv.textContent = `Current Turn: ${currentPlayer.name}`;
  };

  const updateScoreboard = () => {
    scoreXElement.textContent = `❌ ${playerX.name}: ${scores.x}`;
    scoreOElement.textContent = `🟢 ${playerO.name}: ${scores.o}`;
    scoreDrawElement.textContent = `➖ Draws: ${scores.draw}`;
  };

  const startGame = () => {
    Gameboard.reset();
    createCells();
    cells.forEach((cell, index) => {
      cell.textContent = '';
      cell.classList.remove('x', 'o');
      cell.addEventListener('click', () => handleTurn(cell, index), { once: true });
    });
    statusDiv.classList.remove('win', 'draw');
    updateStatus();
    updateScoreboard();
  };

  const handleTurn = (cell, index) => {
    if (Gameboard.setCell(index, currentPlayer.mark)) {
      cell.textContent = currentPlayer.mark;
      cell.classList.add(currentPlayer.mark.toLowerCase());

      if (checkWin(currentPlayer.mark)) {
        scores[currentPlayer.mark.toLowerCase()]++;
        statusDiv.textContent = `${currentPlayer.name} wins!`;
        statusDiv.classList.add('win');
        updateScoreboard();
        setTimeout(startGame, 2000); // Restart after 5 seconds
        return;
      }

      if (isDraw()) {
        scores.draw++;
        statusDiv.textContent = "It's a draw!";
        statusDiv.classList.add('draw');
        updateScoreboard();
        setTimeout(startGame, 2000); // Restart after 2 seconds
        return;
      }

      currentPlayer = currentPlayer === playerX ? playerO : playerX;
      updateStatus();
    }
  };

  const checkWin = (mark) => {
    const b = Gameboard.getBoard();
    const winCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    return winCombos.some(combo => combo.every(i => b[i] === mark));
  };

  const isDraw = () => Gameboard.getBoard().every(cell => cell !== null);

  nameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameX = document.getElementById('playerXName').value.trim() || 'Player X';
    const nameO = document.getElementById('playerOName').value.trim() || 'Player O';
    playerX = Player(nameX, 'X');
    playerO = Player(nameO, 'O');
    currentPlayer = playerX;
    scores = { x: 0, o: 0, draw: 0 }; // Reset scores on new game
    startGame();
  });

  restartBtn.addEventListener('click', () => {
    currentPlayer = playerX;
    startGame();
  });

  return { startGame };
})();

document.addEventListener('DOMContentLoaded', () => {
  GameController.startGame();
});