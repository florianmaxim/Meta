import {CylinderGeometry} from 'three';

import Graphics from '../Graphics';

import Space from '../../../Space';
//import Desktop from '../../../Device/Desktop/Desktop';

const _DEFAULT = {
  TOP: 0,
  BOTTOM: 0.25,
  HEIGHT: 1,

  SEGMENTS: 32,
  SCALE: 1
}

export default class Cylinder {

  constructor(props = {}, stop = false){

    if(typeof(props)==='boolean') stop = props;

    let scale = _DEFAULT.SCALE;

    let _top    = props.t||props.top||_DEFAULT.TOP;
    let _bottom = props.b||props.bottom||_DEFAULT.BOTTOM;
    let _height = props.h||props.height||_DEFAULT.HEIGHT;

    if(typeof(props)==='number') _top = _bottom = props/2;
    if(typeof(props)==='number') _height = props;

    _top *= scale;
    _bottom *= scale;
    _height *= scale;

    this.geometry = new CylinderGeometry(_top, _bottom, _height, _DEFAULT.SEGMENTS );
    this.type     = 'cylinder';

   //Go recursive if stop isnt set.
   return stop?this.geometry:new Graphics(this);

  }

}


// if(radiusTop===undefined&&radiusBottom===undefined&&height===undefined){
//   height = 5;
//   radiusTop = height/2;
//   radiusBottom= height/2;
// }
//
// if(radiusBottom===undefined&&height===undefined){
//   radiusTop = height/2;
//   radiusBottom= height/2;
// }
//
// if(height===undefined){
//   height = radiusBottom*2;
// }
