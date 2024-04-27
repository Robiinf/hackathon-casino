import { UIWebsite } from "@workadventure/iframe-api-typings";

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

let roulettePopUp: UIWebsite | undefined;
let resultPopUp: UIWebsite | undefined;
let betPopUp: UIWebsite | undefined;
let betTimerPopUp: UIWebsite | undefined;

async function startBidingTimer() {
  WA.state.saveVariable("bet_timer", 10);
  betTimerPopUp = await WA.ui.website.open({
    url: "./src/betTimer/betTimer.html",
    position: {
      vertical: "top",
      horizontal: "middle",
    },
    size: {
      height: "30vh",
      width: "500px",
    },
    allowApi: true,
  });

  betPopUp = await WA.ui.website.open({
    url: "./src/rouletteBet/bet.html",
    position: {
      vertical: "bottom",
      horizontal: "middle",
    },
    size: {
      height: "30vh",
      width: "500px",
    },
    allowApi: true,
  });

  const interval = setInterval(() => {
    WA.state.saveVariable(
      "bet_timer",
      (WA.state.loadVariable("bet_timer") as number) - 1
    );
    if (WA.state.loadVariable("bet_timer") === 0) {
      clearInterval(interval);
    }
  }, 1000);
}

async function saveInLastRolls(result: number) {
  let lastRolls = WA.state.loadVariable("lastRolls") as string;

  let parsedLastRolls = JSON.parse(lastRolls);
  if (parsedLastRolls.length == 0) {
    parsedLastRolls.push(result);
  } else if (parsedLastRolls.length == 5) {
    parsedLastRolls.pop();
    parsedLastRolls.unshift(result);
  } else {
    parsedLastRolls.unshift(result);
  }
  WA.state.saveVariable("lastRolls", JSON.stringify(parsedLastRolls));
}

async function startRoulette() {
  betPopUp?.close();
  betTimerPopUp?.close();
  roulettePopUp = await WA.ui.website.open({
    url: "./src/rouletteRoll/rouletteRoll.html",
    position: {
      vertical: "middle",
      horizontal: "middle",
    },
    size: {
      height: "70vh",
      width: "50vw",
    },
    allowApi: true,
  });

  console.log("Start roulette");

  let userBet = WA.player.state.lastArea;
  let betAmount = WA.player.state.betAmount as number;
  let userCoins = WA.player.state.coins as number;

  WA.player.state.saveVariable("coins", userCoins - betAmount);

  WA.player.state.saveVariable("userRandom", Math.floor(Math.random() * 37), {
    public: true,
  });

  let result = WA.player.state.userRandom as number;

  await WA.players.configureTracking();
  const allPlayers = WA.players.list();

  await new Promise((r) => setTimeout(r, 3000));

  for (let player of allPlayers) {
    result += player.state.userRandom as number;
  }

  result = result % 37;
  WA.state.saveVariable("rouletteResult", result);

  console.log("Roulette result: ", result);
  console.log("User bet: ", userBet);

  saveInLastRolls(result);

  //console.log("Bet amount: ", betAmount);
  console.log("User coins: ", WA.player.state.coins);

  if (userBet === result) {
    console.log("You win");
    (WA.player.state.coins as number) += betAmount * 35;
  } else if (userBet === "red" && red_number.includes(result)) {
    console.log("You win");
    (WA.player.state.coins as number) += betAmount * 2;
  } else if (userBet === "black" && black_number.includes(result)) {
    console.log("You win");
    (WA.player.state.coins as number) += betAmount * 2;
  } else if (userBet === "even" && even_number.includes(result)) {
    console.log("You win");
    (WA.player.state.coins as number) += betAmount * 2;
  } else if (userBet === "odd" && odd_number.includes(result)) {
    console.log("You win");
    (WA.player.state.coins as number) += betAmount * 2;
  } else if (userBet === "1 to 18" && first_half.includes(result)) {
    console.log("You win");
    (WA.player.state.coins as number) += betAmount * 2;
  } else if (userBet === "19 to 36" && second_half.includes(result)) {
    console.log("You win");
    (WA.player.state.coins as number) += betAmount * 2;
  } else {
    console.log("You lose");
  }
  roulettePopUp?.close();

  resultPopUp = await WA.ui.website.open({
    url: "./src/rouletteResult/rouletteResult.html",
    position: {
      vertical: "middle",
      horizontal: "middle",
    },
    size: {
      height: "70vh",
      width: "50vw",
    },
    allowApi: true,
  });

  await new Promise((r) => setTimeout(r, 3000));

  resultPopUp?.close();

  WA.controls.restorePlayerControls();
  WA.nav.goToRoom("#start");
}

