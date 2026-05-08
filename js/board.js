// =========================
// ELITE LUDO BOARD SYSTEM
// =========================

const boardElement =
document.getElementById(
"ludoBoard"
);

// BOARD SIZE

const BOARD_SIZE = 15;

// BOARD ARRAY

let boardCells = [];

// CREATE BOARD

function createBoard(){

  if(!boardElement){

    console.error(
    "Board element not found"
    );

    return;

  }

  boardElement.innerHTML = "";

  boardCells = [];

  for(let row = 0;
      row < BOARD_SIZE;
      row++){

    for(let col = 0;
        col < BOARD_SIZE;
        col++){

      const cell =
      document.createElement(
      "div"
      );

      cell.classList.add(
      "boardCell"
      );

      cell.dataset.row = row;
      cell.dataset.col = col;

      // CELL TYPE

      const type =
      getCellType(row,col);

      cell.classList.add(type);

      // SAFE ZONES

      if(isSafeZone(row,col)){

        cell.classList.add(
        "safeZone"
        );

        cell.innerHTML = "★";

      }

      // CENTER

      if(isCenter(row,col)){

        cell.classList.add(
        "centerCell"
        );

      }

      boardElement.appendChild(
      cell
      );

      boardCells.push(cell);

    }

  }

  console.log(
  "Ludo Board Created"
  );

}

// GET CELL TYPE

function getCellType(row,col){

  // RED HOME

  if(row <= 5 && col <= 5){

    return "redHome";

  }

  // GREEN HOME

  if(row <= 5 && col >= 9){

    return "greenHome";

  }

  // YELLOW HOME

  if(row >= 9 && col <= 5){

    return "yellowHome";

  }

  // BLUE HOME

  if(row >= 9 && col >= 9){

    return "blueHome";

  }

  // PATH

  if(

    row === 6 ||

    row === 8 ||

    col === 6 ||

    col === 8 ||

    (row >= 6 &&
     row <= 8) ||

    (col >= 6 &&
     col <= 8)

  ){

    return "pathCell";

  }

  return "emptyCell";

}

// SAFE ZONES

function isSafeZone(row,col){

  const safeZones = [

    [6,1],
    [1,8],
    [8,13],
    [13,6],

    [2,6],
    [6,12],
    [12,8],
    [8,2]

  ];

  return safeZones.some(

    ([r,c]) =>

    r === row &&
    c === col

  );

}

// CENTER CELL

function isCenter(row,col){

  return (
    row >= 6 &&
    row <= 8 &&
    col >= 6 &&
    col <= 8
  );

}

// GET CELL BY POSITION

function getBoardCell(row,col){

  return boardCells.find(

    cell =>

    parseInt(cell.dataset.row)
    === row

    &&

    parseInt(cell.dataset.col)
    === col

  );

}

// CLEAR BOARD

function clearBoard(){

  boardCells.forEach((cell)=>{

    cell.innerHTML = "";

  });

}

// RESET BOARD

function resetBoard(){

  clearBoard();

  createBoard();

  console.log(
  "Board Reset"
  );

}

// INITIALIZE

window.addEventListener(
"load",

()=>{

  createBoard();

});

// DEBUG

console.log(
"Board.js Loaded"
);