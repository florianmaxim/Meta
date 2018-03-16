import config from '../config';

import Space     from './Space/Space';
import {on,timer}from './Space/Space';

import Meta    from './Space/Meta/Meta';

import Graphics  from './Space/Meta/Graphics/Graphics';
import Existence from './Space/Meta/Existence/Existence';

import Cube      from './Space/Meta/Graphics/Geometries/Cube';
import Sphere    from './Space/Meta/Graphics/Geometries/Sphere';
import Cylinder  from './Space/Meta/Graphics/Geometries/Cylinder';
import Plane     from './Space/Meta/Graphics/Geometries/Plane';

import Ground    from './Space/Meta/Custom/Ground';
import Grid      from './Space/Meta/Custom/Grid';
import Brick     from './Space/Meta/Custom/Brick';

import Model     from './Space/Meta/Graphics/Geometries/Model';

const _DEFAULT = {

  COLOR: {
    PRIMARY: '#548adf',
    SECONDARY: '#9aa9fe',
    TEXT: '#ffffff'
  }

}
console.log(`%c ◯ META.Client.${config.version}`, `background: linear-gradient(${_DEFAULT.COLOR.PRIMARY}, ${_DEFAULT.COLOR.SECONDARY});color: ${_DEFAULT.COLOR.TEXT};`);

export default class Void {

  constructor(){

      this.space = new Space();
  
    }

}

//random
const r = (min, max) => {
  const _min = min!==undefined?min:10;
  const _max = max!==undefined?max:0;
  return (Math.random() * (_max - _min)) + _min;
}

export {r};
export {r as random};

export {Meta,
        Cube,
        Sphere,
        Cylinder,
        Plane,
        Model};

export {
  Existence,
  Graphics
}

export {Space};
export {on as on};
export {timer as timer};
export {timer as ti}; //Naja...

export {Cube as C};
export {Sphere as S};
export {Cylinder as Y};
export {Plane as P};

export {Model as M};

/*
  Custom Meta
*/

export {Ground};
export {Grid};
export {Brick};
