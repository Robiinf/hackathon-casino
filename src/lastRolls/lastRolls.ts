let lastRollsList = document.getElementById("lastRollsList");
const red_number = [
  2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36,
];

const black_number = [
  1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35,
];
// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    if (lastRollsList) {
      lastRollsList.innerHTML = "";
      let lastRolls = WA.state.lastRolls as string;
      let parsedLastRolls = JSON.parse(lastRolls);
      if (parsedLastRolls.length > 0) {
        parsedLastRolls.forEach((roll: any) => {
          let li = document.createElement("li");
          if (red_number.includes(roll)) {
            li.style.color = "red";
          } else if (black_number.includes(roll)) {
            li.style.color = "black";
          }
          li.innerHTML = roll;
          lastRollsList?.appendChild(li);
        });
      }
    }

    WA.state.onVariableChange("lastRolls").subscribe(() => {
      if (lastRollsList) {
        lastRollsList.innerHTML = "";
        let lastRolls = WA.state.lastRolls as string;
        let parsedLastRolls = JSON.parse(lastRolls);
        if (parsedLastRolls.length > 0) {
          parsedLastRolls.forEach((roll: any) => {
            let li = document.createElement("li");
            if (red_number.includes(roll)) {
              li.style.color = "red";
            } else if (black_number.includes(roll)) {
              li.style.color = "black";
            }
            li.innerHTML = roll;
            lastRollsList?.appendChild(li);
          });
        }
      }
    });
  })
  .catch((e) => console.error(e));

export {};
