import {CubeGeometry,
        MeshPhongMaterial,
        Mesh,
        DoubleSide} from 'three';

import Meta from '../Meta';

import * as THREE from 'three';

import './loaders/GLTFLoader'

let models = []

export default class Graphics {

  constructor(props, stop = false){

    this.position = {
      x:props!==undefined&&props.position!==undefined&&props.position.x!==undefined?props.position.x:0,
      y:props!==undefined&&props.position!==undefined&&props.position.y!==undefined?props.position.y:0,
      z:props!==undefined&&props.position!==undefined&&props.position.z!==undefined?props.position.z:0
    };

    this.rotation = {
      x:props!==undefined&&props.rotation!==undefined&&props.rotation.x!==undefined?props.rotation.x:0,
      y:props!==undefined&&props.rotation!==undefined&&props.rotation.y!==undefined?props.rotation.y:0,
      z:props!==undefined&&props.rotation!==undefined&&props.rotation.z!==undefined?props.rotation.z:0
    };

    this.size = {
      x:props!==undefined&&props.size!==undefined&&props.size.x!==undefined?props.size.x:0,
      y:props!==undefined&&props.size!==undefined&&props.size.y!==undefined?props.size.y:0,
      z:props!==undefined&&props.size!==undefined&&props.size.z!==undefined?props.size.z:0
    };

    this.geometry = props!==undefined&&props.geometry!==undefined&&props.geometry!==true?props.geometry:new CubeGeometry();
    this.material = props!==undefined&&props.material!==undefined&&props.material!==true?props.material:new MeshPhongMaterial({color:Math.random()*0xffffff, side: DoubleSide});
    this.mesh = props!==undefined&&props.mesh!==undefined&&props.mesh!==true?props.mesh:new Mesh(this.geometry, this.material);

    this.type = props!==undefined&&props.type!==undefined?props.type:'box'

    this.model = props.model!==undefined?props.model:undefined;

    this.loader = undefined;

    //Is it a model?
    if(this.model !== undefined){

    this.fileName = this.model;

    //Add models default directory
    this.model = 'models/'+this.model

    this.mesh = new THREE.Object3D();
    //this.mesh.position.copy(this.position)

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
        this.mesh.position.set(this.position)
        console.log(this.position.x)


        //Add model id to list
        models.push([gltf.scene.id, this.model])

        //Set size
        //this.setSize()

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

    if(stop)
      return this;

    return new Meta({graphics: this, position: this.position, rotation: this.rotation, size: this.size});

  }

  setScale(scale){
    scale = scale!==undefined?scale:this.scale
    this.mesh.scale.set({
      x:scale.x,
      y:scale.y,
      z:scale.z
    })
  }

  setPosition(position){
    position = position!==undefined?position:this.position
    this.mesh.position.copy(position)
    return this;
  }

  setRotation(rotation){
    rotation = rotation!==undefined?rotation:this.rotation
    this.mesh.rotation.x = rotation.x * (Math.PI / 180);
    this.mesh.rotation.y = rotation.y * (Math.PI / 180);
    this.mesh.rotation.z = rotation.z * (Math.PI / 180);  
    return this;
  }

  add(instance){
    this.geometry = instance;
  }

}
