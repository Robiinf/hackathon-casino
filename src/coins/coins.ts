export function initCoins() {
    let coinSound = WA.sound.loadSound("../public/sounds/coin-sound.mp3");
    let soundConfig = {
        volume: 0.5,
        loop: false,
    };

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
}
