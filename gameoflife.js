// **************************************************************//
//              Marina Wahl - dev.mariwahl.us  - 2014            //
//                    GAME OF LIFE IN JAVASCRIPT                 //
//                                                               //
//    Rules:                                                     //
// 1. Start with a random configuration of dead or alive cells   //
// 2. Loneliness: any cell with less than 2 neighbors will die   //
// 3. Overcrowd: any cell with more than 3 neighbors will die    //
// 4. Optimized: any cell with 3 neighbors will grow             //
//                                                               //
// **************************************************************//


// ***************************************************************//
//                                                                //
//                       FUNCTIONS                                //
//                                                                //
// ***************************************************************//



function clearBoard() {
  // Fills the board with 0s (dead)
  for (var i=0; i < BOARD_WIDTH+1; i++){
    this_generation_cells[i] = [];
    last_generation_cells[i] = [];
    for (var j=0; j < BOARD_HEIGTH+1; j++){
      this_generation_cells[i][j] = 0;
      last_generation_cells[i][j] = 0;
    }
  }
}



function printBoard(){
// Print the board in the screen
  for (var i=1; i < BOARD_WIDTH; i++){
    for (var j=1; j < BOARD_HEIGTH; j++){
      shift_i = i*SIZE_CELL;
      shift_j = j*SIZE_CELL;
      context.beginPath();
      if (this_generation_cells[i][j] == 1){
        context.fillStyle = CELL_COLOR;
        context.fillRect(shift_i,shift_j,SIZE_CELL,SIZE_CELL);
      } else {
        context.fillStyle = BACKGROUND_COLOR;
        context.fillRect(shift_i,shift_j,SIZE_CELL,SIZE_CELL);
      }
    }
    context.closePath();
    context.fill();
  }
}




function startFirstGeneration(){
  clearBoard();
  // (Pseudo-)Randomly start the first generation with dead and
  // alive cells
  for (var i=1; i < BOARD_WIDTH; i++){
    for (var j=1; j < BOARD_HEIGTH; j++){
      var alive_or_dead = Math.floor( Math.random()*2) ;
      this_generation_cells[i][j] = alive_or_dead;
    }
  }
}




function startNewGeneration(){
  // apply the rules for the next generation
  applyRules();
   // make it permanent
  for (var i=0; i < BOARD_WIDTH; i++){
    for (var j=0; j < BOARD_HEIGTH; j++){
      this_generation_cells[i][j] = last_generation_cells[i][j];
      last_generation_cells[i][j] = 0;
    }
  }
}




function applyRules(){
  // Apply the Game of Life rules, checking all the 8
  // neighbors for each cell
  for (var i=1; i < BOARD_WIDTH; i++){
    for (var j=1; j < BOARD_HEIGTH; j++){
      var count = this_generation_cells[i][j-1];
      count += this_generation_cells[i-1][j];
      count += this_generation_cells[i][j+1];
      count += this_generation_cells[i+1][j];
      count += this_generation_cells[i+1][j+1];
      count += this_generation_cells[i-1][j-1];
      count += this_generation_cells[i+1][j-1];
      count += this_generation_cells[i-1][j+1];
      if (count < 2){
        last_generation_cells[i][j] = 0;
      } else  if (count == 2){
        last_generation_cells[i][j] = this_generation_cells[i][j];
      } else if (count == 3){
        last_generation_cells[i][j] = 1;
      } else if (count > 3){
        last_generation_cells[i][j] = 0;
      }
    }
  }
}




// ***************************************************************//
//                                                                //
//                GLOBAL VARIABLES                                //
//                                                                //
// ***************************************************************//

// board size + padding
var BOARD_WIDTH = 800;
var BOARD_HEIGTH = 400;

// how will it look in the screen
var SIZE_CELL = 5;
var BACKGROUND_COLOR = "#FFFFFF";
var CELL_COLOR = "#009933";
var TIME = 60;

// this generation_cells allow padding around the board, so we can
// safely verify before/after cells
var this_generation_cells = [];
var last_generation_cells = [];




// ***************************************************************//
//                                                                //
//                THE GAME STARTS HERE                            //
//                                                                //
// ***************************************************************//

startFirstGeneration();

// create html canvas
var a_canvas = document.getElementById("a");
if(a_canvas.getContext) {
  var context = a_canvas.getContext('2d');
}


function startGame(){
   setInterval(function(){
      startNewGeneration();
      printBoard();
    },
  TIME);
}

// Play the Game!!!!
startGame();
