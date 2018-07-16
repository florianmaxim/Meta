import * as THREE from 'three'

import './three/examples/js/loaders/GLTFLoader'

import {CubeGeometry,
  MeshPhongMaterial,
  Mesh,
  DoubleSide} from 'three';

import Meta from '../Meta';

const _DEFAULT = {
TYPE: 'box' // typ for physics
}

//console.log(new THREE.GLTFLoader())

let scope;

export default class Graphics {

constructor(props, stop = false){

  scope = this

  this.geometry = props!==undefined&&props.geometry!==undefined&&props.geometry!==true?props.geometry:new CubeGeometry();
  this.material = props!==undefined&&props.material!==undefined&&props.material!==true?props.material:new MeshPhongMaterial({color:Math.random()*0xffffff, side: DoubleSide});

  this.type = props!==undefined&&props.type!==undefined&&props.type!==true?props.type:_DEFAULT.TYPE;

  this.mesh = props!==undefined&&props.mesh!==undefined&&props.mesh!==true?props.mesh:new Mesh(this.geometry, this.material);

  this.model = props.model!==undefined?props.model:undefined;

  this.loader = undefined;

  if(this.model !== undefined){

  //Add models default directory
  this.model = 'models/'+this.model

  this.mesh = new THREE.Object3D();

  const extentions = [
    'gltf'
  ]
  const loaders = [
    'new THREE.GLTFLoader()'
  ]

  //Check for provided file extention
  if(this.model.includes(".")){

    //Auto-detect loader by provided model file extension
    let fileExtention;
    
    const pattern = /\.([0-9a-z]+)(?:[\?#]|$)/i;

    const result = this.model.match(pattern);

    fileExtention = result[1]

    scope.loader = eval(loaders[extentions.indexOf(fileExtention)])

    loadModel(scope.loader)

    return
  }

  //Auto-detect loader by testing model file extension
  extentions.forEach((extention) => {
    if(scope.loader!==undefined) return;
    fetch(this.model+extention)
    .then(function(response) {
      if(response.status===200){
        scope.loader = eval(loaders[extentions.indexOf(extention)])
        //Add extentions to model file path
        scope.model = scope.model+'.'+extention
        //load model
        loadModel(scope.loader)
      }
    })
    .catch(error => console.error(error));
  })

  function loadModel(loader){
    loader.load( scope.model, ( gltf ) => {
      scope.mesh.add( gltf.scene );
    });
  }


}

this.physics = true;

if(props.p!==undefined)
this.physics  = props.p;

if(props.physics!==undefined)
this.physics  = props.physics;

//Stop the recursion if stop is set
if(stop)
return this;

//console.log('[Graphics] - Has no caller, so go to Meta first')

return new Meta({graphics: this, physics: this.physics});

}

setPosition(position){
this.mesh.position.copy(position)
return this;
}

setRotation(rotation){
  this.mesh.rotation.x = rotation.x
  this.mesh.rotation.y = rotation.y
  this.mesh.rotation.z = rotation.z

  return this;
}

color(color){
//this.mesh.material.color.set(color);
return this;
}

add(instance){
this.geometry = instance;
}

}
