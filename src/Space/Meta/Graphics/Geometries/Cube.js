import * as THREE from 'three';

import Graphics from '../Graphics';

import {Meta} from '../Graphics';

export default class Cube {

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

    this.geometry = new THREE.BoxGeometry(1,1,1);

    this.type     = 'box';

    if(stop)
      return this.geometry;

    return new Graphics(this);
   
  }

}
