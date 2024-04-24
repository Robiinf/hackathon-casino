/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { Console } from "console";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    // Init the coin counter of the player
    WA.player.state.coins = 50;
    let coinSound = WA.sound.loadSound("../public/sounds/coin-sound.mp3");
    let soundConfig = {
        volume: 0.5,
        loop: false,
    };

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

    // Hiding coins 0
    WA.room.area.onEnter('add-coin').subscribe(() => {
        coinSound.play(soundConfig);
        (WA.player.state.coins as number) += 10;
        WA.room.area.delete('add-coin');
        WA.room.hideLayer('floor/coins/coin-0');
    });
    // Hiding coins 1
    WA.room.area.onEnter('add-coin-1').subscribe(() => {
        coinSound.play(soundConfig);
       (WA.player.state.coins as number) += 10;
        WA.room.area.delete('add-coin-1');
        WA.room.hideLayer('floor/coins/coin-1');
    });
    // Hiding coins 2
    WA.room.area.onEnter('add-coin-2').subscribe(() => {
        coinSound.play(soundConfig);
        (WA.player.state.coins as number) += 5;
        WA.room.area.delete('add-coin-2');
        WA.room.hideLayer('floor/coins/coin-2');
    });
    // Hiding coins 3
    WA.room.area.onEnter('add-coin-3').subscribe(() => {
        coinSound.play(soundConfig);
       (WA.player.state.coins as number) += 5;
        WA.room.area.delete('add-coin-3');
        WA.room.hideLayer('floor/coins/coin-3');
    });
    // Hiding coins 4
    WA.room.area.onEnter('add-coin-4').subscribe(() => {
        coinSound.play(soundConfig);
       (WA.player.state.coins as number) += 10;
        WA.room.area.delete('add-coin-4');
        WA.room.hideLayer('floor/coins/coin-4');
    });
    // Hiding coins 5
    WA.room.area.onEnter('add-coin-5').subscribe(() => {
        coinSound.play(soundConfig);
       (WA.player.state.coins as number) += 10;
        WA.room.area.delete('add-coin-5');
        WA.room.hideLayer('floor/coins/coin-5');
    });

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export { };

