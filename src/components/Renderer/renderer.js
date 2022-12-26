import { WebGLRenderer, sRGBEncoding, ReinhardToneMapping } from "three";

function createRenderer() {
  let renderer = new WebGLRenderer();
  renderer.physicallyCorrectLights = true;
  renderer.outputEncoding = sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = ReinhardToneMapping;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  return renderer;
}

export { createRenderer };
