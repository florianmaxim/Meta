import {PlaneGeometry} from 'three';

import Graphics from '../Graphics'

const _DEFAULT = {
  WIDTH: 1,
  LENGTH: 1
}

export default class Plane {

  constructor(props = {}, stop = false){

    if(typeof(props)==='boolean') stop = props;

    const _width = props.width||props.w||_DEFAULT.WIDTH;
    const _length = props.length||props.l||_DEFAULT.LENGTH;

    this.physics = true;

    if(props.p!==undefined)
      this.physics  = props.p;

    if(props.physics!==undefined)
      this.physics  = props.physics;

    this.geometry = new PlaneGeometry( _width, _length );
    this.geometry.rotateX(-Math.PI/2);
    this.type     = 'box';

    //Stop the recursion if stop is set
    if(stop)
      return this.geometry;

    ////console.log('[Sphere] - Has no caller, so go recursive: to Graphics first!');

    return new Graphics(this);

  }

}
