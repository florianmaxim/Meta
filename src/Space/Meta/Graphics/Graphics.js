import {CubeGeometry,
        MeshPhongMaterial,
        Mesh,
        DoubleSide} from 'three';

import Meta from '../Meta';

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

    //this.setPosition();
    //this.setRotation();

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
