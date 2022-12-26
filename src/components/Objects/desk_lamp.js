import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function createLamp(scene) {
  const loader = new GLTFLoader();

  loader.load(
    "/static/desk_lamp/scene.gltf",
    function (gltf) {
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

export { createLamp };
