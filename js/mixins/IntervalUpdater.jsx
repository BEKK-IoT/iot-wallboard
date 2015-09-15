var React = require('react');

module.exports = {
    componentDidMount: function() {
        this.intervals = [];
    },

    setInterval: function() {
        this.intervals.push(setInterval.apply(null, arguments));
    },

    componentWillUnmount: function() {
        this.intervals.map(clearInterval);
    }
};
