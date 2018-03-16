import {Space, 
        Ground, 
        Grid, 
        Sphere,
        on} from './meta-client/lib';

new Space({color:0xff0000})
new Ground({color:0x0000ff})
new Grid({color:0x000000})

on('touch', (there) => {
  
  new Sphere().color('red').set(there)
  
})