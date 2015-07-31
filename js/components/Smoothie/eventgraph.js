var Chartist = require('chartist')
var Smoothie = require('smoothie');

var EventGraph = function(){

	var smoothie; 
	return {
		init : function(container){
			smoothie = new Smoothie.SmoothieChart();
			smoothie.streamTo(container);
        	
		}
	}

}();

module.exports = EventGraph;