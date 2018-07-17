
import * as THREE from 'three';

import {Model, M, Meta, Graphics, Ground, Cube, on} from './src/index';


new Meta({
    graphics: new Graphics({
        model: 'helmet.gltf'
    }, true)
})
.move("left", 3)
.live("on", meta => {
    meta.rotate("right", .01)
})

new Meta({
    graphics: new Graphics({
        model: 'Helmet.gltf'
    }, true)
})
.move("right", 3)
.live("on", meta => {
    meta.rotate("left", .01)
})


/*
new M('helmet.gltf')
.m('f', 3)
.l("o", m => 
m.r("r", .01))

new M('helmet.gltf')
.m('b', 3)
.l("o", m => 
m.r("l", .01))
*/


/*
const a = 1;
for(let i = 0; i< a; i++){
    for(let j = 0; j< a; j++){
        for(let k = 0; k< a; k++){
            new M('helmet.gltf')
            .setPosition({
                x: i*2,
                y: j*2,
                z: k*2
            })
        }
    }
}
*/