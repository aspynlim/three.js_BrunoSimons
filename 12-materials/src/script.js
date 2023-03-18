import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/**
 * Debug
 */
const gui = new dat.GUI();

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");

const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");

// const matcapTexture = textureLoader.load("/textures/matcaps/1.png");
// const matcapTexture = textureLoader.load("/textures/matcaps/2.png");
const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);

const gradientTexture = textureLoader.load("./textures/gradients/3.jpg");
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects : MeshBasicMaterial
 */
// const material = new THREE.MeshBasicMaterial({
//   map: doorColorTexture,
// });
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;

// material.color.set("pink");
// material.color = new THREE.Color("purple");

// material.wireframe = true;

// material.opacity = 0.5;
// material.transparent = true;

// material.alphaMap = doorAlphaTexture;

// material.side = THREE.BackSide;
// material.side = THREE.DoubleSide;

/**
 * Objects : MeshBasicMaterial
 */

// const material = new THREE.MeshNormalMaterial();
// // material.wireframe = true;
// material.flatShading = true;

/**
 * Objects : MeshMatcapMaterial
 */
// const material = new THREE.MeshMatcapMaterial();
// // matcap : We get an illusion that objects are being illuminated
// material.matcap = matcapTexture;

/**
 * Objects : MeshDepthMaterial
 */
// const material = new THREE.MeshDepthMaterial();

/**
 * Objects : MeshLambertMaterial
 */
// const material = new THREE.MeshLambertMaterial();

/**
 * Objects : MeshLambertMaterial
 */
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color("red");

/**
 * Objects : MeshToonMaterial
 */
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;

/**
 * Objects: MeshStandardMaterial - Part 1
 */
const material = new THREE.MeshStandardMaterial();
// material.metalness = 0.45;
// material.roughness = 0.65;
material.map = doorColorTexture;
material.aoMap = doorAmbientOcclusionTexture;
material.aoMapIntensity = 1;

/**
 * Objects: MeshStandardMaterial - Part 2
 */
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.1;
material.metalnessMap = doorMetalnessTexture;
material.roughnessMap = doorRoughnessTexture;
material.normalMap = doorNormalTexture;
material.normalScale.set(0.5, 0.5);

material.transparent = true;
material.alphaMap = doorAlphaTexture;

// material.wireframe = true;

gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);
gui.add(material, "aoMapIntensity").min(0).max(10).step(0.0001);
gui.add(material, "displacementScale").min(0).max(1).step(0.0001);

/**
 * Objects (continued)
 */

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 64, 64),
  material
);

sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);

sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);

plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.3, 0.2, 64, 128),
  material
);
torus.position.x = 1.5;

torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

scene.add(sphere, plane, torus);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight("white", 0.5);
pointLight.position.set(2, 2, 2);
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.3 * elapsedTime;
  plane.rotation.x = 0.3 * elapsedTime;
  torus.rotation.y = 0.3 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
