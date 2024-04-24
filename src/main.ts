/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { Console } from "console";
import { initCoins } from './coins/coins.ts';

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {

    initCoins();

    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

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

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export { };

