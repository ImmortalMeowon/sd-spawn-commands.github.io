import * as THREE from './node_modules/three/build/three.module.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';

class TankViewer {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        
        this.setupRenderer();
        this.setupLights();
        this.setupCamera();
        this.setupControls();
        this.loadTankModel();
        this.setupEventListeners();
    }

    setupRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        document.body.appendChild(this.renderer.domElement);
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 7);
        directionalLight.castShadow = true;
        
        this.scene.add(ambientLight);
        this.scene.add(directionalLight);
    }

    setupCamera() {
        this.camera.position.set(0, 3, 5);
        this.camera.lookAt(0, 0, 0);
    }

    setupControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
    }

    loadTankModel() {
        const loader = new GLTFLoader();
        loader.load('a.glb', (gltf) => {
            this.tankModel = gltf.scene;
            
            this.normalMaterials = [];
            this.armorMaterials = [];

            this.tankModel.traverse((child) => {
                if (child.isMesh) {
                    // Сохраняем оригинальные материалы
                    this.normalMaterials.push(child.material.clone());
                    
                    // Создаем материал для режима брони
                    const armorMaterial = new THREE.MeshStandardMaterial({
                        color: 0xff0000,
                        wireframe: true,
                        opacity: 0.5,
                        transparent: true
                    });
                    this.armorMaterials.push(armorMaterial);

                    // Включаем тени
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            this.scene.add(this.tankModel);
            this.animate();
        }, undefined, (error) => {
            console.error('Ошибка загрузки модели:', error);
        });
    }

    toggleArmorMode() {
        if (!this.tankModel) return;

        this.isArmorMode = !this.isArmorMode;
        
        this.tankModel.traverse((child, index) => {
            if (child.isMesh) {
                child.material = this.isArmorMode 
                    ? this.armorMaterials[index] 
                    : this.normalMaterials[index];
            }
        });
    }

    setupEventListeners() {
        document.getElementById('toggleMode').addEventListener('click', () => this.toggleArmorMode());

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Вращение танка
        if (this.tankModel) {
            this.tankModel.rotation.y += 0.005;
        }

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

// Инициализация при загрузке страницы
window.addEventListener('load', () => {
    new TankViewer();
});
