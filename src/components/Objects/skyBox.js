import {
  BoxGeometry,
  Mesh,
  TextureLoader,
  MeshBasicMaterial,
  BackSide,
} from "three";

function createSkyBox(scene) {
  scene.add(new Mesh(new BoxGeometry(100, 100, 100), createMaterialArray()));
}

function createMaterialArray() {
  return createPathStrings().map((path) => {
    return new MeshBasicMaterial({
      map: new TextureLoader().load(path),
      side: BackSide,
    });
  });
}

function createPathStrings() {
  const basePath = "/static/skybox1";
  const fileType = "png";
  return [...Array(6)].map(
    (_, index) => `${basePath}/${index + 1}.${fileType}`
  );
}

export { createSkyBox };
