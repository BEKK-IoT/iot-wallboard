var React = require('react');
//var PointUpdater = require('../mixins/PointUpdater.jsx')

var User = React.createClass({
    //mixins: [PointUpdater],
    componentDidMount: function() {
        console.log("component did mount")
       // this.trackPoints(this.props.user);
    },
    getInitialState: function() {
        return {}
    },
    getDefaultProps: function() {
        return {
            user: 'No users'
        }
    },

    render: function() {
        return (
            <div className='user'>
                <span>{this.props.user}</span>
            </div>
        );
    }

});

module.exports = User;
