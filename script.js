// Constants
const PUZZLE_ROWS = 4;
const PUZZLE_COLS = 4;
const IMAGE_WIDTH = 720;  // Puzzle image width
const IMAGE_HEIGHT = 728; // Puzzle image height
const TILE_WIDTH = IMAGE_WIDTH / PUZZLE_COLS;
const TILE_HEIGHT = IMAGE_HEIGHT / PUZZLE_ROWS;

// Variables
let tiles = [];
let positions = [];
let emptyPosition = { x: PUZZLE_COLS - 1, y: PUZZLE_ROWS - 1 };
const puzzleElement = document.getElementById('puzzle');
const shuffleButton = document.getElementById('shuffle');

window.onload = function() {
    createPuzzle();
    shufflePuzzle();  // Shuffle the puzzle when loaded
    shuffleButton.addEventListener('click', shufflePuzzle);
};

/* Create the puzzle grid */
function createPuzzle() {
    for (let row = 0; row < PUZZLE_ROWS; row++) {
        for (let col = 0; col < PUZZLE_COLS; col++) {

            let tile = document.createElement('div');
            tile.classList.add('tile');
            tile.style.width = `${TILE_WIDTH}px`;
            tile.style.height = `${TILE_HEIGHT}px`;

            // Position the tile
            tile.style.left = `${col * TILE_WIDTH}px`;
            tile.style.top = `${row * TILE_HEIGHT}px`;

            // Set background position
            tile.style.backgroundPosition = `-${col * TILE_WIDTH}px -${row * TILE_HEIGHT}px`;

            // Set tile coordinates
            tile.dataset.x = col;
            tile.dataset.y = row;

            // Add to the puzzle
            puzzleElement.appendChild(tile);
            tiles.push(tile);
            positions.push({ x: col, y: row });

            // Skip adding event listener to the last tile (empty space)
            if (row === PUZZLE_ROWS - 1 && col === PUZZLE_COLS - 1) {
                tile.classList.add('hidden'); // Hide the last tile
                continue;
            }

            tile.addEventListener('click', moveTile);
        }
    }
}

/* Move tile if adjacent to empty space */
function moveTile() {
    let x = parseInt(this.dataset.x);
    let y = parseInt(this.dataset.y);

    // Check if the tile is adjacent to the empty space
    if (isAdjacent(x, y, emptyPosition.x, emptyPosition.y)) {
        // Swap positions
        moveTileToPosition(this, emptyPosition.x, emptyPosition.y);

        // Update empty position
        emptyPosition.x = x;
        emptyPosition.y = y;
    }
}

/* Check if two positions are adjacent */
function isAdjacent(x1, y1, x2, y2) {
    return (Math.abs(x1 - x2) + Math.abs(y1 - y2)) === 1;
}

/* Move tile to specified position */
function moveTileToPosition(tile, x, y) {
    tile.style.left = `${x * TILE_WIDTH}px`;
    tile.style.top = `${y * TILE_HEIGHT}px`;

    // Update tile data
    tile.dataset.x = x;
    tile.dataset.y = y;
}

/* Shuffle the puzzle */
function shufflePuzzle() {
    let shuffleMoves = 1000; // Number of random moves

    for (let i = 0; i < shuffleMoves; i++) {
        let adjacentTiles = getMovableTiles();

        // Randomly select a tile to move
        if (adjacentTiles.length > 0) {
            let randomTile = adjacentTiles[Math.floor(Math.random() * adjacentTiles.length)];
            randomTile.click();
        }
    }
}

/* Get list of tiles that can move */
function getMovableTiles() {
    return tiles.filter(tile => {
        let x = parseInt(tile.dataset.x);
        let y = parseInt(tile.dataset.y);
        return isAdjacent(x, y, emptyPosition.x, emptyPosition.y);
    });
}
