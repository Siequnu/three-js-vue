import { SphereGeometry, PointLight, MeshStandardMaterial, Mesh } from "three";

function createBulbLight() {
  const bulbGeometry = new SphereGeometry(0.02, 16, 8);
  let bulbLight = new PointLight(0xffee88, 1, 100, 2);

  let bulbMat = new MeshStandardMaterial({
    emissive: 0xffffee,
    emissiveIntensity: 1,
    color: 0x000000,
  });
  bulbLight.add(new Mesh(bulbGeometry, bulbMat));
  bulbLight.position.set(0, 2, 0);
  bulbLight.castShadow = true;

  return { bulbLight, bulbMat };
}

export { createBulbLight };
