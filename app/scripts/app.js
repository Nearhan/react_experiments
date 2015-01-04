/** @jsx React.DOM */

var React = require('react'),
    Clock = require('./clock/clock');
    Slider = require('./slider/slider');
    ConwayFlux = require('./conwayFlux/Components');




var Projects = React.createClass({


    render: function () {

        return (
            <div>
                <ProjectContainer component={<Clock />}/>
                <ProjectContainer component={<Slider min="0" max="9"/>} />
                <ProjectContainer component={<ConwayFlux size="70" />} />
            </div>
            )
    }

});


var ProjectContainer = React.createClass({

    render: function() {
        return (
            <div className="container">
            {this.props.component}
            </div>
            )
    }
})

React.render(<Projects />, document.getElementById('projects'));
