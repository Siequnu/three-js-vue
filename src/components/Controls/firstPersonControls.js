import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";

function createFirstPersonControls(camera, renderer) {
  let controls = new FirstPersonControls(camera, renderer.domElement);

  controls.movementSpeed = 500;
  controls.lookSpeed = 0.01;
  controls.domElement = renderer.domElement;
  controls.rollSpeed = Math.PI / 24;
  controls.autoForward = false;
  controls.dragToLook = false;

  return controls;
}
export { createFirstPersonControls };
