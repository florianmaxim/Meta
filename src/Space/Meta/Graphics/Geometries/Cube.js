import {CubeGeometry, DoubleSide, MeshPhongMaterial} from 'three';

import Graphics from '../Graphics';

import Space from '../../../Space';

const _DEFAULT = {
  WIDTH: 1,
  HEIGHT: 1,
  LENGTH: 1,
  SCALE: 1
};

export default class Cube {

  constructor(props = {}, stop = false){

    let scale = _DEFAULT.SCALE;

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

    if(typeof(props)==='boolean') stop = props;

    let _width  = props.w||props.width||_DEFAULT.WIDTH;
    let _height = props.h||props.height||_DEFAULT.HEIGHT;
    let _length = props.l||props.length||_DEFAULT.LENGTH;

    if(typeof(props)==='number') _width = _height = _length = props;

    _width = _width * scale
    _height = _height * scale;
    _length = _length * scale;

    this.geometry = new CubeGeometry( _width, _height, _length );
    this.material = props!==undefined&&props.material!==undefined&&props.material!==true?props.material:new MeshPhongMaterial({color:Math.random()*0xffffff, side: DoubleSide});
    
    this.type     = 'box'; //This is for the physics. Doesnt really belong in here.

    //alert(this.rotation.y)
    //Go recursive if stop is not set
    return stop?this.geometry:new Graphics(props);

  }

}
