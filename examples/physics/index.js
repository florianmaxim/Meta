import * as THREE from 'three';

import {Cube, Graphics, Meta, on} from '../../src';

let mode = false;

on('touch', (data) => {

    mode = !mode

    new Meta({

        position: data.position,

        graphics: new Graphics({

            geometry: mode?new THREE.BoxGeometry(1,1,1):new THREE.SphereGeometry(.5,16,16),
            material: new THREE.MeshPhongMaterial({color: 0xff0000})

        }, true),

        move: !mode

    })
    
});
