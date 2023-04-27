const board = document.querySelector('#board');
const modalContainer = document.querySelector("#modal-container");
const modalMessage = document.querySelector("#modal-message");
const resetButton = document.querySelector("#reset");
const playerTurnElement = document.querySelector("#player-turn");

resetButton.onclick = () => {
    location.reload();
}
const name1 = prompt("Quel est le nom du Joueur 1 ?");
const name2 = prompt("Quel est le nom du Joueur 2 ?");
const PLAYER1_TURN = 1;
const PLAYER2_TURN = 2;

//0 = empty, 1 = red, 2 = yellow
const rows = prompt("Combien de lignes voulez-vous ?");
const cols = prompt("Combien de colonnes voulez-vous ?");

// 0 = empty, 1 = red, 2 = yellow
const pieces = Array(rows * cols).fill(0);

let playerTurn = PLAYER1_TURN; // 1 = red, 2 = yellow
let hoverColumn = -1;
let animating = false;
let player1Wins = 0;
let player2Wins = 0;

board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

for (let i = 0; i < rows * cols; i++) {
    let cell = document.createElement("div");
    cell.className = "cell";
    board.appendChild(cell);

    cell.onmouseenter = () => {
        onMouseEnteredColumn(i % cols);
    }
    cell.onclick = () => {
        if (!animating) {
            onColumnClicked(i % cols);
        }

    }
}

function onColumnClicked(column) {
    let availableRow = pieces.filter((_, index) => index % cols === column).lastIndexOf(0);
    if (availableRow === -1) {
        // no space in the column
        return;
    }

    pieces[(availableRow * cols) + column] = playerTurn;
    let cell = board.children[(availableRow * cols) + column];

    let piece = document.createElement("div");
    piece.className = "piece";
    piece.dataset.placed = true;
    piece.dataset.player = playerTurn;
    cell.appendChild(piece);

    let unplacedPiece = document.querySelector("[data-placed='false']");
    let unplacedY = unplacedPiece.getBoundingClientRect().y;
    let placedY = piece.getBoundingClientRect().y;
    let yDiff = unplacedY - placedY;

    animating = true;
    removeUnplacedPiece();
    let animation = piece.animate(
        [
            { transform: `translateY(${yDiff}px)`, offset: 0 },
            { transform: `translateY(0px)`, offset: 0.6 },
            { transform: `translateY(${yDiff / 20}px)`, offset: 0.8 },
            { transform: `translateY(0px)`, offset: 0.95 }
        ],
        {
            duration: 400,
            easing: "linear",
            iterations: 1
        }
    );
    animation.addEventListener('finish', checkGame)
}

const redWinsElement = document.querySelector("#player1-wins");
const yellowWinsElement = document.querySelector("#player2-wins");

function checkGame() {
    playerTurnElement.textContent = `Joueur ${playerTurn === PLAYER1_TURN ? name1 : name2} doit jouer`;
    animating = false;
    //check if game is draw
    if (!pieces.includes(0)) {
        modalContainer.style.display = "block";
        modalMessage.textContent = "Match nul !"
         }

    if (hasPlayerWon(playerTurn, pieces)) {
            modalContainer.style.display = "block";
            modalMessage.textContent = `${playerTurn === PLAYER1_TURN ? name1 : name2} a gagné la partie !`;
        }

    if (playerTurn === PLAYER1_TURN) {
        playerTurn = PLAYER2_TURN;
    } else {
        playerTurn = PLAYER1_TURN;
    }
    //update hover
    updateHover();
}

function updateHover() {
    removeUnplacedPiece();

    // add piece
    if (pieces[hoverColumn] === 0) {
        let cell = board.children[hoverColumn];
        let piece = document.createElement("div");
        piece.className = "piece";
        piece.dataset.placed = false;
        piece.dataset.player = playerTurn;
        cell.appendChild(piece);
    }
}

function removeUnplacedPiece() {
    let unplacedPiece = document.querySelector("[data-placed='false']");
    if (unplacedPiece) {
        unplacedPiece.parentElement.removeChild(unplacedPiece);
    }
}

function onMouseEnteredColumn(column) {
    hoverColumn = column;
    if(!animating){
     updateHover();   
    }   
}

function hasPlayerWon(player, pieces) {
    const directions = [
      [0, 1], // horizontal
      [1, 0], // vertical
      [1, 1], // diagonal \
      [-1, 1] // diagonal /
    ];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let cell = row * cols + col;
        let piece = pieces[cell];
        if (piece !== player) continue; // skip if not player's piece
        for (let direction of directions) {
          let [deltaRow, deltaCol] = direction;
          let count = 1;
          for (let i = 1; i < 4; i++) {
            let nextRow = row + i * deltaRow;
            let nextCol = col + i * deltaCol;
            if (
              nextRow < 0 ||
              nextRow >= rows ||
              nextCol < 0 ||
              nextCol >= cols
            ) {
              break; // out of board
            }
            let nextCell = nextRow * cols + nextCol;
            if (pieces[nextCell] !== player) {
              break; // different piece or empty cell
            }
            count++;
          }
          if (count === 4) {
            return true; // player won
          }
        }
      }
    }
    return false; // player didn't win
  }