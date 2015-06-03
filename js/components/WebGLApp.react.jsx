

var React = require('react');
var webglWidget  = require('./webgl/webgltest.js');
var firebase = require('./firebase/firebase.js');

module.exports = React.createClass({

	componentDidMount : function() {
        var that = this;
        firebase.child("rest/").on("value", function(snapshot) {
            that.setState({fbevent : snapshot.val()});
        });
		var container = this.refs.container.getDOMNode();
    	webglWidget.init( container);
        webglWidget.animate();
	},

    makeGlow : function(){
        webglWidget.makeSphereGlow();
    },

    render: function() {
        return (
        	<div>
        	<div onClick={this.makeGlow} className="container" ref="container"></div>
        	</div>
        );
    }

}); 