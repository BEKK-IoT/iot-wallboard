var React = require('react');
var firebase = require('./firebase/firebase.js');

module.exports = React.createClass({
    componentDidMount: function() {
        var that = this;
        var users = [];
        firebase.child("users/").on("value", function(snapshot) {
            var val = snapshot.val();

            for(var user in val) {
                if(val[user].registered){
                    if(users.indexOf(user) ==-1) {
                        users.push(user);
                    }
                }
                else {
                    var index = users.indexOf(user);
                    if (index > -1) {
                        users.splice(index, 1);
                    }
                }

            }
        });
        setInterval(function() {
            that.setState({users: users});
        }, 1000);
    },

    getInitialState: function() {
        return {
            users: []
        }
    },

    changeValue: function(e) {

    },

    render: function() {
        return (
            <div>
                {this.state.users.map(function(user){
                    if(user) {
                        return <span>{{user}}</span>
                    } else {
                        return <span>No users</span>
                    }
                })}
            </div>
        );
    }

});
