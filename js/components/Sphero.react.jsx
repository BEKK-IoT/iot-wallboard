let React = require('react');
let firebase = require('./firebase/firebase.js');

var Sphero = React.createClass({
    componentDidMount: function() {
        var that = this;
        firebase.child("gadgets/sphero").on("value", function(snapshot) {
            var val = snapshot.val();
            if(val) {
                console.log(val);
                that.setState({gyro : val.gyro, move : val.move});
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
            move : "none"
        };
    },


    render: function() {
        console.log(this.props);
        return (
            <div>
                <div className="sphero-heading">Sphero</div> 
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
