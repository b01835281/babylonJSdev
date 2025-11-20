import {
    Scene,
    ArcRotateCamera,
    AssetsManager,
    Vector3,
    HemisphericLight,
    PointLight,
    MeshBuilder,
    Mesh,
    Light,
    Camera,
    Engine,
    Color3,
} from "@babylonjs/core";

export interface SceneData {
  scene: Scene;
  // audio: Sound;
  lightHemispheric: HemisphericLight;
  camera: Camera;
  ground: Mesh;
}