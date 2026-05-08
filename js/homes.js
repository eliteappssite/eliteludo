// =========================
// ELITE LUDO HOME SYSTEM
// =========================

// FINAL HOME POSITION

const HOME_FINAL = 57;

// HOME PATHS

const homePaths = {

  red:[
    200,201,202,203,204,205
  ],

  green:[
    20,35,50,65,80,95
  ],

  yellow:[
    24,39,54,69,84,99
  ],

  blue:[
    129,130,131,132,133,134
  ]

};

// HOME ENTRY POINTS

const homeEntryPoints = {

  red:51,

  green:12,

  yellow:25,

  blue:38

};

// CHECK HOME ENTRY

function canEnterHome(
color,
position,
diceValue
){

  // EXACT HOME RULE

  if(

    position + diceValue
    >

    HOME_FINAL

  ){

    return false;

  }

  return true;

}

// CHECK TOKEN REACHED HOME

function hasReachedHome(
token
){

  return (
    token.position
    >=
    HOME_FINAL
  );

}

// MOVE INSIDE HOME

function moveTokenInsideHome(
color,
tokenIndex,
steps
){

  const token =
  tokenData[color]
  [tokenIndex];

  // VALIDATION

  if(

    token.position + steps
    >

    HOME_FINAL

  ){

    return false;

  }

  token.position += steps;

  renderTokens();

  return true;

}

// GET HOME CELL

function getHomeCell(
color,
position
){

  const relative =
  position - 52;

  return homePaths[color]
  [relative];

}

// CHECK PLAYER COMPLETED

function checkPlayerCompleted(
color
){

  const allFinished =

  tokenData[color]
  .every((token)=>{

    return token.position
    >=
    HOME_FINAL;

  });

  if(allFinished){

    setPlayerFinished(
    color
    );

    playHomeWinEffect(
    color
    );

    updateGameStatus(

      color.toUpperCase()

      +

      " Completed All Tokens"

    );

  }

}

// FINAL HOME ENTRY

function enterFinalHome(
color,
tokenIndex
){

  tokenData[color]
  [tokenIndex]
  .position =
  HOME_FINAL;

  renderTokens();

  checkPlayerCompleted(
  color
  );

}

// HOME PATH CHECK

function isHomePath(
position
){

  return position >= 52;

}

// HOME SAFE CHECK

function isHomeSafe(
position
){

  // HOME AREA ALWAYS SAFE

  return position >= 52;

}

// HOME ENTRY CHECK

function isNearHome(
position
){

  return position >= 51;

}

// HOME TOKEN COUNT

function getHomeTokenCount(
color
){

  let count = 0;

  tokenData[color]
  .forEach((token)=>{

    if(

      token.position
      >=
      HOME_FINAL

    ){

      count++;

    }

  });

  return count;

}

// HOME PROGRESS

function getHomeProgress(
color
){

  return (

    getHomeTokenCount(
    color
    )

    +

    "/4"

  );

}

// HOME ANIMATION

function playHomeAnimation(
tokenElement
){

  if(!tokenElement){

    return;

  }

  tokenElement.classList.add(
  "homeAnimation"
  );

  setTimeout(()=>{

    tokenElement.classList.remove(
    "homeAnimation"
    );

  },600);

}

// HOME WIN EFFECT

function playHomeWinEffect(
color
){

  const body =
  document.body;

  body.classList.add(
  color +
  "WinEffect"
  );

  setTimeout(()=>{

    body.classList.remove(
    color +
    "WinEffect"
    );

  },1200);

}

// HOME SOUND

function playHomeSound(){

  try{

    const sound =
    new Audio(
    "assets/sounds/home.mp3"
    );

    sound.play();

  }

  catch(err){

    console.log(
    "Home sound blocked"
    );

  }

}

// RESET HOMES

function resetHomes(){

  console.log(
  "Home System Reset"
  );

}

// DEBUG

console.log(
"Homes.js Loaded"
);