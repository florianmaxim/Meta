import * as THREE from 'three';

import {Graphics, Physics, Body, Meta, on} from '../../src';

let mode = false;

new Meta({

    graphics: null,

    physics: new Physics({

        body: new Body({
            scale: {
                x:2,
                y:1,
                z:10
            },
            position: {
                x:0,
                y:1,
                z:0
            },
            type: 'box',
            move: false
        })
    })
})

on('touch', (data) => {

    new Meta({

        position: data.position,

        graphics: new Graphics({

            //position: data.position, //Not necessary here, position is defined by physics later 
            geometry: new THREE.SphereGeometry(.1,32,32),
            material: mode?new THREE.MeshPhongMaterial({color: 0xffff00}):new THREE.MeshPhongMaterial({color: 0x0000ff})

        }, true),

        physics: new Physics({

            body: new Body({
                scale: {
                    x:.1,
                    y:.1,
                    z:.1
                },
                position: data.position,
                type: 'sphere',
                move: true
            })
        }),

        //physics: false,

    })
    
});
