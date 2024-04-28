export function initCoins() {
    let coinSound = WA.sound.loadSound("../public/sounds/coin-sound.wav");
    let soundConfig = {
        volume: 0.5,
        loop: false,
    };
    // Hiding coins 1
    WA.room.area.onEnter('coin-1').subscribe(() => {
        coinSound.play(soundConfig);
       (WA.player.state.coins as number) += 10;
        WA.room.area.delete('coin-1');
        WA.room.hideLayer('floor/coin-1');
    });
    // Hiding coins 2
    WA.room.area.onEnter('coin-2').subscribe(() => {
        coinSound.play(soundConfig);
        (WA.player.state.coins as number) += 5;
        WA.room.area.delete('coin-2');
        WA.room.hideLayer('floor/coin-2');
    });
    // Hiding coins 3
    WA.room.area.onEnter('coin-3').subscribe(() => {
        coinSound.play(soundConfig);
       (WA.player.state.coins as number) += 50;
        WA.room.area.delete('coin-3');
        WA.room.hideLayer('floor/coin-3');
    });
}
