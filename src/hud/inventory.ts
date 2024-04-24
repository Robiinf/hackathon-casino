import { bootstrapExtra } from "@workadventure/scripting-api-extra";

let playerCoins = document.getElementById("coin-count");

// Waiting for the API to be ready
WA.onInit().then(() => {
    playerCoins.innerHTML = 'x ' + (WA.player.state.coins ?? 50) as string;
}).catch(e => console.error(e))

WA.player.state.onVariableChange('coins').subscribe(() => {
    playerCoins.innerHTML = 'x ' + WA.player.state.coins as string;
});

export {};