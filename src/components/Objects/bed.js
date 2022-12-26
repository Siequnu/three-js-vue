import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { createBulbLight } from "../Lights/bulbLight";

function createBed(scene) {
  const loader = new GLTFLoader();

  scene.add(createBulbLight(3, { x: 1, y: 0.75, z: -0.5 }));
  scene.add(createBulbLight(3, { x: 5, y: 0.75, z: -0.5 }));

  loader.load(
    "/static/bed/scene.gltf",
    function (gltf) {
      gltf.scene.scale.set(7, 7, 7);
      gltf.scene.position.set(2, 0.35, 2);
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

export { createBed };
