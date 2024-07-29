// Select all elements with the class "cell"
const cells = document.querySelectorAll(".cell");

// Starting player (X)
let currentPlayer = "X";

// Number of moves played
let moves = 0;

// Function to handle cell clicks
function handleClick(e) {
  // Increment move counter
  moves++;

  // Get the clicked cell element
  const cell = e.target;

  // Set the cell content to the current player's symbol (X or O)
  cell.textContent = currentPlayer;

  // Remove click listener to prevent multiple clicks on the same cell
  cell.removeEventListener("click", handleClick);

  // Check for winner after each move
  const winner = checkForWinner();

  // If there's a winner, display an alert and reset the game
  if (winner) {
    alert(`Player ${winner} wins!`);
    resetGame();
  } else if (moves === 9) {
    // If all cells are filled and no winner, it's a draw
    alert("It's a draw!");
    resetGame();
  } else {
    // Switch player for the next turn
    switchPlayer();
  }
}

// Add click listeners to all cells
for (const cell of cells) {
  cell.addEventListener("click", handleClick);
}

// Function to check for winning combinations
function checkForWinner() {
  // Define all possible winning combinations
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Loop through each winning combination
  for (const combination of winningCombinations) {
    const [a, b, c] = combination; // Destructure combination for easier access

    // Check if all cells in the combination have the same content (currentPlayer's symbol)
    if (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    ) {
      // If all cells match, return the current player as the winner
      return currentPlayer;
    }
  }

  // No winner found, return null
  return null;
}

// Function to switch between players (X and O)
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Function to reset the game after a win or draw
function resetGame() {
  // Clear all cell content
  for (const cell of cells) {
    cell.textContent = "";
  }

  // Re-attach click listeners to all cells
  for (const cell of cells) {
    cell.addEventListener("click", handleClick);
  }

  // Reset move counter and current player
  moves = 0;
  currentPlayer = "X";
}