WA.ui.website.open({
  url: "./src/lastRolls/lastRolls.html",
  position: {
    vertical: "top",
    horizontal: "left",
  },
  size: {
    height: "40vh",
    width: "250px",
  },
  allowApi: true,
});

export function initRoulette() {
  WA.player.state.saveVariable("betAmount", 1);
  console.log("Roulette game initialized");
  WA.room.area.onEnter("roulette-area").subscribe(() => {
    WA.state.saveVariable(
      "players",
      (WA.state.loadVariable("players") as number) + 1
    );
    if ((WA.state.loadVariable("players") as number) > 0) {
      startBidingTimer();
    }
  });
  WA.room.area.onLeave("roulette-area").subscribe(() => {
    WA.state.saveVariable(
      "players",
      (WA.state.loadVariable("players") as number) - 1
    );
  });
  WA.state.onVariableChange("bet_timer").subscribe((value) => {
    if (value == 0) {
      WA.controls.disablePlayerControls();
      startRoulette();
    } else {
      console.log("Bet timer: ", value);
    }
  });

  WA.room.area.onEnter("exitRoulette").subscribe(() => {
    WA.nav.goToRoom("./map.tmj");
  });

  WA.room.area.onEnter("0").subscribe(() => {
    console.log("Entered area 0");
    WA.player.state.saveVariable("lastArea", "0");
  });
  WA.room.area.onEnter("1").subscribe(() => {
    console.log("Entered area 1");
    WA.player.state.saveVariable("lastArea", "1");
  });
  WA.room.area.onEnter("2").subscribe(() => {
    console.log("Entered area 2");
    WA.player.state.saveVariable("lastArea", "2");
  });
  WA.room.area.onEnter("3").subscribe(() => {
    console.log("Entered area 3");
    WA.player.state.saveVariable("lastArea", "3");
  });
  WA.room.area.onEnter("4").subscribe(() => {
    console.log("Entered area 4");
    WA.player.state.saveVariable("lastArea", "4");
  });
  WA.room.area.onEnter("5").subscribe(() => {
    console.log("Entered area 5");
    WA.player.state.saveVariable("lastArea", "5");
  });
  WA.room.area.onEnter("6").subscribe(() => {
    console.log("Entered area 6");
    WA.player.state.saveVariable("lastArea", "6");
  });
  WA.room.area.onEnter("7").subscribe(() => {
    console.log("Entered area 7");
    WA.player.state.saveVariable("lastArea", "7");
  });
  WA.room.area.onEnter("8").subscribe(() => {
    console.log("Entered area 8");
    WA.player.state.saveVariable("lastArea", "8");
  });
  WA.room.area.onEnter("9").subscribe(() => {
    console.log("Entered area 9");
    WA.player.state.saveVariable("lastArea", "9");
  });
  WA.room.area.onEnter("10").subscribe(() => {
    console.log("Entered area 10");
    WA.player.state.saveVariable("lastArea", "10");
  });
  WA.room.area.onEnter("11").subscribe(() => {
    console.log("Entered area 11");
    WA.player.state.saveVariable("lastArea", "11");
  });
  WA.room.area.onEnter("12").subscribe(() => {
    console.log("Entered area 12");
    WA.player.state.saveVariable("lastArea", "12");
  });
  WA.room.area.onEnter("13").subscribe(() => {
    console.log("Entered area 13");
    WA.player.state.saveVariable("lastArea", "13");
  });
  WA.room.area.onEnter("14").subscribe(() => {
    console.log("Entered area 14");
    WA.player.state.saveVariable("lastArea", "14");
  });
  WA.room.area.onEnter("15").subscribe(() => {
    console.log("Entered area 15");
    WA.player.state.saveVariable("lastArea", "15");
  });
  WA.room.area.onEnter("16").subscribe(() => {
    console.log("Entered area 16");
    WA.player.state.saveVariable("lastArea", "16");
  });
  WA.room.area.onEnter("17").subscribe(() => {
    console.log("Entered area 17");
    WA.player.state.saveVariable("lastArea", "17");
  });
  WA.room.area.onEnter("18").subscribe(() => {
    console.log("Entered area 18");
    WA.player.state.saveVariable("lastArea", "18");
  });
  WA.room.area.onEnter("19").subscribe(() => {
    console.log("Entered area 19");
    WA.player.state.saveVariable("lastArea", "19");
  });
  WA.room.area.onEnter("20").subscribe(() => {
    console.log("Entered area 20");
    WA.player.state.saveVariable("lastArea", "20");
  });
  WA.room.area.onEnter("21").subscribe(() => {
    console.log("Entered area 21");
    WA.player.state.saveVariable("lastArea", "21");
  });
  WA.room.area.onEnter("22").subscribe(() => {
    console.log("Entered area 22");
    WA.player.state.saveVariable("lastArea", "22");
  });
  WA.room.area.onEnter("23").subscribe(() => {
    console.log("Entered area 23");
    WA.player.state.saveVariable("lastArea", "23");
  });
  WA.room.area.onEnter("24").subscribe(() => {
    console.log("Entered area 24");
    WA.player.state.saveVariable("lastArea", "24");
  });
  WA.room.area.onEnter("25").subscribe(() => {
    console.log("Entered area 25");
    WA.player.state.saveVariable("lastArea", "25");
  });
  WA.room.area.onEnter("26").subscribe(() => {
    console.log("Entered area 26");
    WA.player.state.saveVariable("lastArea", "26");
  });
  WA.room.area.onEnter("27").subscribe(() => {
    console.log("Entered area 27");
    WA.player.state.saveVariable("lastArea", "27");
  });
  WA.room.area.onEnter("28").subscribe(() => {
    console.log("Entered area 28");
    WA.player.state.saveVariable("lastArea", "28");
  });
  WA.room.area.onEnter("29").subscribe(() => {
    console.log("Entered area 29");
    WA.player.state.saveVariable("lastArea", "29");
  });
  WA.room.area.onEnter("30").subscribe(() => {
    console.log("Entered area 30");
    WA.player.state.saveVariable("lastArea", "30");
  });
  WA.room.area.onEnter("31").subscribe(() => {
    console.log("Entered area 31");
    WA.player.state.saveVariable("lastArea", "31");
  });
  WA.room.area.onEnter("32").subscribe(() => {
    console.log("Entered area 32");
    WA.player.state.saveVariable("lastArea", "32");
  });
  WA.room.area.onEnter("33").subscribe(() => {
    console.log("Entered area 33");
    WA.player.state.saveVariable("lastArea", "33");
  });
  WA.room.area.onEnter("34").subscribe(() => {
    console.log("Entered area 34");
    WA.player.state.saveVariable("lastArea", "34");
  });
  WA.room.area.onEnter("35").subscribe(() => {
    console.log("Entered area 35");
    WA.player.state.saveVariable("lastArea", "35");
  });
  WA.room.area.onEnter("36").subscribe(() => {
    console.log("Entered area 36");
    WA.player.state.saveVariable("lastArea", "36");
  });
  WA.room.area.onEnter("red").subscribe(() => {
    console.log("Entered area red");
    WA.player.state.saveVariable("lastArea", "red");
  });
  WA.room.area.onEnter("black").subscribe(() => {
    console.log("Entered area black");
    WA.player.state.saveVariable("lastArea", "black");
  });
  WA.room.area.onEnter("even").subscribe(() => {
    console.log("Entered area even");
    WA.player.state.saveVariable("lastArea", "even");
  });
  WA.room.area.onEnter("odd").subscribe(() => {
    console.log("Entered area odd");
    WA.player.state.saveVariable("lastArea", "odd");
  });
  WA.room.area.onEnter("lower").subscribe(() => {
    console.log("Entered area 1 to 18");
    WA.player.state.saveVariable("lastArea", "1 to 18");
  });
  WA.room.area.onEnter("upper").subscribe(() => {
    console.log("Entered area 19 to 36");
    WA.player.state.saveVariable("lastArea", "19 to 36");
  });
}
