// =========================
// ELITE LUDO UI SYSTEM
// =========================

// UI ELEMENTS

const gameStatusText =
document.getElementById(
"gameStatus"
);

const turnText =
document.getElementById(
"turnText"
);

const timerText =
document.getElementById(
"timerText"
);

const winnerPopup =
document.getElementById(
"winnerPopup"
);

const winnerText =
document.getElementById(
"winnerText"
);

// UPDATE GAME STATUS

function updateGameStatus(
message
){

  if(gameStatusText){

    gameStatusText.innerHTML =
    message;

  }

  console.log(
  "STATUS:",
  message
  );

}

// UPDATE TURN TEXT

function updateTurnText(
playerName
){

  if(turnText){

    turnText.innerHTML =

      playerName +

      "'s Turn";

  }

}

// UPDATE TIMER

function updateTimerUI(
time
){

  if(timerText){

    timerText.innerHTML =
    time;

  }

  // WARNING EFFECT

  if(time <= 5){

    timerText.classList.add(
    "timerDanger"
    );

  }

  else{

    timerText.classList.remove(
    "timerDanger"
    );

  }

}

// SHOW WINNER POPUP

function showWinnerPopup(
winnerName
){

  if(

    !winnerPopup
    ||

    !winnerText

  ){

    return;

  }

  winnerPopup.style.display =
  "flex";

  winnerText.innerHTML =

    winnerName +

    " WINS!";

  // ANIMATION

  animatePopup(
  winnerPopup
  );

  // SOUND

  playWinSound();

}

// HIDE WINNER POPUP

function hideWinnerPopup(){

  if(winnerPopup){

    winnerPopup.style.display =
    "none";

  }

}

// SHOW MESSAGE

function showToastMessage(
message
){

  const toast =
  document.createElement(
  "div"
  );

  toast.classList.add(
  "toastMessage"
  );

  toast.innerHTML =
  message;

  document.body.appendChild(
  toast
  );

  setTimeout(()=>{

    toast.classList.add(
    "showToast"
    );

  },50);

  setTimeout(()=>{

    toast.classList.remove(
    "showToast"
    );

    setTimeout(()=>{

      toast.remove();

    },300);

  },2000);

}

// UPDATE PLAYER PANEL

function updatePlayerPanel(){

  const playerCards =

  document.querySelectorAll(
  ".playerCard"
  );

  playerCards.forEach((card)=>{

    card.classList.remove(
    "activeTurn"
    );

  });

  const currentPlayer =
  getCurrentTurnColor();

  const activeCard =
  document.querySelector(

    "." +

    currentPlayer +

    "Player"

  );

  if(activeCard){

    activeCard.classList.add(
    "activeTurn"
    );

  }

}

// SHOW DICE VALUE

function updateDiceUI(
diceValue
){

  const dice =
  document.getElementById(
  "dice"
  );

  if(!dice){

    return;

  }

  const faces = {

    1:"⚀",
    2:"⚁",
    3:"⚂",
    4:"⚃",
    5:"⚄",
    6:"⚅"

  };

  dice.innerHTML =
  faces[diceValue];

}

// ENABLE ROLL BUTTON

function enableRollButton(){

  const rollBtn =
  document.getElementById(
  "rollDiceBtn"
  );

  if(rollBtn){

    rollBtn.disabled =
    false;

    rollBtn.style.opacity =
    "1";

  }

}

// DISABLE ROLL BUTTON

function disableRollButton(){

  const rollBtn =
  document.getElementById(
  "rollDiceBtn"
  );

  if(rollBtn){

    rollBtn.disabled =
    true;

    rollBtn.style.opacity =
    "0.5";

  }

}

// SHOW TURN INDICATOR

function showTurnIndicator(
playerColor
){

  const indicator =
  document.getElementById(
  "turnIndicator"
  );

  if(!indicator){

    return;

  }

  indicator.innerHTML =

    playerColor
    .toUpperCase()

    +

    "'S TURN";

  indicator.className =

    playerColor +

    "Indicator";

}

// UPDATE HOME COUNTS

function updateHomeCounters(){

  Object.keys(tokenData)
  .forEach((color)=>{

    const counter =
    document.getElementById(

      color +
      "HomeCount"

    );

    if(counter){

      counter.innerHTML =

      getHomeTokenCount(
      color
      )

      +

      "/4";

    }

  });

}

// SHOW LOADING SCREEN

function showLoadingScreen(){

  const loading =
  document.getElementById(
  "loadingScreen"
  );

  if(loading){

    loading.style.display =
    "flex";

  }

}

// HIDE LOADING SCREEN

function hideLoadingScreen(){

  const loading =
  document.getElementById(
  "loadingScreen"
  );

  if(loading){

    loading.style.display =
    "none";

  }

}

// SHOW RESTART BUTTON

function showRestartButton(){

  const restartBtn =
  document.getElementById(
  "restartBtn"
  );

  if(restartBtn){

    restartBtn.style.display =
    "block";

  }

}

// HIDE RESTART BUTTON

function hideRestartButton(){

  const restartBtn =
  document.getElementById(
  "restartBtn"
  );

  if(restartBtn){

    restartBtn.style.display =
    "none";

  }

}

// FLASH STATUS

function flashStatus(){

  if(!gameStatusText){

    return;

  }

  gameStatusText.classList.add(
  "statusFlash"
  );

  setTimeout(()=>{

    gameStatusText.classList.remove(
    "statusFlash"
    );

  },500);

}

// MOBILE UI CHECK

function optimizeForMobile(){

  if(

    window.innerWidth
    < 768

  ){

    document.body.classList.add(
    "mobileMode"
    );

  }

  else{

    document.body.classList.remove(
    "mobileMode"
    );

  }

}

// RESIZE EVENT

window.addEventListener(
"resize",

()=>{

  optimizeForMobile();

});

// INITIALIZE UI

function initializeUI(){

  optimizeForMobile();

  updateGameStatus(
  "Welcome To Elite Ludo"
  );

  console.log(
  "UI Initialized"
  );

}

// AUTO INIT

window.addEventListener(
"load",

()=>{

  initializeUI();

});

// DEBUG

console.log(
"UI.js Loaded"
);