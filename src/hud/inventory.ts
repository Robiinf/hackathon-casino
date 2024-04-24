import { bootstrapExtra } from "@workadventure/scripting-api-extra";

let playerCoins = document.getElementById("coin-count");

// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    console.log(WA.player.state.coins);
    if (playerCoins) {
      playerCoins.innerHTML = ("x " + (WA.player.state.coins ?? 10)) as string;
    }
  })
  .catch((e) => console.error(e));

WA.player.state.onVariableChange("coins").subscribe(() => {
  if (playerCoins) {
    playerCoins.innerHTML = ("x " + WA.player.state.coins) as string;
  }
});

export {};