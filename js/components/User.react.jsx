var React = require('react');
var If = require('react-if');
var Else = If.Else;
var Then = If.Then;

var User = React.createClass({
    componentDidMount: function() {
        console.log("component did mount")
    },

    getInitialState: function() {
        return {
            user: {}
        }
    },

    render: function() {
        return (
            this.props.user ?
                <div class='user'>
                    <span>{this.props.user}</span>
                    <span> - 0 points</span>
                </div>
                :
                <div class='user'>
                   No users
               </div>
        );
    }

});

module.exports = User;
