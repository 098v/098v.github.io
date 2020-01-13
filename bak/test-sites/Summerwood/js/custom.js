// Check if WebGL can be run
if (WEBGL.isWebGLAvailable() == false) {
	document.body.appendChild(WEBGL.getWebGLErrorMessage());
}

// Start up three.js scene
var scene = new THREE.Scene();
scene.background = new THREE.Color().setHSL(0.6, 0, 1);
scene.fog = new THREE.Fog(scene.background, 1, 5000);

// Camera settings
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.x = 85;
camera.position.y = 60;
camera.position.z = 200;

// Load in renderer
var renderer = new THREE.WebGLRenderer({
	//antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.gammaInput = true;
renderer.gammaOutput = true;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 50;
controls.maxDistance = 1000;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.1258;
controls.enableKeys = false;

// Lighting NOTE: MAKE MORE REALISTIC
hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
hemiLight.color.setHSL(0.6, 1, 0.6);
hemiLight.groundColor.setHSL(0.095, 1, 0.75);
hemiLight.position.set(0, 50, 0);
scene.add(hemiLight);

hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
scene.add(hemiLightHelper);

dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.color.setHSL(0.1, 1, 0.95);
dirLight.position.set(-7, 7, 7);
dirLight.position.multiplyScalar(30);
scene.add(dirLight);

dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

var d = 90;

dirLight.shadow.camera.left = -d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = -d;

dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = -0.0001;

dirLightHeper = new THREE.DirectionalLightHelper(dirLight, 10);
scene.add(dirLightHeper);

// Floor
var groundGeo = new THREE.PlaneBufferGeometry(10000, 10000);
var groundMat = new THREE.MeshPhongMaterial({
	color: 0xffffff,
	specular: 0x050505
});
groundMat.color.setHSL(0.095, 1, 0.75);
var ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -55;
scene.add(ground);
ground.material.side = THREE.DoubleSide;
ground.receiveShadow = true;

// Sky
var vertexShader = document.getElementById('vertexShader').textContent;
var fragmentShader = document.getElementById('fragmentShader').textContent;
var uniforms = {
	topColor: {
		value: new THREE.Color(0x0077ff)
	},
	bottomColor: {
		value: new THREE.Color(0xefefef)
	},
	offset: {
		value: 33
	},
	exponent: {
		value: 0.4
	}
};
uniforms.topColor.value.copy(hemiLight.color);

scene.fog.color.copy(uniforms.bottomColor.value);

var skyGeo = new THREE.SphereBufferGeometry(4000, 32, 15);
var skyMat = new THREE.ShaderMaterial({
	vertexShader: vertexShader,
	fragmentShader: fragmentShader,
	uniforms: uniforms,
	side: THREE.BackSide
});

var sky = new THREE.Mesh(skyGeo, skyMat);
scene.add(sky);

/* XYZ markers DELETE LATER
var axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);
*/

// Cube for lighting setup
/*
var geometry = new THREE.BoxGeometry(30, 30, 30);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.receiveShadow = true;
scene.add(cube);
*/

var parent = new THREE.Group();
var parent2 = new THREE.Group();
parent2.rotation.y = Math.PI / 2;
scene.add(parent);
scene.add(parent2);

// Load wall + texture for testing
var onProgress = function(xhr) {
	if (xhr.lengthComputable) {
		var percentComplete = xhr.loaded / xhr.total * 100;
		console.log(Math.round(percentComplete, 2) + '% downloaded');
	}
};

var onError = function() {};

THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

// TEST SHED 1
// Front wall
new THREE.MTLLoader()
	.setPath('model/wall/')
	.load('3ftx7.875ft.mtl', function(materials) {
		materials.preload();
		new THREE.OBJLoader()
			.setMaterials(materials)
			.setPath('model/wall/')
			.load('3ftx7.875ft.obj', function(wall) {
					parent.add(wall);
					wall.receiveShadow = true;
					wall.traverse(function(child) { child.castShadow = true; });
				},
				onProgress, onError);
	});

new THREE.MTLLoader()
	.setPath('model/wall/')
	.load('3ftx7.875ft.mtl', function(materials) {
		materials.preload();
		new THREE.OBJLoader()
			.setMaterials(materials)
			.setPath('model/wall/')
			.load('3ftx7.875ft.obj', function(wall2) {
					wall2.position.x = 35;
					parent.add(wall2);
					wall2.receiveShadow = true;
					wall2.traverse(function(child) { child.castShadow = true; });
				},
				onProgress, onError);
	});

new THREE.MTLLoader()
	.setPath('model/wall/')
	.load('3ftx7.875ft.mtl', function(materials) {
		materials.preload();
		new THREE.OBJLoader()
			.setMaterials(materials)
			.setPath('model/wall/')
			.load('3ftx7.875ft.obj', function(wall3) {
					wall3.position.x = -35;
					wall3.receiveShadow = true;
					wall3.traverse(function(child) { child.castShadow = true; });
					parent.add(wall3);
				},
				onProgress, onError);
	});

// Roof
new THREE.MTLLoader()
	.setPath('model/roof/')
	.load('Dune.mtl', function(materials) {
		materials.preload();
		new THREE.OBJLoader()
			.setMaterials(materials)
			.setPath('model/roof/')
			.load('Dune.obj', function(roof) {
					roof.position.y = 50;
					roof.receiveShadow = true;
					roof.traverse(function(child) { child.castShadow = true; });
					parent.add(roof);
				},
				onProgress, onError);
	});

// TEST SHED 2
// Front wall
new THREE.MTLLoader()
	.setPath('model/wall/')
	.load('3ftx7.875ft.mtl', function(materials) {
		materials.preload();
		new THREE.OBJLoader()
			.setMaterials(materials)
			.setPath('model/wall/')
			.load('3ftx7.875ft.obj', function(wall) {
					parent2.add(wall);
					wall.receiveShadow = true;
					wall.traverse(function(child) { child.castShadow = true; });
				},
				onProgress, onError);
	});

new THREE.MTLLoader()
	.setPath('model/wall/')
	.load('3ftx7.875ft.mtl', function(materials) {
		materials.preload();
		new THREE.OBJLoader()
			.setMaterials(materials)
			.setPath('model/wall/')
			.load('3ftx7.875ft.obj', function(wall2) {
					wall2.position.x = 35;
					parent2.add(wall2);
					wall2.receiveShadow = true;
					wall2.traverse(function(child) { child.castShadow = true; });
				},
				onProgress, onError);
	});

new THREE.MTLLoader()
	.setPath('model/wall/')
	.load('3ftx7.875ft.mtl', function(materials) {
		materials.preload();
		new THREE.OBJLoader()
			.setMaterials(materials)
			.setPath('model/wall/')
			.load('3ftx7.875ft.obj', function(wall3) {
					wall3.position.x = -35;
					wall3.receiveShadow = true;
					wall3.traverse(function(child) { child.castShadow = true; });
					parent2.add(wall3);
				},
				onProgress, onError);
	});

// Roof
new THREE.MTLLoader()
	.setPath('model/roof/')
	.load('Dune.mtl', function(materials) {
		materials.preload();
		new THREE.OBJLoader()
			.setMaterials(materials)
			.setPath('model/roof/')
			.load('Dune.obj', function(roof) {
					roof.position.y = 50;
					roof.receiveShadow = true;
					roof.traverse(function(child) { child.castShadow = true; });
					parent2.add(roof);
				},
				onProgress, onError);
	});

// Shadowmapping
var shader = THREE.ShaderChunk.shadowmap_pars_fragment;
shader = shader.replace(
	'#ifdef USE_SHADOWMAP',
	'#ifdef USE_SHADOWMAP' +
	document.getElementById('PCSS').textContent
);
shader = shader.replace(
	'#if defined( SHADOWMAP_TYPE_PCF )',
	document.getElementById('PCSSGetShadow').textContent +
	'#if defined( SHADOWMAP_TYPE_PCF )'
);
THREE.ShaderChunk.shadowmap_pars_fragment = shader;

// GUI Controller
controller = new function() {
	parent2.visible = false;
	controls.autoRotate = true;
}
var gui = new dat.GUI();
f1 = gui.addFolder('Auto Rotate');
q = f1.add(controls, 'autoRotate').listen().onChange(function() {
	autoRotate = controls.autoRotate;
});
f1.open();
var floorFol = gui.addFolder('Show/Hide Shed 1 Test');
floorFol.add(parent, 'visible');
floorFol.open();
var floorFol = gui.addFolder('Show/Hide Shed 2 Test');
floorFol.add(parent2, 'visible');
gui.close();

// Load GUI controller over three.js scene
var customContainer = document.getElementById('guiContainer');
customContainer.appendChild(gui.domElement);

// Look at
camera.lookAt(parent);

// Adjust aspect ratio on scale
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animate and render scene
var animate = function() {
	requestAnimationFrame(animate);
	renderer.autoClear = false;
	renderer.clear();
	renderer.render(scene, camera);
	controls.update();
};

animate();