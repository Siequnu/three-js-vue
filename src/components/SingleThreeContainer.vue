<template>
  <div id="container" class="w-screen h-screen"></div>
</template>
<script>
import * as THREE from "three";

import { GUI } from "three/addons/libs/lil-gui.module.min.js";

import { createCamera } from "../World/components/camera";

import { createBulbLight } from "../components/Lights/bulbLight";
import { createHemisphereLight } from "../components/Lights/hemisphereLight";
import { createFloorMat, createFloorMesh } from "../components/Objects/floor";
import { createCubeMat, createCubeMesh } from "../components/Objects/cube";
import { createBallMat, createBallMesh } from "../components/Objects/ball";
import { createRenderer } from "../components/Renderer/renderer";
import { createFirstPersonControls } from "../components/Controls/firstPersonControls";

let camera, scene, renderer, bulbLight, bulbMat, hemiLight, stats, controls;
let ballMat, cubeMat, floorMat;

let previousShadowMap = false;

// ref for lumens: http://www.power-sure.com/lumens.htm
const bulbLuminousPowers = {
  "110000 lm (1000W)": 110000,
  "3500 lm (300W)": 3500,
  "1700 lm (100W)": 1700,
  "800 lm (60W)": 800,
  "400 lm (40W)": 400,
  "180 lm (25W)": 180,
  "20 lm (4W)": 20,
  Off: 0,
};

// ref for solar irradiances: https://en.wikipedia.org/wiki/Lux
const hemiLuminousIrradiances = {
  "0.0001 lx (Moonless Night)": 0.0001,
  "0.002 lx (Night Airglow)": 0.002,
  "0.5 lx (Full Moon)": 0.5,
  "3.4 lx (City Twilight)": 3.4,
  "50 lx (Living Room)": 50,
  "100 lx (Very Overcast)": 100,
  "350 lx (Office Room)": 350,
  "400 lx (Sunrise/Sunset)": 400,
  "1000 lx (Overcast)": 1000,
  "18000 lx (Daylight)": 18000,
  "50000 lx (Direct Sun)": 50000,
};

const params = {
  shadows: true,
  exposure: 0.68,
  bulbPower: Object.keys(bulbLuminousPowers)[4],
  hemiIrradiance: Object.keys(hemiLuminousIrradiances)[0],
};
export default {
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init() {
      camera = createCamera();

      scene = new THREE.Scene();

      ({ bulbLight, bulbMat } = createBulbLight());
      scene.add(bulbLight);

      hemiLight = createHemisphereLight();
      scene.add(hemiLight);

      ballMat = createBallMat();
      cubeMat = createCubeMat();
      floorMat = createFloorMat();

      scene.add(createFloorMesh(floorMat));
      scene.add(createBallMesh(ballMat));
      scene.add(createCubeMesh(cubeMat, { x: -0.7, y: 0.25, z: -1 }));
      scene.add(createCubeMesh(cubeMat, { x: 0, y: 0.25, z: -5 }));
      scene.add(createCubeMesh(cubeMat, { x: 7, y: 0.25, z: 0 }));

      const container = document.getElementById("container");
      renderer = createRenderer();
      container.appendChild(renderer.domElement);

      controls = createFirstPersonControls(camera, renderer);

      window.addEventListener("resize", this.onWindowResize);

      const gui = new GUI();

      gui.add(params, "hemiIrradiance", Object.keys(hemiLuminousIrradiances));
      gui.add(params, "bulbPower", Object.keys(bulbLuminousPowers));
      gui.add(params, "exposure", 0, 1);
      gui.add(params, "shadows");
      gui.open();
    },
    onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    },

    animate() {
      requestAnimationFrame(this.animate);

      this.render();
    },

    render() {
      renderer.toneMappingExposure = Math.pow(params.exposure, 5.0); // to allow for very bright scenes.
      renderer.shadowMap.enabled = params.shadows;
      bulbLight.castShadow = params.shadows;

      if (params.shadows !== previousShadowMap) {
        ballMat.needsUpdate = true;
        cubeMat.needsUpdate = true;
        floorMat.needsUpdate = true;
        previousShadowMap = params.shadows;
      }

      bulbLight.power = bulbLuminousPowers[params.bulbPower];
      bulbMat.emissiveIntensity = bulbLight.intensity / Math.pow(0.02, 2.0); // convert from intensity to irradiance at bulb surface

      hemiLight.intensity = hemiLuminousIrradiances[params.hemiIrradiance];
      const time = Date.now() * 0.0005;

      //bulbLight.position.y = Math.cos(time) * 0.75 + 1.25;

      controls.movementSpeed = 0.1;
      controls.update(0.3);

      renderer.render(scene, camera);
    },
  },
};
</script>
