// =========================
// ELITE LUDO MOVEMENT SYSTEM
// =========================

// TOKEN MOVE SPEED

const MOVE_DELAY = 220;

// HOME PATH LIMIT

const FINAL_POSITION = 57;

// SAFE CELLS

const SAFE_CELLS = [
  0,8,13,21,26,34,39,47
];

// PLAYER START PATHS

const playerStartOffset = {

  red:0,
  green:13,
  yellow:26,
  blue:39

};

// MAIN MOVE FUNCTION

async function animateTokenMove(
color,
tokenIndex,
steps
){

  const token =
  tokenData[color]
  [tokenIndex];

  // INVALID MOVE

  if(!isMovePossible(
    color,
    tokenIndex,
    steps
  )){

    console.log(
    "Invalid Move"
    );

    return false;

  }

  // OPEN TOKEN

  if(
    token.position === -1
    &&
    steps === 6
  ){

    token.position = 0;

    renderTokens();

    playMoveSound();

    await sleep(250);

    return true;

  }

  // MOVE STEP BY STEP

  for(

    let i = 0;

    i < steps;

    i++

  ){

    token.position++;

    renderTokens();

    playMoveSound();

    await sleep(
    MOVE_DELAY
    );

  }

  // HOME ENTRY

  if(

    token.position >=
    FINAL_POSITION

  ){

    token.position =
    FINAL_POSITION;

    renderTokens();

    checkPlayerCompleted(
    color
    );

  }

  // CHECK KILL

  checkTokenCollision(
    color,
    token.position
  );

  return true;

}

// VALID MOVE CHECK

function isMovePossible(
color,
tokenIndex,
steps
){

  const token =
  tokenData[color]
  [tokenIndex];

  // TOKEN CLOSED

  if(
    token.position === -1
    &&
    steps !== 6
  ){

    return false;

  }

  // OVERFLOW CHECK

  if(

    token.position + steps
    >

    FINAL_POSITION

  ){

    return false;

  }

  return true;

}

// STEP MOVEMENT

function moveTokenStep(
color,
tokenIndex
){

  tokenData[color]
  [tokenIndex]
  .position++;

  renderTokens();

}

// TOKEN COLLISION

function checkTokenCollision(
currentColor,
position
){

  // SAFE ZONE

  if(

    SAFE_CELLS.includes(
    position
    )

  ){

    return;

  }

  Object.keys(tokenData)
  .forEach((enemyColor)=>{

    if(
      enemyColor ===
      currentColor
    ){

      return;

    }

    tokenData[enemyColor]
    .forEach((enemyToken)=>{

      if(

        enemyToken.position
        ===
        position

      ){

        // SEND HOME

        enemyToken.position =
        -1;

        renderTokens();

        playKillSound();

        console.log(

          currentColor
          +

          " killed "

          +

          enemyColor

        );

      }

    });

  });

}

// PLAYER COMPLETE

function checkPlayerCompleted(
color
){

  const allHome =

  tokenData[color]
  .every((token)=>{

    return token.position
    >= FINAL_POSITION;

  });

  if(allHome){

    setPlayerFinished(
    color
    );

    playWinSound();

  }

}

// HANDLE TOKEN CLICK

async function handleTokenClick(
color,
tokenIndex
){

  // CURRENT PLAYER CHECK

  if(

    getCurrentPlayer()
    .color !== color

  ){

    return;

  }

  // DICE VALUE

  const dice =
  getDiceValue();

  // NO DICE

  if(!dice){

    return;

  }

  // MOVE TOKEN

  const moved =

  await animateTokenMove(

    color,
    tokenIndex,
    dice

  );

  if(!moved){

    return;

  }

  // EXTRA TURN

  if(dice !== 6){

    nextTurn();

  }

  // RESET DICE

  resetDice();

  updateTurnIndicator();

}

// GET ABSOLUTE BOARD POSITION

function getBoardPosition(
color,
relativePosition
){

  if(relativePosition < 0){

    return -1;

  }

  return (

    playerStartOffset[color]
    +

    relativePosition

  )

  %

  52;

}

// CHECK SAFE POSITION

function isSafeBoardPosition(
position
){

  return SAFE_CELLS
  .includes(position);

}

// RESET MOVEMENT

function resetMovementSystem(){

  Object.keys(tokenData)
  .forEach((color)=>{

    tokenData[color]
    .forEach((token)=>{

      token.position = -1;

    });

  });

  renderTokens();

}

// HELPER DELAY

function sleep(ms){

  return new Promise(
    resolve =>

    setTimeout(
      resolve,
      ms
    )

  );

}

// SOUND HELPERS

function playMoveSound(){

  try{

    const sound =
    new Audio(
    "assets/sounds/move.mp3"
    );

    sound.play();

  }

  catch(err){

    console.log(
    "Move sound blocked"
    );

  }

}

function playKillSound(){

  try{

    const sound =
    new Audio(
    "assets/sounds/kill.mp3"
    );

    sound.play();

  }

  catch(err){

    console.log(
    "Kill sound blocked"
    );

  }

}

function playWinSound(){

  try{

    const sound =
    new Audio(
    "assets/sounds/win.mp3"
    );

    sound.play();

  }

  catch(err){

    console.log(
    "Win sound blocked"
    );

  }

}

// DEBUG

console.log(
"Movement.js Loaded"
);