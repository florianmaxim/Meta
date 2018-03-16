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
  COLOR: 0xc2b280
}

export default class Brick {

  constructor(){

    return new Meta({

      graphics: new Graphics(

        {
          geometry: new Cube(

            {
              width: 1,
              height: 1,
              length: 1

            }, true) // !IMPORTANT : Stops the recursion!

        }, true) // !IMPORTANT : Stops the recursion!

    }).m('u', 5).p()

  }

}
