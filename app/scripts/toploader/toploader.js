/******************************

    The output of this compoent aims to be a Loader for game types.
    You can use this component like so.
    There are

    <FrontLoader contolls={controlls} cart={conway} />

********************************/





/* ===================== Load Scripts ====================
========================================================*/

var React = require('react');
var Controls = require('controls');
var Cart = require('cart');



var FrontLoader = React.createClass({


    render: function() {


        return (

            <div>
                <Controls{this.props.controlls} game={this.props.cart} />
            </div>

            )
    }
})





var Controls = React.createClass({


    //this component has state

    getInitialState: function() {

        return {


        }
    },






    render: function() {



        return (

                <div>
                    <ToggleButton />
                    <Button do={this.props.game} />
                    <Button do={this.props.game} />
                    <Button do={this.props.game} />

                </div>

    }


});



var ToggleButton = React.createClass({


handleClick: function(e) {

    if (this.props.on) {
        this.game.stop(e);

    } else {

        this.game.start(e)
    }
}


render: function() {



}

var ResetButton = React.createClass({


    handleClick: function (e) {

        this.props.game.reset(e);


    }

    render: function() {

        this.game.stop();
        this.game.



}


});

var DrawButton = React.createClass({


    handleClick: function (e) {

        this.props.game.reset(e);


    }

    render: function() {

        this.game.stop();
        this.game.draw();
        this.props.action();

}


});


