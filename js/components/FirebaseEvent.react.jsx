var React = require('react');
var firebase = require('./firebase/firebase.js');

module.exports = React.createClass({

    componentDidMount: function() {
        var that = this;
        firebase.child("devices/sensors").on("value", function(snapshot) {
            var val = snapshot.val();
            console.log(val.light);
            that.setState({light : val.light});
        });
    },

    getInitialState: function() {
        return {
            fbevent: 'None',
            light: false,
            name: 'Firebase'
        }
    },

    changeValue: function(e) {

    },

    render: function() {
        return (
            <div>
                <span className={this.state.light.on ? 'large-icon light-on' : 'large-icon'}>✹</span> 
            </div>
        );
    }

});
