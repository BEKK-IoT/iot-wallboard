var React = require('react');
var firebase = require('./firebase/firebase.js');
var EventGraph = require('./Smoothie/eventgraph.js');

module.exports = React.createClass({

    componentDidMount: function() {
        var that = this;
        firebase.child("devices/sensors").on("value", function(snapshot) {
            var val = snapshot.val();
            that.setState({light : val.light});
        });
        EventGraph.init(this.refs.container.getDOMNode());
        this.setState({width : React.findDOMNode(this).offsetWidth});
    },

    addEvent : function(){

    },

    render: function() {
            console.log(this.state);

            return (
            <div>
            <canvas width={ this.state.width} className="container" ref="container"></canvas>
            </div>
        );
    }

});