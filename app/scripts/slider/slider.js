/** @jsx React.DOM */

var React = require('react');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;


var Slider = React.createClass({

    getInitialState: function() {

        return {squares: 5}

    },


    createSqaures: function(counter) {

        var squares = [];
        for (var i=0; i<=counter; i++) {

            var temp = (<Square key={i}/>)
            squares.push(temp);
        };

        return squares
    },

    handleChange: function(e) {

        this.setState({squares: e.target.value});
    },


    render: function() {
      var squares = this.createSqaures(this.state.squares)
      console.log(this.state.squares)
        return (
            <div>
                <h3> Slider </h3>
                <hr />
                <input type="range"
                    min={this.props.min}
                    max={this.props.max}
                    onChange={this.handleChange} />
                    <div className="square-container">
                        <CSSTransitionGroup transitionName="square">
                            {squares}
                        </CSSTransitionGroup>
                    </div>
            </div>
            )
    }

});


var Square = React.createClass({

    getInitialState: function() {

        return {clicked: false};

    },

    handleClick: function(e) {

        this.setState({clicked: true});

    },

    componentwillunmount: function() {
        console.log('eat my cheese');

    },

    render: function() {
        return (<div className="square"
                    onClick={this.handleClick}>
                </div>)
    }

});

module.exports = Slider;
