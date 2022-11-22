let game = (function () {
  // Getting DOM Elements
  let board = document.querySelectorAll(".cell");
  let container = document.querySelector(".container");
  let replayButton = document.querySelector("#replay");
  let announcement = document.createElement("h2");

  // Setting up the game
  let gridSize = 3;
  let round = 0;
  let end = "";
  let mode = "pvp";

  let Player = (name) => {
    let rows = [];
    let cols = [];
    let diag = 0;
    let rdiag = 0;

    let ai = false;
    return { rows, cols, diag, rdiag, name, ai };
  };

  let playerOne = Player("po");
  let playerTwo = Player("pt");
  if (mode !== "pvp") playerTwo.ai = true;
  let currentPlayer = playerOne;

  let resetBoard = () => {
    // Resetting the players
    playerOne = Player("po");
    playerTwo = Player("pt");
    currentPlayer = playerOne;

    // Resetting Global variables
    round = 0;
    end = "";
    announcement.innerHTML = "";
    playerOne.turn = 1;

    // Resetting the board
    board.forEach((cell) => {
      cell.style.backgroundColor = "";
      cell.classList.remove("circle");
      cell.classList.remove("x");
      cell.setAttribute("data-move", "");
    });
  };

  // End GAME functions
  let color = (...cells) => {
    cells.forEach((cell) => {
      cell.style.backgroundColor = "red";
    });
  };

  let colorWiningComb = (comb, n) => {
    if (comb === "diag") color(board[0], board[4], board[8]);
    if (comb === "rdiag") color(board[2], board[4], board[6]);
    if (comb === "row")
      color(
        board[gridSize * n],
        board[gridSize * n + 1],
        board[gridSize * n + 2]
      );
    if (comb === "col")
      color(
        board[n + gridSize * 0],
        board[n + gridSize * 1],
        board[n + gridSize * 2]
      );
    return true;
  };

  let checkForWin = (player) => {
    let win = "";
    let winRow = player.rows.findIndex((elm) => elm === 3);
    let winCol = player.cols.findIndex((elm) => elm === 3);
    if (player.diag === 3) win = colorWiningComb("diag");
    if (player.rdiag === 3) win = colorWiningComb("rdiag");
    if (winRow > -1) win = colorWiningComb("row", winRow);
    if (winCol > -1) win = colorWiningComb("col", winCol);
    if (win) return player.name;
    return false;
  };

  let endGame = (status) => {
    if (status === 9 || status === "tie")
      announcement.innerHTML = "This round ended in a tie!";
    else if (status) announcement.innerHTML = `${status} won this round`;
    container.appendChild(announcement);
  };

  let boardFill = (player, cell) => {
    let nrow = 0;
    let ncol = 0;
    nrow = Math.floor(cell / gridSize);
    ncol = cell - gridSize * nrow;
    if (player.rows[nrow]) player.rows[nrow]++;
    else player.rows[nrow] = 1;
    if (player.cols[ncol]) player.cols[ncol]++;
    else player.cols[ncol] = 1;
    if (nrow === ncol) player.diag += 1;
    if (nrow === gridSize - ncol - 1) player.rdiag += 1;

    // Changing players
    if (currentPlayer.name === playerOne.name) currentPlayer = playerTwo;
    else currentPlayer = playerOne;

    return checkForWin(player);
  };

  let drawMark = (cell) => {
    if (currentPlayer === playerOne) cell.classList.add("circle");
    else cell.classList.add("x");
  };

  let aiMove = () => {
    let aiCell = Math.floor(Math.random() * 9);
    while (board[aiCell].getAttribute("data-move")) {
      aiCell = Math.floor(Math.random() * 9);
    }
    board[aiCell].setAttribute("data-move", "played");
    board[aiCell].classList.add("circle");
    return boardFill(currentPlayer, aiCell);
  };

  let playerMove = (elem) => {
    let move = elem.getAttribute("data-move");
    let cell = parseInt(elem.getAttribute("data-cell"));
    if (!move && !end) {
      round++;
      if (mode === "pvp") {
        end = boardFill(currentPlayer, cell);
        drawMark(elem);
        elem.setAttribute("data-move", "played");
      } else {
        end = boardFill(currentPlayer, cell);
        drawMark(elem);
        elem.setAttribute("data-move", "played");
        if (round < 5 && !end) {
          end = aiMove();
        }
        if (round === 5 && !end) end = "tie";
      }
      if (round === 9 && !end) end = round;
      endGame(end);
    }
  };

  // Event listeners
  replayButton.addEventListener("click", () => resetBoard());

  board.forEach((square) => {
    square.addEventListener("click", () => {
      playerMove(square);
    });
  });
})();
