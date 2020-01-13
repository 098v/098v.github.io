
/*
var texture = THREE.ImageUtils.loadTexture('img/backyard.jpg');
var backgroundMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(2, 2, 0),
	new THREE.MeshBasicMaterial({
		map: texture
	}));
backgroundMesh.material.depthTest = false;
backgroundMesh.material.depthWrite = true;

var backgroundScene = new THREE.Scene();
var backgroundCamera = new THREE.Camera();
backgroundScene.add(backgroundCamera);
backgroundScene.add(backgroundMesh);
*/

//
//var mtlLoader = new THREE.MTLLoader();
//mtlLoader.setPath('js/model/');
//mtlLoader.load('shed.mtl', function(materials) {
//	materials.preload();
//	var objLoader = new THREE.OBJLoader();
//	objLoader.setMaterials(materials);
//	objLoader.setPath('js/model/');
//	objLoader.load('shed.obj', function(object) {
//		scene.add(object);
//	});
//});

/*
var planeGeo = new THREE.PlaneGeometry(40, 30);
//var planeMat = new THREE.MeshBasicMaterial({ color: 0xdc143c, side: THREE.DoubleSide });
var planeMat = new THREE.TextureLoader().load( "img/woodTx.jpg" );
planeMat.wrapS = THREE.RepeatWrapping; 
planeMat.wrapT = THREE.RepeatWrapping;
planeMat.repeat.set( 4, 4 );
var planeMat2 = new THREE.MeshBasicMaterial( { map: planeMat } );
var frontWall = new THREE.Mesh(planeGeo, planeMat2);
var backWall = new THREE.Mesh(planeGeo, planeMat2);
var leftWall = new THREE.Mesh(planeGeo, planeMat2);
var rightWall = new THREE.Mesh(planeGeo, planeMat2);
scene.add(frontWall);
frontWall.position.y = 15;
frontWall.position.z = 20;
frontWall.material.side = THREE.DoubleSide;
frontWall.applyMatrix( new THREE.Matrix4().makeTranslation(0, 14, 20) );
frontWall.verticesNeedUpdate = true;
scene.add(backWall);
backWall.position.y = 15;
backWall.position.z = -20;
backWall.material.side = THREE.DoubleSide;
backWall.applyMatrix( new THREE.Matrix4().makeTranslation(0, 14, -20) );
backWall.verticesNeedUpdate = true;
scene.add(leftWall);
leftWall.position.x = 20;
leftWall.position.y = 15;
leftWall.material.side = THREE.DoubleSide;
leftWall.applyMatrix( new THREE.Matrix4().makeTranslation(20, 14, 0) );
leftWall.verticesNeedUpdate = true;
leftWall.rotation.y = Math.PI / 2;
scene.add(rightWall);
rightWall.position.x = -20;
rightWall.position.y = 15;
rightWall.applyMatrix( new THREE.Matrix4().makeTranslation(-20, 14, 0) );
rightWall.verticesNeedUpdate = true;
rightWall.rotation.y = Math.PI / 2;
rightWall.material.side = THREE.DoubleSide;
*/

/*
var params = {
	length: 40,
	gap: 40,
}

// Front and Back Walls
var mainWalls = [];
setMainWall(new THREE.Vector3(-params.gap * 0, 1, -params.length * .5));
setMainWall(new THREE.Vector3(params.gap * 0, 1, params.length * .5));

function setMainWall(position) {
	let mainWallGeo = new THREE.PlaneGeometry(40, 30);
	mainWallGeo.rotateX(Math.PI / 0.5);
	let mainWall = new THREE.Mesh(mainWallGeo, new THREE.MeshBasicMaterial({
		color: "red"
	}));
	mainWall.position.copy(position);
	mainWall.material.side = THREE.DoubleSide;
	mainWalls.push(mainWall);
	scene.add(mainWall);
}

// Side Walls
var sideWalls = [];
setWall(new THREE.Vector3(-params.gap * .5, 1, -params.length * 0));
setWall(new THREE.Vector3(params.gap * .5, 1, params.length * 0));

function setWall(position) {
	let sideWallGeo = new THREE.PlaneGeometry(40, 30);
	sideWallGeo.rotateY(-Math.PI * 0.5);
	let sideWall = new THREE.Mesh(sideWallGeo, new THREE.MeshBasicMaterial({
		color: "red"
	}));
	sideWall.position.copy(position);
	sideWall.material.side = THREE.DoubleSide;
	sideWalls.push(sideWall);
	scene.add(sideWall);
}

var gui = new dat.GUI();
var customContainer = document.getElementById('guiContainer');
customContainer.appendChild(gui.domElement);
var box = gui.addFolder('Side Walls');
box.add(params, "gap", 40, 100, 5).onChange(setLength);

function setLength(value) {
	sideWalls.forEach(w => {
		w.position.setX(value * 0.5 * Math.sign(w.position.x));
	});
}

var box1 = gui.addFolder('Main Walls');
box1.add(params, "length", 40, 100, 5).onChange(setWidth);

function setWidth(value) {
	mainWalls.forEach(w => {
		w.position.setZ(value * 0.5 * Math.sign(w.position.z));
	});
}


/*
var gui = new dat.GUI();

var customContainer = document.getElementById('guiContainer');
customContainer.appendChild(gui.domElement);

var box = gui.addFolder('Front wall');
box.add(frontWall.scale, 'x', 1, 3).name('Width').listen();
box.add(frontWall.scale, 'y', 1, 3).name('Height').listen();
box.open();
var box2 = gui.addFolder('Back wall');
box2.add(backWall.scale, 'x', 1, 3).name('Width').listen();
box2.add(backWall.scale, 'y', 1, 3).name('Height').listen();
var box3 = gui.addFolder('Left wall');
box3.add(leftWall.scale, 'x', 1, 3).name('Width').listen();
box3.add(leftWall.scale, 'y', 1, 3).name('Height').listen();
var box4 = gui.addFolder('Right wall');
box4.add(rightWall.scale, 'x', 1, 3).name('Width').listen();
box4.add(rightWall.scale, 'y', 1, 3).name('Height').listen();
*/