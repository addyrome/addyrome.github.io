var scene,
  camera,
  renderer,
  element,
  container,
  effect,
  controls,
  clock,

  // Particles
  particles = new THREE.Object3D(),
  totalParticles = 200,
  maxParticleSize = 200,
  particleRotationSpeed = 0,
  particleRotationDeg = 0,
  lastColorRange = [0, 0.3],
  currentColorRange = [0, 0.3];

init();

function init() {
  setScene();

  setControls();

  setLights();
  setFloor();
  setWalls();
  setBlocks();
  setDisplayCase();
  setPictures();
  //setParticles();

  clock = new THREE.Clock();
  animate();
}

function setWalls() {
  var geometry = new THREE.BoxGeometry(.2, 175, 200);
  var material = new THREE.MeshPhongMaterial({
    color: 0xffffb3
  });
  var wall1 = new THREE.Mesh(geometry, material);
  wall1.position.set(150, 0, 0);
  scene.add(wall1);
  var wall2 = new THREE.Mesh(geometry, material);
  wall2.position.set(50, 0, -60);
  wall2.rotation.y += 1.57;
  scene.add(wall2);
  var wall3 = new THREE.Mesh(geometry, material);
  wall3.position.set(50, 0, 60);
  wall3.rotation.y -= 1.57;
  scene.add(wall3);
  var wall4 = new THREE.Mesh(geometry, material);
  wall4.position.set(-50, 0, 0);
  scene.add(wall4);
  var ceiling = new THREE.Mesh(geometry, material);
  ceiling.position.set(0, 130, 0);
  ceiling.rotation.z += 4.71;
  ceiling.scale.set(1, 3, 1);
  scene.add(ceiling);
}

function setScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 700);
  camera.position.set(0, 15, 0);
  scene.add(camera);

  renderer = new THREE.WebGLRenderer();
  element = renderer.domElement;
  container = document.getElementById('webglviewer');
  container.appendChild(element);

  effect = new THREE.StereoEffect(renderer);
}

function setLights() {
  // Lighting
  //var light = new THREE.PointLight(0x999999, 2, 200);
  //light.position.set(50, 50, 50);
  var light = new THREE.AmbientLight(0xAFAFAF); // soft white light
  scene.add(light);


  var lightScene = new THREE.PointLight(0x999999, 2, 125);
  lightScene.position.set(90, 70, 0);
  scene.add(lightScene);
}

function setFloor() {
  var floorTexture = THREE.ImageUtils.loadTexture('textures/wood.jpg');
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat = new THREE.Vector2(50, 50);
  floorTexture.anisotropy = renderer.getMaxAnisotropy();

  var floorMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 20,
    shading: THREE.FlatShading,
    map: floorTexture
  });

  var geometry = new THREE.PlaneBufferGeometry(1000, 1000);

  var floor = new THREE.Mesh(geometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);
}

function setBlocks() {
  var geometry = new THREE.BoxGeometry(5, 27, 5);
  var material = new THREE.MeshPhongMaterial({
    color: 0xafafaf
  });
  for (var i = 0; i < 120; i += 20) {
    var block = new THREE.Mesh(geometry, material);
    block.position.set(i, 0, -25);
    scene.add(block);
    var block2 = new THREE.Mesh(geometry, material);
    block2.position.set(i, 0, 25);
    scene.add(block2);
  }
}

function setDisplayCase() {
  var geometry = new THREE.BoxGeometry(5, 8, 5);
  var material = new THREE.MeshPhongMaterial({
    color: 0xafafaf,
    transparent: true,
    opacity: 0.4
  });
  for (var i = 0; i < 120; i += 20) {
    var displayCase = new THREE.Mesh(geometry, material);
    displayCase.position.set(i, 15, -25);
    scene.add(displayCase);
    var displayCase2 = new THREE.Mesh(geometry, material);
    displayCase2.position.set(i, 15, 25);
    scene.add(displayCase2);
  }
}

function setPictures() {
  var pictureTexture = THREE.ImageUtils.loadTexture('textures/design.jpg');
  pictureTexture.wrapS = THREE.ClampToEdgeWrapping;
  pictureTexture.wrapT = THREE.ClampToEdgeWrapping;
  pictureTexture.repeat = new THREE.Vector2(50, 50);
  pictureTexture.anisotropy = renderer.getMaxAnisotropy();
  pictureTexture.minFilter = THREE.NearestFilter;

  var pictureMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 20,
    shading: THREE.FlatShading,
    map: pictureTexture
  });

  
  for(var i = 0; i<160; i+=40){
    var geometry = new THREE.BoxGeometry(20,15,.3);
    var picture = new THREE.Mesh(geometry, pictureMaterial);
    picture.position.set(-25+i,20,-50);
    scene.add(picture);
    var picture2 = new THREE.Mesh(geometry, pictureMaterial);
    picture2.position.set(-25+i,20,50);
    scene.add(picture2);
  }

}

