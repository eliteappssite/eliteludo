// LOADING SCREEN

window.addEventListener("load",()=>{

  setTimeout(()=>{

    document.getElementById(
    "loadingScreen")

    .style.display = "none";

  },1500);

});

// AUDIO

const clickSound =
document.getElementById(
"clickSound");

// PLAYER SELECTION

const playerButtons =
document.querySelectorAll(
".playerBtn"
);

let selectedPlayers = 2;

playerButtons.forEach((btn)=>{

  btn.addEventListener(
  "click",

  ()=>{

    clickSound.play();

    playerButtons.forEach((b)=>{

      b.classList.remove(
      "active");

    });

    btn.classList.add(
    "active");

    selectedPlayers =
    parseInt(
      btn.dataset.players
    );

    console.log(
    "Selected Players:",
    selectedPlayers
    );

  });

});

// HOW TO PLAY MODAL

const howToPlayBtn =
document.getElementById(
"howToPlayBtn"
);

const modal =
document.getElementById(
"howToPlayModal"
);

const closeModalBtn =
document.getElementById(
"closeModalBtn"
);

howToPlayBtn
.addEventListener(
"click",

()=>{

  clickSound.play();

  modal.style.display =
  "flex";

});

closeModalBtn
.addEventListener(
"click",

()=>{

  clickSound.play();

  modal.style.display =
  "none";

});

// CLOSE MODAL ON OUTSIDE CLICK

window.addEventListener(
"click",

(e)=>{

  if(e.target === modal){

    modal.style.display =
    "none";

  }

});

// GENERATE ROOM CODE

function generateRoomCode(){

  const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let code = "";

  for(let i=0;i<6;i++){

    code += chars.charAt(

      Math.floor(
        Math.random() *
        chars.length
      )

    );

  }

  return code;

}

// CREATE ROOM

const createRoomBtn =
document.getElementById(
"createRoomBtn"
);

createRoomBtn
.addEventListener(
"click",

()=>{

  clickSound.play();

  const roomCode =
  generateRoomCode();

  document.getElementById(
  "roomCodeInput")

  .value = roomCode;

  alert(
  "Room Created: " +
  roomCode
  );

});

// JOIN ROOM

const joinRoomBtn =
document.getElementById(
"joinRoomBtn"
);

joinRoomBtn
.addEventListener(
"click",

()=>{

  clickSound.play();

  const roomCode =
  document.getElementById(
  "roomCodeInput")

  .value
  .trim()
  .toUpperCase();

  const playerName =
  document.getElementById(
  "playerNameInput")

  .value
  .trim();

  if(playerName === ""){

    alert(
    "Enter Your Name"
    );

    return;

  }

  if(roomCode === ""){

    alert(
    "Enter Room Code"
    );

    return;

  }

  localStorage.setItem(
    "elite_ludo_name",
    playerName
  );

  localStorage.setItem(
    "elite_ludo_room",
    roomCode
  );

  localStorage.setItem(
    "elite_ludo_players",
    selectedPlayers
  );

  alert(

  "Joining Room: " +
  roomCode +

  "\nPlayers: " +
  selectedPlayers

  );

  // FUTURE:
  // redirect to game.html

});

// PLAY OFFLINE

const playOfflineBtn =
document.getElementById(
"playOfflineBtn"
);

playOfflineBtn
.addEventListener(
"click",

()=>{

  clickSound.play();

  const playerName =
  document.getElementById(
  "playerNameInput")

  .value
  .trim();

  if(playerName === ""){

    alert(
    "Enter Your Name"
    );

    return;

  }

  localStorage.setItem(
    "elite_ludo_name",
    playerName
  );

  localStorage.setItem(
    "elite_ludo_players",
    selectedPlayers
  );

  alert(

  "Starting Offline Ludo\n" +

  "Players: " +
  selectedPlayers

  );

  // FUTURE:
  // redirect to offline game

});

// PLAY ONLINE

const playOnlineBtn =
document.getElementById(
"playOnlineBtn"
);

playOnlineBtn
.addEventListener(
"click",

()=>{

  clickSound.play();

  alert(

  "Online Multiplayer\n" +

  "System Coming Soon"

  );

});

// KEYBOARD SHORTCUTS

window.addEventListener(
"keydown",

(e)=>{

  // ENTER KEY

  if(e.key === "Enter"){

    const activeElement =
    document.activeElement;

    if(
      activeElement.id ===
      "roomCodeInput"

      ||

      activeElement.id ===
      "playerNameInput"
    ){

      joinRoomBtn.click();

    }

  }

});

// SIMPLE BUTTON ANIMATION

const allButtons =
document.querySelectorAll(
"button"
);

allButtons.forEach((btn)=>{

  btn.addEventListener(
  "mousedown",

  ()=>{

    btn.style.transform =
    "scale(0.96)";

  });

  btn.addEventListener(
  "mouseup",

  ()=>{

    btn.style.transform =
    "scale(1)";

  });

});

// DEBUG

console.log(
"Elite Ludo Loaded Successfully"
);