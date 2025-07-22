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

  const cells = document.querySelectorAll('[data-cell]');
  const restartBtn = document.getElementById('restartButton');
  const setNamesBtn = document.getElementById('setNamesButton');
  const nameForm = document.getElementById('nameForm');
  const confirmNames = document.getElementById('confirmNames');
  const statusDiv = document.getElementById('gameStatus');

  const updateStatus = () => {
    statusDiv.textContent = `Current Turn: ${currentPlayer.name}`;
  };

  const startGame = () => {
    Gameboard.reset();
    cells.forEach((cell, index) => {
      cell.textContent = '';
      cell.classList.remove('x', 'o');
      cell.addEventListener('click', () => handleTurn(cell, index), { once: true });
    });
    updateStatus();
  };

  const handleTurn = (cell, index) => {
    if (Gameboard.setCell(index, currentPlayer.mark)) {
      cell.textContent = currentPlayer.mark;
      cell.classList.add(currentPlayer.mark.toLowerCase());

      if (checkWin(currentPlayer.mark)) {
        statusDiv.textContent = `${currentPlayer.name} wins!`;
        return;
      }

      if (isDraw()) {
        statusDiv.textContent = "It's a draw!";
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

  setNamesBtn.addEventListener('click', () => {
    nameForm.classList.toggle('hidden');
  });

  confirmNames.addEventListener('click', () => {
    const nameX = document.getElementById('playerXName').value || 'Player X';
    const nameO = document.getElementById('playerOName').value || 'Player O';
    playerX = Player(nameX, 'X');
    playerO = Player(nameO, 'O');
    currentPlayer = playerX;
    nameForm.classList.add('hidden');
    startGame();
  });

  restartBtn.addEventListener('click', () => {
    currentPlayer = playerX;
    startGame();
  });

  return { startGame };
})();

Game
