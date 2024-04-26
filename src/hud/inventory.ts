let playerCoins = document.getElementById("coin-count");
let bankruptSound = WA.sound.loadSound("/public/sounds/bankrupt.mp3");
let bankruptSoundSetting = {
  volume: 0.5,
  loop: false,
};


// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    if (playerCoins) {
      playerCoins.innerHTML = ("x " + (WA.player.state.coins ?? 10)) as string;
    }
  })
  .catch((e) => console.error(e));

WA.player.state.onVariableChange("coins").subscribe(() => {
    playerCoins.innerHTML = ("x " + WA.player.state.coins) as string;

    // If player has 0 coins, play bankrupt sound
    if (WA.player.state.coins === 0) {
      bankruptSound.play(bankruptSoundSetting);
    }
});

export {};
