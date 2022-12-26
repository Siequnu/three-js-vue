import { PerspectiveCamera } from "three";

function createCamera() {
  let camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.x = -4;
  camera.position.z = 4;
  camera.position.y = 2;

  return camera;
}

export { createCamera };
