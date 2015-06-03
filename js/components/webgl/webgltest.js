var THREE = require('three');

var webglWidget = function () {

	var scene, camera, renderer;
	var container;
	var mesh, light;
	var yellow = 0xEFFF45;
	var grey = 0x949494;
	var lightcolor =  0x404040;

	var initGeometry = function(){
        var geometry = new THREE.SphereGeometry( 5, 32, 16 );
		var material = new THREE.MeshLambertMaterial( { color: grey } );
		mesh = new THREE.Mesh( geometry, material );
		scene.add(mesh);
	};

	var initLight = function(){
		light = new THREE.PointLight(0xffffff);
		light.position.set(100,250,100);
		scene.add(light);
		light = new THREE.AmbientLight( lightcolor ); // soft white light
	    scene.add( light );
	
	};

	var onWindowResize  = function( event ) {
	    camera.aspect = container.offsetWidth / container.offsetHeight;
	    camera.updateProjectionMatrix();
	    renderer.setSize( container.offsetWidth, container.offsetHeight );
  	};

 

	var update = function()
	{
		
	};

	var render = function() 
	{
		renderer.render( scene, camera );
	};

	var animate = function(){
		requestAnimationFrame( animate );
		render();		
		update();
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

    		initLight();
    		initGeometry();
    		renderer.render( scene, camera );
		},
		animate : function () {
		    animate();
		},
		makeSphereGlow : function(){
			mesh.material.color.setHex( yellow );
			light.color.setHex( yellow );
			setTimeout(function(){ 
				mesh.material.color.setHex(grey);
				light.color.setHex( lightcolor );
			}, 1000);
			
			// SUPER SIMPLE GLOW EFFECT
			// use sprite because it appears the same from all angles

			// var spriteMaterial = new THREE.SpriteMaterial( 
			// { 
			// 	map: new THREE.ImageUtils.loadTexture( 'images/glow.png' ), 
			// 	useScreenCoordinates: false, alignment: THREE.SpriteAlignment.center,
			// 	color: 0x0000ff, transparent: false, blending: THREE.AdditiveBlending
			// });
			// var sprite = new THREE.Sprite( spriteMaterial );
			// sprite.scale.set(200, 200, 1.0);
			// mesh.add(sprite); // this centers the glow at the mesh
		}
	}
}();

module.exports = webglWidget;