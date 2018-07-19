import * as THREE from 'three';

import {Model, M, Meta, Graphics, Ground, Cube, on} from './src/index';

/*
new Meta({  

    graphics: new Graphics({

        geometry: new THREE.BoxGeometry(100,0.001,100),
        material: new THREE.MeshPhongMaterial({color:0xff0000})
    
    }, true),

    physics: false
})
*/

console.log(
new Graphics({

    position: {x:0,y:5,z:0},

    geometry: new THREE.BoxGeometry(1,1,1),
    material: new THREE.MeshPhongMaterial({color:0x0000ff}),

})
//.move("up", 5)
)
/*
new Meta({        
    graphics: new Graphics({
        geometry: new THREE.BoxGeometry(5,1,5),
        material: new THREE.MeshPhongMaterial({color:0xfff000})
    }, true),
}).move("up",1)

new Meta({
    graphics: new Graphics({
        geometry: new THREE.BoxGeometry(1,1,1),
        material: new THREE.MeshPhongMaterial({color:0x0000ff})
    }, true)

}).move("up", 3)
*/

/*
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
*/

/*
new M('helmet.gltf')
.m('u', 2)
.l("o", m => 
m.r("r", .01))
*/

/*
new M('helmet.gltf')
.m('b', 3)
.l("o", m => 
m.r("l", .01))
*/

/*
const a = 3;
for(let i = 0; i< a; i++){
    for(let j = 0; j< a; j++){
        for(let k = 0; k< a; k++){
            new M('Duck.gltf')
            .setPosition({
                x: i*2,
                y: j*2,
                z: k*2
            })
        }
    }
}
*/

/*
class Duck {
    constructor(){
        return new Model('Duck')
    }
}
on('touch', (_) => {
    new Duck().s(_)
})
*/

/*
class Duck extends Model {
    constructor(){super('Duck')}
}
on('t', (_) => new Duck().s(_))
*/

/*
const D = () => new Model('Duck')
on('t', (_) => new Cube().s(_))
*/