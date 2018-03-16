/*

  CUSTOM Meta

  !IMPORTANT:

  Custom Meta's properties must have a
  false argument as a last property,
  which stops the recursion instaniation.

*/

import {GridHelper} from 'three';

import Meta   from '../Meta';

import Graphics from '../Graphics/Graphics';

import Plane    from '../Graphics/Geometries/Plane';

const _DEFAULT = {
  COLOR: 0xf08e91
};

export default class Grid {

  constructor(props){

    const _color = props!==undefined&&props.color!==undefined?props.color:_DEFAULT.COLOR;

    return new Meta({

      physics: null,

      graphics: new Graphics(

        {

          mesh: new GridHelper(1000,1000,_color,_color).translateY(.001) // !IMPORTANT : Dpesn't need a stop flag, because it comes from three directly!

        }, true )  // !IMPORTANT : Stops the recursion!

    })

  }

}
