var Chartist = require('chartist')
var cytoscape = require('cytoscape');
var _ = require('lodash');

var EventGraph = function(){ 

	var cy, eles;

	var width = 600;
	var height = 400; 

	var testElements = {
		nodes : [
			{ data : {id : "1", name : "node1" , nodecolor : "#df565b" } ,position: { x: 200, y: 100 } },
			{ data : {id : '2', name : "node2", nodecolor : "#df565b"}, position: { x: 200, y: 200 }  }
		],
		edges : [
			{ data : {source : '1', target : '2'} }
		]
	};

	var createUserNode = function(user){
		return { 
			data : {
				id : user, 
				name : user.replace(" ", "\n"), 
				nodecolor : "#df565b",
				weight: 30,
				fontSize : 15,
				fontWidth : 2
			}, 
			position: { x: 100, y: 100 },
			classes : "userNode"
		};
	};

	var createEventNode = function(fevent, parent){
		var classname = parent.replace(" ", "_");
		return { 
			data : {
				id : parent + fevent, 
				name : fevent, 
				nodecolor : "#28bcb3",
				weight: 20,
				fontSize : 11,
				fontWidth : 1
			}, 
			position: { x: 100, y: 200 },
			classes : "eventNode " + classname};
	};

	/*var crateNodeContainer = function(counter){
		return { data : {id : "container" + counter, name : "", nodecolor : "transparent"}};
	};*/

	var createEdge = function(source, target){
		return { data : {source : source, target : target} }
	};

	var createElements = function(data){
		var elements = {
			nodes : [],
			edges : []
		};

		var keys = Object.keys(data);
		var counter = 0;
		_.each(keys, function(user){
			//var container = crateNodeContainer(counter++);
			//elements.nodes.push(container)
			elements.nodes.push(createUserNode(user));
			_.each(Object.keys(data[user]),function(fevent){
				elements.nodes.push(createEventNode(fevent, user));
				elements.edges.push(createEdge(user,user + fevent));
			});
		});
		console.log(elements);
		return elements;

	};

	var setEventPos = function(){

	};

	var createPositionArray = function(n){
		var positions = [];

        console.log(nx, ny);
		return positions;
	};

	var createNodeGrid = function(n){
		var ny = Math.floor(Math.sqrt(n))
        var nx = Math.ceil(n/ny)
        return { nx : nx , ny : ny};
	};

	var setEventNodePositions = function(eventNodes, parentpos,scale){
		var radius = scale;
		var ang = 0.777;
		eventNodes.each(function(i, ele){
			ele.position({
				x : parentpos.x + radius * Math.cos(ang),
				y : parentpos.y + radius * Math.sin(ang)
			});
			ang += 0.6;
		});
	};

	var setPositions = function(){
		console.log(cy.elements());
		var userNodes = cy.$( ".userNode" );
		var grid = createNodeGrid(userNodes.length);
		var scale = width /(grid.nx*2);
		var scaleY = height/(grid.ny*2);
		var posX = 0; var posY = 0;
		userNodes.each(function(i, ele){
			if(posX >= grid.nx){
				posX = 0;
				posY++;
			}
			ele.position({
				x : scale + posX++*scale*2,
				y : scaleY + posY*scaleY*2
			});

			var id = ele.id();
			var eventNodes = cy.$( "." + id.replace(" ", "_") );
			setEventNodePositions(eventNodes, ele.position(), scaleY/4*3 );
		});
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
			        'text-outline-width': 'data(fontWidth)',
			        'text-outline-color': 'black',
			        'background-color' : 'data(nodecolor)',
			        'width' : 'data(weight)',
			        'height' : 'data(weight)',
			        'font-size' : 'data(fontSize)'
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
			  userPanningEnabled : false,
			  
			  layout: {
			    name: 'preset',
			    padding: 10
			  }, 
			});
			console.log(cy);
		},

		add : function(elements){
			return cy.add(elements);
		},

		remove : function(elements){
			cy.remove(elements);
		},

		createGraph : function(data){
			console.log(data);
			//this.add(testElements);
			if(eles){
				console.log("remove elements");
				this.remove(eles);
			}
			eles = this.add(createElements(data));
			setPositions();
			cy.reset();
		}
	}

}();

module.exports = EventGraph;