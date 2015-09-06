var Chartist = require('chartist')
var cytoscape = require('cytoscape');
var _ = require('lodash');

var EventGraph = function(){ 

	var cy; 

	var testElements = {
		nodes : [
			{ data : {id : "1", name : "node1" } },
			{ data : {id : '2', name : "node2"} }
		],
		edges : [
			{ data : {source : '1', target : '2'} }
		]
	};

	var createUserNode = function(user){
		return { data : {id : user, name : user}};
	};

	var createEventNode = function(fevent, parent){
		return { data : {id : fevent, name : fevent }};
	};

	var createEdge = function(source, target){
		return { data : {source : source, target : target} }
	};

	var createElements = function(data){
		var elements = {
			nodes : [],
			edges : []
		};

		var keys = Object.keys(data);
		_.each(keys, function(user){
			elements.nodes.push(createUserNode(user));
			_.each(Object.keys(data[user]),function(fevent){
				elements.nodes.push(createEventNode(fevent, user));
				elements.edges.push(createEdge(user,fevent));
			});
		});
		console.log(elements);
		return elements;

	};
	return {

		init : function(container){
			cy = cytoscape({
			  container: container,
			  
			  style: cytoscape.stylesheet()
			    .selector('node')
			      .css({
			        'content': 'data(name)',
			        'text-valign': 'center',
			        'color': 'white',
			        'text-outline-width': 2,
			        'text-outline-color': '#888'
			      })
			    .selector(':selected')
			      .css({
			        'background-color': 'black',
			        'line-color': 'black',
			        'target-arrow-color': 'black',
			        'source-arrow-color': 'black',
			        'text-outline-color': 'black'
			      }),
			  
			  //elements: testElements,
			  
			  layout: {
			    name: 'grid',
			    padding: 10
			  }
			});
			console.log(cy);
		},

		add : function(elements){
			cy.add(elements);
		},

		remove : function(elements){
			cy.remove(elements);
		},

		createGraph : function(data){
			console.log(data);
			//this.add(testElements);
			//console.log(testElements);
			this.add(createElements(data));
			//this.add(createElements(data));
		}
	}

}();

module.exports = EventGraph;