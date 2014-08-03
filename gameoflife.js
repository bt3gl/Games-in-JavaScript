// board size + padding
var BOARD_WIDTH = 100;
var BOARD_HEIGTH = 100;

// this generation_cells allow padding around the board, so we can
// safely verify before/after cells
var this_generation_cells = [];
var last_generation_cells = [];



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
// TODO: make it blocks!
  for (var i=1; i < BOARD_WIDTH; i++){
    for (var j=1; j < BOARD_HEIGTH; j++){
      //console.log(cells[i][j] + "  " );
      if (this_generation_cells[i][j] == 1){
        document.write("#" + " ");
      } else {
        document.write("_" + " ");
      }
    }
    document.write('<br>');
    //console.log('\n');
  }
  document.write('<br><br>');
}




function startFirstGeneration(){
  clearBoard();
  // (Pseudo-)Randomly start the first generation
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
  // Apply the Game of Life rules
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



// Play the Game!
startFirstGeneration();
printBoard();
var i = 0;
while (i < 5000){
  startNewGeneration();
  if (i%20 == 0){
    printBoard();
  }
  i += 1;
}









