import {
  PlaneGeometry,
  Mesh,
  MeshStandardMaterial,
  DoubleSide,
  TextureLoader,
} from "three";

function createFloor(
  color = "white",
  length = 2,
  width = 2,
  position = [0, 0, 0]
) {
  // create a geometry
  const geometry = new PlaneGeometry(length, width);

  // Add a texture
  const texture = new TextureLoader().load(
    "/assets/textures/Wood_Tiles_002_basecolor.jpg"
  );
  const displacementMap = new TextureLoader().load(
    "/assets/textures/Wood_Tiles_002_height.png"
  );
  const normalMap = new TextureLoader().load(
    "/assets/textures/Wood_Tiles_002_normal.jpg"
  );
  const roughnessMap = new TextureLoader().load(
    "/assets/textures/Wood_Tiles_002_roughness.jpg"
  );
  const aoMap = new TextureLoader().load(
    "/assets/textures/Wood_Tiles_002_ambientOcclusion.jpg"
  );

  // create a default (white) Basic material
  let material = new MeshStandardMaterial({
    color: color,
    bumpMap: texture,
    side: DoubleSide,
    displacementMap: displacementMap,
    normalMap: normalMap,
    roughnessMap: roughnessMap,
    aoMap: aoMap,
  });

  // create a Mesh containing the geometry and material
  const plane = new Mesh(geometry, material);

  plane.position.set(position[0], position[1], position[2]);

  plane.tick = (delta) => {};

  plane.rotateX(30);

  return plane;
}

export { createFloor };
