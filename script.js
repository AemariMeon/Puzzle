const PUZZLE_SIZE = 4;
let tiles = [];
let emptyTile = { x: PUZZLE_SIZE - 1, y: PUZZLE_SIZE - 1 };
const puzzleElement = document.getElementById('puzzle');

window.onload = function() {
    initPuzzle();
    document.getElementById('shuffle').addEventListener('click', shuffleTiles);
};

/* Initialize the puzzle */
function initPuzzle() {
    let tileNumbers = [];
    for (let i = 0; i < PUZZLE_SIZE * PUZZLE_SIZE - 1; i++) {
        tileNumbers.push(i);
    }

    for (let row = 0; row < PUZZLE_SIZE; row++) {
        for (let col = 0; col < PUZZLE_SIZE; col++) {
            if (row === emptyTile.y && col === emptyTile.x) continue;

            let tileIndex = row * PUZZLE_SIZE + col;
            let tileNumber = tileNumbers.shift();

            let tile = document.createElement('div');
            tile.className = 'tile';
            tile.style.backgroundImage = "url('assets/puzzle-image.jpg')";
            tile.style.backgroundPosition = `-${col * 80}px -${row * 80}px`;

            tile.setAttribute('data-x', col);
            tile.setAttribute('data-y', row);

            tile.addEventListener('click', moveTile);

            puzzleElement.appendChild(tile);
            tiles.push(tile);
        }
    }
}

/* Move the tile if adjacent to empty space */
function moveTile() {
    let x = parseInt(this.getAttribute('data-x'));
    let y = parseInt(this.getAttribute('data-y'));

    if ((Math.abs(x - emptyTile.x) === 1 && y === emptyTile.y) || (Math.abs(y - emptyTile.y) === 1 && x === emptyTile.x)) {
        this.setAttribute('data-x', emptyTile.x);
        this.setAttribute('data-y', emptyTile.y);
        this.style.transform = `translate(${emptyTile.x * 82}px, ${emptyTile.y * 82}px)`;

        emptyTile.x = x;
        emptyTile.y = y;
    }
}

/* Shuffle the tiles */
function shuffleTiles() {
    for (let i = 0; i < 1000; i++) {
        let adjacentTiles = tiles.filter(tile => {
            let x = parseInt(tile.getAttribute('data-x'));
            let y = parseInt(tile.getAttribute('data-y'));
            return (Math.abs(x - emptyTile.x) === 1 && y === emptyTile.y) || (Math.abs(y - emptyTile.y) === 1 && x === emptyTile.x);
        });

        let randomTile = adjacentTiles[Math.floor(Math.random() * adjacentTiles.length)];
        randomTile.click();
    }
}
