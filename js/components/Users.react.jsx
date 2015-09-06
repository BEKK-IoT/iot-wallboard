var React = require('react');
var firebase = require('./firebase/firebase.js');
var IntervalUpdater = require('../mixins/IntervalUpdater.jsx');
var User = require('./User.react.jsx');

var Users = React.createClass({
    mixins: [IntervalUpdater],
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
        this.setInterval(function() {
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
        var users = this.state.users.map(function(user) {
                return <User user={user}></User>
        });
        if(users.length > 0) {
            return (
                <div>
                    {
                        this.state.users.map(function(user){
                            return <User user={user}></User>
                        })
                    }
                </div>
            );
        }
        else {
            return <User></User>
        }


    }

});
var contentDiv = document.getElementById('users');
React.render(React.createElement(Users), contentDiv);

module.exports = Users;
