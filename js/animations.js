// =========================
// ELITE LUDO ANIMATIONS SYSTEM
// =========================

// TOKEN MOVE ANIMATION

function animateTokenMovement(
tokenElement
){

  if(!tokenElement){

    return;

  }

  tokenElement.style.transition =
  "all 0.25s ease";

  tokenElement.style.transform =
  "scale(1.25)";

  setTimeout(()=>{

    tokenElement.style.transform =
    "scale(1)";

  },250);

}

// DICE ROLL ANIMATION

function animateDiceRoll(){

  const dice =
  document.getElementById(
  "dice"
  );

  if(!dice){

    return;

  }

  dice.classList.add(
  "diceRolling"
  );

  let rotate = 0;

  const interval =
  setInterval(()=>{

    rotate += 45;

    dice.style.transform =

    "rotate(" +

    rotate +

    "deg) scale(1.15)";

  },50);

  setTimeout(()=>{

    clearInterval(interval);

    dice.classList.remove(
    "diceRolling"
    );

    dice.style.transform =
    "rotate(0deg) scale(1)";

  },700);

}

// PLAYER TURN GLOW

function animatePlayerTurn(
playerColor
){

  // REMOVE OLD

  document
  .querySelectorAll(
  ".playerCard"
  )

  .forEach((card)=>{

    card.classList.remove(
    "turnGlow"
    );

  });

  // ADD NEW

  const activeCard =
  document.querySelector(

    "." +

    playerColor +

    "Player"

  );

  if(activeCard){

    activeCard.classList.add(
    "turnGlow"
    );

  }

}

// SAFE ZONE GLOW

function animateSafeZone(
cellElement
){

  if(!cellElement){

    return;

  }

  cellElement.classList.add(
  "safePulse"
  );

  setTimeout(()=>{

    cellElement.classList.remove(
    "safePulse"
    );

  },800);

}

// COLLISION EFFECT

function animateCollision(
cellElement
){

  if(!cellElement){

    return;

  }

  cellElement.classList.add(
  "collisionShake"
  );

  setTimeout(()=>{

    cellElement.classList.remove(
    "collisionShake"
    );

  },600);

}

// WINNER EFFECT

function animateWinner(
playerColor
){

  const body =
  document.body;

  body.classList.add(
  playerColor +
  "WinnerAnimation"
  );

  setTimeout(()=>{

    body.classList.remove(
    playerColor +
    "WinnerAnimation"
    );

  },2500);

}

// TOKEN SELECT EFFECT

function animateTokenSelect(
tokenElement
){

  if(!tokenElement){

    return;

  }

  tokenElement.classList.add(
  "tokenBounce"
  );

  setTimeout(()=>{

    tokenElement.classList.remove(
    "tokenBounce"
    );

  },500);

}

// HOME ENTRY EFFECT

function animateHomeEntry(
tokenElement
){

  if(!tokenElement){

    return;

  }

  tokenElement.classList.add(
  "homeGlow"
  );

  setTimeout(()=>{

    tokenElement.classList.remove(
    "homeGlow"
    );

  },1000);

}

// BUTTON CLICK EFFECT

function animateButtonClick(
button
){

  if(!button){

    return;

  }

  button.style.transform =
  "scale(0.94)";

  setTimeout(()=>{

    button.style.transform =
    "scale(1)";

  },120);

}

// SHAKE SCREEN

function shakeBoard(){

  const board =
  document.getElementById(
  "ludoBoard"
  );

  if(!board){

    return;

  }

  board.classList.add(
  "boardShake"
  );

  setTimeout(()=>{

    board.classList.remove(
    "boardShake"
    );

  },600);

}

// POPUP ANIMATION

function animatePopup(
popup
){

  if(!popup){

    return;

  }

  popup.style.transform =
  "scale(0.6)";

  popup.style.opacity =
  "0";

  setTimeout(()=>{

    popup.style.transition =
    "all 0.3s ease";

    popup.style.transform =
    "scale(1)";

    popup.style.opacity =
    "1";

  },50);

}

// TURN TIMER WARNING

function animateTimerWarning(){

  const timer =
  document.getElementById(
  "timerText"
  );

  if(!timer){

    return;

  }

  timer.classList.add(
  "timerWarning"
  );

  setTimeout(()=>{

    timer.classList.remove(
    "timerWarning"
    );

  },700);

}

// FLOATING TEXT

function showFloatingText(
text,
x,
y
){

  const floating =
  document.createElement(
  "div"
  );

  floating.classList.add(
  "floatingText"
  );

  floating.innerHTML = text;

  floating.style.left =
  x + "px";

  floating.style.top =
  y + "px";

  document.body.appendChild(
  floating
  );

  setTimeout(()=>{

    floating.remove();

  },1500);

}

// INITIALIZE ANIMATIONS

function initializeAnimations(){

  console.log(
  "Animations Initialized"
  );

}

// AUTO INIT

window.addEventListener(
"load",

()=>{

  initializeAnimations();

});

// DEBUG

console.log(
"Animations.js Loaded"
);