var events = require('events');
var util = require('util');
var GameDispatcher = require('flux').Dispatcher;
var _ = require('lodash');


function ConwayStore(size) {

    this.size = size;
    //Init Board with the size
    this.state = {
        board: this._initBoard(this.size),
        running: false,
        drawMode:false,
        generation: 0,
        reqFrame:false,
    }

}

/**
** Inherit EventEmitter
**/

util.inherits(ConwayStore, events.EventEmitter);



/**
** Checks Generation Time, Starts Game Loop
**/

ConwayStore.prototype.start = function() {


    if (this.state.drawMode) {
        this.state.drawMode = false
        this.emit('change', {state: this.state});
    }




    if (this.state.generation == 0) {
        //First time, randomize the board
        this.state.board = this._randomizeBoard(this.state.board, 5);

    }

    this.state.running = true;
    this.startGeneration();


};

/**
** Resets the Entire Game
**/

ConwayStore.prototype.reset = function() {


    if (this.state.running) {
        this.stop()
        this.generation = 0;
        this.start();
    }


    this.generation = 0;
    this.start();
};

/**
** Stops Game Loop
**/

ConwayStore.prototype.stop = function() {


    if (this.state.reqFrame) {

        this.state.running = false;
        console.log('before')
        var val = window.cancelAnimationFrame(this.state.reqFrame);
        console.log(this.state);
        this.emit('change', this.state);
        console.log('after')
        return true
    }
    return new Error('Shits be fucked up bro!');
};


/**
** Clears Board
**/

ConwayStore.prototype.clear = function() {

    if (this.state.running) {

        this.stop()
    }

    this.state.generation = 0;
    this.state.board = this._initBoard(this.size);
    return this.emit('change', this.state);

}

/**
** Clears Board
**/

ConwayStore.prototype.draw = function() {


    if (this.state.running) {

        this.stop()
    }

    this.state.drawMode = true
    return this.emit('change', {state: this.state});

}


ConwayStore.prototype._initBoard = function (size) {
    var arr = [];
    for (var i=0; i < size; i++) {
        arr[i] = [];
        for(j=0; j< size; j++){
                arr[i][j] =  0;
        }
    }
    //set total size
    this.totalCells = size * size
    return arr;
}



ConwayStore.prototype._randomizeBoard = function(board, num) {

    _board = _.clone(board, true);

    for (var i=0; i< board.length; i++) {
        for (var j=0; j< board.length; j++) {
            var rand = Math.floor(Math.random() * 10)
                    if (rand > num) {
                        _board[i][j] =  1;
                    }
        }
    }
    console.log('right now');
    console.log(_board);
    return _board;


}


ConwayStore.prototype.startGeneration = function() {


    var self = this;

    function __start() {
            self.state.board = self._performConwayRules(self.state.board)
            self.state.generation++;
            console.log('state', self.state);
            self.emit('change', {state: self.state});
            self.state.reqFrame = window.requestAnimationFrame(__start);
    };
    __start();
}

ConwayStore.prototype.stopGeneration = function() {

    if (this.state.reqFrame)  return window.cancelAnimationFrame(this.state.reqFrame)
    return new Error('No Request Frame Bro!');
}

