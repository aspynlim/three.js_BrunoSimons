const scene = new THREE.Scene();

/* Mesh: Geometry(shape) + Material(how it looks) */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "yellow" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/* Sizes */
const sizes = {
  width: 600,
  height: 400,
};

/* Camera (field of view(fov), ratio) */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

/* Renderer */
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
