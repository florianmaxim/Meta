
import * as THREE from 'three';

import {Model, M, Meta, Graphics, Ground, Cube, on} from './src/index';

/*
new Meta({
    graphics: new Graphics({
        model: 'Helmet.gltf'
    }, true)
}).live("on", meta => {
    meta.rotate("left", .01)
})
*/


/*
new Graphics({
    model: 'Helmet.gltf'
}, true)
.live("on", meta => {
    meta.rotate("left", .01)
})
*/

/*
new Model('helmet')
.live("on", meta => {
    meta.rotate("right", .01)
})
*/


new M('helmet')
.l("o", m => 
m.r("r", .01))

