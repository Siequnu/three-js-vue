import { HemisphereLight } from "three";

function createHemisphereLight() {
  return new HemisphereLight(0xddeeff, 0x0f0e0d, 0.02);
}

export { createHemisphereLight };
