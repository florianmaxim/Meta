import * as THREE from 'three';

import {Model, M, Meta, Graphics, Ground, Cube, on} from './src/index';

/* active
new Cube()
*/

//Same as

/* active
new Graphics({
    geometry: new THREE.BoxGeometry(1,1,1),
    material: new THREE.MeshPhongMaterial({color:0x0000ff})
})
*/

//Same as

/* active
new Meta({  
    graphics: new Graphics({
        geometry: new THREE.BoxGeometry(1,1,1),
        material: new THREE.MeshPhongMaterial({color:0xff0000})
    }, true)
})
*/