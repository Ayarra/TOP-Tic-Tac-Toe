let game = (function () {
  // Sign UP Page
  let game = document.querySelector(".container1");
  let boardGame = document.querySelector(".container2");
  let containerSign = document.querySelector(".mode");
  let versus = document.querySelectorAll(".versus");
  let playerForm = document.querySelectorAll(".vsPlayer");
  let aiForm = document.querySelectorAll(".vsComputer");
  let submitButton = document.querySelector("#submit");
  let choiceText = document.querySelector("h3");
  let nameWarning = document.createElement("p");
  let playerOne;
  let playerTwo;
  let Player = (name) => {
    let rows = [];
    let cols = [];
    let diag = 0;
    let rdiag = 0;

    return { rows, cols, diag, rdiag, name };
  };
  nameWarning.innerHTML = "Please, choose a name for the players!";

  let mode;
  let param = {};

  versus.forEach((elm, index) => {
    elm.addEventListener("click", () => {
      if (index === 0) {
        mode = "pvp";
        for (let i = 0; i < 2; i++) {
          playerForm[i].style.display = "inherit";
          aiForm[i].style.display = "none";
          aiForm[i].value = "";
        }
      } else {
        mode = "pve";
        for (let i = 0; i < 2; i++) {
          playerForm[i].style.display = "none";
          playerForm[i].value = "";
          aiForm[i].style.display = "inherit";
        }
      }
    });
  });

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (!mode) {
      choiceText.style.color = "red";
      choiceText.style.fontSize = "30px";
    } else {
      if (mode === "pvp") {
        if (!playerForm[0].value || !playerForm[1].value)
          containerSign.insertBefore(nameWarning, submitButton);
        else {
          param.po = playerForm[0].value;
          param.pt = playerForm[1].value;
          param.mode = mode;
          game.style.display = "none";
          boardGame.style.display = "inherit";
        }
      } else {
        if (!aiForm[0].value || !aiForm[1].value)
          containerSign.insertBefore(nameWarning, submitButton);
        else {
          param.po = aiForm[0].value;
          param.pt = aiForm[1].value;
          param.mode = mode;
          game.style.display = "none";
          boardGame.style.display = "inherit";
        }
      }
      playerOne = Player(param.po);
      playerTwo = Player(param.pt);
      currentPlayer = playerOne;
    }
  });

  // TIC TAC TOE GAME
  // Getting DOM Elements
  let board = document.querySelectorAll(".cell");
  let container = document.querySelector(".container2");
  let replayButton = document.querySelector("#replay");
  let backButton = document.querySelector("#back");

  let announcement = document.createElement("h2");

  // Setting up the game
  let gridSize = 3;
  let round = 0;
  let end = "";

  // let playerOne = Player(param.po);
  // let playerTwo = Player(param.pt);
  let currentPlayer = playerOne;

  let resetBoard = () => {
    // Resetting the players
    playerOne = Player(param.po);
    playerTwo = Player(param.pt);
    currentPlayer = playerOne;

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
    if (round === 8 || (mode !== "pvp" && round === 4)) return "tie";
    return false;
  };

  let endGame = (status) => {
    if (status === "tie") announcement.innerHTML = "This round ended in a tie!";
    else if (status) announcement.innerHTML = `${status} won this round`;
    container.appendChild(announcement);
  };

  let changePlayer = () => {
    console.log(currentPlayer);

    if (currentPlayer.name === playerOne.name) currentPlayer = playerTwo;
    else currentPlayer = playerOne;
    console.log(currentPlayer);
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
    boardFill(currentPlayer, aiCell);
  };

  // Mimimax Algo

  let minimax = (depth, isMaximizing) => {
    if (checkForWin(playerOne)) return checkForWin(playerOne);
    else if (checkForWin(playerTwo)) return checkForWin(playerTwo);
    if (isMaximizing) {
      let bestScore = -Infinity;
      board.forEach((cell) => {
        if (!cell.getAttribute("data-move")) {
          let score = minimax(depth + 1, false);
          bestScore = max(score, bestScore);
        }
      });
      return bestScore;
    } else {
      let bestScore = Infinity;
      board.forEach((cell) => {
        if (!cell.getAttribute("data-move")) {
          let score = minimax(depth + 1, true);
          bestScore = min(score, bestScore);
        }
      });
      return bestScore;
    }
    // return 1;
  };

  let smartAiMove = () => {
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < board.length; i++) {
      if (!board[i].getAttribute("data-move")) {
        // I don't understand the result of this.
        console.log(board[i]);
        let score = minimax(0, false);
        board[i].setAttribute("data-move", "");
        board[i].classList.remove("circle");
        if (score > bestScore) {
          bestScore = score;
          bestMove = board[i].getAttribute("data-cell");
        }
      }
    }
    board[bestMove].setAttribute("data-move", "played");
    board[bestMove].classList.add("circle");
    boardFill(currentPlayer, bestMove);
  };

  let humanMove = (cell, elem) => {
    boardFill(currentPlayer, cell);
    end = checkForWin(currentPlayer);
    changePlayer();
    drawMark(elem);
    elem.setAttribute("data-move", "played");
  };

  let playerRound = (elem) => {
    let move = elem.getAttribute("data-move");
    let cell = parseInt(elem.getAttribute("data-cell"));
    if (!move && !end) {
      if (param.mode === "pvp") {
        humanMove(cell, elem);
      } else {
        humanMove(cell, elem);
        if (round < 4 && !end) {
          aiMove();
          // smartAiMove();
          end = checkForWin(currentPlayer);
          changePlayer();
        }
        // if (round === 4 && !end) end = "tie";
      }
      // if (round === 8 && !end) end = round;
      round++;
      endGame(end);
    }
  };

  // Event listeners
  replayButton.addEventListener("click", () => resetBoard());
  backButton.addEventListener("click", () => {
    resetBoard();
    game.style.display = "inherit";
    boardGame.style.display = "none";
  });
  board.forEach((square) => {
    square.addEventListener("click", () => {
      playerRound(square);
    });
  });
})();
