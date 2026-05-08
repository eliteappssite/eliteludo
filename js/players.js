// =========================
// ELITE LUDO PLAYERS SYSTEM
// =========================

// PLAYER DATA

const players = [

  {
    id:0,
    color:"red",
    name:"RED",
    active:true,
    finished:false
  },

  {
    id:1,
    color:"green",
    name:"GREEN",
    active:true,
    finished:false
  },

  {
    id:2,
    color:"yellow",
    name:"YELLOW",
    active:true,
    finished:false
  },

  {
    id:3,
    color:"blue",
    name:"BLUE",
    active:true,
    finished:false
  }

];

// CURRENT TURN

let currentPlayerIndex = 0;

// TOTAL PLAYERS

let totalPlayers = 4;

// INITIALIZE PLAYERS

function initializePlayers(){

  // GET PLAYER COUNT

  const savedPlayers =
  localStorage.getItem(
  "elite_ludo_players"
  );

  if(savedPlayers){

    totalPlayers =
    parseInt(savedPlayers);

  }

  // ENABLE REQUIRED PLAYERS

  players.forEach((player,index)=>{

    player.active =
    index < totalPlayers;

  });

  // UPDATE UI

  renderPlayers();

  updateTurnIndicator();

  console.log(
  "Players Initialized"
  );

}

// RENDER PLAYERS

function renderPlayers(){

  const playerContainer =
  document.getElementById(
  "playersContainer"
  );

  if(!playerContainer){

    console.warn(
    "Players container missing"
    );

    return;

  }

  playerContainer.innerHTML = "";

  players.forEach((player,index)=>{

    if(!player.active){

      return;

    }

    const card =
    document.createElement(
    "div"
    );

    card.classList.add(
    "playerCard"
    );

    card.classList.add(
    player.color +
    "Player"
    );

    if(index === currentPlayerIndex){

      card.classList.add(
      "activeTurn"
      );

    }

    card.innerHTML = `

      <div class="playerName">

        ${player.name}

      </div>

      <div class="playerStatus">

        ${
          player.finished
          ? "Finished"
          : "Playing"
        }

      </div>

    `;

    playerContainer.appendChild(
    card
    );

  });

}

// GET CURRENT PLAYER

function getCurrentPlayer(){

  return players[
  currentPlayerIndex
  ];

}

// GET CURRENT PLAYER NAME

function getCurrentPlayerName(){

  return getCurrentPlayer()
  .name;

}

// NEXT TURN

function nextTurn(){

  do{

    currentPlayerIndex++;

    // RESET

    if(currentPlayerIndex >=
       totalPlayers){

      currentPlayerIndex = 0;

    }

  }

  while(

    !players[
      currentPlayerIndex
    ].active

  );

  updateTurnIndicator();

  renderPlayers();

  console.log(

    "Current Turn:",

    getCurrentPlayerName()

  );

}

// UPDATE TURN UI

function updateTurnIndicator(){

  const statusText =
  document.getElementById(
  "gameStatus"
  );

  if(statusText){

    statusText.innerHTML =

    getCurrentPlayerName()

    +

    "'s Turn";

  }

}

// PLAYER FINISHED

function setPlayerFinished(
playerColor
){

  const player =
  players.find(

    p => p.color ===
    playerColor

  );

  if(player){

    player.finished = true;

    renderPlayers();

    checkGameWinner();

  }

}

// CHECK WINNER

function checkGameWinner(){

  const activePlayers =

  players.filter(

    p => p.active
  );

  const winners =

  activePlayers.filter(

    p => p.finished
  );

  // ONLY ONE PLAYER LEFT

  if(

    winners.length >=
    activePlayers.length - 1

  ){

    showWinnerScreen(
    winners[0]
    );

  }

}

// SHOW WINNER

function showWinnerScreen(
winner
){

  const winnerPopup =
  document.getElementById(
  "winnerPopup"
  );

  const winnerText =
  document.getElementById(
  "winnerText"
  );

  if(

    winnerPopup &&
    winnerText

  ){

    winnerPopup.style.display =
    "flex";

    winnerText.innerHTML =

    winner.name

    +

    " WINS!";

  }

}

// RESET PLAYERS

function resetPlayers(){

  currentPlayerIndex = 0;

  players.forEach((player)=>{

    player.finished = false;

  });

  renderPlayers();

  updateTurnIndicator();

}

// REMOVE PLAYER

function removePlayer(
playerColor
){

  const player =
  players.find(

    p => p.color ===
    playerColor

  );

  if(player){

    player.active = false;

    renderPlayers();

  }

}

// GET ACTIVE PLAYERS

function getActivePlayers(){

  return players.filter(

    p => p.active

  );

}

// CHECK PLAYER ACTIVE

function isPlayerActive(
playerColor
){

  const player =
  players.find(

    p => p.color ===
    playerColor

  );

  return player
  ? player.active
  : false;

}

// AUTO INIT

window.addEventListener(
"load",

()=>{

  initializePlayers();

});

// DEBUG

console.log(
"Players.js Loaded"
);