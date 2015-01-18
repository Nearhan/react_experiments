var React = require('react');
var Addons = require('react/addons');
var moment = require('moment');

var Clock = React.createClass({

    getInitialState: function() {
        var self = this;

        var base = moment();
        var h = base.format('h');
        var m = base.format('m');
        var s = base.format('s');

        setInterval(function() {

                var base = moment()
                var h = base.format('h');
                var m = base.format('m');
                var s = base.format('s');
                self.setState({h:h, m:m, s:s});

            }, 1000);

        return {h:h, m:m, s:s}
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        // Some logic !
        return true
    },

    render: function() {
        return (
            <div>
                <h3> Worlds Greatest Clock </h3>
                <hr />
                <Time time={this.state.h} /> : <Time time={this.state.m} /> : <Time time={this.state.s} />
            </div>
            )
    }
});


var Time = React.createClass({

    style: {
        "display": "inline",
        "color": "red"
    },

    componentDidMount: function() {
        console.log('--> componentDidMont');
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        if(this.props.time == nextProps.time) return false
        return true

    },

    render: function() {
        return <h2 style={this.style}>{this.props.time}</h2>
    }

});

module.exports = Clock;
