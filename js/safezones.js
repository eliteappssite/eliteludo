// =========================
// ELITE LUDO SAFE ZONES SYSTEM
// =========================

// SAFE ZONE POSITIONS

const safeZonePositions = [

  0,   // RED START
  8,

  13,  // GREEN START
  21,

  26,  // YELLOW START
  34,

  39,  // BLUE START
  47

];

// SAFE ZONE BOARD CELLS

const safeZoneBoardCells = [

  91,
  23,
  37,
  111,
  133,
  201,
  187,
  113

];

// INITIALIZE SAFE ZONES

function initializeSafeZones(){

  highlightSafeZones();

  console.log(
  "Safe Zones Initialized"
  );

}

// SAFE POSITION CHECK

function isSafeZone(
position
){

  return safeZonePositions
  .includes(position);

}

// SAFE BOARD CELL CHECK

function isSafeBoardCell(
cellId
){

  return safeZoneBoardCells
  .includes(cellId);

}

// HIGHLIGHT SAFE ZONES

function highlightSafeZones(){

  safeZoneBoardCells
  .forEach((cellId)=>{

    const cell =
    document.getElementById(

      "cell-" + cellId

    );

    if(cell){

      cell.classList.add(
      "safeZone"
      );

      // STAR ICON

      if(

        !cell.querySelector(
        ".safeStar"
        )

      ){

        const star =
        document.createElement(
        "div"
        );

        star.classList.add(
        "safeStar"
        );

        star.innerHTML = "★";

        cell.appendChild(star);

      }

    }

  });

}

// SAFE ZONE PROTECTION

function canTokenBeKilled(
position
){

  // SAFE POSITION

  if(

    isSafeZone(position)

  ){

    return false;

  }

  return true;

}

// SAFE TOKEN CHECK

function isTokenProtected(
color,
position
){

  // SAFE ZONE

  if(

    isSafeZone(position)

  ){

    return true;

  }

  // STACK PROTECTION

  const stackCount =

  getTokenStackCount(
    color,
    position
  );

  if(stackCount >= 2){

    return true;

  }

  return false;

}

// TOKEN STACK COUNT

function getTokenStackCount(
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

// SAFE ENTRY CHECK

function isSafeEntryPoint(
color,
position
){

  const playerStart = {

    red:0,
    green:13,
    yellow:26,
    blue:39

  };

  return (

    playerStart[color]
    ===
    position

  );

}

// SAFE ZONE EFFECT

function playSafeZoneEffect(
cellElement
){

  if(!cellElement){

    return;

  }

  cellElement.classList.add(
  "safeGlow"
  );

  setTimeout(()=>{

    cellElement.classList.remove(
    "safeGlow"
    );

  },500);

}

// SAFE MOVE CHECK

function canMoveIntoSafeZone(
position
){

  return isSafeZone(
  position
  );

}

// GET ALL SAFE POSITIONS

function getAllSafeZones(){

  return safeZonePositions;

}

// GET SAFE BOARD CELLS

function getSafeBoardCells(){

  return safeZoneBoardCells;

}

// REMOVE SAFE HIGHLIGHTS

function clearSafeZoneEffects(){

  document
  .querySelectorAll(
  ".safeGlow"
  )

  .forEach((cell)=>{

    cell.classList.remove(
    "safeGlow"
    );

  });

}

// RESET SAFE ZONES

function resetSafeZones(){

  clearSafeZoneEffects();

  initializeSafeZones();

}

// AUTO INIT

window.addEventListener(
"load",

()=>{

  initializeSafeZones();

});

// DEBUG

console.log(
"SafeZones.js Loaded"
);