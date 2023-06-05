import {
    Scene,
    MeshBasicMaterial,
    Mesh,
    PerspectiveCamera,
    WebGLRenderer,
    MOUSE,
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    MathUtils,
    Clock,
    SphereGeometry,
    TextureLoader,
    AmbientLight,
    PointLight,
    MeshStandardMaterial,
    CubeTextureLoader,
    Object3D,
    RingGeometry,
    DoubleSide,
    MeshPhongMaterial,
} from 'three';
import CameraControls from 'camera-controls';

// 1 Scene
const scene = new Scene();
const canvas = document.getElementById('three-canvas');

// 2 the object

// 2.1 GEOMETRY
const sphereGeometry = new SphereGeometry(0.5);
const ringGeometry = new RingGeometry(10, 20, 32);

// 2.2 MATERIALS & TEXTURES
const loader = new TextureLoader();
const sunMaterial = new MeshBasicMaterial({
    map: loader.load('./assets/sun.jpeg')
});
const mercuryMaterial = new MeshStandardMaterial({
    map: loader.load('./assets/mercury.png')
});
const venusMaterial = new MeshStandardMaterial({
    map: loader.load('./assets/venus.jpeg')
});
const earthMaterial = new MeshStandardMaterial({
    map: loader.load('./assets/earth.jpeg')
});
const moonMaterial = new MeshStandardMaterial({
    map: loader.load('./assets/moon.jpg')
});
const marsMaterial = new MeshStandardMaterial({
    map: loader.load('./assets/mars.jpeg')
});
const jupiterMaterial = new MeshStandardMaterial({
    map: loader.load('./assets/jupiter.jpg')
});
const saturnMaterial = new MeshStandardMaterial({
    map: loader.load('./assets/saturn.jpg')
});
const saturnRingMaterial = new MeshBasicMaterial({
    map: loader.load('./assets/saturn ring.png'),
    side: DoubleSide
});
const uranusMaterial = new MeshStandardMaterial({
    map: loader.load('./assets/uranus.jpg')
});
const neptuneMaterial = new MeshStandardMaterial({
    map: loader.load('./assets/neptune.jpg')
});

// 2.3 CREATION Mesh(geometry, Material)
const sun = new Mesh(sphereGeometry, sunMaterial);
scene.add(sun);

const mercury = new Mesh(sphereGeometry, mercuryMaterial);
const mercuryObj = new Object3D();
mercury.name = 'mercury';
mercuryObj.name = 'mercuryObj';
mercuryObj.add(mercury);
scene.add(mercuryObj);
mercury.scale.set(0.2, 0.2, 0.2);
mercury.position.x += 1;

const venus = new Mesh(sphereGeometry, venusMaterial);
const venusObj = new Object3D();
venus.name = 'venus';
venusObj.name = 'venusObj';
venusObj.add(venus);
scene.add(venusObj);
venus.scale.set(0.3, 0.3, 0.3);
venus.position.x += 1.5;

const earth = new Mesh(sphereGeometry, earthMaterial);
const earthObj = new Object3D();
earth.name = 'earth';
earthObj.name = 'earthObj';
earthObj.add(earth);
scene.add(earthObj);
earth.scale.set(0.3, 0.3, 0.3);
earth.position.x += 2;

const moon = new Mesh(sphereGeometry, moonMaterial);
moon.name = 'moon';
moon.scale.set(0.3, 0.3, 0.3);
moon.position.x += 1;
earth.add(moon);

const mars = new Mesh(sphereGeometry, marsMaterial);
const marsObj = new Object3D();
mars.name = 'mars';
marsObj.name = 'marsObj';
marsObj.add(mars);
scene.add(marsObj);
mars.scale.set(0.25, 0.25, 0.25);
mars.position.x += 2.5;

const jupiter = new Mesh(sphereGeometry, jupiterMaterial);
const jupiterObj = new Object3D();
jupiter.name = 'jupiter';
jupiterObj.name = 'jupiterObj';
jupiterObj.add(jupiter);
scene.add(jupiterObj);
jupiter.scale.set(0.5, 0.5, 0.5);
jupiter.position.x += 3;