ConwayStore.prototype._performConwayRules = function (currentGeneration) {

    var nextGeneration = _.clone(currentGeneration, true);

    var max = this.size - 1;
    var min = 0;

    for(var i=0; i< nextGeneration.length; i++) {

        for(var j=0; j< nextGeneration.length; j++) {
            var currentCell = currentGeneration[i][j];
            var aliveNeighboors = 0;

            /**
            Corner Cases
            **/

            //top left
            if (i == min && j == min) {
                aliveNeighboors += currentGeneration[i][j+1] ? 1 : 0
                aliveNeighboors += currentGeneration[i+1][j] ? 1 : 0
                aliveNeighboors += currentGeneration[i+1][j+1] ? 1 : 0
                nextGeneration[i][j] = this._nextGenCell(currentCell, aliveNeighboors)

            }
            //top right
            else if (i == min && j == max) {
                aliveNeighboors += currentGeneration[i][j-1] ? 1 : 0
                aliveNeighboors += currentGeneration[i+1][j] ? 1 : 0
                aliveNeighboors += currentGeneration[i+1][j-1] ? 1 : 0
                nextGeneration[i][j] = this._nextGenCell(currentCell, aliveNeighboors)
            }
            //bottom left
            else if (i == max && j == min) {
                aliveNeighboors += currentGeneration[i-1][j] ? 1 : 0
                aliveNeighboors += currentGeneration[i][j+1] ? 1 : 0
                aliveNeighboors += currentGeneration[i-1][j+1] ? 1 : 0
                nextGeneration[i][j] = this._nextGenCell(currentCell, aliveNeighboors)
            }
            //bottom right
            else if (i == max && j == max) {
                aliveNeighboors += currentGeneration[i-1][j] ? 1 : 0
                aliveNeighboors += currentGeneration[i][j-1] ? 1 : 0
                aliveNeighboors += currentGeneration[i-1][j-1] ? 1 : 0
                nextGeneration[i][j] = this._nextGenCell(currentCell, aliveNeighboors)
            }
            //top row
            else if (i == min && j != max ) {
                aliveNeighboors += currentGeneration[i][j+1] ? 1 : 0
                aliveNeighboors += currentGeneration[i][j-1] ? 1 : 0
                aliveNeighboors += currentGeneration[i+1][j] ? 1 : 0
                aliveNeighboors += currentGeneration[i+1][j+1] ? 1 : 0
                aliveNeighboors += currentGeneration[i+1][j-1] ? 1 : 0
                nextGeneration[i][j] = this._nextGenCell(currentCell, aliveNeighboors)
            }
            //bottom row
            else if (i == max && j != min) {
                aliveNeighboors += currentGeneration[i-1][j] ? 1 : 0
                aliveNeighboors += currentGeneration[i][j+1] ? 1 : 0
                aliveNeighboors += currentGeneration[i][j-1] ? 1 : 0
                aliveNeighboors += currentGeneration[i-1][j+1] ? 1 : 0
                aliveNeighboors += currentGeneration[i-1][j-1] ? 1 : 0
                nextGeneration[i][j] = this._nextGenCell(currentCell, aliveNeighboors)
            }
            //left most column
            else if (j == min && i != min && i != max ) {
                aliveNeighboors += currentGeneration[i-1][j] ? 1 : 0
                aliveNeighboors += currentGeneration[i][j+1] ? 1 : 0
                aliveNeighboors += currentGeneration[i+1][j] ? 1 : 0
                aliveNeighboors += currentGeneration[i-1][j+1] ? 1 : 0
                aliveNeighboors += currentGeneration[i+1][j+1] ? 1 : 0
                nextGeneration[i][j] = this._nextGenCell(currentCell, aliveNeighboors)

            }
            //left right column
            else if (j == max && i != max && i != max) {
                aliveNeighboors += currentGeneration[i-1][j] ? 1 : 0
                aliveNeighboors += currentGeneration[i][j-1] ? 1 : 0
                aliveNeighboors += currentGeneration[i+1][j] ? 1 : 0
                aliveNeighboors += currentGeneration[i-1][j-1] ? 1 : 0
                aliveNeighboors += currentGeneration[i+1][j-1] ? 1 : 0
                nextGeneration[i][j] = this._nextGenCell(currentCell, aliveNeighboors)

            }
            //the rest of the other cells
            else {
                aliveNeighboors += currentGeneration[i-1][j] ? 1 : 0
                aliveNeighboors += currentGeneration[i][j-1] ? 1 : 0
                aliveNeighboors += currentGeneration[i+1][j] ? 1 : 0
                aliveNeighboors += currentGeneration[i][j+1] ? 1 : 0
                aliveNeighboors += currentGeneration[i-1][j-1] ? 1 : 0
                aliveNeighboors += currentGeneration[i+1][j-1] ? 1 : 0
                aliveNeighboors += currentGeneration[i-1][j+1] ? 1 : 0
                aliveNeighboors += currentGeneration[i+1][j+1] ? 1 : 0
                nextGeneration[i][j] = this._nextGenCell(currentCell, aliveNeighboors)
            }

        }
    }

    return nextGeneration;

}

/**
**
**/

ConwayStore.prototype._nextGenCell = function(currentCell, aliveNeighboors) {

    //if alive
    if(currentCell) {
        if (aliveNeighboors < 2) return 0
        if (aliveNeighboors > 3) return 0
        if (aliveNeighboors >= 2 && aliveNeighboors <= 3) return 1
    } else {
         if (aliveNeighboors == 3) return 1

    }

}

/**
* Return Conway Store
**/

module.exports = function(size, GameDispatcher) {

    //init store
    var store = new ConwayStore(size)


    //define register callback

    function handlePayLoad(payload) {
        var action = payload.actionType;

        switch(action) {

            case 'START':
                store.start()
                break;

            case 'STOP':
                store.stop();
                break;

            case 'CLEAR':
                store.clear();
                break;

            case 'RESET':
                store.reset();
                break;

            case 'DRAW':
                store.draw();
                break;
        }

    }

    GameDispatcher.register(handlePayLoad);
    return store

}
