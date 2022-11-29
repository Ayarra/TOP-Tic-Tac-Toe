let gameParam = (() => {
  //   let game = document.querySelector(".container1");
  //   let board = document.querySelector(".container2");
  //   let container = document.querySelector(".mode");
  //   let versus = document.querySelectorAll(".versus");
  //   let playerForm = document.querySelectorAll(".vsPlayer");
  //   let aiForm = document.querySelectorAll(".vsComputer");
  //   let submitButton = document.querySelector("#submit");
  //   let choiceText = document.querySelector("h3");
  //   let nameWarning = document.createElement("p");
  //   nameWarning.innerHTML = "Please, choose a name for the players!";
  //   let mode;
  //   let param = {};
  //   versus.forEach((elm, index) => {
  //     elm.addEventListener("click", () => {
  //       if (index === 0) {
  //         mode = "pvp";
  //         for (let i = 0; i < 2; i++) {
  //           playerForm[i].style.display = "inherit";
  //           aiForm[i].style.display = "none";
  //           aiForm[i].value = "";
  //         }
  //       } else {
  //         mode = "pve";
  //         for (let i = 0; i < 2; i++) {
  //           playerForm[i].style.display = "none";
  //           playerForm[i].value = "";
  //           aiForm[i].style.display = "inherit";
  //         }
  //       }
  //     });
  //   });
  //   submitButton.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     if (!mode) {
  //       choiceText.style.color = "red";
  //       choiceText.style.fontSize = "30px";
  //     } else {
  //       if (mode === "pvp") {
  //         if (!playerForm[0].value || !playerForm[1].value)
  //           container.insertBefore(nameWarning, submitButton);
  //         else {
  //           param.po = playerForm[0].value;
  //           param.pt = playerForm[1].value;
  //           param.mode = mode;
  //           game.style.display = "none";
  //           board.style.display = "inherit";
  //         }
  //       } else {
  //         if (!aiForm[0].value || !aiForm[1].value)
  //           container.insertBefore(nameWarning, submitButton);
  //         else {
  //           param.po = aiForm[0].value;
  //           param.pt = aiForm[1].value;
  //           param.mode = mode;
  //           game.style.display = "none";
  //           board.style.display = "inherit";
  //         }
  //       }
  //     }
  //   });
  //   return param;
})();
