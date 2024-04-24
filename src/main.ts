/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { compareCards, pickCard, initHigherLowerGame } from "./SimpleCard";

console.log("Script started successfully");

// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    initHigherLowerGame();
    console.log("Scripting API ready");
    console.log("Player tags: ", WA.player.tags);

    
    // Init the coin counter of the player
    WA.player.state.coins = undefined;

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

    WA.room.area.onEnter("clock").subscribe(() => {
      //   Pick a random card
      pickCard();

      WA.chat.sendChatMessage(
        "Will the next card be higher or lower?",
        "Dealer"
      );

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

    WA.room.area.onLeave("clock").subscribe(() => {
      WA.chat.close();
    });

    bootstrapExtra()
      .then(() => {
        console.log("Scripting API  Extra ready");
      })
      .catch((e) => console.error(e));
  })
  .catch((e) => console.error(e));



export { };

