import {CubeGeometry} from 'three';

import Graphics from '../Graphics';

import Space from '../../../Space';

const _DEFAULT = {
  WIDTH: 1,
  HEIGHT: 1,
  LENGTH: 1,
  SCALE: .5
};

export default class Cube {

  constructor(props = {}, stop = false){

    let scale = _DEFAULT.SCALE;

    if(typeof(props)==='boolean') stop = props;

    let _width  = props.w||props.width||_DEFAULT.WIDTH;
    let _height = props.h||props.height||_DEFAULT.HEIGHT;
    let _length = props.l||props.length||_DEFAULT.LENGTH;

    if(typeof(props)==='number') _width = _height = _length = props;

    _width = _width * scale
    _height = _height * scale;
    _length = _length * scale;

    this.geometry = new CubeGeometry( _width, _height, _length );
    this.type     = 'box'; //This is for the physics. Doesnt really belong in here.

    //Go recursive if stop is not set
    return stop?this.geometry:new Graphics(this);

  }

}
