import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function orbitControls(camera, renderer) {
  return new OrbitControls(camera, renderer.domElement);
}

export { orbitControls };
