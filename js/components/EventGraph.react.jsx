var React = require('react');
var firebase = require('./firebase/firebase.js');
var graph = require('./graph/eventgraph.js');

module.exports = React.createClass({

    componentDidMount: function() {
        console.log("Heia");
        var that = this;
        firebase.child("users").on("value", function(snapshot) {
            var val = snapshot.val();
            graph.createGraph(val);
        });
        graph.init(this.refs.container.getDOMNode());
    },

    addEvent : function(){

    },

    render: function() {
            console.log('render');
            return (
            <div>
            <div id="cy" className="container" ref="container"></div>
            </div>
        );
    }

});