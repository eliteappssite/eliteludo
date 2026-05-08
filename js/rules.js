// =========================
// ELITE LUDO RULES SYSTEM
// =========================

// GAME SETTINGS

const GAME_RULES = {

  unlockDice:6,

  extraTurnDice:6,

  maxPosition:57,

  totalTokens:4

};

// GAME STATE

let gameStarted = false;

let gameFinished = false;

// START GAME

function startGame(){

  gameStarted = true;

  gameFinished = false;

  resetTokens();

  resetDice();

  resetPlayers();

  updateGameStatus(
  "Game Started"
  );

  console.log(
  "Ludo Game Started"
  );

}

// END GAME

function endGame(winner){

  gameFinished = true;

  updateGameStatus(

    winner.name +

    " Wins The Game!"

  );

  showWinnerScreen(
  winner
  );

  console.log(
  "Game Finished"
  );

}

// MOVE VALIDATION

function validateMove(
color,
tokenIndex,
diceValue
){

  const token =
  tokenData[color]
  [tokenIndex];

  // GAME FINISHED

  if(gameFinished){

    return false;

  }

  // WRONG TURN

  if(

    getCurrentPlayer()
    .color !== color

  ){

    return false;

  }

  // TOKEN CLOSED

  if(

    token.position === -1
    &&
    diceValue !==
    GAME_RULES.unlockDice

  ){

    return false;

  }

  // EXACT HOME RULE

  if(

    token.position + diceValue
    >

    GAME_RULES.maxPosition

  ){

    return false;

  }

  return true;

}

// CHECK AVAILABLE MOVES

function hasPossibleMove(
color,
diceValue
){

  return tokenData[color]
  .some((token)=>{

    // OPEN MOVE

    if(

      token.position === -1
      &&

      diceValue === 6

    ){

      return true;

    }

    // NORMAL MOVE

    if(

      token.position >= 0
      &&

      token.position + diceValue
      <=

      GAME_RULES.maxPosition

    ){

      return true;

    }

    return false;

  });

}

// HANDLE TURN LOGIC

function handleTurnAfterMove(
diceValue
){

  // EXTRA TURN

  if(

    diceValue ===
    GAME_RULES.extraTurnDice

  ){

    updateGameStatus(

      getCurrentPlayerName()

      +

      " Gets Extra Turn"

    );

    return;

  }

  // NEXT PLAYER

  nextTurn();

  updateTurnIndicator();

}

// CHECK TOKEN UNLOCK

function canUnlockToken(
diceValue
){

  return (
    diceValue ===
    GAME_RULES.unlockDice
  );

}

// CHECK WIN CONDITION

function checkWinCondition(
color
){

  const completedTokens =

  tokenData[color]
  .filter((token)=>{

    return token.position
    >=
    GAME_RULES.maxPosition;

  });

  return (

    completedTokens.length
    ===

    GAME_RULES.totalTokens

  );

}

// SAFE ZONE CHECK

function isSafeZonePosition(
position
){

  const safeZones = [

    0,
    8,
    13,
    21,
    26,
    34,
    39,
    47

  ];

  return safeZones.includes(
  position
  );

}

// TOKEN KILL RULE

function canKillToken(
currentColor,
targetColor,
position
){

  // SAME PLAYER

  if(

    currentColor ===
    targetColor

  ){

    return false;

  }

  // SAFE ZONE

  if(

    isSafeZonePosition(
    position
    )

  ){

    return false;

  }

  return true;

}

// HOME ENTRY CHECK

function canEnterHome(
currentPosition,
diceValue
){

  return (

    currentPosition +
    diceValue

    <=

    GAME_RULES.maxPosition

  );

}

// PLAYER ELIMINATION

function eliminatePlayer(
playerColor
){

  removePlayer(
  playerColor
  );

  updateGameStatus(

    playerColor.toUpperCase()

    +

    " Eliminated"

  );

}

// CHECK GAME ACTIVE

function isGameRunning(){

  return (
    gameStarted
    &&
    !gameFinished
  );

}

// RESET FULL GAME

function resetFullGame(){

  gameStarted = false;

  gameFinished = false;

  resetPlayers();

  resetTokens();

  resetDice();

  updateGameStatus(
  "Game Reset"
  );

  console.log(
  "Full Game Reset"
  );

}

// GAME STATUS UI

function updateGameStatus(
message
){

  const gameStatus =
  document.getElementById(
  "gameStatus"
  );

  if(gameStatus){

    gameStatus.innerHTML =
    message;

  }

}

// AUTO SKIP TURN

function autoSkipTurnIfNoMove(
color,
diceValue
){

  if(

    !hasPossibleMove(
      color,
      diceValue
    )

  ){

    updateGameStatus(

      getCurrentPlayerName()

      +

      " Has No Move"

    );

    setTimeout(()=>{

      nextTurn();

      updateTurnIndicator();

      resetDice();

    },1000);

  }

}

// RESTART BUTTON

function restartGame(){

  resetFullGame();

  startGame();

}

// DEBUG

console.log(
"Rules.js Loaded"
);