var React = require('react');

//var App = require('./components/App.react');
//var WebGLApp = require('./components/WebGLApp.react');
//var Grid = require('./grid');

/*React.render(
    <App />,
    document.getElementById('app')
);

React.render(
	<WebGLApp />,
	document.getElementById('webgl')
);
*/

/*React.render(
	<Grid />,
	document.getElementById('example')
)*/

var Gridtest = require('./gridtest');
var Grid = require('./grid')(Gridtest);
