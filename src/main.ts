/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { initCoins } from "./coins/coins";
import { compareCards, pickCard, initHigherLowerGame } from "./SimpleCard";
import { initRoulette } from "./RouletteGame";

console.log("Script started successfully");

let coinflip: any = null;
// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    initHigherLowerGame();
    initCoins();
    // -> put it in a condition on area enter roulette -> change the map and init the roulette
    initRoulette();
    console.log("Scripting API ready");
    console.log("Player tags: ", WA.player.tags);

    WA.room.area.onEnter("clock").subscribe(async () => {
      //   Pick a random card

      // coinflip = await WA.ui.website.open({
      //   url: "./src/coinflip/coinflip.html",
      //   position: {
      //     vertical: "top",
      //     horizontal: "middle",
      //   },
      //   size: {
      //     height: "44vh",
      //     width: "50vw",
      //   },
      //   margin: {
      //     top: "12vh",
      //   },
      //   allowApi: true,
      // });

      coinflip = await WA.ui.website.open({
        url: "./src/lowerHigher/lowerHigher.html",
        position: {
          vertical: "top",
          horizontal: "middle",
        },
        size: {
          height: "44vh",
          width: "50vw",
        },
        margin: {
          top: "12vh",
        },
        allowApi: true,
      });

      // pickCard();

      // WA.chat.sendChatMessage(
      //   "Will the next card be higher or lower?",
      //   "Dealer"
      // );
    });

    //  Listen to chat messages to get the user answer
    WA.chat.onChatMessage((message) => {
      if (message !== "higher" && message !== "lower") {
        WA.chat.sendChatMessage("Please enter higher or lower", "Dealer");
        return;
      }

      const actualValue = WA.state.actualCard as any;

      pickCard();

      const nextValue = WA.state.actualCard as any;

      compareCards(actualValue, nextValue, message);
    });

    WA.room.area.onLeave("clock").subscribe(async () => {
      WA.chat.close();
      await coinflip.close();
    });

    // Init the coin counter of the player
    WA.player.state.coins = 50;

    WA.ui.website.open({
      url: "./src/hud/inventory.html",
      position: {
        vertical: "top",
        horizontal: "right",
      },
      size: {
        height: "30vh",
        width: "150px",
      },
      allowApi: true,
    });

    bootstrapExtra()
      .then(() => {
        console.log("Scripting API  Extra ready");
      })
      .catch((e) => console.error(e));
  })
  .catch((e) => console.error(e));

export {};
