# Three.js Game

This project is a simple 3D game built using Three.js. The game features a player character that can move around a scene, with lighting and textures applied to the environment.

## Project Structure
```
├── README.md
├── assets
│   ├── Backflip.fbx
│   ├── ImageToStl.com_backflip
│   │   └── readme.txt
│   ├── ImageToStl.com_backflip.zip
│   └── zellige.png
├── css
│   └── styles.css
├── index.html
├── js
│   ├── app.js
│   ├── gameLogic.js
│   ├── player.js
│   └── utils.js
├── models
│   ├── Backflip.glb
│   ├── Horse.glb
│   ├── Soldier.glb
│   └── Xbot.glb
├── package-lock.json
└── package.json

6 directories, 17 files
```


## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
    ```sh
    git git@github.com:Labrahmi/Game3d.git
    cd Game3d
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Project

1. Start a local server:
    ```sh
    npx vite
    ```

2. Open your browser and navigate to `http://localhost:5173` (or the port specified by your local server).

## Usage

- Use the `W` key to move forward.
- Use the `A` key to move left.
- Use the `D` key to move right.
- Use the `ArrowLeft` key to rotate left.
- Use the `ArrowRight` key to rotate right.

## Project Files

- `index.html`: The main HTML file that includes the Three.js script and initializes the game.
- `css/styles.css`: The CSS file for styling the game.
- `js/app.js`: The main JavaScript file that sets up the scene, camera, renderer, and lights.
- `js/gameLogic.js`: Contains the game logic, including the update function.
- `js/player.js`: Defines the `Player` class, which handles player movement and animations.
- `js/utils.js`: Contains utility functions, such as collision detection.
- `assets/`: Contains assets such as textures and models.
- `models/`: Contains 3D models used in the game.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Three.js](https://threejs.org/) - JavaScript 3D library
- [GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) - Loader for glTF models
- [FBXLoader](https://threejs.org/docs/#examples/en/loaders/FBXLoader) - Loader for FBX models