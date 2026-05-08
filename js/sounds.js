// =========================
// ELITE LUDO SOUNDS SYSTEM
// =========================

// SOUND PATHS

const SOUND_PATHS = {

  dice:
  "assets/sounds/dice.mp3",

  move:
  "assets/sounds/move.mp3",

  kill:
  "assets/sounds/kill.mp3",

  win:
  "assets/sounds/win.mp3",

  button:
  "assets/sounds/click.mp3",

  home:
  "assets/sounds/home.mp3",

  start:
  "assets/sounds/start.mp3"

};

// SOUND OBJECTS

const gameSounds = {

  dice:new Audio(
    SOUND_PATHS.dice
  ),

  move:new Audio(
    SOUND_PATHS.move
  ),

  kill:new Audio(
    SOUND_PATHS.kill
  ),

  win:new Audio(
    SOUND_PATHS.win
  ),

  button:new Audio(
    SOUND_PATHS.button
  ),

  home:new Audio(
    SOUND_PATHS.home
  ),

  start:new Audio(
    SOUND_PATHS.start
  )

};

// MASTER VOLUME

let masterVolume = 1;

// SOUND ENABLE

let soundEnabled = true;

// INITIALIZE SOUNDS

function initializeSounds(){

  Object.values(gameSounds)
  .forEach((sound)=>{

    sound.volume =
    masterVolume;

  });

  console.log(
  "Sounds Initialized"
  );

}

// PLAY DICE SOUND

function playDiceSound(){

  playSound("dice");

}

// PLAY MOVE SOUND

function playMoveSound(){

  playSound("move");

}

// PLAY KILL SOUND

function playKillSound(){

  playSound("kill");

}

// PLAY WIN SOUND

function playWinSound(){

  playSound("win");

}

// PLAY BUTTON SOUND

function playButtonSound(){

  playSound("button");

}

// PLAY HOME SOUND

function playHomeSound(){

  playSound("home");

}

// PLAY START SOUND

function playStartSound(){

  playSound("start");

}

// MAIN SOUND FUNCTION

function playSound(
soundName
){

  // DISABLED

  if(!soundEnabled){

    return;

  }

  const sound =
  gameSounds[soundName];

  if(!sound){

    console.warn(

      "Sound Missing:",

      soundName

    );

    return;

  }

  try{

    sound.currentTime = 0;

    sound.play();

  }

  catch(err){

    console.log(

      "Audio Blocked:",

      soundName

    );

  }

}

// STOP SOUND

function stopSound(
soundName
){

  const sound =
  gameSounds[soundName];

  if(sound){

    sound.pause();

    sound.currentTime = 0;

  }

}

// STOP ALL SOUNDS

function stopAllSounds(){

  Object.values(gameSounds)
  .forEach((sound)=>{

    sound.pause();

    sound.currentTime = 0;

  });

}

// SET VOLUME

function setMasterVolume(
volume
){

  masterVolume = volume;

  Object.values(gameSounds)
  .forEach((sound)=>{

    sound.volume =
    masterVolume;

  });

}

// TOGGLE SOUND

function toggleSound(){

  soundEnabled =
  !soundEnabled;

  updateSoundButton();

  console.log(

    "Sound:",

    soundEnabled
    ? "ON"
    : "OFF"

  );

}

// UPDATE SOUND BUTTON

function updateSoundButton(){

  const soundBtn =
  document.getElementById(
  "soundToggleBtn"
  );

  if(soundBtn){

    soundBtn.innerHTML =

      soundEnabled
      ? "🔊"
      : "🔇";

  }

}

// BACKGROUND MUSIC

let backgroundMusic =
new Audio(
"assets/sounds/music.mp3"
);

// LOOP MUSIC

backgroundMusic.loop = true;

// MUSIC VOLUME

backgroundMusic.volume = 0.3;

// START MUSIC

function startBackgroundMusic(){

  if(!soundEnabled){

    return;

  }

  try{

    backgroundMusic.play();

  }

  catch(err){

    console.log(
    "Music blocked"
    );

  }

}

// STOP MUSIC

function stopBackgroundMusic(){

  backgroundMusic.pause();

  backgroundMusic.currentTime = 0;

}

// PAUSE MUSIC

function pauseBackgroundMusic(){

  backgroundMusic.pause();

}

// RESUME MUSIC

function resumeBackgroundMusic(){

  if(soundEnabled){

    backgroundMusic.play();

  }

}

// BUTTON CLICK AUDIO

function attachButtonSounds(){

  const buttons =

  document.querySelectorAll(
  "button"
  );

  buttons.forEach((btn)=>{

    btn.addEventListener(
    "click",

    ()=>{

      playButtonSound();

    });

  });

}

// AUTO INIT

window.addEventListener(
"load",

()=>{

  initializeSounds();

  attachButtonSounds();

});

// DEBUG

console.log(
"Sounds.js Loaded"
);