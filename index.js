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
    AmbientLight,
    PointLight,
    Group,
    MeshStandardMaterial,
    CubeTextureLoader,
    Object3D,
    RingGeometry,
    DoubleSide
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
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
const ringGeometry = new RingGeometry(10, 20, 32);

// 2.2 MATERIALS & TEXTURES
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

// 2.3 CREATION (Mesh(geometry, Material))
const sun = new Mesh(sphereGeometry, sunMaterial);
scene.add(sun);

const mercury = new Mesh(sphereGeometry, mercuryMaterial);
const mercuryObj = new Object3D();
mercuryObj.add(mercury);
scene.add(mercuryObj);
mercury.scale.set(0.2, 0.2, 0.2);
mercury.position.x += 1;

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
const saturnObj = new Object3D();
saturnObj.add(saturn);
scene.add(saturnObj);
saturn.scale.set(0.4, 0.4, 0.4);
saturn.position.x += 3.5;

const saturnRing = new Mesh(ringGeometry, saturnRingMaterial);
saturnObj.add(saturnRing);
saturnRing.scale.set(0.03, 0.03, 0.03);
saturnRing.position.x += 3.5;
saturnRing.rotateX(-1.57);


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
camera.position.z = 4;
scene.add(camera);


// 4 the renderer
const renderer = new WebGLRenderer({ canvas: canvas });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(sizes.clientWidth, sizes.clientHeight, false);


// 5 lights
/*let ambientLight = new AmbientLight(0xffffff, 0.7);
ambientLight.castShadow = false;
scene.add(ambientLight);*/
const pointLight = new PointLight(0xFFFFFF, 2, 300);
scene.add(pointLight);

const ambientLight = new AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    './assets/stars.jpg',
    './assets/stars.jpg',
    './assets/stars.jpg',
    './assets/stars.jpg',
    './assets/stars.jpg',
    './assets/stars.jpg'
]);


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
function animate() {
    const delta = clock.getDelta();
    cameraControls.update(delta);

    //sun.rotation.y += 0.004;
    //earth.rotation.y += 0.004;
    mercury.rotation.y += 0.004;
    mercuryObj.rotation.y += 0.004;
    // venus.rotation.y += 2;
    // mars.rotation.y += 0.5;
    // neptune.rotation.y += 1.5;
    // uranus.rotation.y += 2.5;
    saturn.rotation.y += 0.038;
    saturnObj.rotation.y += 0.0009;
    //jupiter.rotation.y += 4;


    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    return {
        render({ time }) {
            sun.rotation.y = time * 0.05

            mercuryGroup.rotation.y = time * 0.5;
            mercury.rotation.y = time * 0.20;
        }
    }
}

animate();