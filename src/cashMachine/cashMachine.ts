let leverUp: any = null;
let leverDown: any = null;
let numberIcon = 4;
let iconHeight = 40;
let timePerIcon = 100;
let indexes = [0, 0, 0];
let iconMap = ['bar', 'bell', 'cherry', 'seven'];

function roll(reel, offset = 0 as number) {
    const delta = (offset + 2) * numberIcon + Math.round(Math.random() * numberIcon);
    const style = getComputedStyle(reel),
        backgroundPositionY = parseFloat(style["background-position-y"]);
        targetBackgroundPosi

    return new Promise((resolve, reject) => {
        reel.style.transition = `background-position-y ${3 + delta * timePerIcon}ms`;
        reel.style.backgroundPositionY = `${backgroundPositionY + delta * iconHeight}px`;
        
        setTimeout(() => {
            resolve(delta%numberIcon);
        }, 3 + delta * timePerIcon);
    });
}

function rollAll() {
    const reelsList = document.querySelectorAll('.slots > .reel');

    Promise
        .all( [...reelsList].map((reel, i) => roll(reel,i)) )
        .then((deltas) => {
            deltas.foreach((delta, i) => indexes[i] = (indexes[i] + delta) % numberIcon);   
            indexes.map((index) => iconMap[index]);
            // WIN CONDITION
            setTimeout(rollAll, 3000);            
        });
}

WA.onInit()
.then(() => {
    leverUp = document.getElementById('lever-up');
    leverDown = document.getElementById('lever-down');

    leverUp.addEventListener('click', () => {
        leverUp.style.display = 'none';
        leverDown.style.display = 'block';
        setTimeout(() => {
            leverUp.style.display = 'block';
            leverDown.style.display = 'none';
        }, 100);

        rollAll();
    });
})
.catch((e) => console.error(e));
