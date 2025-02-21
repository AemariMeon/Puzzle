// Constants
const PUZZLE_ROWS = 4;
const PUZZLE_COLS = 4;
const IMAGE_WIDTH = 720;   // Width of your puzzle image
const IMAGE_HEIGHT = 728;  // Height of your puzzle image
const TILE_WIDTH = IMAGE_WIDTH / PUZZLE_COLS;
const TILE_HEIGHT = IMAGE_HEIGHT / PUZZLE_ROWS;

// Variables
let tiles = [];
let emptyPosition = { x: PUZZLE_COLS - 1, y: PUZZLE_ROWS - 1 }; // Starts at bottom-right corner
const puzzleElement = document.getElementById('puzzle');
const shuffleButton = document.getElementById('shuffle');

// Initialize the game when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    createPuzzle();
    shufflePuzzle(); // Shuffle the puzzle when the game loads
    shuffleButton.addEventListener('click', shufflePuzzle);
});

/* Create the puzzle grid */
function createPuzzle() {
    // Clear any existing tiles
    puzzleElement.innerHTML = '';
    tiles = [];

    for (let row = 0; row < PUZZLE_ROWS; row++) {
        for (let col = 0; col < PUZZLE_COLS; col++) {
            let tile = document.createElement('div');
            tile.classList.add('tile');
            tile.style.width = `${TILE_WIDTH}px`;
            tile.style.height = `${TILE_HEIGHT}px`;

            // Initial position
            tile.dataset.x = col;
            tile.dataset.y = row;
            setTilePosition(tile, col, row);

            // Set background image and position
            tile.style.backgroundImage = "url('assets/puzzle-image.jpg')";
            tile.style.backgroundSize = `${IMAGE_WIDTH}px ${IMAGE_HEIGHT}px`;
            tile.style.backgroundPosition = `-${col * TILE_WIDTH}px -${row * TILE_HEIGHT}px`;

            // Add tile to the puzzle
            puzzleElement.appendChild(tile);
            tiles.push(tile);

            // Skip adding event listener to the last tile (empty space)
            if (row === PUZZLE_ROWS - 1 && col === PUZZLE_COLS - 1) {
                tile.classList.add('hidden'); // Hide the last tile
                continue;
            }

            tile.addEventListener('click', moveTile);
        }
    }
}

/* Set the position of a tile */
function setTilePosition(tile, x, y) {
    tile.style.left = `${x * TILE_WIDTH}px`;
    tile.style.top = `${y * TILE_HEIGHT}px`;
}

/* Shuffle the puzzle */
function shufflePuzzle() {
    // Create an array of tile positions excluding the empty space
    let positions = [];
    for (let i = 0; i < PUZZLE_ROWS * PUZZLE_COLS - 1; i++) {
        positions.push(i);
    }

    // Shuffle the positions array
    positions.sort(() => Math.random() - 0.5);

    // Map shuffled positions back to tile coordinates
    positions.forEach((pos, index) => {
        let tile = tiles[index];
        let x = pos % PUZZLE_COLS;
        let y = Math.floor(pos / PUZZLE_COLS);

        tile.dataset.x = x;
        tile.dataset.y = y;
        setTilePosition(tile, x, y);
    });

    // Update the empty position
    emptyPosition = { x: PUZZLE_COLS - 1, y: PUZZLE_ROWS - 1 };
}

/* Move tile if adjacent to empty space */
function moveTile() {
    let x = parseInt(this.dataset.x);
    let y = parseInt(this.dataset.y);

    // Check if the tile is adjacent to the empty space
    if (isAdjacent(x, y, emptyPosition.x, emptyPosition.y)) {
        // Swap positions
        setTilePosition(this, emptyPosition.x, emptyPosition.y);

        // Update tile's data attributes
        this.dataset.x = emptyPosition.x;
        this.dataset.y = emptyPosition.y;

        // Update the empty position
        emptyPosition.x = x;
        emptyPosition.y = y;
    }
}

/* Check if two positions are adjacent */
function isAdjacent(x1, y1, x2, y2) {
    return (Math.abs(x1 - x2) + Math.abs(y1 - y2)) === 1;
}
