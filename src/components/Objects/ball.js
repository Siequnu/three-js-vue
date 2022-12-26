import {
  MeshStandardMaterial,
  TextureLoader,
  sRGBEncoding,
  SphereGeometry,
  Mesh,
} from "three";

function createBallMat() {
  const textureLoader = new TextureLoader();
  let ballMat = new MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
    metalness: 1.0,
  });
  textureLoader.load("textures/planets/earth_atmos_2048.jpg", (map) => {
    map.anisotropy = 4;
    map.encoding = sRGBEncoding;
    ballMat.map = map;
    ballMat.needsUpdate = true;
  });
  textureLoader.load("textures/planets/earth_specular_2048.jpg", (map) => {
    map.anisotropy = 4;
    map.encoding = sRGBEncoding;
    ballMat.metalnessMap = map;
    ballMat.needsUpdate = true;
  });

  return ballMat;
}

function createBallGeometry() {
  return new SphereGeometry(0.25, 32, 32);
}

function createBallMesh(ballMat) {
  const ballMesh = new Mesh(createBallGeometry(), ballMat);
  ballMesh.position.set(1, 0.25, 1);
  ballMesh.rotation.y = Math.PI;
  ballMesh.castShadow = true;
  return ballMesh;
}

export { createBallMat, createBallGeometry, createBallMesh };
