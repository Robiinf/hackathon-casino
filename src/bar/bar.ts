const DRINKS = {
  morinDrink: {
    name: "Le Morin",
    id: "morinDrink",
    price: 40,
    duration: 600,
    luck: 60,
  },
  marcellinDrink: {
    name: "Le Marcellin",
    id: "marcellinDrink",
    price: 30,
    duration: 600,
    luck: 45,
  },
  servalDrink: {
    name: "Le Serval",
    id: "servalDrink",
    price: 15,
    duration: 600,
    luck: 20,
  },
  marquesDrink: {
    name: "Le Marques",
    id: "marquesDrink",
    price: 5,
    duration: 6,
    luck: 5,
  },
};

let morinDrinks: any = null;
let marcellinDrinks: any = null;
let servalDrinks: any = null;
let marquesDrinks: any = null;

let enterBar = WA.sound.loadSound("/public/sounds/bar/enterBar.mp3");
let drinkingSound = WA.sound.loadSound("/public/sounds/bar/drinking.wav");
let burpSound = WA.sound.loadSound("/public/sounds/bar/burp.mp3");
let barSoundSetting = {
  volume: 0.5,
  loop: false,
};

WA.onInit()
  .then(() => {
    enterBar.play(barSoundSetting);
    morinDrinks = document.getElementById("morinDrink");
    marcellinDrinks = document.getElementById("marcellinDrink");
    servalDrinks = document.getElementById("servalDrink");
    marquesDrinks = document.getElementById("marquesDrink");

    morinDrinks?.addEventListener("click", () => {
      if ((WA.player.state.coins as number) >= DRINKS.morinDrink.price) {
        drink(
          DRINKS.morinDrink.price,
          DRINKS.morinDrink.duration,
          DRINKS.morinDrink.luck
          );
          drinkingSound.play(barSoundSetting);
        checkGold();
        if (Math.random() < 0.5) {
          setTimeout(() => {
            burpSound.play(barSoundSetting);
          }, 1000); // Délai avant le son de burp, 1000 millisecondes = 1 seconde
        }
      }
    });

    marcellinDrinks?.addEventListener("click", () => {
      if ((WA.player.state.coins as number) >= DRINKS.marcellinDrink.price) {
        drink(
          DRINKS.marcellinDrink.price,
          DRINKS.marcellinDrink.duration,
          DRINKS.marcellinDrink.luck
        );
        checkGold();
        drinkingSound.play(barSoundSetting);
        if (Math.random() < 0.5) {
          setTimeout(() => {
            burpSound.play(barSoundSetting);
          }, 1000); // Délai avant le son de burp, 1000 millisecondes = 1 seconde
        }
      }
    });

    servalDrinks?.addEventListener("click", () => {
      if ((WA.player.state.coins as number) >= DRINKS.servalDrink.price) {
        drink(
          DRINKS.servalDrink.price,
          DRINKS.servalDrink.duration,
          DRINKS.servalDrink.luck
        );
        checkGold();
        drinkingSound.play(barSoundSetting);
        if (Math.random() < 0.5) {
          setTimeout(() => {
            burpSound.play(barSoundSetting);
          }, 1000); // Délai avant le son de burp, 1000 millisecondes = 1 seconde
        }
      }
    });

    marquesDrinks?.addEventListener("click", () => {
      if ((WA.player.state.coins as number) >= DRINKS.marquesDrink.price) {
        drink(
          DRINKS.marquesDrink.price,
          DRINKS.marquesDrink.duration,
          DRINKS.marquesDrink.luck
        );
        checkGold();
        drinkingSound.play(barSoundSetting);
        if (Math.random() < 0.5) {
          setTimeout(() => {
            burpSound.play(barSoundSetting);
          }, 1000); // Délai avant le son de burp, 1000 millisecondes = 1 seconde
        }
      }
    });

    checkGold();

    function checkGold() {
      if (
        (WA.player.state.coins as number) < DRINKS.marquesDrink.price &&
        marquesDrinks
      ) {
        marquesDrinks.style.opacity = "0.5";
        marquesDrinks.style.cursor = "not-allowed";
      }

      if (
        (WA.player.state.coins as number) < DRINKS.servalDrink.price &&
        servalDrinks
      ) {
        servalDrinks.style.opacity = "0.5";
        servalDrinks.style.cursor = "not-allowed";
      }

      if (
        (WA.player.state.coins as number) < DRINKS.marcellinDrink.price &&
        marcellinDrinks
      ) {
        marcellinDrinks.style.opacity = "0.5";
        marcellinDrinks.style.cursor = "not-allowed";
      }

      if (
        (WA.player.state.coins as number) < DRINKS.morinDrink.price &&
        morinDrinks
      ) {
        morinDrinks.style.opacity = "0.5";
        morinDrinks.style.cursor = "not-allowed";
      }
    }

    function drink(price: number, duration: number, luck: number) {
      (WA.player.state.coins as number) -= price;
      (WA.player.state.luck as number) += luck;

      setTimeout(() => {
        (WA.player.state.luck as number) -= luck;
      }, duration * 1000);
    }
  })
  .catch((e) => console.error(e));
