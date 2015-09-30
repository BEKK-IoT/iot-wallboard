let React = require('react');
let firebase = require('./firebase/firebase.js');

var Sphero = React.createClass({


    componentDidMount: function() {
        var that = this;
        firebase.child("gadgets/sphero").on("value", function(snapshot) {
            var val = snapshot.val();
            if(val) {
                console.log(val);
                that.setState({gyro : val.gyro, move : val.move, color: val.color, a: val.accel});
            }

        });
    },
    getInitialState: function() {
        return {
            a: {
                x : 0,
                y : 0,
                z : 0
            },
            gyro: {
                x : 0,
                y : 0,
                z : 0
            },
            color: {
                red: 0,
                blue: 0,
                green: 0
            },
            move : "none"
        };
    },


    render: function() {
        const divStyle = {
            'border-bottom': "4px solid rgba("+this.state.color.red+", "+this.state.color.green+", "+this.state.color.blue+", 0.5)"
        };
        return (
            <div>
                <div className="sphero-heading" style={divStyle}>Sphero</div> 
                <div className="sphero-data-box">
                    <div className="sphero-sub-heading">Accelerometer</div>
                    <div><div className="sphero-axel-value">{this.state.a.x}</div><div className="sphero-axel-value">{this.state.a.y}</div><div className="sphero-axel-value">{this.state.a.z}</div></div>
                   </div>
                <div className="sphero-data-box">
                    <div className="sphero-sub-heading">Gyroscope</div>
                    <div><div className="sphero-axel-value">{this.state.gyro.x}</div><div className="sphero-axel-value">{this.state.gyro.y}</div><div className="sphero-axel-value">{this.state.gyro.z}</div></div>
                </div>
                <div className="sphero-data-box">
                    <div className="sphero-sub-heading">Current move</div>
                    <div className="sphero-info" >{this.state.move}</div>
                </div>
            </div>
        );
    }

});

module.exports = Sphero;
