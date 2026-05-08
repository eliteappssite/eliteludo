// =========================
// ELITE LUDO TOKENS SYSTEM
// =========================

// TOKEN DATA

const tokenData = {

  red:[
    {id:"red0",position:-1},
    {id:"red1",position:-1},
    {id:"red2",position:-1},
    {id:"red3",position:-1}
  ],

  green:[
    {id:"green0",position:-1},
    {id:"green1",position:-1},
    {id:"green2",position:-1},
    {id:"green3",position:-1}
  ],

  yellow:[
    {id:"yellow0",position:-1},
    {id:"yellow1",position:-1},
    {id:"yellow2",position:-1},
    {id:"yellow3",position:-1}
  ],

  blue:[
    {id:"blue0",position:-1},
    {id:"blue1",position:-1},
    {id:"blue2",position:-1},
    {id:"blue3",position:-1}
  ]

};

// START POSITIONS

const startIndexes = {

  red:0,
  green:13,
  yellow:26,
  blue:39

};

// HOME CELLS

const homeCells = {

  red:[0,1,15,16],

  green:[13,14,28,29],

  yellow:[195,196,210,211],

  blue:[208,209,223,224]

};

// BOARD PATH

const boardPath = [

  6,7,8,23,38,53,68,83,98,113,
  128,143,158,157,156,155,154,
  153,152,137,122,107,92,77,
  62,47,32,17,18,19,20,35,
  50,65,80,95,110,125,140,
  141,142,143,144,145,146,
  131,116,101,86,71,56,41

];

// RENDER ALL TOKENS

function renderTokens(){

  // REMOVE OLD TOKENS

  document.querySelectorAll(
  ".token"

  ).forEach((token)=>{

    token.remove();

  });

  // LOOP PLAYERS

  Object.keys(tokenData)
  .forEach((color)=>{

    tokenData[color]
    .forEach((token,index)=>{

      renderSingleToken(

        color,
        token,
        index

      );

    });

  });

}

// RENDER SINGLE TOKEN

function renderSingleToken(
color,
token,
index
){

  let targetCell;

  // TOKEN INSIDE HOME

  if(token.position === -1){

    targetCell =
    document.getElementById(

      "cell-" +

      homeCells[color][index]

    );

  }

  else{

    const boardIndex =

    (
      startIndexes[color]
      +

      token.position

    )

    %

    boardPath.length;

    targetCell =
    document.getElementById(

      "cell-" +

      boardPath[boardIndex]

    );

  }

  // CREATE TOKEN

  const tokenElement =
  document.createElement(
  "div"
  );

  tokenElement.classList.add(
  "token"
  );

  tokenElement.classList.add(
  color +
  "Token"
  );

  tokenElement.id =
  token.id;

  // TOKEN CLICK

  tokenElement.addEventListener(
  "click",

  ()=>{

    moveToken(
      color,
      index
    );

  });

  // APPEND

  if(targetCell){

    targetCell.appendChild(
    tokenElement
    );

  }

}

// MOVE TOKEN

function moveToken(
color,
tokenIndex
){

  // TURN CHECK

  if(

    getCurrentPlayer()
    .color !== color

  ){

    return;

  }

  // DICE VALUE

  const dice =
  getDiceValue();

  const token =
  tokenData[color]
  [tokenIndex];

  // NEED 6 TO OPEN

  if(

    token.position === -1
    &&

    dice !== 6

  ){

    return;

  }

  // OPEN TOKEN

  if(

    token.position === -1
    &&

    dice === 6

  ){

    token.position = 0;

  }

  else{

    token.position += dice;

  }

  // WIN CHECK

  if(token.position >= 52){

    token.position = 52;

    checkPlayerHome(color);

  }

  // UPDATE UI

  renderTokens();

  // TOKEN COLLISION

  handleTokenKill(
    color,
    token.position
  );

  // NEXT TURN

  if(dice !== 6){

    nextTurn();

  }

  // RESET DICE

  resetDice();

}

// TOKEN KILL

function handleTokenKill(
currentColor,
position
){

  Object.keys(tokenData)
  .forEach((enemyColor)=>{

    if(enemyColor ===
       currentColor){

      return;

    }

    tokenData[enemyColor]
    .forEach((enemyToken)=>{

      if(

        enemyToken.position
        ===
        position

      ){

        // SAFE ZONE CHECK

        if(

          isSafePosition(
          position
          )

        ){

          return;

        }

        // SEND BACK HOME

        enemyToken.position = -1;

      }

    });

  });

}

// SAFE POSITIONS

function isSafePosition(
position
){

  const safePositions =

  [0,8,13,21,26,34,39,47];

  return safePositions
  .includes(position);

}

// CHECK PLAYER HOME

function checkPlayerHome(
color
){

  const completed =
  tokenData[color]
  .every((token)=>{

    return token.position
    >= 52;

  });

  if(completed){

    setPlayerFinished(
    color
    );

  }

}

// RESET TOKENS

function resetTokens(){

  Object.keys(tokenData)
  .forEach((color)=>{

    tokenData[color]
    .forEach((token)=>{

      token.position = -1;

    });

  });

  renderTokens();

}

// ENABLE TOKEN SELECTION

function enableTokenSelection(
diceValue
){

  console.log(

    "Dice Value:",
    diceValue

  );

}

// AUTO INIT

window.addEventListener(
"load",

()=>{

  renderTokens();

});

// DEBUG

console.log(
"Tokens.js Loaded"
);