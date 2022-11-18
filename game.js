let game = (function () {
  let board = document.querySelectorAll(".cell");
  let container = document.querySelector(".container");
  let replayButton = document.querySelector("#replay");
  let announcement = document.createElement("h2");

  let gridSize = 3;

  let round = 0;
  let end = "";

  let mode = "pvp";

  replayButton.addEventListener("click", () => {
    // Resetting Global variables
    round = 0;
    end = "";
    announcement.innerHTML = "";

    // Resetting the board
    board.forEach((cell) => {
      cell.style.backgroundColor = "";
      cell.classList.remove("circle");
      cell.classList.remove("x");
      cell.setAttribute("data-move", "");
    });

    // Resetting the players
    playerOne = Player("po");
    playerTwo = Player("pt");
  });

  let Player = (name) => {
    let rows = [];
    let cols = [];
    let diag = 0;
    let rdiag = 0;
    return { rows, cols, diag, rdiag, name };
  };

  let playerOne = Player("po");
  let playerTwo = Player("pt");

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
    console.log(win);
    if (player.diag === 3) win = colorWiningComb("diag");
    if (player.rdiag === 3) win = colorWiningComb("rdiag");
    if (winRow > -1) win = colorWiningComb("row", winRow);
    if (winCol > -1) win = colorWiningComb("col", winCol);
    if (win) return player.name;
    return false;
  };

  let playMove = (player, cell) => {
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
    return checkForWin(player);
  };

  let endGame = (status) => {
    if (status === 9) announcement.innerHTML = "This round ended in a tie!";
    else if (status) announcement.innerHTML = `${status} won this round`;
    container.appendChild(announcement);
  };

  let playRound = (elem) => {
    let move = elem.getAttribute("data-move");
    let cell = parseInt(elem.getAttribute("data-cell"));

    if (!move && !end) {
      if (round % 2) {
        end = playMove(playerOne, cell);
        elem.classList.add("circle");
      } else {
        end = playMove(playerTwo, cell);
        elem.classList.add("x");
      }
      console.log(playerTwo);
      round++;
      if (round === 9 && !end) end = round;
      elem.setAttribute("data-move", "played");
      if (end) endGame(end);
    }
  };

  board.forEach((square) => {
    square.addEventListener("click", () => {
      playRound(square);
    });
  });
})();
