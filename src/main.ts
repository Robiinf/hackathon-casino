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

    
    WA.room.area.onEnter('add-coin').subscribe(() => {
        coinSound.play();
        WA.player.state.coins += 1;
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

