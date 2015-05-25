var THREE = require('three');

var webglWidget = function () {

	var scene, camera, renderer;
	var container;

	var initGeometry = function(){
		var geometry = new THREE.BoxGeometry( 20, 20, 20);
        var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
 
        var mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );
	};

	var onWindowResize  = function( event ) {
	    camera.aspect = container.offsetWidth / container.offsetHeight;
	    camera.updateProjectionMatrix();
	    renderer.setSize( container.offsetWidth, container.offsetHeight );
  	};
	
	return {
		init : function( DOMcontainer ){
			container = DOMcontainer; 
			var width = 300;
			var height = 300;
			//window.addEventListener('resize', onWindowResize, false); 

			scene = new THREE.Scene();

			renderer = new THREE.WebGLRenderer({antialias : true});
			renderer.setSize(width,height);
			container.appendChild(renderer.domElement);

			camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 20000);
    		camera.position.set(0,0,50);
    		scene.add(camera);

    		initGeometry();
    		renderer.render( scene, camera );
		}
	}
}();

module.exports = webglWidget;