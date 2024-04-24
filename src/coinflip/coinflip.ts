let displayer: any = null;
let result: any = null;
let headsButton: any = null;
let tailsButton: any = null;
// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    displayer = document.getElementById("coinflip-displayer");
    result = document.getElementById("coinflip-result");
    headsButton = document.getElementById("coinflip-heads-button");
    tailsButton = document.getElementById("coinflip-tails-button");

    headsButton?.addEventListener("click", () => {
      let answer = coinFlip();
      displayer.src =
        "https://cdn.dribbble.com/users/1493264/screenshots/5573460/media/8e8e17f6f50fb501f22630d00e4b238d.gif";
      result.innerHTML = "Flipping...";
      setTimeout(() => {
        if (result) {
          if (answer === "heads") {
            result.innerHTML = "You win!";
            displayer.src = `https://cdn.dribbble.com/users/10800475/screenshots/17561202/media/be1100d24ca04fcb6ed24a4a5ef43b06.gif`;
            (WA.player.state.coins as number) += 1;
          } else {
            result.innerHTML = "You lose!";
            displayer.src =
              "https://cdn.dribbble.com/users/12524477/screenshots/18860746/media/34c431d2ce3d5d9734c1b8ffac98a698.gif";
            (WA.player.state.coins as number) -= 1;
          }
        }
        console.log(WA.player.state.coins);
      }, 1500);
    });

    tailsButton?.addEventListener("click", () => {
      let answer = coinFlip();
      displayer.src =
        "https://cdn.dribbble.com/users/1493264/screenshots/5573460/media/8e8e17f6f50fb501f22630d00e4b238d.gif";
      result.innerHTML = "Flipping...";
      setTimeout(() => {
        if (result) {
          if (answer === "tails") {
            result.innerHTML = "You win!";
            displayer.src = `https://cdn.dribbble.com/users/10800475/screenshots/17561202/media/be1100d24ca04fcb6ed24a4a5ef43b06.gif`;
            (WA.player.state.coins as number) += 1;
          } else {
            result.innerHTML = "You lose!";
            displayer.src =
              "https://cdn.dribbble.com/users/12524477/screenshots/18860746/media/34c431d2ce3d5d9734c1b8ffac98a698.gif";
            (WA.player.state.coins as number) -= 1;
          }
        }
        console.log(WA.player.state.coins);
      }, 1500);
    });
  })
  .catch((e) => console.error(e));

function coinFlip() {
  if (Math.random() < 0.5) {
    return "heads";
  }
  return "tails";
}

