import { SphereGeometry, PointLight, MeshStandardMaterial, Mesh } from "three";

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

//bulbMat.emissiveIntensity = bulbLight.intensity / Math.pow(0.02, 2.0); // convert from intensity to irradiance at bulb surface

function createBulbLight(intensity = 5, position = { x: 0, y: 2, z: 0 }) {
  const bulbGeometry = new SphereGeometry(0.02, 16, 8);
  let bulbLight = new PointLight(0xffee88, intensity, 100, 2);

  let bulbMat = new MeshStandardMaterial({
    emissive: 0xffffee,
    emissiveIntensity: 1,
    color: 0x000000,
  });
  bulbLight.add(new Mesh(bulbGeometry, bulbMat));
  bulbLight.position.set(position.x, position.y, position.z);
  bulbLight.castShadow = true;

  return bulbLight;
}

export { createBulbLight };
