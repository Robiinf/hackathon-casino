// Waiting for the API to be ready

let luck: any = document.getElementById("luck-count");

WA.onInit()
  .then(() => {
    luck = document.getElementById("luck-count");
    luck.style.height = `${WA.player.state.luck}%`;
  })
  .catch((e) => console.error(e));

WA.player.state.onVariableChange("luck").subscribe(() => {
  if ((WA.player.state.luck as number) > 100) {
    WA.player.state.luck = 100;
  }
  luck.style.height = `${WA.player.state.luck}%`;
});

export {};
