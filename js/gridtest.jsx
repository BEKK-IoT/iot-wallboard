'use strict';
var React = require('react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var _ = require('lodash');
var ResponsiveReactGridLayout = require('react-grid-layout').Responsive;

var App = require('./components/App.react');
var WebGLApp = require('./components/WebGLApp.react');
var Firebase = require('./components/FirebaseEvent.react');

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
var AddRemoveLayout = React.createClass({
  mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      className: "layout",
      cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
      rowHeight: 100
    };
  },

  getInitialState() {
    return {
      items: [],
      newCounter: 0,
      newPos: 0
    };
  },

  createElement(el) {
    var i = el.add ? '+' : el.i;
    return (
      <div key={i} _grid={el}>
        <el.a />
      </div>
    );
  },

  onAddItem(app, width, height) {
    console.log('adding', 'n' + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
      	a : app,
        i: this.state.newCounter,
        x: this.state.newPos % (this.state.cols || 12), //this.state.items.length * 2 % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: width,
        h: height
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1,
      newPos: this.state.newPos + width
    });
  },

  onAddFirebase() {
    this.onAddItem(Firebase, 3,3);
  },

  onAddApp(){
  	this.onAddItem(App,2,2);
  },

  onAddWebGLApp(){
  	this.onAddItem(WebGLApp,3,3);
  },

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  },

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
    this.setState({layout: layout});
  },

  onRemoveItem(i) {
    console.log('removing', i);
    this.setState({items: _.reject(this.state.items, {i: i})});
  },

  render() {
    return (
      <div>
        <button onClick={this.onAddApp}>Add App Item</button>
        <button onClick={this.onAddFirebase}>Add Firebase Item</button>
        <button onClick={this.onAddWebGLApp}>Add WebGLApp Item</button>
        <ResponsiveReactGridLayout onLayoutChange={this.onLayoutChange} onBreakpointChange={this.onBreakpointChange}
            {...this.props}>
          {_.map(this.state.items, this.createElement)}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
});

module.exports = AddRemoveLayout;