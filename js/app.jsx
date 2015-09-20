var React = require('react');

var App = require('./components/App.react');
var WebGLApp = require('./components/WebGLApp.react');
var Users = require('./components/Users.react');

React.render(
    <App />,
    document.getElementById('app')
);

React.render(
	<WebGLApp />,
	document.getElementById('webgl')
);



