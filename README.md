Tic Tac Toe
A browser-based Tic Tac Toe game built with HTML, CSS, and JavaScript, following an object-oriented approach with minimal global code. The game allows two players to enter their names, play on a 3x3 grid, track scores, and automatically restarts 5 seconds after a win or draw.
Table of Contents

Features
Installation
Usage
Project Structure
Implementation Details
License

Features

Modular Design: Uses Immediately Invoked Function Expressions (IIFEs) to create single-instance objects for Gameboard, GameController, and player management.
Dynamic Gameboard: Stores the 3x3 gameboard as an array within a Gameboard object, rendered dynamically to the DOM.
Player Objects: Players are represented as objects with customizable names and marks (X or O).
Game Logic: Handles turn-based gameplay, checks for wins (all 3-in-a-row combinations) and draws, and prevents moves in occupied cells.
Interactive UI: Players can input names via a form, click cells to place marks, and restart the game with a button.
Scoreboard: Tracks wins for each player and draws, updating with custom player names.
Auto-Restart: Restarts the game automatically 5 seconds after a win or draw.
Responsive Design: Styled with CSS Grid for the board and flexbox for layout, with hover effects and visual feedback.

Installation

Clone the Repository:
git clone <repository-url>
cd tic-tac-toe


Serve the Project:

Use a local server (e.g., npx http-server or Python's python -m http.server) to serve the files.
Alternatively, open index.html directly in a browser (note: some browsers may restrict local file access).


Ensure File Structure:

index.html: Main HTML file.
style.css: Styles for the game UI.
game.js: Game logic and DOM manipulation.



Usage

Open index.html in a browser.
Enter names for Player X and Player O in the form (defaults to "Player X" and "Player O" if left blank).
Click "Start Game" to begin.
Click on any cell in the 3x3 grid to place your mark (X or O).
The game checks for wins or draws after each move.
The scoreboard updates to reflect wins and draws, using the entered player names.
After a win or draw, the game automatically restarts after 5 seconds.
Click "Restart Game" to reset the board manually at any time.

Project Structure
tic-tac-toe/
├── index.html      # Main HTML file with game structure
├── style.css       # CSS for styling the game board and UI
├── game.js         # JavaScript for game logic and DOM interaction
└── README.md       # Project documentation

Implementation Details

Gameboard Module:
Implemented as an IIFE (Gameboard) to manage a single instance of the 3x3 gameboard array.
Provides methods: getBoard (returns a copy of the board), setCell (places a mark if the cell is empty), and reset (clears the board).


Player Factory:
Player factory creates player objects with name and mark properties.


GameController Module:
Implemented as an IIFE to control game flow.
Manages players, current turn, score tracking, and DOM updates.
Handles form submission for player names, cell clicks for moves, win/draw detection, and auto-restart after 5 seconds.
Uses updateScoreboard to reflect player names and scores.


DOM Interaction:
Dynamically creates 3x3 grid cells in the #board div.
Updates the #gameStatus div for turn/win/draw messages.
Updates the scoreboard (#scoreX, #scoreO, #scoreDraw) with player names and scores.
Prevents moves in occupied cells using once: true event listeners.


CSS Styling:
Uses CSS Grid for the 3x3 board layout.
Styles cells with borders, hover effects, and color changes for X (blue) and O (green).
Centers the game with flexbox and includes a styled scoreboard with shadows.


Win/Draw Logic:
Checks all eight winning combinations (rows, columns, diagonals) using checkWin.
Detects draws when all cells are filled without a winner.


Auto-Restart:
Uses setTimeout to call startGame 5 seconds after a win or draw.
