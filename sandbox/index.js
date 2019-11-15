/* eslint-disable no-new */
import * as THREE from 'three';

import {
  Graphics,
  Meta,
  on,
  Physics,
  Body,
  Cube,
} from '../src';

new Cube()
.live((_this) => {
  console.log('hi')
 //_this.r('r', .01);
});
