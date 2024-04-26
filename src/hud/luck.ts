// Waiting for the API to be ready

let luck: any = null;
let luckLogo: any = null;

WA.onInit()
  .then(() => {
    luck = document.getElementById("luck-count");
    luckLogo = document.getElementById("luck-logo");

    if (luckLogo) {
      luckLogo.addEventListener("click", () => {
        (WA.player.state.luck as number) += 10;
      });
    }
  })
  .catch((e) => console.error(e));

WA.player.state.onVariableChange("luck").subscribe(() => {
  if (luck) {
    console.log(luck);
    if ((WA.player.state.luck as number) > 100) {
      WA.player.state.luck = 100;
    }
    luck.style.height = `${WA.player.state.luck}%`;
  }
});

export {};
