'use strict';
var React = require('react');
//require('style!css!../css/styles.css');
//require('style!css!../examples/example-styles.css');
//require('style!css!../node_modules/react-resizable/css/styles.css');
typeof window !== "undefined" && (window.React = React); // for devtools

module.exports = function(Layout) {
  document.addEventListener("DOMContentLoaded", function(event) { 
    var contentDiv = document.getElementById('example');
    var gridProps = window.gridProps || {};
    React.render(React.createElement(ExampleLayout, gridProps), contentDiv);
  });

  var ExampleLayout = React.createClass({

    getInitialState() {
      return {
        layout: []
      };
    },

    onLayoutChange(layout) {
      this.setState({layout: layout});
    },

    render(){
      return (
        <div>
          <Layout onLayoutChange={this.onLayoutChange} />
        </div>
      );
    }
    
  });
};
