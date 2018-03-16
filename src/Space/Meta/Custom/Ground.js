/*

  CUSTOM Meta

  !IMPORTANT:

  Custom Meta's properties must have a
  false argument as a last property,
  which stops the recursion instaniation.

*/

import Meta   from '../Meta';

import Graphics from '../Graphics/Graphics';

import Cube    from '../Graphics/Geometries/Cube';

const _DEFAULT = {
  COLOR: 0x898989
};

export default class Ground {

  constructor(props){

    const _color = props!==undefined&&props.color!==undefined?props.color:_DEFAULT.COLOR;

    return new Meta({

      physics: false,

      graphics: new Graphics(

        {
          geometry: new Cube(

            {

              width: 100,
              height: 0.001,
              length: 100

            }, true) // !IMPORTANT : Stops the recursion!

        }, true) // !IMPORTANT : Stops the recursion!

    }).c(_color)

  }

}
