import * as THREE from 'three';

import {on, Cube, Graphics, Meta, Physics, Body} from '../../src';

//Ground
new Meta({

    graphics: new Graphics({

        geometry: new THREE.BoxGeometry(100,1,100),
        material: new THREE.MeshPhongMaterial({color: 0x0000ff})

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

on('touch', (data) => {

    /*
        Prefixed meta object
    */
    new Cube({

        position: data.position,

        rotation: {
            x: Math.random()*180,
            y: Math.random()*180,
            z: Math.random()*180
        }

    });

    /*
        Custom meta object
    */
   
    /*
    new Meta({

        graphics: new Graphics({

            geometry: new THREE.BoxGeometry(.5,.5,.5),
            material: new THREE.MeshPhongMaterial({
                color: 0xff0000
            })

        }, true),

        physics: new Physics({

            body: new Body({

                position: data.position,

                rotation: {
                    x: Math.random()*180,
                    y: Math.random()*180,
                    z: Math.random()*180
                },

                scale: {
                    x:.5,
                    y:.5,
                    x:.5
                }

            })

        })

    })
    */
    
});
