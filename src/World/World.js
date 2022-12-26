import { createCamera } from "./components/camera.js";
import { createLights } from "./components/lights.js";

import { createScene } from "./components/scene.js";
import { createControls } from "./systems/controls.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";

import { createFloor } from "./components/objects/floor.js";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

import { Vector2 } from "three";

let camera;
let renderer;
let scene;
let loop;
let composer;

class World {
  constructor(container) {
    // Instances of camera, scene, and renderer
    camera = createCamera();
    scene = createScene("hsl(210, 29%, 10%)");
    renderer = createRenderer();
    composer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const unrealPassResolution = new Vector2(2500, 2500);

    const unrealPass = new UnrealBloomPass(unrealPassResolution, 0.3, 0, 0);
    composer.addPass(unrealPass);

    // Initializate Loop
    loop = new Loop(camera, scene, renderer, composer);

    container.append(renderer.domElement);

    // Orbit Controls
    const controls = createControls(camera, renderer.domElement);

    console.log(controls.listenToKeyEvents);

    // Cube Instance
    //let box = createCube("#41b883", [2, 2, 2]);

    // Plane instance
    let plane = createFloor("#ffffff", 4, 6);

    // Light Instance, with optional light helper
    const { light, lightHelper } = createLights("white");

    loop.updatables.push(controls);
    //loop.updatables.push(box);
    loop.updatables.push(plane);
    loop.updatables.push(light);

    scene.add(light, plane);

    // Responsive handler
    const resizer = new Resizer(container, camera, renderer);
    resizer.onResize = () => {
      this.render();
    };
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }

  // Animation handlers
  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
