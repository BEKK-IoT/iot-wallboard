var React = require('react');
var App = require('./components/App.react');
var WebGLApp = require('./components/WebGLApp.react');
var Users = require('./components/Users.react');
var EventGraphApp = require('./components/EventGraph.react');
var SpheroApp = require('./components/Sphero.react');
var StatsApp = require('./components/Stats.react');

React.render(
	<EventGraphApp />,
	document.getElementById('graph')
);

React.render(
	<SpheroApp />,
	document.getElementById('sphero')
);

React.render(
	<StatsApp />,
	document.getElementById('stats')
);

