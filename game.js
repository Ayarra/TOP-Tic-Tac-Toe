let game = (function () {
  let board = document.querySelectorAll(".cell");
  let gridSize = 3;
  let round = 1;

  let Player = (name) => {
    let rows = [];
    let cols = [];
    let diag = 0;
    let rdiag = 0;
    return { rows, cols, diag, rdiag, name };
  };

  let checkForWin = (player) => {
    let winRow = player.rows.find((elm) => elm === 3);
    let winCol = player.cols.find((elm) => elm === 3);
    if (player.rdiag === 3 || player.diag === 3 || winRow || winCol)
      return player.name;
    return false;
  };

  let playRound = (player, cell) => {
    let nrow = 0;
    let ncol = 0;
    nrow = Math.floor(cell / gridSize);
    ncol = cell - gridSize * nrow;
    console.log(nrow, ncol, player.diag);
    if (player.rows[nrow]) player.rows[nrow]++;
    else player.rows[nrow] = 1;
    if (player.cols[ncol]) player.cols[ncol]++;
    else player.cols[ncol] = 1;
    if (nrow === ncol) player.diag += 1;
    if (nrow === gridSize - ncol - 1) player.rdiag += 1;
  };

  let func = (elem) => {
    let move = elem.getAttribute("data-move");
    let cell = parseInt(elem.getAttribute("data-cell"));

    // Creating Players
    let playerOne = Player("po");
    let playerTwo = Player("pt");

    // Check if spot available
    if (!move) {
      if (round % 2) {
        playRound(playerOne, cell);
        elem.classList.add("circle");
      } else {
        playRound(playerTwo, cell);
        elem.classList.add("x");
      }
      round++;
      elem.setAttribute("data-move", "played");
    }
  };

  board.forEach((square) => {
    square.addEventListener("click", () => {
      func(square);
    });
  });
})();
