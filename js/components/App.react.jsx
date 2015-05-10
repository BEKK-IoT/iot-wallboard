var React = require('react');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            name: 'World'
        }
    },

    changeValue: function(e) {
        var name = e.target.value;
        console.log('name', name);
        this.setState({ name: name });
    },

    render: function() {
        return <div>
            <h1>Hello { this.state.name }</h1>
            <input onChange={ this.changeValue } value={ this.state.name } />
        </div>
    }

}); 