<template>
  <div id="scene-container" class="w-screen h-screen">
    <!-- Three.js canvas will be inserted here -->
  </div>
</template>

<script>
import { World } from "../World/World.js";
export default {
  mounted() {
    const container = document.querySelector("#scene-container");
    const world = new World(container);
    world.start();
  },
};
</script>
