/* 
    Example: Meta objects without graphics but physical bodies
    
    By setting the graphical appearence to 'null
    the meta object becomes invisible while it's
    physical body still affects other objects in
    the same physical world.
*/

import * as THREE from 'three';

import {Graphics, Physics, Body, Meta, on} from '../../src';

let mode = false;

new Meta({

    graphics: new Graphics({

        geometry: new THREE.BoxGeometry(100,1,100),
        material: new THREE.MeshPhongMaterial({color: 0xff0000})

    }, true),

    physics: new Physics({

        body: new Body({
            scale: {
                x:100,
                y:1,
                z:100
            },
            position: {
                x:0,
                y:-1,
                z:0
            },
            type: 'box',
            move: false
        })
    }),
})

new Meta({

    graphics: null,

    physics: new Physics({

        body: new Body({
            scale: {
                x:2,
                y:2,
                z:2
            },
            position: {
                x:0,
                y:0,
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

    })
    
});
