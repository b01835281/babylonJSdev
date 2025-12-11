import {
  Scene,
  Mesh,
  HemisphericLight,
  PointLight,
  SpotLight,
  DirectionalLight,
  Camera,
  ShadowGenerator,
} from "@babylonjs/core";

export interface SceneData {
  scene: Scene;
  box: Mesh;
  light: HemisphericLight;
  spotlight: SpotLight;
  cylinder: Mesh;
  cone: Mesh;
  triangle: Mesh;
  sphere: Mesh;
  ground: Mesh;
  camera: Camera;
  shadowGenerator: ShadowGenerator;
}
