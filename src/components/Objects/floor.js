import {
  MeshStandardMaterial,
  TextureLoader,
  RepeatWrapping,
  sRGBEncoding,
  PlaneGeometry,
  Mesh,
} from "three";

function createFloorMat() {
  let floorMat = new MeshStandardMaterial({
    roughness: 0.8,
    color: 0xffffff,
    metalness: 0.2,
    bumpScale: 0.0005,
  });
  const textureLoader = new TextureLoader();
  textureLoader.load("textures/hardwood2_diffuse.jpg", (map) => {
    map.wrapS = RepeatWrapping;
    map.wrapT = RepeatWrapping;
    map.anisotropy = 4;
    map.repeat.set(10, 24);
    map.encoding = sRGBEncoding;
    floorMat.map = map;
    floorMat.needsUpdate = true;
  });
  textureLoader.load("textures/hardwood2_bump.jpg", (map) => {
    map.wrapS = RepeatWrapping;
    map.wrapT = RepeatWrapping;
    map.anisotropy = 4;
    map.repeat.set(10, 24);
    floorMat.bumpMap = map;
    floorMat.needsUpdate = true;
  });
  textureLoader.load("textures/hardwood2_roughness.jpg", (map) => {
    map.wrapS = RepeatWrapping;
    map.wrapT = RepeatWrapping;
    map.anisotropy = 4;
    map.repeat.set(10, 24);
    floorMat.roughnessMap = map;
    floorMat.needsUpdate = true;
  });

  return floorMat;
}

function createFloorGeometry() {
  return new PlaneGeometry(20, 20);
}

function createFloorMesh(floorMat) {
  const floorMesh = new Mesh(createFloorGeometry(), floorMat);
  floorMesh.receiveShadow = true;
  floorMesh.rotation.x = -Math.PI / 2.0;
  return floorMesh;
}

export { createFloorMat, createFloorGeometry, createFloorMesh };
