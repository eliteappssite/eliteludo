// =========================
// ELITE LUDO DICE SYSTEM
// =========================

// DICE ELEMENT

const diceElement =
document.getElementById(
"dice"
);

const rollButton =
document.getElementById(
"rollDiceBtn"
);

// DICE STATE

let currentDiceValue = 1;

let isRolling = false;

// DICE SOUNDS

const diceSound =
new Audio(
"assets/sounds/dice.mp3"
);

// DICE EMOJIS

const diceFaces = {

  1:"⚀",
  2:"⚁",
  3:"⚂",
  4:"⚃",
  5:"⚄",
  6:"⚅"

};

// ROLL DICE

function rollDice(){

  // PREVENT MULTIPLE ROLLS

  if(isRolling){

    return;

  }

  isRolling = true;

  // BUTTON DISABLE

  if(rollButton){

    rollButton.disabled = true;

    rollButton.style.opacity =
    "0.6";

  }

  // PLAY SOUND

  try{

    diceSound.currentTime = 0;

    diceSound.play();

  }

  catch(err){

    console.log(
    "Dice sound blocked"
    );

  }

  // START ANIMATION

  startDiceAnimation();

}

// DICE ANIMATION

function startDiceAnimation(){

  let animationCount = 0;

  const animationInterval =
  setInterval(()=>{

    const randomFace =
    Math.floor(
      Math.random() * 6
    ) + 1;

    updateDiceFace(
    randomFace
    );

    animationCount++;

    // STOP AFTER 12 FRAMES

    if(animationCount >= 12){

      clearInterval(
      animationInterval
      );

      finishDiceRoll();

    }

  },100);

}

// FINAL DICE VALUE

function finishDiceRoll(){

  currentDiceValue =

  Math.floor(
    Math.random() * 6
  ) + 1;

  updateDiceFace(
  currentDiceValue
  );

  // ENABLE TOKEN MOVEMENT

  if(typeof enableTokenSelection
  === "function"){

    enableTokenSelection(
    currentDiceValue
    );

  }

  // TURN STATUS

  if(typeof updateGameStatus
  === "function"){

    updateGameStatus(

      getCurrentPlayerName()
      +

      " rolled "

      +

      currentDiceValue

    );

  }

  // ALLOW EXTRA TURN ON 6

  if(currentDiceValue === 6){

    console.log(
    "Extra Turn"
    );

  }

  // BUTTON ENABLE

  setTimeout(()=>{

    isRolling = false;

    if(rollButton){

      rollButton.disabled = false;

      rollButton.style.opacity =
      "1";

    }

  },500);

}

// UPDATE DICE FACE

function updateDiceFace(value){

  if(!diceElement){

    console.error(
    "Dice element missing"
    );

    return;

  }

  diceElement.innerHTML =

  diceFaces[value];

  // ANIMATION EFFECT

  diceElement.style.transform =

  "scale(1.2) rotate(10deg)";

  setTimeout(()=>{

    diceElement.style.transform =

    "scale(1) rotate(0deg)";

  },120);

}

// GET CURRENT DICE

function getDiceValue(){

  return currentDiceValue;

}

// RESET DICE

function resetDice(){

  currentDiceValue = 1;

  updateDiceFace(1);

}

// AUTO CONNECT BUTTON

window.addEventListener(
"load",

()=>{

  if(rollButton){

    rollButton.addEventListener(

      "click",

      rollDice

    );

  }

});

// DEBUG

console.log(
"Dice.js Loaded"
);