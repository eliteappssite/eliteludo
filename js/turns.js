// =========================
// ELITE LUDO TURN SYSTEM
// =========================

// TURN STATE

let currentTurn = 0;

// TURN ORDER

let turnOrder = [
  "red",
  "green",
  "yellow",
  "blue"
];

// SKIPPED PLAYERS

let skippedPlayers = [];

// TURN TIMER

let turnTime = 20;

let turnTimer = null;

// CURRENT PLAYER COLOR

function getCurrentTurnColor(){

  return turnOrder[
  currentTurn
  ];

}

// CURRENT PLAYER DATA

function getCurrentTurnPlayer(){

  return players.find(

    p =>

    p.color ===
    getCurrentTurnColor()

  );

}

// START TURN

function startTurn(){

  // RESET TIMER

  resetTurnTimer();

  // CURRENT PLAYER

  const player =
  getCurrentTurnPlayer();

  if(!player){

    console.error(
    "Player not found"
    );

    return;

  }

  // SKIP FINISHED PLAYER

  if(player.finished){

    nextTurn();

    return;

  }

  // UPDATE UI

  updateTurnUI();

  // ENABLE DICE

  enableDiceButton();

  // STATUS

  updateGameStatus(

    player.name +

    "'s Turn"

  );

  console.log(

    "Turn Started:",

    player.name

  );

  // START TIMER

  startTurnTimer();

}

// NEXT TURN

function nextTurn(){

  // CLEAR TIMER

  clearInterval(
  turnTimer
  );

  do{

    currentTurn++;

    // LOOP BACK

    if(

      currentTurn >=
      turnOrder.length

    ){

      currentTurn = 0;

    }

  }

  while(

    isPlayerSkipped(
      getCurrentTurnColor()
    )

  );

  startTurn();

}

// EXTRA TURN

function grantExtraTurn(){

  updateGameStatus(

    getCurrentTurnPlayer()
    .name

    +

    " Gets Extra Turn"

  );

  enableDiceButton();

  startTurnTimer();

}

// SKIP PLAYER

function skipPlayer(
playerColor
){

  if(

    !skippedPlayers.includes(
    playerColor
    )

  ){

    skippedPlayers.push(
    playerColor
    );

  }

  console.log(

    playerColor,

    " skipped"

  );

}

// UNSKIP PLAYER

function unskipPlayer(
playerColor
){

  skippedPlayers =

  skippedPlayers.filter(

    p => p !== playerColor

  );

}

// CHECK SKIPPED

function isPlayerSkipped(
playerColor
){

  return skippedPlayers
  .includes(playerColor);

}

// RESET TURN SYSTEM

function resetTurnSystem(){

  currentTurn = 0;

  skippedPlayers = [];

  clearInterval(
  turnTimer
  );

  updateTurnUI();

  console.log(
  "Turn System Reset"
  );

}

// TURN UI

function updateTurnUI(){

  // PLAYER CARDS

  const cards =

  document.querySelectorAll(
  ".playerCard"
  );

  cards.forEach((card)=>{

    card.classList.remove(
    "activeTurn"
    );

  });

  // ACTIVE PLAYER

  const activePlayer =

  getCurrentTurnColor();

  const activeCard =

  document.querySelector(

    "." +

    activePlayer +

    "Player"

  );

  if(activeCard){

    activeCard.classList.add(
    "activeTurn"
    );

  }

  // STATUS

  const turnText =
  document.getElementById(
  "turnText"
  );

  if(turnText){

    turnText.innerHTML =

      getCurrentTurnPlayer()
      .name

      +

      "'s Turn";

  }

}

// ENABLE DICE

function enableDiceButton(){

  const diceBtn =
  document.getElementById(
  "rollDiceBtn"
  );

  if(diceBtn){

    diceBtn.disabled = false;

    diceBtn.style.opacity =
    "1";

  }

}

// DISABLE DICE

function disableDiceButton(){

  const diceBtn =
  document.getElementById(
  "rollDiceBtn"
  );

  if(diceBtn){

    diceBtn.disabled = true;

    diceBtn.style.opacity =
    "0.5";

  }

}

// TURN TIMER

function startTurnTimer(){

  turnTime = 20;

  const timerText =
  document.getElementById(
  "timerText"
  );

  if(timerText){

    timerText.innerHTML =
    turnTime;

  }

  clearInterval(
  turnTimer
  );

  turnTimer = setInterval(()=>{

    turnTime--;

    if(timerText){

      timerText.innerHTML =
      turnTime;

    }

    // TIMEOUT

    if(turnTime <= 0){

      clearInterval(
      turnTimer
      );

      updateGameStatus(

        getCurrentTurnPlayer()
        .name

        +

        " Turn Skipped"

      );

      nextTurn();

    }

  },1000);

}

// RESET TIMER

function resetTurnTimer(){

  clearInterval(
  turnTimer
  );

  turnTime = 20;

}

// FORCE TURN CHANGE

function forceNextTurn(){

  nextTurn();

}

// GET TURN INDEX

function getCurrentTurnIndex(){

  return currentTurn;

}

// CHECK PLAYER TURN

function isCurrentPlayer(
playerColor
){

  return (
    getCurrentTurnColor()
    ===
    playerColor
  );

}

// INITIALIZE TURN SYSTEM

window.addEventListener(
"load",

()=>{

  startTurn();

});

// DEBUG

console.log(
"Turns.js Loaded"
);