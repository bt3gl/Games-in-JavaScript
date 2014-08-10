
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

var GameOfLife = function(){
    this.TIME = 1 / 200;
    this.board_cells = [];
    this.BOARD_WIDTH = 600;
    this.BOARD_HEIGTH = 300;
    this.SIZE_CELL = 1;
}


GameOfLife.prototype.clearBoard = function() {
    for (var i = 0; i < this.BOARD_WIDTH + 1; i++) {
        this.board_cells[i] = [];
        for (var j = 0; j < this.BOARD_HEIGTH + 1; j++) {
            this.board_cells[i][j] = 0;
        }
    }
}


GameOfLife.prototype.startFirstGeneration = function() {
    this.clearBoard();
    for (var i = 1; i < this.BOARD_WIDTH; i++) {
        for (var j = 1; j < this.BOARD_HEIGTH; j++) {
            var alive_or_dead = Math.floor(Math.random() * 2);
            this.board_cells[i][j] = alive_or_dead;
        }
    }
}



GameOfLife.prototype.startNextGeneration = function() {
    var this_generation_cells = []
    for (var i = 1; i < this.BOARD_WIDTH; i++) {
        this_generation_cells[i] = []
        for (var j = 1; j < this.BOARD_HEIGTH; j++) {
            var count = this.board_cells[i][j - 1];
            count += this.board_cells[i - 1][j];
            count += this.board_cells[i][j + 1];
            count += this.board_cells[i + 1][j];
            count += this.board_cells[i + 1][j + 1];
            count += this.board_cells[i - 1][j - 1];
            count += this.board_cells[i + 1][j - 1];
            count += this.board_cells[i - 1][j + 1];
            if  (count === 2) {
                this_generation_cells[i][j] = this.board_cells[i][j];
            } else if (count === 3) {
                this_generation_cells[i][j] = 1;
            } else {
                this_generation_cells[i][j] = 0;
            }
        }
    }
    // now update board_cells
    for (var i = 1; i < this.BOARD_WIDTH; i++) {
        for (var j = 1; j < this.BOARD_HEIGTH; j++) {
            this.board_cells[i][j] = this_generation_cells[i][j];
        }
    }
    console.log(this_generation_cells[1]);
    return this_generation_cells;
}



GameOfLife.prototype.printBoard = function(this_generation_cells) {
    for (var i = 1; i < this.BOARD_WIDTH; i++) {
        for (var j = 1; j < this.BOARD_HEIGTH; j++) {
            shift_i = i * this.SIZE_CELL;
            shift_j = j * this.SIZE_CELL;
            if (this_generation_cells[i][j] === 1) {
                context.fillStyle = this.CELL_COLOR;
                context.fillRect(shift_i, shift_j, this.SIZE_CELL, this.SIZE_CELL);
            } else {

                context.fillStyle = this.BACKGROUND_COLOR;
                context.fillRect(shift_i, shift_j, this.SIZE_CELL, this.SIZE_CELL);
            }
        }
    }
}



function startGraphicGame() {
    BACKGROUND_COLOR = "#000000";
    CELL_COLOR = "#66FF66";
    game_canvas = document.getElementById("game");
    context = game_canvas.getContext('2d');

    var newGame = new GameOfLife();
    newGame.startFirstGeneration();
    setInterval(function() {
            var this_generation_cells = newGame.startNextGeneration();
            newGame.printBoard(this_generation_cells);
        }, newGame.TIME);
}

