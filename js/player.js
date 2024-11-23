import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import * as THREE from 'three';

export class Player {
    constructor(scene, camera, renderer, clock) {
        this.mesh = null;
        this.moveSpeed = 0.08;
        this.rotationSpeed = 0.0125;
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.rotateLeft = false;
        this.rotateRight = false;
        this.camera = camera;
        this.renderer = renderer;
        this.clock = clock;
        this.actions = [];
        this.setupInput();
        this.loadModel(scene);
        this.loadBackflipAnimation();
    }
    setupInput() {
        const keyActions = {
            'a': 'left',
            'd': 'right',
            'w': 'up',
            // 's': 'down',
            'ArrowLeft': 'rotateLeft',
            'ArrowRight': 'rotateRight'
        };

        const handleKeyEvent = (event, isKeyDown) => {
            if (keyActions[event.key] !== undefined) {
                this[keyActions[event.key]] = isKeyDown;
            }
        };

        window.addEventListener('keydown', (event) => {
            if (!keyActions.hasOwnProperty(event.key))
                return;
            this.actions.at(2).play();
            handleKeyEvent(event, true);
        });

        window.addEventListener('keyup', (event) => {
            if (!keyActions.hasOwnProperty(event.key))
                return;
            setTimeout(() => {
                this.actions.at(2).stop();
                this.actions.at(0).play();
            }, 200);
            handleKeyEvent(event, false);
        });
    }

    loadModel(scene) {
        const loader = new GLTFLoader();
        loader.load(
            'models/Soldier.glb',
            (gltf) => {
                this.mesh = gltf.scene;
                this.mesh.scale.set(3, 3, 3);
                this.mesh.position.set(0, 0, 0);
                scene.add(this.mesh);
                this.mesh.traverse((object) => {
                    if (object.isMesh) object.castShadow = true;
                });
                const skeleton = new THREE.SkeletonHelper(this.mesh);
                skeleton.visible = false;
                scene.add(skeleton);
                const mixer = new THREE.AnimationMixer(this.mesh);
                const animations = gltf.animations;
                // animations.forEach((clip, index) => {
                //     console.log(`Animation ${index}: ${clip.name || `Unnamed Animation ${index}`}`);
                // });
                const idleAction = mixer.clipAction(animations[0]);
                const walkAction = mixer.clipAction(animations[3]);
                const runAction = mixer.clipAction(animations[1]);
                this.actions.push(idleAction);
                this.actions.push(walkAction);
                this.actions.push(runAction);
                this.actions.at(0).play();
                this.renderer.setAnimationLoop(() => {
                    mixer.update(this.moveSpeed / 8);
                    this.renderer.render(scene, this.camera);
                });
            },
            undefined,
            (error) => {
                console.error('An error occurred while loading the model:', error);
            }
        );
    }


    loadBackflipAnimation() {
        const loader = new GLTFLoader();
        loader.load(
            'models/Backflip.glb', // Use the converted GLTF file
            (gltf) => {
                const mixer = new THREE.AnimationMixer(this.mesh);
                const backflipAction = mixer.clipAction(gltf.animations[0]);
                this.actions.push(backflipAction);
                console.log('Backflip animation loaded');
            },
            undefined,
            (error) => {
                console.error('An error occurred while loading the backflip animation:', error);
            }
        );
    }

    update() {
        if (this.mesh) {
            const direction = new THREE.Vector3();
            this.camera.getWorldDirection(direction);
            direction.y = 0;
            const right = new THREE.Vector3();
            right.crossVectors(direction, new THREE.Vector3(0, 1, 0));
            const movement = new THREE.Vector3();
            if (this.up) {
                movement.add(direction);

            };
            if (this.down) {
                movement.sub(direction);

            };
            if (this.left) {
                movement.sub(right);
                this.mesh.rotation.y += (this.rotationSpeed / 2);
            };
            if (this.right) {
                movement.add(right);
                this.mesh.rotation.y -= (this.rotationSpeed / 2);
            };
            movement.normalize();
            this.mesh.position.addScaledVector(movement, this.moveSpeed);
            if (this.rotateLeft) this.mesh.rotation.y += this.rotationSpeed;
            if (this.rotateRight) this.mesh.rotation.y -= this.rotationSpeed;
            const offset = new THREE.Vector3(0, 5, -10);
            offset.applyQuaternion(this.mesh.quaternion);
            this.camera.position.copy(this.mesh.position).add(offset);
            this.camera.lookAt(this.mesh.position);
        }
    }
}
