// import "@babylonjs/core/Debug/debugLayer";
// import "@babylonjs/inspector";
import {
    Scene,
    ArcRotateCamera,
    Quaternion,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    Mesh,
    Light,
    Camera,
    StandardMaterial,
    Texture,
    Engine,
    Color3,
    ThinGrainPostProcess,
  } from "@babylonjs/core";
  
  
  function createBox(scene: Scene) {
    let box = MeshBuilder.CreateBox("box",{size: 2}, scene);
    box.position.y = 1;

    var texture = new StandardMaterial("reflective", scene);
        texture.ambientTexture = new Texture("./assets/reflectivity.png", scene);
        texture.diffuseColor = new Color3(1, 1, 1);
        box.material = texture;

    return box;
  }



  
  function createLight(scene: Scene) {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.8;
    light.diffuse = new Color3(0, 1, 0);
    return light;
  }
  
  
  function createGround(scene: Scene) {
    let ground = MeshBuilder.CreateGround(
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
    }

    // rotate box
    let boxAngle: number = -0.6;
    let boxSpeed: number = -0.01;
  
    let that: SceneData = { scene: new Scene(engine) };
    // that.scene.debugLayer.show();
  
    that.box = createBox(that.scene);
    that.light = createLight(that.scene);
    that.ground = createGround(that.scene);
    that.camera = createArcRotateCamera(that.scene);
    



    that.scene.onAfterRenderObservable.add(() => {
    // rotate box
    const axis: Vector3 = new Vector3(0, 1, 0).normalize();
    const quat: Quaternion = Quaternion.RotationAxis(
      axis,
      boxAngle * 2 * Math.PI
    );
    that.box!.rotationQuaternion = quat;
    boxAngle += boxSpeed;
    boxAngle %= 1;
  });


return that;
  }
