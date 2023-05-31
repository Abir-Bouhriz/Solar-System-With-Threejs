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
    DirectionalLight,
    SphereGeometry,
    MeshPhongMaterial,
    TextureLoader,
    IcosahedronGeometry,
    MeshLambertMaterial,
    AmbientLight
} from 'three';
import CameraControls from 'camera-controls';

// 1 Scene
const scene = new Scene();
const canvas = document.getElementById('three-canvas');

// 2 the object
const loader = new TextureLoader();
/*loader.load('./assets/stars_a.jpg', function (texture) {
    scene.background = texture;
});*/

// 2.1 GEOMETRY
const sphereGeometry = new SphereGeometry(0.5);

// 2.2 MATERIALS
const sunMaterial = new MeshLambertMaterial({
    map: loader.load('./assets/sun.jpeg')
});
const mercuryMaterial = new MeshLambertMaterial({
    map: loader.load('./assets/mercury.png')
});
const venusMaterial = new MeshLambertMaterial({
    map: loader.load('./assets/venus.jpeg')
});
const earthMaterial = new MeshLambertMaterial({
    map: loader.load('./assets/earth.jpeg')
});
const moonMaterial = new MeshLambertMaterial({
    map: loader.load('./assets/moon.jpg')
});
const marsMaterial = new MeshLambertMaterial({
    map: loader.load('./assets/mars.jpeg')
});
const jupiterMaterial = new MeshLambertMaterial({
    map: loader.load('./assets/jupiter.jpg')
});
const saturnMaterial = new MeshLambertMaterial({
    map: loader.load('./assets/saturn.jpg')
});
const uranusMaterial = new MeshLambertMaterial({
    map: loader.load('./assets/uranus.jpg')
});
const neptuneMaterial = new MeshLambertMaterial({
    map: loader.load('./assets/neptune.jpg')
});

// 2.3 CREATION (Mesh(geometry, Material))
const sun = new Mesh(sphereGeometry, sunMaterial);
scene.add(sun);

const mercury = new Mesh(sphereGeometry, mercuryMaterial);
mercury.scale.set(0.2, 0.2, 0.2);
mercury.position.x += 1;
sun.add(mercury);

const venus = new Mesh(sphereGeometry, venusMaterial);
venus.scale.set(0.3, 0.3, 0.3);
venus.position.x += 1.5;
sun.add(venus);

const earth = new Mesh(sphereGeometry, earthMaterial);
earth.scale.set(0.3, 0.3, 0.3);
earth.position.x += 2;
sun.add(earth);

const moon = new Mesh(sphereGeometry, moonMaterial);
moon.scale.set(0.2, 0.2, 0.2);
moon.position.x += 1;
earth.add(moon);

const mars = new Mesh(sphereGeometry, marsMaterial);
mars.scale.set(0.25, 0.25, 0.25);
mars.position.x += 2.5;
sun.add(mars);

const jupiter = new Mesh(sphereGeometry, jupiterMaterial);
jupiter.scale.set(0.5, 0.5, 0.5);
jupiter.position.x += 3;
sun.add(jupiter);

const saturn = new Mesh(sphereGeometry, saturnMaterial);
saturn.scale.set(0.4, 0.4, 0.4);
saturn.position.x += 3.5;
sun.add(saturn);

const uranus = new Mesh(sphereGeometry, uranusMaterial);
uranus.scale.set(0.35, 0.35, 0.35);
uranus.position.x += 4;
sun.add(uranus);

const neptune = new Mesh(sphereGeometry, neptuneMaterial);
neptune.scale.set(0.3, 0.3, 0.3);
neptune.position.x += 4.5;
sun.add(neptune);

// 3 the camera
const sizes = {
    width: 800,
    height: 600
}

const camera = new PerspectiveCamera(75, sizes.clientWidth / sizes.clientHeight);
camera.position.z = 3;
scene.add(camera);


// 4 the renderer
const renderer = new WebGLRenderer({ canvas: canvas });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(sizes.clientWidth, sizes.clientHeight, false);


// 5 lights
/*const directionalLight = new DirectionalLight();
directionalLight.position.set(-3, 2, -1).normalize();
scene.add(directionalLight);*/

let ambientLight = new AmbientLight(0xffffff, 0.7);
ambientLight.castShadow = false;
scene.add(ambientLight);


// 6 responsivity
window.addEventListener('resize', () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
})


// 7 Controls
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

// 8 the animation
const earthSpeed = 0.02;
function animate() {
    const delta = clock.getDelta();
    cameraControls.update(delta);

    sun.rotation.y += 0.001;
    earth.rotation.y += earthSpeed;
    mercury.rotation.y += earthSpeed * 4;
    venus.rotation.y += earthSpeed * 2;
    mars.rotation.y += earthSpeed * 0.5;
    neptune.rotation.y += earthSpeed * 1.5;
    uranus.rotation.y += earthSpeed * 2.5;
    saturn.rotation.y += earthSpeed * 3;
    jupiter.rotation.y += earthSpeed * 4;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();