const saturn = new Mesh(sphereGeometry, saturnMaterial);
const saturnObj = new Object3D();
saturn.name = 'saturn';
saturnObj.name = 'saturnOBJ';
saturnObj.add(saturn);
scene.add(saturnObj);
saturn.scale.set(0.4, 0.4, 0.4);
saturn.position.x += 3.5;

const saturnRing = new Mesh(ringGeometry, saturnRingMaterial);
saturnRing.name = 'saturnRing';
saturnObj.add(saturnRing);
saturnRing.scale.set(0.03, 0.03, 0.03);
saturnRing.position.x += 3.5;
saturnRing.rotateX(-1.57);


const uranus = new Mesh(sphereGeometry, uranusMaterial);
const uranusObj = new Object3D();
uranus.name = 'uranus';
uranusObj.name = 'uranus';
uranusObj.add(uranus);
scene.add(uranusObj);
uranus.scale.set(0.35, 0.35, 0.35);
uranus.position.x += 4;

const neptune = new Mesh(sphereGeometry, neptuneMaterial);
const neptuneObj = new Object3D();
neptune.name = 'neptune';
neptuneObj.name = 'neptune';
neptuneObj.add(neptune);
scene.add(neptuneObj);
neptune.scale.set(0.3, 0.3, 0.3);
neptune.position.x += 4.5;


var Objects = scene.children;
console.log(Objects);
console.log(Objects[2].name);

// 3 the camera

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.z = 4;
scene.add(camera);


// 4 the renderer
const renderer = new WebGLRenderer({ canvas: canvas });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight, false);


// 5 lights
const pointLight = new PointLight(0xFFFFFF, 2, 300);
scene.add(pointLight);

const ambientLight = new AmbientLight(0x333333);
scene.add(ambientLight);


// 6 SCENE BACKGROUND
// 6.1 CubeTextureLoader
/*const cubeTextureLoader = new CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    './assets/stars.jpg',
    './assets/stars.jpg',
    './assets/stars.jpg',
    './assets/stars.jpg',
    './assets/stars.jpg',
    './assets/stars.jpg'
]);*/

// 6.2 Starfield
var starGeometry = new SphereGeometry(1000, 50, 50);
var starMaterial = new MeshPhongMaterial({
    map: loader.load('./assets/stars_a.jpg'),
    side: DoubleSide,
    shininess: 1
});
var starField = new Mesh(starGeometry, starMaterial);
scene.add(starField);

//6.3 Simple
/*const loader = new TextureLoader();
loader.load('./assets/stars_a.jpg', function (texture) {
    scene.background = texture;
});*/


// 7 responsivity
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, false);
})


// 8 Controls
const subsetOfTHREE = {
    MOUSE,
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    MathUtils: {
        DEG2RAD: MathUtils.DEG2RAD,
        clamp: MathUtils.clamp
    }
};

CameraControls.install({ THREE: subsetOfTHREE });
const clock = new Clock();
const cameraControls = new CameraControls(camera, canvas);
cameraControls.dollyToCursor = true;



// 9 the animation
function animate() {
    const delta = clock.getDelta();
    cameraControls.update(delta);

    //sun.rotation.y += 0.0009;
    earth.rotation.y += 0.008;
    earthObj.rotation.y += 0.008;
    mercury.rotation.y += 0.005;
    mercuryObj.rotation.y += 0.005;
    venus.rotation.y += 0.002;
    venusObj.rotation.y += 0.002;
    mars.rotation.y += 0.005;
    marsObj.rotation.y += 0.005;
    saturn.rotation.y += 0.038;
    saturnObj.rotation.y += 0.0009;
    jupiter.rotation.y += 0.0034;
    jupiterObj.rotation.y += 0.0034;
    uranus.rotation.y += 0.0025;
    uranusObj.rotation.y += 0.0025;
    neptune.rotation.y += 0.0015;
    neptuneObj.rotation.y += 0.0015;


    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();


