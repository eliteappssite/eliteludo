// =========================
// ELITE LUDO WIN SYSTEM
// =========================

// WINNERS LIST

let winners = [];

// GAME OVER STATE

let gameOver = false;

// CHECK PLAYER WIN

function checkPlayerWin(
color
){

  // ALL TOKENS HOME

  const completed =

  tokenData[color]
  .every((token)=>{

    return token.position
    >= HOME_FINAL;

  });

  if(completed){

    registerWinner(
    color
    );

  }

}

// REGISTER WINNER

function registerWinner(
color
){

  // ALREADY WINNER

  if(

    winners.includes(
    color
    )

  ){

    return;

  }

  winners.push(color);

  // PLAYER FINISHED

  setPlayerFinished(
  color
  );

  // PLAY SOUND

  playVictorySound();

  // SHOW STATUS

  updateGameStatus(

    color.toUpperCase()

    +

    " Finished #"

    +

    winners.length

  );

  // WIN EFFECT

  playWinnerEffect(
  color
  );

  // FINAL GAME END

  checkGameOver();

}

// CHECK GAME OVER

function checkGameOver(){

  const activePlayers =

  getActivePlayers();

  // ALL PLAYERS FINISHED

  if(

    winners.length >=
    activePlayers.length - 1

  ){

    gameOver = true;

    showFinalWinner();

  }

}

// SHOW FINAL WINNER

function showFinalWinner(){

  const winnerColor =
  winners[0];

  const winnerPlayer =

  players.find(

    p =>

    p.color ===
    winnerColor

  );

  // POPUP

  const popup =
  document.getElementById(
  "winnerPopup"
  );

  const winnerText =
  document.getElementById(
  "winnerText"
  );

  if(

    popup &&
    winnerText

  ){

    popup.style.display =
    "flex";

    winnerText.innerHTML =

      winnerPlayer.name

      +

      " WINS THE GAME!";

  }

  // STATUS

  updateGameStatus(

    winnerPlayer.name

    +

    " Is Champion"

  );

  // DISABLE DICE

  disableDiceButton();

  console.log(

    winnerPlayer.name,

    " Won The Game"

  );

}

// WIN RANKING

function getPlayerRank(
color
){

  const index =
  winners.indexOf(
  color
  );

  if(index === -1){

    return null;

  }

  return index + 1;

}

// PLAYER FINISHED CHECK

function hasPlayerWon(
color
){

  return winners.includes(
  color
  );

}

// VICTORY EFFECT

function playWinnerEffect(
color
){

  const body =
  document.body;

  body.classList.add(
  color +
  "WinnerGlow"
  );

  setTimeout(()=>{

    body.classList.remove(
    color +
    "WinnerGlow"
    );

  },2000);

}

// VICTORY SOUND

function playVictorySound(){

  try{

    const sound =
    new Audio(
    "assets/sounds/win.mp3"
    );

    sound.play();

  }

  catch(err){

    console.log(
    "Victory sound blocked"
    );

  }

}

// SHOW RANKINGS

function showRankingBoard(){

  const rankingBoard =
  document.getElementById(
  "rankingBoard"
  );

  if(!rankingBoard){

    return;

  }

  rankingBoard.innerHTML = "";

  winners.forEach((color,index)=>{

    const player =
    players.find(

      p => p.color === color

    );

    const item =
    document.createElement(
    "div"
    );

    item.classList.add(
    "rankingItem"
    );

    item.innerHTML =

      "#" +

      (index + 1)

      +

      " - "

      +

      player.name;

    rankingBoard.appendChild(
    item
    );

  });

}

// RESTART GAME

function restartGameFromWin(){

  // RESET STATE

  winners = [];

  gameOver = false;

  // RESET SYSTEMS

  resetPlayers();

  resetTokens();

  resetDice();

  resetTurnSystem();

  resetCollisionSystem();

  resetHomes();

  resetSafeZones();

  // HIDE POPUP

  const popup =
  document.getElementById(
  "winnerPopup"
  );

  if(popup){

    popup.style.display =
    "none";

  }

  // START AGAIN

  startTurn();

  updateGameStatus(
  "New Game Started"
  );

  console.log(
  "Game Restarted"
  );

}

// CLOSE WIN POPUP

function closeWinnerPopup(){

  const popup =
  document.getElementById(
  "winnerPopup"
  );

  if(popup){

    popup.style.display =
    "none";

  }

}

// GAME OVER CHECK

function isGameOver(){

  return gameOver;

}

// GET WINNERS

function getWinners(){

  return winners;

}

// RESET WIN SYSTEM

function resetWinSystem(){

  winners = [];

  gameOver = false;

}

// DEBUG

console.log(
"Win.js Loaded"
);