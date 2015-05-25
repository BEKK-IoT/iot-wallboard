

var React = require('react');
var webglWidget  = require('./webgl/webgltest.js');

module.exports = React.createClass({

	componentDidMount : function() {
		var container = this.refs.container.getDOMNode();
    	webglWidget.init( container);
	},

    render: function() {
        return (
        	<div>
        	<div className="container" ref="container"></div>
        	</div>
        );
    }

}); 