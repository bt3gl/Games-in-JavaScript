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
    ships_left : this.NUMBER_SHIPS_3 + this.NUMBER_SHIPS_2,
    guesses_left : this.BOARD_WIDTH + this.BOARD_HEIGTH,


    clearBoard : function() {
        // Fills the board with 0S
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



    printBoardEmpty : function(){
        for (var i = 0; i < this.BOARD_WIDTH; i++) {
            for (var j = 0; j < this.BOARD_HEIGTH; j++) {
                document.write(this.cells_ships[i][j]);
            }
            document.write("<br>");
        }
        document.write("<br><br>")
    },



    gameOverMsg: function(msg){
        if (msg == "winner"){
            document.write("Congrats!!!");
        }else if (msg == "loser"){
            document.write("I'm sorry, you lost!");
        }
    },


    getGuess : function(){
       var guess = prompt("Say some coordinate");
       if g


    },


    startGame : function() {
        this.clearBoard();
        this.generateShips();
        this.printBoardEmpty();
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
