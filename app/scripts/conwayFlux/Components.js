var React = require('react');
var Dispatcher = require('flux').Dispatcher;
var GameDispatcher = new Dispatcher();
var _ = require('lodash');



var GameActions = require('./Actions')(GameDispatcher);

var Conway = React.createClass({

    getInitialState: function() {

        var self = this;
        //State is stored in the store!
        var ConwayStore = require('./ConwayStore')(this.props.size, GameDispatcher);


        //init conayStore

        ConwayStore.on('change', function() {

            self.setState(ConwayStore.state);

        });


        return ConwayStore.state;
    },

    render: function() {

        return (
            <div>
                <Controls running={this.state.running} draw={this.state.drawMode} />
                <Generator gen={this.state.generation} />
                <Board cells={this.state.board} draw={this.state.drawMode} />
            </div>
            )
    }

});

var Board = React.createClass({

    mapCells: function(arr) {
        var mappedCells = _.clone(arr, true);
        var id = 0
        for(var i=0; i< mappedCells.length; i++) {
            for(var j=0; j< mappedCells.length; j++) {
                var currentCell = mappedCells[i][j];
                if (currentCell == 1) {
                   mappedCells[i][j] = (<Cell active='true' key={id} _id={id} drawMode={this.props.draw}/>);
                   id++;

                } else {
                    mappedCells[i][j] = (<Cell active='false' key={id} _id={id} drawMode={this.props.draw} />);
                    id++;
                }
            }

        }
        return mappedCells;
    },

    render: function() {
        //map cells
        var cells = this.mapCells(this.props.cells);

        return (
            <div>
                {cells}
            </div>
            )
    }

});


var Cell = React.createClass({



    handleClick: function(e) {


       if (this.props.active == 'true') {

            this.props.active = 'false';
            console.log(this.props);
            this.forceUpdate()
            return true

        }
        this.props.active = 'true';
        console.log(this.props);
        this.forceUpdate()
        return true

    },


    render: function() {

        var e = ''
        if (this.props.drawMode) {

            e = this.handleClick;

        }

        var classes = 'cell ' + ((this.props.active == 'true') ? 'alive' : 'dead')



        return (<div className={classes} onMouseOver={e}></div>)
    }

});



var Controls = React.createClass({


    //this component has state

    getInitialState: function() {

        return {


        }
    },

    render: function() {
       return (
                <div>
                    <ToggleButton running={this.props.running}/>
                    <ResetButton />
                    <ClearButton />
                    <DrawButton draw={this.props.drawMode} />
                </div>
            )
    }
});



var ToggleButton = React.createClass({

    handleClick: function(e) {

        if (this.props.running) {
            //Actions Come in here

            GameActions.stop(e);

        } else {

            GameActions.start(e);

        }
    },

    render: function() {

        var status = this.props.running? 'stop': 'start';
        return (<Button do={this.handleClick} name={status} />)
    }
});

var ResetButton = React.createClass({

    handleClick: function (e) {
        GameActions.reset(e);

    },

    render: function() {
        return (<Button do={this.handleClick} name='reset' />)
    }


});


var ClearButton = React.createClass({

    handleClick: function (e) {
        GameActions.clear(e);

    },

    render: function() {
        return (<Button do={this.handleClick} name='clear' />)
    }

});


var DrawButton = React.createClass({

    handleClick: function (e) {
        GameActions.draw(e)

    },

    render: function() {
        return (<Button do={this.handleClick} name='draw' />)
    }

});


var Button = React.createClass({

    render: function() {

        return (
            <button onClick={this.props.do}> {this.props.name} </button>
            )
    }


})

var Generator = React.createClass({
    render: function() {
        return ( <h1> {this.props.gen} </h1>)
    }
})

module.exports = Conway;
