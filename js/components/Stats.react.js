
let React = require('react');
let firebase = require('./firebase/firebase.js');
let _ = require('lodash');


var Stats = React.createClass({

    componentDidMount: function() {
        var that = this;
        firebase.child("stats").on("value", function(snapshot) {
            var val = snapshot.val();
            if(val) {
            	console.log("stats", val);
                that.setState(val);
            }

        });
    },
    getInitialState: function() {
        return {};
    },

    render: function() {
        console.log(this.state);
        return (
            <div>
                <div className="stats-element"><div className="stats-value"> {this.state.totalNumberOfEvents}</div><div className="stats-key"><span className="stats-letter">E</span>vents</div></div>
                <div className="stats-element"><div className="stats-value">{this.state.totalNumberOfGameEvents}</div><div className="stats-key"><span className="stats-letter">G</span>ame events</div> </div>
            	<div className="stats-element">< div className="stats-value"> {this.state.totalNumberOfSpheroEvents}</div><div className="stats-key"><span className="stats-letter">S</span>phero events</div></div>
            	<div className="stats-element"><div className="stats-value"> {this.state.totalNumberOfLampEvents}</div><div className="stats-key"><span className="stats-letter">L</span>ight events</div> </div>
            	<div className="stats-element">< div className="stats-value">{this.state.totalNumberOfUserEvents}</div><div className="stats-key"><span className="stats-letter">U</span>ser events</div></div>
            </div>
        );
    }

});

module.exports = Stats;
