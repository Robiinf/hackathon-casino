let timer = document.getElementById("timer");
// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    if (timer) {
      timer.innerHTML = WA.state.bet_timer;
    }

    WA.state.onVariableChange("bet_timer").subscribe(() => {
      if (timer) {
        timer.innerHTML = WA.state.bet_timer;
      }
    });
  })
  .catch((e) => console.error(e));

export {};
