let resultDescription = document.getElementById("result_desc");
let result = document.getElementById("result");
let rouletteRoll = document.getElementById("roulette_roll");

const red_number = [
  2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36,
];

const black_number = [
  1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35,
];

const even_number = [
  2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36,
];

const odd_number = [
  1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35,
];

const first_half = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
];

const second_half = [
  19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
];

WA.onInit()
  .then(() => {
    let rouletteResult = WA.state.loadVariable("rouletteResult") as string;
    let playerBet = WA.player.state.loadVariable("lastArea") as string;
    playerBet = playerBet.toUpperCase();
    let playerBetAmount = WA.player.state.loadVariable("betAmount");

    if (resultDescription && rouletteRoll) {
      resultDescription.innerHTML = `You bet ${playerBetAmount} coins on ${playerBet}`;
      rouletteRoll.innerHTML = `The roulette rolled : ${rouletteResult}`;
    }

    function changeBgToWin() {
      document
        .getElementById("bg2change")
        ?.classList.add("bg-[url('./ab7105adc1eaa1f1b7e3b27277272e42.gif')]");
      document
        .getElementById("bg2change")
        ?.classList.remove("bg-[url('./7r8e.gif')]");
    }

    function changeBgToLose() {
      document
        .getElementById("bg2change")
        ?.classList.add("bg-[url('./7r8e.gif')]");
      document
        .getElementById("bg2change")
        ?.classList.remove(
          "bg-[url('./ab7105adc1eaa1f1b7e3b27277272e42.gif')]"
        );
    }

    if (result) {
      if (rouletteResult == playerBet) {
        result.innerHTML = "YOU WON !";
        changeBgToWin();
      } else if (playerBet == "RED" && red_number.includes(rouletteResult)) {
        result.innerHTML = "YOU WON !";
        changeBgToWin();
      } else if (
        playerBet == "BLACK" &&
        black_number.includes(rouletteResult)
      ) {
        result.innerHTML = "YOU WON !";
        changeBgToWin();
      } else if (playerBet == "EVEN" && even_number.includes(rouletteResult)) {
        result.innerHTML = "YOU WON !";
        changeBgToWin();
      } else if (playerBet == "ODD" && odd_number.includes(rouletteResult)) {
        result.innerHTML = "YOU WON !";
        changeBgToWin();
      } else if (
        playerBet == "1 TO 18" &&
        first_half.includes(rouletteResult)
      ) {
        result.innerHTML = "YOU WON !";
        changeBgToWin();
      } else if (
        playerBet == "19 TO 36" &&
        second_half.includes(rouletteResult)
      ) {
        result.innerHTML = "YOU WON !";
        changeBgToWin();
      } else {
        result.innerHTML = "YOU LOST !";
        changeBgToLose();
      }
    }
  })
  .catch((e) => console.error(e));

export {};