// ASCII file
var loader = new THREE.STLLoader();
loader.load('models/knot.stl', function(geometry) {
  var material = new THREE.MeshPhongMaterial({
    color: 0x2194ce,
    specular: 0x111111,
    shininess: 30
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(20, 10, -11.5);
  mesh.rotation.y = 2;
  mesh.scale.set(.75, .75, .75);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
});

loader.load('models/sculpture.stl', function(geometry) {
  var material = new THREE.MeshPhongMaterial({
    color: 0x222222,
    specular: 0x111111,
    shininess: 30
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(17, 16, 20);
  mesh.scale.set(.05, .05, .05);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
});

loader.load('models/sculpture2.stl', function(geometry) {
  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 16, 20);
  mesh.scale.set(.9, .9, .9);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
});

loader.load('models/sculpture3.stl', function(geometry) {
  var material = new THREE.MeshPhongMaterial({
    color: 0xfafafa,
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(19, 16, -23);
  mesh.scale.set(.7, .7, .7);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
});

loader.load('models/ball.stl', function(geometry) {
  var material = new THREE.MeshPhongMaterial({
    color: 0x556a8c,
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 16, -23);
  mesh.scale.set(2, 2, 2);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
});

loader.load('models/c.stl', function(geometry) {
  var material = new THREE.MeshPhongMaterial({
    color: 0xb21111,
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(40, 16, 25);
  mesh.scale.set(.7, .7, .7);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
});

loader.load('models/fruit2.stl', function(geometry) {
  var material = new THREE.MeshPhongMaterial({
    color: 0x111111,
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(60, 16, -25);
  mesh.scale.set(.07, .07, .07);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
});

loader.load('models/diamond.stl', function(geometry) {
  var material = new THREE.MeshPhongMaterial({
    color: 0x111111,
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(60, 17, 25);
  mesh.scale.set(4, 4, 4);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
});

loader.load('models/bench.stl', function(geometry) {
  var material = new THREE.MeshPhongMaterial({
    color: 0x704d43
  });
  for (var i=0; i<51; i+=40){
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(50+i, 0, 0);
    mesh.rotation.x = 4.75;
    mesh.scale.set(.15, .15, .15);
    scene.add(mesh);
  }
})

loader.load('models/chandelier.stl', function(geometry) {
  var material = new THREE.MeshPhongMaterial({
    color: 0xafafaf,
    shininess: 30
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(120, 70, 0);
  mesh.scale.set(.25,.25,.25);
  mesh.rotation.x = 4.71;
  scene.add(mesh);
})


function setParticles() {
  var particleTexture = THREE.ImageUtils.loadTexture('textures/particle.png'),
    spriteMaterial = new THREE.SpriteMaterial({
      map: particleTexture,
      color: 0xffffff
    });

  for (var i = 0; i < totalParticles; i++) {
    var sprite = new THREE.Sprite(spriteMaterial);

    sprite.scale.set(64, 64, 1.0);
    sprite.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.75);
    sprite.position.setLength(maxParticleSize * Math.random());

    sprite.material.blending = THREE.AdditiveBlending;

    particles.add(sprite);
  }
  particles.position.y = 70;
  scene.add(particles);
}

function animate() {
  var elapsedSeconds = clock.getElapsedTime(),
    particleRotationDirection = particleRotationDeg <= 180 ? -1 : 1;

  particles.rotation.y = elapsedSeconds * particleRotationSpeed * particleRotationDirection;

  // We check if the color range has changed, if so, we'll change the colours
  if (lastColorRange[0] != currentColorRange[0] && lastColorRange[1] != currentColorRange[1]) {

    for (var i = 0; i < totalParticles; i++) {
      particles.children[i].material.color.setHSL(currentColorRange[0], currentColorRange[1], (Math.random() * (0.7 - 0.2) + 0.2));
    }

    lastColorRange = currentColorRange;
  }

  requestAnimationFrame(animate);

  update(clock.getDelta());
  render(clock.getDelta());
}


function setControls() {
  // Our initial control fallback with mouse/touch events in case DeviceOrientation is not enabled
  controls = new THREE.OrbitControls(camera, element);
  controls.target.set(
    camera.position.x + 0.15,
    camera.position.y,
    camera.position.z
  );
  controls.noPan = true;
  controls.noZoom = true;

  // Our preferred controls via DeviceOrientation
  function setOrientationControls(e) {
    if (!e.alpha) {
      return;
    }

    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();

    element.addEventListener('click', fullscreen, false);

    window.removeEventListener('deviceorientation', setOrientationControls, true);
  }
  window.addEventListener('deviceorientation', setOrientationControls, true);
}

function resize() {
  var width = container.offsetWidth;
  var height = container.offsetHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  effect.setSize(width, height);
}

function update(dt) {
  resize();

  camera.updateProjectionMatrix();

  controls.update(dt);
}

function render(dt) {
  effect.render(scene, camera);
}

function fullscreen() {
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.msRequestFullscreen) {
    container.msRequestFullscreen();
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  }
}

function getURL(url, callback) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
        callback(JSON.parse(xmlhttp.responseText));
      } else {
        console.log('We had an error, status code: ', xmlhttp.status);
      }
    }
  }

  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}