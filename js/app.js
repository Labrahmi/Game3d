import * as THREE from 'three';
// import Stats from 'three/addons/libs/stats.module.js';
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { GameLogic } from './gameLogic.js';
import { Player } from './player.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.5, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const pointLight = new THREE.PointLight(0xffffff, 200, 100);
pointLight.position.set(16, 16, 16);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Strong white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(50, 100, 50); // High above and angled
directionalLight.castShadow = true; // Enable shadows
directionalLight.shadow.mapSize.width = 1024; // Optional: Shadow resolution
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
scene.add(directionalLight);

const textureLoader = new THREE.TextureLoader();
const groundTexture = textureLoader.load('./assets/zellige.png'); // Replace with your image path

// Optionally repeat and wrap the texture
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(10, 10); // Adjust the repeat values for tiling

const groundMaterial = new THREE.MeshStandardMaterial({
    map: groundTexture, // Apply the texture
});

// Create the ground
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Align to horizontal plane
ground.receiveShadow = true; // Allow shadow reception
scene.add(ground);


const clock = new THREE.Clock(); // Create clock instance
const player = new Player(scene, camera, renderer, clock);

const cameraOffset = new THREE.Vector3(0, 10, 16); // Adjust for height and distance

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta(); // Get time delta
    GameLogic.update(player); // Update game logic

    if (player.mesh) {
        const playerPosition = player.mesh.position.clone();
        const playerDirection = new THREE.Vector3();
        player.mesh.getWorldDirection(playerDirection);

        const cameraPosition = playerPosition
            .clone()
            .add(cameraOffset.clone().applyQuaternion(player.mesh.quaternion));
        camera.position.copy(cameraPosition);
        camera.lookAt(playerPosition.clone().add(playerDirection));
    }

    renderer.render(scene, camera); // Render the scene
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

animate();
