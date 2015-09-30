var React = require('react');
var firebase = require('./firebase/firebase.js');

module.exports = React.createClass({

    componentDidMount: function() {
        var that = this;
        firebase.child("gadgets/sphero/color").on("value", function(snapshot) {
            var val = snapshot.val();
            if(val) {
                that.setState(val);
            }

        });
    },

    getInitialState: function() {
        return {
            red: 0,
            blue: 0,
            green: 0
        }
    },

    changeValue: function(e) {
        console.log("Heia");
    },

    render: function() {

        var divStyle = {
            border: "4px solid rgba("+this.state.red+", "+this.state.green+", "+this.state.blue+", 0.5)"
        };
        return (
            <div id="circle" style={divStyle}>
                <div className="color">Color</div>
                <div className="color color-number">{this.state.red}</div>
                <div className="color color-number">{this.state.green}</div>
                <div className="color color-number">{this.state.blue}</div>
            </div>
        );
    }

});
