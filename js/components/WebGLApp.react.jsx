

var React = require('react');
var webglWidget  = require('./webgl/webgltest.js');
var firebase = require('./firebase/firebase.js');

module.exports = React.createClass({

	componentDidMount : function() {
        var that = this;
        firebase.child("devices/sensors").on("value", function(snapshot) {
            var val = snapshot.val();
            that.setState({light : val.light});
        });
    	webglWidget.init( this.refs.container.getDOMNode());
        webglWidget.animate();
	},

    getInitialState: function() {
        return {
            light: false,
        }
    },


    render: function() {
        if(this.state.light.on){
            webglWidget.makeSphereGlow();
        }
        return (
        	<div>
        	<div onClick={webglWidget.makeSphereGlow} className="container" ref="container"></div>
        	</div>
        );
    }

}); 