import * as THREE from 'three'

import './three/examples/js/loaders/GLTFLoader'

import Model from './Model/Model';

import {CubeGeometry,
  MeshPhongMaterial,
  Mesh,
  DoubleSide} from 'three';

import Meta from '../Meta';

const _DEFAULT = {
TYPE: 'box' // typ for physics
}

let models = [];

export {Meta}

/** This class represents the visual representation of a Meta object. This is the only class in this library that is directly communicating with the 3D graphics libraray three.js.
* @constructor
* @param {Object} geometry
* @param {Object} material
*/
export default class Graphics {

constructor(props, stop = false){

  //props
  this.size = {
    x: props!==undefined&&props.size!==undefined&&props.size.x!==undefined?props.size.x:1,
    y: props!==undefined&&props.size!==undefined&&props.size.y!==undefined?props.size.y:1,
    z: props!==undefined&&props.size!==undefined&&props.size.z!==undefined?props.size.z:1
  };
  this.position = {
    x: props!==undefined&&props.position!==undefined&&props.position.x!==undefined?props.position.x:0,
    y: props!==undefined&&props.position!==undefined&&props.position.y!==undefined?props.position.y:0,
    z: props!==undefined&&props.position!==undefined&&props.position.z!==undefined?props.position.z:0        
  }
  this.rotation = {
    x: props!==undefined&&props.rotation!==undefined&&props.rotation.x!==undefined?props.rotation.x:0,
    y: props!==undefined&&props.rotation!==undefined&&props.rotation.y!==undefined?props.rotation.y:0,
    z: props!==undefined&&props.rotation!==undefined&&props.rotation.z!==undefined?props.rotation.z:0                
  };
  
  this.geometry = props!==undefined&&props.geometry!==undefined&&props.geometry!==true?props.geometry:new CubeGeometry();
  this.material = props!==undefined&&props.material!==undefined&&props.material!==true?props.material:new MeshPhongMaterial({color:Math.random()*0xffffff, side: DoubleSide});

  this.type = props!==undefined&&props.type!==undefined&&props.type!==true?props.type:_DEFAULT.TYPE;

  this.mesh = props!==undefined&&props.mesh!==undefined&&props.mesh!==true?props.mesh:new Mesh(this.geometry, this.material);

  this.model = props.model!==undefined?props.model:undefined;

  this.loader = undefined;

  //Is it a model?
  if(this.model !== undefined){

  this.fileName = this.model;

  //Add models default directory
  this.model = 'models/'+this.model

  this.mesh = new THREE.Object3D();

  const extentions = [
    'gltf'
  ]
  const loaders = [
    'new THREE.GLTFLoader()'
  ]

  const loadModel = (loader) => {
    
    loader.load( this.model, ( gltf ) => {

      //Add model to scene
      this.mesh.add( gltf.scene );

      //Add model id to list
      models.push([gltf.scene.id, this.model])

      //Set size
      this.setSize()

    })

  }

  //Check for provided file extention
  if(this.model.includes(".")){

    //Auto-detect loader by provided model file extension
    let fileExtention;
    
    const pattern = /\.([0-9a-z]+)(?:[\?#]|$)/i;

    const result = this.model.match(pattern);

    fileExtention = result[1]

    this.loader = eval(loaders[extentions.indexOf(fileExtention)])

    loadModel(this.loader)

    return
  }

  //Auto-detect loader by testing model file extension
  console.log('auto dectect file extention')
  extentions.forEach((extention) => {
    if(this.loader!==undefined) return;
    fetch(this.model+extention)
    .then((response) => {
      //Check if this file exists
      if(response.status===200){
        //Select loader
        this.loader = eval(loaders[extentions.indexOf(extention)])
        //Add extentions to model file path
        this.model = this.model+'.'+extention
        //load model
        loadModel(this.loader)
      }
    })
    .catch(error => console.error(error));
  })


}

  //forward physics prop
  this.physics = true;
  if(props.p!==undefined)
  this.physics  = props.p;
  if(props.physics!==undefined)
  this.physics  = props.physics;

  //Stop the recursion if stop is set
  if(stop)
  return this;

  //console.log('[Graphics] - Has no caller, so go to Meta first')
  return new Meta({
    position: this.position, 
    graphics: this, 
    physics: this.physics
  });
}

setSize(){

   let box3 = new THREE.Box3().setFromObject(this.mesh);

   console.log(box3)

   let x = box3.max.x - box3.min.x;
   let y = box3.max.y - box3.min.y;
   let z = box3.max.z - box3.min.z;

   switch(this.type){
     case 'box':
       this.size = [x,y,z]
     break;
     case 'sphere':
       this.size = [x/2]
     break;
     case 'cylinder':
       this.size = [x/2,y,z/2]
     break;
   }
   console.log(this.size);

   return this;
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

  static getModels(){
    return models;
  }

}
