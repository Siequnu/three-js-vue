<template>
  <div id="container" class="w-screen h-screen"></div>
</template>
<script>
import { Scene } from "three";

import { createCamera } from "../components/Camera/camera";

import { createBulbLight } from "../components/Lights/bulbLight";
import { createHemisphereLight } from "../components/Lights/hemisphereLight";
import { createSunLight } from "../components/Lights/sunLight";

import { createFloorMat, createFloorMesh } from "../components/Objects/floor";
import { createCubeMat, createCubeMesh } from "../components/Objects/cube";
import { createBallMat, createBallMesh } from "../components/Objects/ball";
import { createWallMesh } from "../components/Objects/wall";
import { createSkyBox } from "../components/Objects/skyBox";

import { createRenderer } from "../components/Renderer/renderer";

import { createFirstPersonControls } from "../components/Controls/firstPersonControls";
import { orbitControls } from "../components/Controls/orbitControls";

import { createPorsche } from "../components/Objects/porsche";
import { createLamp } from "../components/Objects/desk_lamp";
import { createBed } from "../components/Objects/bed";

let camera, scene, renderer, bulbLight, controls;

export default {
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init() {
      camera = createCamera();

      scene = new Scene();

      scene.add(createBulbLight());
      scene.add(createHemisphereLight());
      scene.add(createSunLight());

      scene.add(createFloorMesh(createFloorMat()));
      scene.add(createBallMesh(createBallMat()));
      scene.add(createCubeMesh(createCubeMat(), { x: -0.7, y: 0.25, z: -1 }));
      scene.add(createCubeMesh(createCubeMat(), { x: 0, y: 0.25, z: -5 }));
      scene.add(createCubeMesh(createCubeMat(), { x: 7, y: 0.25, z: 0 }));

      scene.add(
        createWallMesh({ x: 5, y: 0.25, z: -9 }, { x: 10, y: 4, z: 0.3 })
      );
      scene.add(
        createWallMesh({ x: 5, y: 0.25, z: 9 }, { x: 10, y: 4, z: 0.3 })
      );

      createSkyBox(scene);

      createBed(scene);
      createLamp(scene);

      const container = document.getElementById("container");
      renderer = createRenderer();
      container.appendChild(renderer.domElement);

      //controls = createFirstPersonControls(camera, renderer);
      controls = orbitControls(camera, renderer);

      window.addEventListener("resize", this.onWindowResize);
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
      renderer.shadowMap.enabled = true;

      controls.movementSpeed = 0.5;
      controls.update(0.3);

      renderer.render(scene, camera);
    },
  },
};
</script>
