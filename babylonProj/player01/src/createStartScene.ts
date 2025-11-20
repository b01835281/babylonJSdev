//import "@babylonjs/core/Debug/debugLayer";
//import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF/2.0";
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
import { loadConfigFromFile } from "vite";
  
  
  function createHemisphericLight(scene: Scene) {
    let light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    light.diffuse = new Color3(1, 0.5, 1);
    return light;
  }
  
  function createGround(scene: Scene) {
    let ground = MeshBuilder.CreateGround("ground",{ width: 12, height: 12 },scene,);
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
  
  function addAssets(scene: Scene){
  // add assets
  const assetsManager = new AssetsManager(scene);
  const tree1 = assetsManager.addMeshTask(
    "tree task",
    "",
    "./assets/glTF/",
    "BirchTree_1.gltf"
  );
  tree1.onSuccess = function(task){
    task.loadedMeshes[0].position = new Vector3(3,0,2);
    task.loadedMeshes[0].scaling = new Vector3(0.9,0.9,0.9);

    const tree1Clone = task.loadedMeshes[0].clone("tree1_clone", null);
    tree1Clone!.position = new Vector3(-2,0,-3);
  }


    const tree2 = assetsManager.addMeshTask(
    "tree task",
    "",
    "./assets/glTF/",
    "BirchTree_2.gltf"
  );
  tree2.onSuccess = function(task){
    task.loadedMeshes[0].position = new Vector3(0,0,0);
    task.loadedMeshes[0].scaling = new Vector3(1.2,1.2,1.2);

    const tree2Clone = task.loadedMeshes[0].clone("tree2_clone", null);
    tree2Clone!.position = new Vector3(-6,0,-4);
  }

    const tree3 = assetsManager.addMeshTask(
    "tree task",
    "",
    "./assets/glTF/",
    "BirchTree_3.gltf"
  );
  tree3.onSuccess = function(task){
    task.loadedMeshes[0].position = new Vector3(8,0,-2);
    task.loadedMeshes[0].scaling = new Vector3(1,1,1);

    const tree3Clone = task.loadedMeshes[0].clone("tree3_clone", null);
    tree3Clone!.position = new Vector3(-4,0,8);
  }

  assetsManager.onTaskErrorObservable.add(function (task){
    console.log(
      "task failed",
      task.errorObject.message,
      task.errorObject.exception
    );
  });

  return assetsManager;
  }

  export default function createStartScene(engine: Engine) {
    interface SceneData {
      scene: Scene;
      light?: Light;
      ground?: Mesh;
      camera?: Camera;
    }
  
    let that: SceneData = { scene: new Scene(engine) };
    //that.scene.debugLayer.show();
  
    that.light = createHemisphericLight(that.scene);
    that.ground = createGround(that.scene);
    that.camera = createArcRotateCamera(that.scene);
    const assetsManager = addAssets(that.scene);
    assetsManager.load();

    return that;
  }