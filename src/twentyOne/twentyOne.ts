const cards = listAllCards21();

let startButton: any = null;
let hitButton: any = null;
let standButton: any = null;
let dealerCards: any = null;
let userCards: any = null;
let score: any = null;
let dealerScore: any = null;
let statusDisplayer: any = null;

WA.onInit()
  .then(() => {
    startButton = document.getElementById("button-start");
    hitButton = document.getElementById("button-hit");
    standButton = document.getElementById("button-stand");
    dealerCards = document.getElementById("dealerCards");
    userCards = document.getElementById("playerCards");
    score = document.getElementById("score");
    dealerScore = document.getElementById("dealerScore");
    statusDisplayer = document.getElementById("21displayer");

    startButton?.addEventListener("click", () => {
      startGame();
    });

    function startGame() {
      WA.player.state.dealerCards = [];
      WA.player.state.dealerCardScore = 0;

      WA.player.state.status = "playing";
      WA.player.state.dealerStatus = "playing";

      WA.player.state.userCards = [];
      WA.player.state.userCardScore = 0;

      (WA.player.state.dealerCards as any[]).push(pickCard21());
      (WA.player.state.dealerCards as any[]).push(pickCard21());

      (WA.player.state.userCards as any[]).push(pickCard21());
      (WA.player.state.userCards as any[]).push(pickCard21());

      showUserCard();
      calculateScores();
      showUserScore();

      hitButton.style.display = "block";
      standButton.style.display = "block";
      startButton.style.display = "none";

      standButton?.addEventListener("click", () => {
        stand();
        while (WA.player.state.dealerStatus === "playing") {
          console.log("Dealer draws card");
          dealerDrawCard();
        }
        showDealerCard();

        findWinners();
      });

      //   showDealerCard();
    }

    function stand() {
      WA.player.state.status = "finished";
    }

    function findWinners() {
      if ((WA.player.state.userCardScore as number) > 21) {
        statusDisplayer.innerHTML = "You lost!";
        return;
      }
      if ((WA.player.state.dealerCardScore as number) > 21) {
        statusDisplayer.innerHTML = "You won!";
        return;
      }

      if (
        (WA.player.state.userCardScore as number) >
        (WA.player.state.dealerCardScore as number)
      ) {
        statusDisplayer.innerHTML = "You won!";
        return;
      }

      if (
        (WA.player.state.userCardScore as number) <
        (WA.player.state.dealerCardScore as number)
      ) {
        if (
          userHasAs() &&
          (WA.player.state.userCardScore as number) + 10 >
            (WA.player.state.dealerCardScore as number) &&
          (WA.player.state.dealerCardScore as number) + 10 < 21
        ) {
          if (!dealerHasAs()) {
            statusDisplayer.innerHTML = "You won!";
            return;
          }

          if (
            (WA.player.state.userCardScore as number) + 10 >
              (WA.player.state.dealerCardScore as number) + 10 &&
            (WA.player.state.dealerCardScore as number) + 10 < 21 &&
            (WA.player.state.userCardScore as number) + 10 < 21
          ) {
            statusDisplayer.innerHTML = "You won!";
            return;
          }
        }
        statusDisplayer.innerHTML = "You lost!";
        return;
      }
    }

    function dealerDrawCard() {
      if (DealerShoulDrawCard()) {
        (WA.player.state.dealerCards as any[]).push(pickCard21());
        let newCard = document.createElement("img");
        newCard.src = "public/images/cards/card-back.png";
        newCard.style.width = "40px";
        newCard.style.height = "56px";
        newCard.style.transform =
          "translateX(-" +
          16 * (WA.player.state.dealerCards as any[]).length +
          "px)";
        dealerCards.appendChild(newCard);
        calculateScores();
        // showDealerCard();
      } else {
        WA.player.state.dealerStatus = "finished";
      }
    }

    function showDealerCard() {
      dealerCards.innerHTML = "";
      for (let i = 0; i < (WA.player.state.dealerCards as any[]).length; i++) {
        let card = document.createElement("img");
        card.src = (WA.player.state.dealerCards as any[])[i].img;
        card.style.width = "40px";
        card.style.height = "56px";
        card.style.transform = "translateX(-" + i * 16 + "px)";
        dealerCards?.appendChild(card);
      }
      showDealerScore();
    }

    function showUserCard() {
      userCards.innerHTML = "";
      for (let i = 0; i < (WA.player.state.userCards as any[]).length; i++) {
        let card = document.createElement("img");
        card.src = (WA.player.state.userCards as any[])[i].img;
        card.style.width = "80px";
        card.style.height = "112px";
        userCards?.appendChild(card);
      }
    }

    function showUserScore() {
      if (userHasAs()) {
        score.innerHTML =
          "Score: " +
          (WA.player.state.userCardScore as number) +
          " or " +
          ((WA.player.state.userCardScore as number) + 10);
        return;
      }
      score.innerHTML = "Score: " + (WA.player.state.userCardScore as number);
    }

    function showDealerScore() {
      if (dealerHasAs()) {
        dealerScore.innerHTML =
          "Score: " +
          (WA.player.state.dealerCardScore as number) +
          " or " +
          ((WA.player.state.dealerCardScore as number) + 10);
        return;
      }
      dealerScore.innerHTML =
        "Score: " + (WA.player.state.dealerCardScore as number);
    }

    function calculateScores() {
      (WA.player.state.userCardScore as number) = 0;
      for (let i = 0; i < (WA.player.state.userCards as any[]).length; i++) {
        (WA.player.state.userCardScore as number) += (
          WA.player.state.userCards as any[]
        )[i].value;
      }

      (WA.player.state.dealerCardScore as number) = 0;
      for (let i = 0; i < (WA.player.state.dealerCards as any[]).length; i++) {
        (WA.player.state.dealerCardScore as number) += (
          WA.player.state.dealerCards as any[]
        )[i].value;
      }
    }

    function userHasAs() {
      for (let i = 0; i < (WA.player.state.userCards as any[]).length; i++) {
        if ((WA.player.state.userCards as any[])[i].value === 1) {
          return true;
        }
      }
      return false;
    }

    function dealerHasAs() {
      for (let i = 0; i < (WA.player.state.dealerCards as any[]).length; i++) {
        if ((WA.player.state.dealerCards as any[])[i].value === 1) {
          return true;
        }
      }
      return false;
    }
  })
  .catch((e) => console.error(e));

function DealerShoulDrawCard() {
  return (WA.player.state.dealerCardScore as number) / 21 < Math.random();
}

function pickCard21() {
  let index = Math.floor(Math.random() * cards.length);
  let card = cards[index];
  cards.splice(index, 1);
  return card;
}

function getCard21(suitInput: number, valueInput: number) {
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const values = [
    "ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "jack",
    "queen",
    "king",
  ];
  const points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

  return {
    text: values[valueInput] + " of " + suits[suitInput],
    value: points[valueInput],
    suit: suits[suitInput],
    img:
      "/public/images/cards/card-" +
      suits[suitInput] +
      "-" +
      (valueInput + 1) +
      ".png",
  };
}

function listAllCards21() {
  const cards = [];
  for (let k = 0; k < 6; k++) {
    for (let i = 0; i < 13; i++) {
      for (let j = 0; j < 4; j++) {
        cards.push(getCard21(j, i));
      }
    }
  }
  return cards;
}
