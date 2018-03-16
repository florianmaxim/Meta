import {CubeGeometry,
        MeshBasicMaterial,
        MeshPhongMaterial,
        Mesh,
        DoubleSide} from 'three';

import Meta from '../Meta';

const _DEFAULT = {
  TYPE: 'box' // typ for physics
}

export default class Graphics {

  constructor(props, stop = false){

    this.geometry = props!==undefined&&props.geometry!==undefined&&props.geometry!==true?props.geometry:new CubeGeometry();
    this.material = props!==undefined&&props.material!==undefined&&props.material!==true?props.material:new MeshPhongMaterial({color:Math.random()*0xffffff, side: DoubleSide});

    this.type = props!==undefined&&props.type!==undefined&&props.type!==true?props.type:_DEFAULT.TYPE;

    this.mesh = props!==undefined&&props.mesh!==undefined&&props.mesh!==true?props.mesh:new Mesh(this.geometry, this.material);

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

  color(color){
    this.mesh.material.color.set(color);
  }

  add(instance){
    this.geometry = instance;
  }

}
