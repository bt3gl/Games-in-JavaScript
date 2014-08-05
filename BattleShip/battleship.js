// **************************************************************//
//              Marina Wahl - dev.mariwahl.us  - 2014            //
//                   BATTLESHIP    IN JAVASCRIPT                 //
//                                                               //
//                                                               //
// **************************************************************//



var Battleship = {

    BOARD_WIDTH  : 20,
    BOARD_HEIGTH :  20,
    NUMBER_SHIPS_3 :  2,
    NUMBER_SHIPS_2 : 3,
    SIZE_CELL : 1,
    BACKGROUND_COLOR : "#000000",
    CELL_COLOR : "#66FF66",
    cells_guesses : [],
    cells_ships : [],
    gameover : false,
    ships_left : this.NUMBER_SHIPS_3*3 + this.NUMBER_SHIPS_2*2,
    guesses_left : this.BOARD_WIDTH + this.BOARD_HEIGTH,


    clearBoard : function() {
        // Fills the board with 0S
        // (just clean the board for a new game)
        for (var i = 0; i < this.BOARD_WIDTH; i++) {
            this.cells_guesses[i] = [];
            this.cells_ships [i]= [];
            for (var j = 0; j < this.BOARD_HEIGTH; j++) {
                this.cells_guesses[i][j] = 0;
                this.cells_ships[i][j]   = 0;
            }
        }
    },



    generateShips : function(){
        // create (pseudo)-random ships
        // TODO: need to make the landscape works or
        // find a better way to be randm
        // TODO: is there a smarter way of doing this without
        // using so many ifs??? maybe case/switch?
        this.clearBoard();
        var k = this.NUMBER_SHIPS_3;
        landscape = true;
        while (k > 0){
            var ship_x = Math.floor(Math.random() * this.BOARD_WIDTH-3)
            var ship_y = Math.floor(Math.random() * this.BOARD_HEIGTH-3)
            if (this.cells_ships[ship_x][ship_y] == 0){
                if (landscape == true && this.cells_ships[ship_x+1][ship_y] == 0 && this.cells_ships[ship_x+2][ship_y] == 0){
                    this.cells_ships[ship_x][ship_y] = 3;
                    this.cells_ships[ship_x+1][ship_y] = 3;
                    this.cells_ships[ship_x+2][ship_y] = 3;
                    k--;
                    document.write(this.cells_ships[ship_x][ship_y]);
                    //landscape = not landscape;
                } else if (landscape != false && this.cells_ships[ship_x][ship_y+1] == 0&& this.cells_ships[ship_x][ship_y+2] == 0){
                    this.cells_ships[ship_x][ship_y] = 3;
                    this.cells_ships[ship_x][ship_y+1] = 3;
                    this.cells_ships[ship_x][ship_y+2] = 3;
                    k--;
                    //landscape = not landscape;
                }
            }
        }

        var k = this.NUMBER_SHIPS_2;
        while (k > 0){
            ship_x = Math.floor(Math.random() * this.BOARD_WIDTH-2)
            ship_y = Math.floor(Math.random() * this.BOARD_HEIGTH-2)
            if (this.cells_ships[ship_x][ship_y] == 0){
                 if (landscape == true && this.cells_ships[ship_x+1][ship_y] == 0){
                    this.cells_ships[ship_x][ship_y] = 2;
                    this.cells_ships[ship_x+1][ship_y] = 2;
                    k--;
                    //landscape = not landscape;
                } else if (landscape != true && this.cells_ships[ship_x][ship_y+1] == 0){
                    this.cells_ships[ship_x][ship_y] = 2;
                    this.cells_ships[ship_x][ship_y+1] = 2;
                    k--;
                    //landscape =  landscape;
                }
            }
        }
    },



    printBoardAscII: function(){
        // print the board in ascii -> for debug only
        for (var i = 0; i < this.BOARD_WIDTH; i++) {
            for (var j = 0; j < this.BOARD_HEIGTH; j++) {
                document.write(this.cells_ships[i][j]);
            }
            document.write("<br>");
        }
        document.write("<br><br>")
    },


    printBoardPixel : function(i, j) {
        // final game printing
        // todo: this function needs work,
        // write the coordinate numbers
        if (this.cells_ships[i][j] != 0) {
            shift_i = i * this.SIZE_CELL;
            shift_j = j * this.SIZE_CELL;
            context.beginPath();
            context.fillStyle = CELL_COLOR;
            context.fillRect(shift_i, shift_j, SIZE_CELL, SIZE_CELL);
            context.closePath();
            context.fill();
            return true;
        } else {
            return false;
        }
    },



    gameOverMsg: function(msg){
        // Finishes the game
        // TODO: make better messages and
        // ask if want to play again
        if (msg == "winner"){
            alert("Congrats!!!");
        }else if (msg == "loser"){
            alert("I'm sorry, you lost!");
        }
    },


    checkGuess: function(guess_x, guess_y){
        // check if the guess is good
        // TODO: if finishes the ship, should be able
        // to say "sink sunk or something"
        if (this.cells_ships[guess_x][guess_y] > 0){
            this.ships_left --;
        }
    },

    getGuess : function(){
        // get user's guest
        // TODO: any other better way than the annoying
        // prompt????
        var guess_x = prompt("Guess a x coordinate:");
        var guess_y = prompt("Now, guess a y coordinate:");
        this.guesses_left --;
        console.log(this.guesses_left);
        this.checkGuess(guess_x, guess_y);
    },


    startGame : function() {
        // the game runs here
        // TODO: is this loop ok???
        // TODO: is the gameover checking ok???
        this.generateShips();
        this.printBoardAscII();
        //this.printBoardPixel();
        while (this.gameover != true){
            this.getGuess();
            if (this.ships_left == 0){
              this.gameOverMsg("winner");
              this.gameover = true;
            } else if (this.guesses_left == 0){
                this.gameOverMsg("loser");
                this.gameover = true;
           }
        }
     }


};




// ***************************************************************//
//                                                                //
//                THE GAME STARTS HERE                            //
//                                                                //
// ***************************************************************//


// create html canvas
//var game_canvas = document.getElementById("game");
//if (game_canvas.getContext) {
//    var context = game_canvas.getContext('2d');
//}

Battleship.startGame();
