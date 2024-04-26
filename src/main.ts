/// <reference types="@workadventure/iframe-api-typings" />

import { UIWebsite } from "@workadventure/iframe-api-typings";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { initCoins } from "./coins/coins";

console.log("Script started successfully");

function openSlots() {
  WA.ui.website.open({
    url: "./src/slots/slots.html",
    position: {
      horizontal: "middle",
      vertical: "middle",
    },
    size: {
      height: "80vh",
      width: "80vh",
    },
    allowApi: true,
  });
}

let coinflip: any = null;
// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    initCoins();
    console.log("Scripting API ready");
    console.log("Player tags: ", WA.player.tags);

    WA.player.state.dealerCards = [];
    WA.player.state.dealerCardScore = 0;

    WA.state.remainCard = [];
    WA.state.actualCard = null;

    // Init the coin counter of the player
    WA.player.state.coins = 10;
    WA.player.state.luck = 0;

    WA.player.state.drinksConsumed = [];

    
    //WA.ui.website.open({
    //  url: "./src/twentyOne/twentyOne.html",
    //  position: {
    //    vertical: "middle",
    //    horizontal: "middle",
    //  },
    //  size: {
    //    height: "80vh",
    //    width: "50vh",
    //  },
    //  margin: {
    //    right: "12px",
    //  },
    //  allowApi: true,
    //});

    // Bar
    let bar: UIWebsite | undefined;
    WA.room.area.onEnter("bar").subscribe(async() => {
      bar = await WA.ui.website.open({
        url: "./src/bar/bar.html",
        position: {
          vertical: "middle",
          horizontal: "middle",
        },
        size: {
          height: "80vh",
          width: "90vh",
        },
        margin: {
          right: "12px",
        },
        allowApi: true,
      });
      WA.room.area.onLeave("bar").subscribe(async () => {
        await bar?.close();
      });
    });

    // Luck Bar
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

    // Inventory
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

    // Slots Machine
    let cashMachine: UIWebsite | undefined;
    WA.room.area.onEnter("slot-1").subscribe(async () => {
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
      WA.room.area.onLeave("slot-1").subscribe(async () => {
        await cashMachine?.close();
      });
    });

    WA.room.area.onEnter("slot-2").subscribe(async () => {
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
      WA.room.area.onLeave("slot-2").subscribe(async () => {
        await cashMachine?.close();
      });
    });

    WA.room.area.onEnter("slot-3").subscribe(async () => {
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
      WA.room.area.onLeave("slot-3").subscribe(async () => {
        await cashMachine?.close();
      });
    });

    WA.room.area.onEnter("slot-4").subscribe(async () => {
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
      WA.room.area.onLeave("slot-4").subscribe(async () => {
        await cashMachine?.close();
      });
    });

    WA.room.area.onEnter("slot-5").subscribe(async () => {
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
      WA.room.area.onLeave("slot-5").subscribe(async () => {
        await cashMachine?.close();
      });
    });

    // Coinflip Game
    let coinflip: UIWebsite | undefined;
    WA.room.area.onEnter("coinflip").subscribe(async () => {
      coinflip = await WA.ui.website.open({
        url: "./src/coinflip/coinflip.html",
        position: {
          vertical: "top",
          horizontal: "middle",
        },
        size: {
          height: "60vh",
          width: "50vw",
        },
        margin: {
          top: "12vh",
        },
        allowApi: true,
      });
      WA.room.area.onLeave("coinflip").subscribe(async () => {
        await coinflip?.close();
      });
    });

    // Lower Higher Game
    let lowerHigher: UIWebsite | undefined;
    WA.room.area.onEnter("lowerHigher").subscribe(async () => {
      lowerHigher = await WA.ui.website.open({
        url: "./src/lowerHigher/lowerHigher.html",
        position: {
          vertical: "top",
          horizontal: "middle",
        },
        size: {
          height: "60vh",
          width: "50vw",
        },
        margin: {
          top: "12vh",
        },
        allowApi: true,
      });
      WA.room.area.onLeave("lowerHigher").subscribe(async () => {
        await lowerHigher?.close();
      });
    });

    // Blackjack
    WA.room.area.onEnter("blackjack").subscribe(async () => {
      console.log("Blackjack");
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

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
bootstrapExtra()
  .then(() => {
    console.log("Scripting API Extra ready");
  })
  .catch((e) => console.error(e));

export { };

