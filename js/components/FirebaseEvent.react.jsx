var React = require('react');
var firebase = require('./firebase/firebase.js');

module.exports = React.createClass({

    componentDidMount: function() {
        var that = this;
        firebase.child("rest/").on("value", function(snapshot) {
            that.setState({fbevent : snapshot.val()});
        });
    },

    getInitialState: function() {
        return {
            fbevent: 'Something',
            name: 'Firebase'
        }
    },

    changeValue: function(e) {

    },

    render: function() {
        return (
            <div>
                {this.state.fbevent}
            </div>
        );
    }

}); 