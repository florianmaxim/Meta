import {Space, Ground, Grid} from './meta-client/lib';

import {on, Cube, Sphere, Cylinder, Plane} from './meta-client/lib';

new Ground();
new Grid();

const sphere = new Sphere({
  p:false,
  r:.1
})

const cube = new Cube({
  p:false,
  w:.2,
  h:.2,
  l:.2
})

on('touch', (data) => {

  if(data.hand===0){
    sphere.set({
      position:{
        x:data.position.x,
        y:data.position.y+1,
        z:data.position.z
      }
    })
  }

  if(data.hand===1){
    cube.set({
      position:{
        x:data.position.x,
        y:data.position.y+1,
        z:data.position.z
      }
    })
  }
})