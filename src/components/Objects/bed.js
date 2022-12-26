import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function createBed(scene) {
  const loader = new GLTFLoader();

  loader.load(
    "/static/bed/scene.gltf",
    function (gltf) {
      gltf.scene.scale.set(7, 7, 7);
      gltf.scene.position.set(2, 0.25, 2);
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

export { createBed };
