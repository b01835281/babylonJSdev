import { Vector3, Quaternion } from "@babylonjs/core";

import { SceneData } from "./interfaces";

// rotate cone
let coneAngle: number = 0.3;
let coneSpeed: number = 0.01;

// vertical oscilation of meshes
let verticalSpeed: number = 0.006;
let verticalAngle: number = 0;
let verticalRangeY: number = 0.3;
let conePositionY: number = 1;

export default function createRunScene(runScene: SceneData) {
  runScene.scene.onAfterRenderObservable.add(() => {
    // rotate cone
    const axis: Vector3 = new Vector3(0, 0, 1).normalize();
    const quat: Quaternion = Quaternion.RotationAxis(
      axis,
      coneAngle * 2 * Math.PI
    );
    runScene.cone.rotationQuaternion = quat;
    coneAngle += coneSpeed;
    coneAngle %= 1;


    // vertical oscilation of meshes
    runScene.cone.position.y =
      conePositionY + verticalRangeY * Math.sin(verticalAngle * 2 * Math.PI);
    verticalAngle += verticalSpeed;
    verticalAngle %= 1;
  });
}
