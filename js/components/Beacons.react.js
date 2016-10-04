
let React = require('react');
let firebase = require('./firebase/firebase.js');
let _ = require('lodash');


var Beacon = React.createClass({
  render: function() {
    let beaconClass = this.props.name +' beacon'
    if(this.props.number === 0) {
      return (<div></div>)
    } else {
        return (<div className={beaconClass}>{this.props.number}</div>);
    }

  }
})


var Beacons = React.createClass({

    componentDidMount: function() {
        var that = this;
        firebase.child("stats/").on("value", function(snapshot) {
            var val = snapshot.val();
            if(val) {
                that.setState(val);
            }

        });
    },
    getInitialState: function() {
        return {};
    },

    render: function() {
      var beacons = [];
      if(this.state.beacons) {
        for(var beacon in this.state.beacons) {
          beacons.push(<Beacon name={beacon} number={this.state.beacons[beacon]}/>)
        }
      }

        console.log(beacons);
        return (
            <div id="beacons">
              {beacons}
            </div>
        );
    }
});

module.exports = Beacons;
