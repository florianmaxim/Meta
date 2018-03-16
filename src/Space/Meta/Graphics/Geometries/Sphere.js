import {SphereGeometry} from 'three';

import Graphics from '../Graphics';

import Space from '../../../Space';

const _DEFAULT = {
  RADIUS: .5,
  SEGMENTS: 32,
  SCALE: 1
}

export default class Sphere {

  constructor(props = {}, stop = false){

    if(typeof(props)==='boolean') stop = props;

    let scale = _DEFAULT.SCALE;

    let _radius = props.r||props.radius||_DEFAULT.RADIUS;

    _radius *= scale;

    if(typeof(props)==='number') _radius = props;

    this.geometry = new SphereGeometry( _radius, _DEFAULT.SEGMENTS, _DEFAULT.SEGMENTS );
    this.geometry.rotateX(-Math.PI/2);

    this.type     = 'sphere'; //This is for the physiscs @todo Should go somewhere else.

    //Go recursive if stop isnt set.
    return stop?this.geometry:new Graphics(this);

  }

}
