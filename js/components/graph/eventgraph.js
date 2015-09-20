var cytoscape = require('cytoscape');
var _ = require('lodash');

var EventGraph = function(){

	var cy, eles;

	var width = 600;
	var height = 600; 

	var createMainNode = function(){
		return { 
			data : {
				id : "mainNode", 
				name : "Gruppe", 
				nodecolor : "#df565b",
				weight: 60,
				fontSize : 20,
				fontWidth : 3
			}, 
			position: { x: 300, y: 300 },
			classes : "mainNode"
		};
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
		var mainNode = createMainNode();
		elements.nodes.push(mainNode);
		_.each(keys, function(user){
			//var container = crateNodeContainer(counter++);
			//elements.nodes.push(container)
			elements.nodes.push(createUserNode(user));
			elements.edges.push(createEdge(mainNode.data.id, user));
			_.each(Object.keys(data[user]),function(fevent){
				elements.nodes.push(createEventNode(fevent, user));
				elements.edges.push(createEdge(user,user + fevent));
			});
		});
		console.log(elements);
		return elements;

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

	var setEventNodePositions = function(eventNodes, parentpos,ang, scale){
		var radius = scale;
		var ang = ang;
		var delta = (3.14 / 3) /eventNodes.length;
		eventNodes.each(function(i, ele){
			var r = radius;
			if(i % 2 === 1)
				 r -= radius /4;

			ele.position({
				x : parentpos.x + r * Math.cos(ang),
				y : parentpos.y + r * Math.sin(ang)
			});
			ang += delta;
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

	var setPositionsCircle = function(){
		console.log(cy.elements());
		var userNodes = cy.$( ".userNode" );
		var angledelta = 6.28 / (userNodes.length);
		var angle = 0;
		var radius = width/4;
		userNodes.each(function(i, ele){
			ele.position({
				x : width/2 + Math.cos(angle) * radius,
				y : height/2 + Math.sin(angle) * radius
			});
			var id = ele.id();
			var eventNodes = cy.$( "." + id.replace(" ", "_") );
			setEventNodePositions(eventNodes, ele.position(), angle, width/5);
			angle += angledelta;
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
			setPositionsCircle();
			cy.reset();
		}
	}

}();

module.exports = EventGraph;
