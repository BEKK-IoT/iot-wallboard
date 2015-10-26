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
				name : "users", 
				nodecolor : "#df565b",
				weight: 60,
				fontSize : 30,
				fontWidth : 3
			}, 
			position: { x: width/2, y: height/2 },
			classes : "mainNode"
		};
	};

	var createUserNode = function(user){
		return {
			data : {
				id : user,
				name : user.replace(/\s/g, "\n"),
				nodecolor : "#df565b",
				weight: 30,
				fontSize : 18,
				fontWidth : 2
			},
			position: { x: 100, y: 100 },
			classes : "userNode"
		};
	};

	var createEventNode = function(fevent, parent){
		var classname = parent.replace(/[^0-9a-zA-Z]+/g, "");
		return {
			data : {
				id : parent + fevent,
				name : fevent,
				nodecolor : "#28bcb3",
				weight: 20,
				fontSize : 15,
				fontWidth : 1
			},
			position: { x: 100, y: 200 },
			classes : "eventNode " + classname};
	};

	var createEdge = function(source, target){
		return { data : {source : source, target : target} }
	};

	var checkIfRegistered = function(events){
		return events.registered;

	};

	var createElements = function(data){
		var elements = {
			nodes : [],
			edges : []
		};
		var mainNode = createMainNode();
		elements.nodes.push(mainNode);
		_.forEach(data,function(events, user){
			if(checkIfRegistered(events)){
				elements.nodes.push(createUserNode(user));
				elements.edges.push(createEdge(mainNode.data.id, user));
				_.forEach(events, function(value, fevent){
					elements.nodes.push(createEventNode(fevent, user));
					elements.edges.push(createEdge(user,user + fevent));
				});
			}

		});
		return elements;

	};

	var setEventNodePositions = function(eventNodes, parentpos,ang, scale){
		var radius = scale;
		var ang = ang;
		var delta = (3.14 / 3.5) /eventNodes.length;
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

	var setPositionsCircle = function(){
		var userNodes = cy.$( ".userNode" );
		var angledelta = 6.28 / (userNodes.length);
		var angle = 0;
		var radius = width/5.0;
		userNodes.each(function(i, ele){
			ele.position({
				x : width/2 + Math.cos(angle) * radius,
				y : height/2 + Math.sin(angle) * radius
			});
			var id = ele.id();
			var eventNodes = cy.$( "." + id.replace(/[^0-9a-zA-Z]+/g, "") );
			console.log(eventNodes);
			setEventNodePositions(eventNodes, ele.position(), angle, width/4.0);
			angle += angledelta;
		});
	};

	return {

		init : function(container){
			width = container.offsetWidth;
			height = container.offsetHeight;
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
