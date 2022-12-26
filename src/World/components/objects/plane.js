import {
  PlaneGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  DoubleSide,
} from "three";

function createPlane(
  color = "white",
  length = 2,
  width = 2,
  position = [0, 0, 0],
  meshType = "basic"
) {
  // create a geometry
  const geometry = new PlaneGeometry(length, width);

  // create a default (white) Basic material
  let material = "";
  switch (meshType) {
    case "standard":
      material = new MeshStandardMaterial({ color });
      break;
    case "basic":
      material = new MeshBasicMaterial({ color: color, side: DoubleSide });
      break;
  }

  // create a Mesh containing the geometry and material
  const plane = new Mesh(geometry, material);

  plane.position.set(position[0], position[1], position[2]);

  plane.tick = (delta) => {};

  plane.rotateX(30);

  return plane;
}

export { createPlane };
