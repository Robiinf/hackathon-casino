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

let morinDrinks = null;
let marcellinDrinks = null;
let servalDrinks = null;
let marquesDrinks = null;

WA.onInit()
  .then(() => {
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
        checkGold();
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
