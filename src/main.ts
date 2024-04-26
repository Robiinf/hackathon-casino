/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { initCoins } from "./coins/coins";
import { UIWebsite } from "@workadventure/iframe-api-typings";

console.log("Script started successfully");

let coinflip: any = null;
// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    initCoins();
    console.log("Scripting API ready");
    console.log("Player tags: ", WA.player.tags);

    WA.state.remainCard = [];
    WA.state.actualCard = null;

    // Init the coin counter of the player
    WA.player.state.coins = 10;
    WA.player.state.luck = 0;

    WA.player.state.drinksConsumed = [];

    // WA.ui.website.open({
    //   url: "./src/bar/bar.html",
    //   position: {
    //     vertical: "middle",
    //     horizontal: "middle",
    //   },
    //   size: {
    //     height: "80vh",
    //     width: "50vh",
    //   },
    //   margin: {
    //     right: "12px",
    //   },
    //   allowApi: true,
    // });

    WA.ui.website.open({
      url: "./src/hud/luck.html",
      position: {
        vertical: "middle",
        horizontal: "right",
      },
      size: {
        height: "80vh",
        width: "40px",
      },
      margin: {
        right: "12px",
      },
      allowApi: true,
    });

    WA.ui.website.open({
      url: "./src/hud/inventory.html",
      position: {
        vertical: "top",
        horizontal: "right",
      },
      size: {
        height: "70px",
        width: "150px",
      },
      allowApi: true,
    });

    let cashMachine: UIWebsite | undefined;
    WA.room.area.onEnter("cash-machine").subscribe(async () => {
      cashMachine = await WA.ui.website.open({
        url: "./src/cashMachine/cashMachine.html",
        position: {
          vertical: "middle",
          horizontal: "middle",
        },
        size: {
          height: "80vh",
          width: "80vh",
        },
        margin: {
          top: "12vh",
        },
        allowApi: true,
      });
      WA.room.area.onLeave("cash-machine").subscribe(async () => {
        await cashMachine?.close();
      });
    });

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
    });

    WA.room.area.onLeave("clock").subscribe(async () => {
      WA.chat.close();
      await coinflip.close();
    });

    bootstrapExtra()
      .then(() => {
        console.log("Scripting API  Extra ready");
      })
      .catch((e) => console.error(e));
  })
  .catch((e) => console.error(e));

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

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));


export { };

