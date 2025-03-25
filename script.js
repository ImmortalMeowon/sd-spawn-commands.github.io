import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Создаем сцену, камеру и рендерер
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Загрузка модели
const loader = new GLTFLoader();
let tankModel;
let normalMaterials = [];
let armorMaterials = [];

loader.load('a.glb', (gltf) => {
    tankModel = gltf.scene;
    scene.add(tankModel);
    
    // Создаем два варианта материалов
    tankModel.traverse((child) => {
        if (child.isMesh) {
            normalMaterials.push(child.material);
            armorMaterials.push(new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })); // Красный каркас
        }
    });
});

camera.position.set(0, 2, 5);

// Переключение режима
let isArmorMode = false;
document.getElementById('toggleMode').addEventListener('click', () => {
    if (tankModel) {
        tankModel.traverse((child, index) => {
            if (child.isMesh) {
                child.material = isArmorMode ? normalMaterials[index] : armorMaterials[index];
            }
        });
        isArmorMode = !isArmorMode;
    }
});

// Анимация
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Адаптация под окно браузера
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
