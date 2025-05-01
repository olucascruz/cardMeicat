import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Fundo branco
scene.background = new THREE.Color('#EDE8DE');

// Luz ambiente
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

let model = null;

loader.load('/cardmei.glb', function (gltf) {
  console.log(gltf);
  model = gltf.scene;

  model.traverse((node) => {
    if (node.isMesh) {
      node.material.side = THREE.BackSide;
    }
  });

  // // Rotacionar o modelo para ficar em pé
  const pivot = new THREE.Object3D();
  scene.add(pivot);
  pivot.add(model);
  model.position.set(0.5, 0, 0); // exemplo: sobe o modelo 1 unidade
  model.scale.set(1, 1.754, 1);

}, undefined, function (error) {
  console.error(error);
});


camera.position.z = 4;

// Adicionando o OrbitControls para controlar a câmera com o mouse
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Suavizar o movimento
controls.dampingFactor = 0.05;
controls.enableZoom = false; // Permitir zoom
controls.enablePan = false; // Impedir que o usuário arraste a câmera lateralmente, se quiser

// Tornar o projeto responsivo
window.addEventListener('resize', () => {
  // Atualizar a proporção da câmera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Ajustar o tamanho do renderizador
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);

  controls.update(); // Atualizar os controles

  renderer.render(scene, camera);
}
