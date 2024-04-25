let betCoins = document.getElementById("bet-count");
let moreBet = document.getElementById("addBet");
let lessBet = document.getElementById("removeBet");
let minBet = document.getElementById("minBet");
let maxBet = document.getElementById("maxBet");

// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    if (betCoins) {
      betCoins.innerHTML = ("x " +
        (WA.player.state.betAmount as number)) as string;
    }

    WA.player.state.onVariableChange("betAmount").subscribe(() => {
      if (betCoins) {
        betCoins.innerHTML = ("x " +
          (WA.player.state.betAmount as number)) as string;
      }
    });

    moreBet?.addEventListener("click", () => {
      if (
        (WA.player.state.betAmount as number) >=
        (WA.player.state.coins as number)
      ) {
        return;
      }
      (WA.player.state.betAmount as number)++;
    });

    lessBet?.addEventListener("click", () => {
      if ((WA.player.state.betAmount as number) <= 1) {
        return;
      }
      (WA.player.state.betAmount as number)--;
    });

    minBet?.addEventListener("click", () => {
      WA.player.state.betAmount = 1;
    });

    maxBet?.addEventListener("click", () => {
      WA.player.state.betAmount = WA.player.state.coins;
    });
  })
  .catch((e) => console.error(e));

export {};
