/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');

//create conways game of life




var Conway = React.createClass({

    getInitialState: function() {
        return {generation: 0}
    },

    createRandomArray: function(num) {
        var arr = [];
        for (var i=0; i < num; i++) {
            arr[i] = [];
            for(j=0; j< num; j++){
                var rand = Math.floor(Math.random() * 10)
                if (rand > 3) {
                    arr[i][j] =  1;
                } else {
                    arr[i][j] =  0;
                }
            }
        }
        return arr;
    },


    createGenerationZero: function() {
       var arr = this.createRandomArray(this.props.size);
       this.currentGeneration = arr;
       this.cells = this.mapCells(arr);

    },

    componentWillMount: function() {
        this.createGenerationZero()


    },

    componentDidMount: function() {
        //will create request cycle
        this.generate();

    },

    mapCells: function(arr) {
        var mappedCells = _.clone(arr, true);
        for(var i=0; i< mappedCells.length; i++) {
            for(var j=0; j< mappedCells.length; j++) {
                var currentCell = mappedCells[i][j];
                if (currentCell == 1) {
                   mappedCells[i][j] = (<Cell active='true'/>);

                } else {
                    mappedCells[i][j] = (<Cell active='false'/>);
                }
            }

        }
        return mappedCells;
    },

    generate: function() {
        var fps = 5;
        var self = this;

        //set some state
        setTimeout(function(){
            self.createNextGeneration();
            var x = self.state.generation += 1
            self.setState({generation: x});
            window.requestAnimationFrame(self.generate);
        }, 1000 / fps);
    },

    _performConwayRules: function () {

        var nextGeneration = _.clone(this.currentGeneration, true);

        var max = this.props.size - 1;
        var min = 0;

        for(var i=0; i< nextGeneration.length; i++) {

            for(var j=0; j< nextGeneration.length; j++) {
                var currentCell = this.currentGeneration[i][j];
                var aliveNeighboors = 0;

                /**
                Corner Cases
                **/

                //top left
                if (i == min && j == min) {
                    aliveNeighboors += this.currentGeneration[i][j+1] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i+1][j] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i+1][j+1] ? 1 : 0
                    nextGeneration[i][j] = this._nextGenCell(currentCell, aliveNeighboors)

                }
                //top right
                else if (i == min && j == max) {
                    aliveNeighboors += this.currentGeneration[i][j-1] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i+1][j] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i+1][j-1] ? 1 : 0
                    nextGeneration[i][j] = this._nextGenCell(currentCell, aliveNeighboors)
                }
                //bottom left
                else if (i == max && j == min) {
                    aliveNeighboors += this.currentGeneration[i-1][j] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i][j+1] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i-1][j+1] ? 1 : 0
                    nextGeneration[i][j] = this._nextGenCell(currentCell, aliveNeighboors)
                }
                //bottom right
                else if (i == max && j == max) {
                    aliveNeighboors += this.currentGeneration[i-1][j] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i][j-1] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i-1][j-1] ? 1 : 0
                    nextGeneration[i][j] = this._nextGenCell(currentCell, aliveNeighboors)
                }
                //top row
                else if (i == min && j != max ) {
                    aliveNeighboors += this.currentGeneration[i][j+1] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i][j-1] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i+1][j] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i+1][j+1] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i+1][j-1] ? 1 : 0
                    nextGeneration[i][j] = this._nextGenCell(currentCell, aliveNeighboors)
                }
                //bottom row
                else if (i == max && j != min) {
                    aliveNeighboors += this.currentGeneration[i-1][j] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i][j+1] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i][j-1] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i-1][j+1] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i-1][j-1] ? 1 : 0
                    nextGeneration[i][j] = this._nextGenCell(currentCell, aliveNeighboors)
                }
                //left most column
                else if (j == min && i != min && i != max ) {
                    aliveNeighboors += this.currentGeneration[i-1][j] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i][j+1] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i+1][j] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i-1][j+1] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i+1][j+1] ? 1 : 0
                    nextGeneration[i][j] = this._nextGenCell(currentCell, aliveNeighboors)

                }
                //left right column
                else if (j == max && i != max && i != max) {
                    aliveNeighboors += this.currentGeneration[i-1][j] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i][j-1] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i+1][j] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i-1][j-1] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i+1][j-1] ? 1 : 0
                    nextGeneration[i][j] = this._nextGenCell(currentCell, aliveNeighboors)

                }
                //the rest of the other cells
                else {
                    aliveNeighboors += this.currentGeneration[i-1][j] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i][j-1] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i+1][j] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i][j+1] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i-1][j-1] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i+1][j-1] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i-1][j+1] ? 1 : 0
                    aliveNeighboors += this.currentGeneration[i+1][j+1] ? 1 : 0
                    nextGeneration[i][j] = this._nextGenCell(currentCell, aliveNeighboors)
                }

            }
        }

        return nextGeneration;


    },


    _nextGenCell: function(currentCell, aliveNeighboors) {
        //if alive
        if(currentCell) {
            if (aliveNeighboors < 2) return 0
            if (aliveNeighboors > 3) return 0
            if (aliveNeighboors >= 2 && aliveNeighboors <= 3) return 1
        } else {
             if (aliveNeighboors == 3) return 1

        }

    },


    createNextGeneration: function() {
        //perform the algorithim for conways
        var nextGeneration = this._performConwayRules();
        this.currentGeneration = nextGeneration;
        //set new cells
        this.cells = this.mapCells(nextGeneration);

    },

    render: function() {


        return (
                <div>
                <h1> Generation: {this.state.generation} </h1>
                    <div className="conway">
                     {this.cells}
                    </div>
                </div>

                )

    }
});


var Cell = React.createClass({


    render: function() {
        var classes = 'cell ' + ((this.props.active == 'true') ? 'alive' : 'dead')

        return (<div className={classes}></div>)
    }

});


module.exports = Conway;