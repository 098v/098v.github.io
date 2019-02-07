var scene = new THREE.Scene();

var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
geometry.scale(-1, 1, 1);
var material = new THREE.MeshBasicMaterial({
	map: new THREE.TextureLoader().load('img/2294472375_24a3b8ef46_o.jpg')
});
mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);

var renderer = new THREE.WebGLRenderer({
	antialias: true
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
cameraControls.minDistance = 100;
cameraControls.maxDistance = 300;

var light = new THREE.PointLight(0xffaa55, .75);
light.position.set(0, 200, 0);
light.castShadow = true;
light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500

var keyLight = new THREE.DirectionalLight(0xffaa55, 0.25);
keyLight.position.set(-100, 0, 100);
keyLight.target = scene;

var fillLight = new THREE.DirectionalLight(0xffaa55, 0.25);
fillLight.position.set(100, 0, 100);
fillLight.target = scene;

var backLight = new THREE.DirectionalLight(0xffaa55, 0.25);
backLight.position.set(0.2, 0, -100).normalize();
backLight.target = scene;
var hemiLight = new THREE.HemisphereLight(0xffffff, 0xfdfbd3, 1);

scene.add(light);
scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);
scene.add(hemiLight);

//var grid = new THREE.GridHelper(200, 10);
//scene.add(grid);
var floorGeo = new THREE.PlaneGeometry(1000, 1000);
//var floorMat = new THREE.MeshBasicMaterial({ color: 0xdc143c, side: THREE.DoubleSide });
var floorMat = new THREE.TextureLoader().load("img/grassTx.jpg");
floorMat.wrapS = THREE.RepeatWrapping;
floorMat.wrapT = THREE.RepeatWrapping;
floorMat.repeat.set(10, 10);
var floorMat2 = new THREE.MeshBasicMaterial({ map: floorMat });
var floorBot = new THREE.Mesh(floorGeo, floorMat2);
floorBot.material.side = THREE.DoubleSide;
floorBot.rotation.x = Math.PI / 2;
scene.add(floorBot);
scene.fog = new THREE.FogExp2(0xe0ffff, 0.003);

var axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

var shedBod = new THREE.BoxGeometry(60, 40, 40);
shedBod.translate( 60 / 2, 40 / 2, 40 / 2 );
//var shedMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var shedMat = new THREE.TextureLoader().load( "img/woodTx.jpg" );
shedMat.wrapS = THREE.RepeatWrapping; 
shedMat.wrapT = THREE.RepeatWrapping;
shedMat.repeat.set( 1, 1 );
var shedMat2 = new THREE.MeshBasicMaterial( { map: shedMat } );
var shed = new THREE.Mesh(shedBod, shedMat2);
shed.position.x = -20;
shed.position.z = -20;
scene.add(shed);

camera.position.x = 85;
camera.position.y = 60;
camera.position.z = 100;
camera.lookAt(shed);

var gui = new dat.GUI();

var customContainer = document.getElementById('guiContainer');
customContainer.appendChild(gui.domElement);

var box = gui.addFolder('Size Scale TEST');
box.add(shed.scale, 'x', 1, 2).name('Width').listen();
box.add(shed.scale, 'y', 1, 2).name('Height').listen();
box.add(shed.scale, 'z', 1, 2).name('Depth').listen();
box.open();

window.addEventListener('resize', onWindowResize, false);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}

var animate = function() {
	requestAnimationFrame(animate);


	renderer.autoClear = false;
	renderer.clear();
	renderer.render(scene, camera);
};

animate();