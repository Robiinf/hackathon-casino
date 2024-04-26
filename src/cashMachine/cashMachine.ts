let leverUp: any = null;
let leverDown: any = null;
let numberIcon = 9;
let iconHeight = 40;
let timePerIcon = 100;
let indexes = [0, 0, 0];
let iconMap = ['bar', 'bell', 'cherry', 'seven'];
let balance = WA.player.state.coins;
let noCoin = document.getElementById('no-coin');

// Slot Sounds
let enterSlotSound = WA.sound.loadSound("/public/sounds/slot/slot-enter.wav");
let slotSpinningSLot = WA.sound.loadSound("/public/sounds/slot/slot-machine-sound.wav");
let winningSound = WA.sound.loadSound("/public/sounds/slot/slot-win.wav");
let soundConfig = {
    volume: 0.5,
    loop: false,
};


function roll(reel, offset = 0 as number) {
    const delta = (offset + 2) * numberIcon + Math.round(Math.random() * numberIcon); 
    const style = getComputedStyle(reel),
        backgroundPositionY = parseFloat(style["background-position-y"]),
        targetBackgroundPositionY = backgroundPositionY + delta * iconHeight,
        normTargetBackgroundPositionY = targetBackgroundPositionY % (numberIcon * iconHeight);

    return new Promise((resolve, reject) => {

        reel.style.transition = `background-position-y ${8 + delta * timePerIcon}ms`;
        reel.style.backgroundPositionY = `${backgroundPositionY + delta * iconHeight}px`;
        
        setTimeout(() => {
            reel.style.transition = 'none';
            reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
            resolve(delta%numberIcon);
        }, 3 + delta * timePerIcon);
    });
}

function rollAll() {
    const reelsList = document.querySelectorAll('.slots > .reel');

    Promise
        .all( [...reelsList].map((reel, i) => roll(reel,i)) )
        .then((deltas) => {
            deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta)%numberIcon);  
            indexes.map((index) => iconMap[index]);
            
            // WIN CONDITION
            if (indexes[0] === indexes[1]) {
                balance.innerHTML = "Balance: " + (WA.player.state.coins * 2) + " coins";
                winningSound.play(soundConfig);
                console.log("WIN");
            }

            if (indexes[0] === indexes[1] && indexes[1] === indexes[2]) {
                balance.innerHTML = "Balance: " + (WA.player.state.coins * 5) + " coins";
                winningSound.play(soundConfig);
                console.log("JACKPOT");
            }
        });
}

WA.onInit()
.then(() => {

    if (WA.player.state.coins == 0) {
        noCoin.innerHTML = "You don't have enough coins to play";
    } else {
        enterSlotSound.play(soundConfig);
        leverUp = document.getElementById('lever-up');
        leverDown = document.getElementById('lever-down');
        balance = document.getElementById('balance');
        balance.innerHTML = "Balance: " + WA.player.state.coins + " coins";
    
        leverUp.addEventListener('click', () => {
            if (WA.player.state.coins >= 5) { // Vérifiez si l'utilisateur a au moins 5 pièces de monnaie
                slotSpinningSLot.play(soundConfig);
                WA.player.state.coins -= 5; // Soustrayez 5 pièces de monnaie
                balance.innerHTML = "Balance: " + WA.player.state.coins + " coins"; // Mettez à jour l'affichage du solde
                leverUp.style.display = 'none';
                leverDown.style.display = 'block';
                setTimeout(() => {
                    leverUp.style.display = 'block';
                    leverDown.style.display = 'none';
                }, 100);
    
                rollAll();
            } else {
                console.log("Not enough coins to play."); // Si l'utilisateur n'a pas assez de pièces de monnaie
            }
        });
    }

}).catch((e) => console.error(e));
