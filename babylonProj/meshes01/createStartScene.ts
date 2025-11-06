//import "@babylonjs/core/Debug/debugLayer";
//import "@babylonjs/inspector";
import {
    Scene,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    Mesh,
    Light,
    Camera,
    Engine,
  } from "@babylonjs/core";
  
  
  function createBox(scene: Scene) {
    const box = MeshBuilder.CreateBox("box",{size: 1}, scene);
    box.position.y = 3;
    return box;
  }

  function createCylinder(scene: Scene) {
    const cylinder = MeshBuilder.CreateBox("cylinder",{size: 1}, scene);
    cylinder.position.x= 3;
    cylinder.position.y=1;
    return cylinder;
  }

  function createCone(scene: Scene) {
    const cone = MeshBuilder.CreateBox("cone",{size: 1}, scene);
    cone.position.x= 1;
    cone.position.y= 7;
    return cone;
  }

  function createTriangle(scene: Scene) {
    const triangle = MeshBuilder.CreateBox("triangle",{size: 1}, scene);
    triangle.position.x= 6;
    triangle.position.y=4;
    return triangle;
  }

  function createCapsule(scene: Scene) {
    const capsule = MeshBuilder.CreateBox("capsule",{size: 1}, scene);
    capsule.position.x= 6;
    capsule.position.y=4;
    return capsule;
  }
  
  function createLight(scene: Scene) {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    return light;
  }
  
  function createSphere(scene: Scene) {
    const sphere = MeshBuilder.CreateSphere(
      "ellipsoid",
      { diameter: 0.7, diameterY:3, segments: 32 },
      scene,
    );
    sphere.position.x = 0;
    sphere.position.y = 1;
    return sphere;
  }
  
  function createGround(scene: Scene) {
    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 6, height: 6 },
      scene,
    );
    return ground;
  }

  
  function createArcRotateCamera(scene: Scene) {
    let camAlpha = -Math.PI / 2,
      camBeta = Math.PI / 2.5,
      camDist = 10,
      camTarget = new Vector3(0, 0, 0);
    let camera = new ArcRotateCamera(
      "camera1",
      camAlpha,
      camBeta,
      camDist,
      camTarget,
      scene,
    );
    camera.attachControl(true);
    return camera;
  }
  
  export default function createStartScene(engine: Engine) {
    interface SceneData {
      scene: Scene;
      box?: Mesh;
      light?: Light;
      sphere?: Mesh;
      ground?: Mesh;
      camera?: Camera;
      cylinder?: Mesh;
      cone?: Mesh;
      triangle?: Mesh;
      capsule?: Mesh;
    }
  
    let that: SceneData = { scene: new Scene(engine) };
    //that.scene.debugLayer.show();
  
    that.box = createBox(that.scene);
    that.light = createLight(that.scene);
    that.sphere = createSphere(that.scene);
    that.ground = createGround(that.scene);
    that.camera = createArcRotateCamera(that.scene);
    that.cylinder = createCylinder(that.scene);
    that.cone = createCone(that.scene);
    that.triangle = createTriangle(that.scene);
    that.capsule = createCapsule(that.scene);
    return that;
  }