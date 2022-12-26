import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function createLamp(scene) {
  const loader = new GLTFLoader();

  loader.load(
    "/static/desk_lamp/scene.gltf",
    function (gltf) {
      const scale = 0.3;
      gltf.scene.scale.set(scale, scale, scale);
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

export { createLamp };
