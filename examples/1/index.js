import {Model, M, Meta, Graphics} from 'meta-client';

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

