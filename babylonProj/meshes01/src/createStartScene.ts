//import "@babylonjs/core/Debug/debugLayer";
//import "@babylonjs/inspector";
import { SceneData } from "./interfaces";

import {
    Scene,
    ArcRotateCamera,
    StandardMaterial,
    SpotLight,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    Mesh,
    Light,
    Texture,
    Camera,
    ShadowGenerator,
    Color3,
    Engine,
  } from "@babylonjs/core";
  
    function createSphere(scene: Scene) {
    let sphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 2, segments: 32 },
      scene,
    );
    sphere.position.x = 0;
    sphere.position.y = 1;
    return sphere;
  }

  function createHemisphericLight(scene: Scene ){
    const light:HemisphericLight = new HemisphericLight("light", new Vector3(0, 5, 0),scene);
    light.intensity = 0.1;
    light.diffuse = new Color3(2, 2, 2);
    light.specular = new Color3(1, 1, 1);
    light.groundColor = new Color3(1, 1, 1);
    return light;
}

  function createSpotLight(scene: Scene ){
    const spotlight = new SpotLight("spotlight", new Vector3(7.5, 5, 0), 
    new Vector3(-5, -10, 0), Math.PI / 1.5, 1, scene);
    spotlight.intensity = 0.5;
    spotlight.diffuse = new Color3(1, 0, 0);
    spotlight.specular = new Color3(0, 1, 0);
    return spotlight;
}

  function createBox(scene: Scene) {
    let box = MeshBuilder.CreateBox("box",{size: 1}, scene);
    box.position.x = 3;
    box.position.y = 1;

    var texture = new StandardMaterial("reflective", scene);
    texture.ambientTexture = new Texture("../assets/rabbit.jpg", scene);
    texture.diffuseColor = new Color3(1, 1, 1);
    box.material = texture;
    
    return box;
  }

  function createCylinder(scene: Scene) {
    const cylinder = MeshBuilder.CreateCylinder("cylinder",{diameter: 1,tessellation:24}, scene);
    cylinder.position.x = 5;
    cylinder.position.y = 1;
    return cylinder;
  }  

  function createCone(scene: Scene) {
    const cone = MeshBuilder.CreateCylinder("cone",{diameterTop:0, height:2, tessellation:24, arc:1}, scene);
    cone.position.x = 7;
    cone.position.y = 1;
    return cone;
  }

  function createTriangle(scene: Scene) {
  const cone = MeshBuilder.CreateCylinder("tri",{height:2, tessellation:3}, scene);
    cone.position.x = 9;
    cone.position.y = 1;
    return cone;
  }
  

  
  function createGround(scene: Scene){
    let ground = MeshBuilder.CreateGround("ground", { width: 20, height: 6 }, scene);
    var groundMaterial = new StandardMaterial("groundMaterial", scene);
    groundMaterial.backFaceCulling = false;
    ground.material = groundMaterial;
    ground.receiveShadows = true;
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

  function createShadows(light: SpotLight, sphere: Mesh ,box: Mesh){
    const shadower = new ShadowGenerator(1024, light);
    const sm : any = shadower.getShadowMap();
    sm.renderList.push(sphere, box);

    shadower.setDarkness(0.8);
    shadower.useBlurExponentialShadowMap = true;
    shadower.blurScale = 2;
    shadower.blurBoxOffset = 1;
    shadower.useKernelBlur = true;
    shadower.blurKernel = 64;
    shadower.bias = 0;
    return shadower;
}
  
  export default function createStartScene(engine: Engine) {
    let scene = new Scene(engine);
    let box = createBox(scene);
    let sphere = createSphere(scene);
    let cylinder = createCylinder(scene);
    let cone = createCone(scene);
    let triangle = createTriangle(scene);
    let ground = createGround(scene);
    let camera = createArcRotateCamera(scene);
    let light = createHemisphericLight(scene);
    let spotlight = createSpotLight(scene);
    let shadowGenerator = createShadows(spotlight,sphere,box)

    let that: SceneData = {
      scene,
      box,
      sphere,
      cylinder,
      cone,
      triangle,
      light,
      spotlight,
      shadowGenerator,
      ground,
      camera,
    };
    return that;
  }