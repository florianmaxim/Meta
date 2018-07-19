import * as THREE from 'three';

import {Model, M, Meta, Graphics, Ground, Cube, on} from './src/index';

/* active
new Cube().move('up', 5)
*/

/* active
new Cube({
    position: {x:-2,y:5,z:0},
})
*/

/* active
new Graphics({
    position: {x:-2,y:5,z:0},
    geometry: new THREE.BoxGeometry(1,1,1),
    material: new THREE.MeshPhongMaterial({color:0xfff000})
})
*/

/* active
new Graphics({
    position: {x:0,y:5,z:0},
    geometry: new THREE.BoxGeometry(1,1,1),
    material: new THREE.MeshPhongMaterial({color:0xfff000})
}).move("right", 2)
*/

/* active
new Meta({   

    position: {x:0,y:5,z:0},
     
    graphics: new Graphics({
        geometry: new THREE.BoxGeometry(1,1,1),
        material: new THREE.MeshPhongMaterial({color:0xfff000})
    }, true)

})
*/

/* active
new Meta({   

    position: {x:0,y:5,z:0},

    graphics: new Graphics({
        geometry: new THREE.BoxGeometry(1,1,1),
        material: new THREE.MeshPhongMaterial({color:0xfff000})
    }, true)

}).move('right', 1)
*/