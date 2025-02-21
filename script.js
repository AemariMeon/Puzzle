// Puzzle grid dimensions
const rows = 4;
const cols = 4;

// The puzzle container
const puzzle = document.getElementById('puzzle');

// We'll use a smaller overall puzzle area of 400x400
const totalWidth = 400;
const totalHeight = 400;

// Each tile's width/height
const tileWidth = totalWidth / cols;   // 400 / 4 = 100
const tileHeight = totalHeight / rows; // 400 / 4 = 100

// We'll keep an array to track tile positions
// Indices 0..15, with 15 as the "empty" slot.
let tiles = [];
let emptyTileIndex = rows * cols - 1; // 15

/**
 * Initialize the puzzle on page load:
 *  1. Create tile array
 *  2. Shuffle
 *  3. Render
 *  4. Hook up Shuffle button
 */
function init() {
  // Fill tiles array with 0..15
  tiles = [];
  for (let i = 0; i < rows * cols; i++) {
    tiles.push(i);
  }

  shuffleTiles();
  renderPuzzle();

  // Shuffle again if the user clicks the Shuffle button
  document.getElementById('shuffleButton').addEventListener('click', () => {
    shuffleTiles();
    renderPuzzle();
  });
}

/**
 * Shuffle the tiles array in-place (simple random shuffle).
 * This doesn't guarantee solvability, but randomizes the puzzle.
 */
function shuffleTiles() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  // Update the emptyTileIndex after shuffling
  emptyTileIndex = tiles.indexOf(rows * cols - 1);
}

/**
 * Render the puzzle in the DOM.
 * We place each tile (except the empty one) with the correct
 * background offset and position based on its current index.
 */
function renderPuzzle() {
  // Clear the puzzle area
  puzzle.innerHTML = '';

  // Loop through each tile index
  for (let i = 0; i < tiles.length; i++) {
    const tileValue = tiles[i];

    // Skip rendering the 'empty' tile
    if (tileValue === rows * cols - 1) {
      continue;
    }

    // Create a tile div
    const tile = document.createElement('div');
    tile.className = 'tile';

    // Calculate the tile's row/col based on i
    const row = Math.floor(i / cols);
    const col = i % cols;

    // Position the tile in the puzzle container
    tile.style.width = tileWidth + 'px';
    tile.style.height = tileHeight + 'px';
    tile.style.left = (col * tileWidth) + 'px';
    tile.style.top = (row * tileHeight) + 'px';

    // Calculate the original (row, col) for this piece
    const originalRow = Math.floor(tileValue / cols);
    const originalCol = tileValue % cols;

    // Adjust background position to show correct part of the image
    tile.style.backgroundPosition = `-${originalCol * tileWidth}px -${originalRow * tileHeight}px`;

    // Add click event to attempt to move the tile
    tile.addEventListener('click', () => {
      moveTile(i);
    });

    puzzle.appendChild(tile);
  }
}

/**
 * Attempt to move a tile at tileIndex if it is adjacent to the empty slot.
 */
function moveTile(tileIndex) {
  // Current tile's row/col
  const tileRow = Math.floor(tileIndex / cols);
  const tileCol = tileIndex % cols;

  // Empty tile's row/col
  const emptyRow = Math.floor(emptyTileIndex / cols);
  const emptyCol = emptyTileIndex % cols;

  // Check adjacency (Manhattan distance = 1 for up/down/left/right)
  const distance = Math.abs(tileRow - emptyRow) + Math.abs(tileCol - emptyCol);
  if (distance === 1) {
    // Swap the clicked tile with the empty tile
    [tiles[tileIndex], tiles[emptyTileIndex]] = [tiles[emptyTileIndex], tiles[tileIndex]];
    emptyTileIndex = tileIndex; // Update empty tile index
    renderPuzzle();

    // Check if the puzzle is solved
    if (checkWin()) {
      setTimeout(() => {
        alert('Congratulations! You solved the puzzle!');
      }, 200);
    }
  }
}

/**
 * Checks if the puzzle is solved:
 *  tiles[i] should be i for all i except the last tile (empty slot).
 */
function checkWin() {
  for (let i = 0; i < tiles.length - 1; i++) {
    if (tiles[i] !== i) {
      return false;
    }
  }
  return true;
}

// Initialize once the DOM is fully loaded
window.addEventListener('DOMContentLoaded', init);
