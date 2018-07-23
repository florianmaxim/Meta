import * as THREE from 'three';

import {on, Cube, Graphics, Meta} from '../../src';

on('touch', (data) => {

    new Cube({
        position: data.position
    })

    new Cube({
        position: {
            x:data.position.x-1,
            y:data.position.y,
            z:data.position.z
        },
    })

    new Graphics({

        position: {
            x:data.position.x+1,
            y:data.position.y,
            z:data.position.z
        },

        geometry: new THREE.BoxGeometry(1,1,1),

    })

    new Meta({

        position: {
            x:data.position.x,
            y:data.position.y+1,
            z:data.position.z
        },

        graphics: new Graphics({

            geometry: new THREE.BoxGeometry(1,1,1),
            material: new THREE.MeshNormalMaterial()

        }, true)

    })
    
});
