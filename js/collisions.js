// =========================
// ELITE LUDO COLLISION SYSTEM
// =========================

// SAFE POSITIONS

const SAFE_POSITIONS = [

  0,
  8,
  13,
  21,
  26,
  34,
  39,
  47

];

// CHECK COLLISION

function checkCollision(
currentColor,
currentTokenIndex
){

  const currentToken =

  tokenData[currentColor]
  [currentTokenIndex];

  // INVALID POSITION

  if(

    currentToken.position < 0

  ){

    return;

  }

  // SAFE ZONE CHECK

  if(

    isSafePosition(
    currentToken.position
    )

  ){

    console.log(
    "Safe Position"
    );

    return;

  }

  // CHECK ALL PLAYERS

  Object.keys(tokenData)
  .forEach((enemyColor)=>{

    // SAME PLAYER

    if(

      enemyColor ===
      currentColor

    ){

      return;

    }

    // CHECK TOKENS

    tokenData[enemyColor]
    .forEach((enemyToken,
              enemyIndex)=>{

      if(

        enemyToken.position
        ===
        currentToken.position

      ){

        // TOKEN KILLED

        killToken(

          enemyColor,
          enemyIndex

        );

        // SOUND

        playCollisionSound();

        // STATUS

        updateGameStatus(

          currentColor
          .toUpperCase()

          +

          " Killed "

          +

          enemyColor
          .toUpperCase()

        );

        // EXTRA TURN

        grantExtraTurn();

      }

    });

  });

}

// KILL TOKEN

function killToken(
color,
tokenIndex
){

  tokenData[color]
  [tokenIndex]
  .position = -1;

  renderTokens();

  console.log(

    color,

    " token killed"

  );

}

// SAFE POSITION CHECK

function isSafePosition(
position
){

  return SAFE_POSITIONS
  .includes(position);

}

// STACK CHECK

function checkTokenStack(
color,
position
){

  let count = 0;

  tokenData[color]
  .forEach((token)=>{

    if(

      token.position
      ===
      position

    ){

      count++;

    }

  });

  return count;

}

// STACK PROTECTION

function isStackProtected(
color,
position
){

  return (

    checkTokenStack(
      color,
      position
    )

    >= 2

  );

}

// ADVANCED COLLISION CHECK

function checkAdvancedCollision(
currentColor,
currentPosition
){

  // SAFE ZONE

  if(

    isSafePosition(
    currentPosition
    )

  ){

    return false;

  }

  // CHECK ENEMIES

  for(

    let enemyColor
    in tokenData

  ){

    if(

      enemyColor ===
      currentColor

    ){

      continue;

    }

    for(

      let i = 0;

      i <
      tokenData[enemyColor]
      .length;

      i++

    ){

      const enemyToken =

      tokenData[enemyColor]
      [i];

      // SAME POSITION

      if(

        enemyToken.position
        ===
        currentPosition

      ){

        // STACK SAFE

        if(

          isStackProtected(

            enemyColor,
            currentPosition

          )

        ){

          return false;

        }

        // KILL

        killToken(
          enemyColor,
          i
        );

        return true;

      }

    }

  }

  return false;

}

// COLLISION ANIMATION

function playCollisionAnimation(
cellElement
){

  if(!cellElement){

    return;

  }

  cellElement.classList.add(
  "collisionEffect"
  );

  setTimeout(()=>{

    cellElement.classList.remove(
    "collisionEffect"
    );

  },500);

}

// COLLISION SOUND

function playCollisionSound(){

  try{

    const sound =
    new Audio(
    "assets/sounds/kill.mp3"
    );

    sound.play();

  }

  catch(err){

    console.log(
    "Collision sound blocked"
    );

  }

}

// GET TOKENS AT POSITION

function getTokensAtPosition(
position
){

  let foundTokens = [];

  Object.keys(tokenData)
  .forEach((color)=>{

    tokenData[color]
    .forEach((token,index)=>{

      if(

        token.position
        ===
        position

      ){

        foundTokens.push({

          color:color,

          index:index

        });

      }

    });

  });

  return foundTokens;

}

// REMOVE ALL COLLISIONS

function resetCollisionSystem(){

  console.log(
  "Collision System Reset"
  );

}

// DEBUG

console.log(
"Collisions.js Loaded"
);