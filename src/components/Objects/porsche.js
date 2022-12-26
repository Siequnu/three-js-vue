import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function createPorsche(scene) {
  const loader = new GLTFLoader();

  loader.load(
    "/static/porsche_911/scene.gltf",
    function (gltf) {
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

export { createPorsche };
