import {
  MeshStandardMaterial,
  TextureLoader,
  RepeatWrapping,
  sRGBEncoding,
  BoxGeometry,
  Mesh,
} from "three";

function createWallMat() {
  const textureLoader = new TextureLoader();
  let cubeMat = new MeshStandardMaterial({
    roughness: 0.7,
    color: 0xffffff,
    bumpScale: 0.002,
    metalness: 0.2,
  });
  textureLoader.load("textures/brick_diffuse.jpg", (map) => {
    map.wrapS = RepeatWrapping;
    map.wrapT = RepeatWrapping;
    map.anisotropy = 4;
    map.repeat.set(1, 1);
    map.encoding = sRGBEncoding;
    cubeMat.map = map;
    cubeMat.needsUpdate = true;
  });
  textureLoader.load("textures/brick_bump.jpg", (map) => {
    map.wrapS = RepeatWrapping;
    map.wrapT = RepeatWrapping;
    map.anisotropy = 4;
    map.repeat.set(1, 1);
    cubeMat.bumpMap = map;
    cubeMat.needsUpdate = true;
  });

  return cubeMat;
}

function createWallGeometry(size) {
  return new BoxGeometry(size.x, size.y, size.z);
}

function createWallMesh(position, size = { x: 10, y: 10, z: 0.3 }) {
  const cubeMesh = new Mesh(createWallGeometry(size), createWallMat());
  cubeMesh.position.set(position.x, position.y, position.z);
  cubeMesh.rotation.y = Math.PI;
  cubeMesh.castShadow = true;
  return cubeMesh;
}

export { createWallMat, createWallGeometry, createWallMesh };
