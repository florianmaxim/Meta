import * as THREE from 'three';

import {Cube, Graphics, Physics, Body, Meta, on} from './src';

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

on('touch', (data) => {

    mode = !mode

    for(let i = -2.5; i < 5; i++){

        for(let j = -2.5; j < 5; j++){


            new Meta({

                position: data.position,

                graphics: new Graphics({

                    //position: data.position, //Not necessary here, position is defined by physics later 
                    geometry: new THREE.SphereGeometry(.25,32,32),
                    material: mode?new THREE.MeshPhongMaterial({color: 0xff0000}):new THREE.MeshPhongMaterial({color: 0x0000ff})

                }, true),

                physics: new Physics({

                    body: new Body({
                        scale: {
                            x:.25,
                            y:.25,
                            z:.25
                        },
                        position: {
                            x: i,
                            y: 2,
                            z: j
                        },
                        type: 'sphere',
                        move: true
                    })
                }),

                //physics: false,

            })

        }
    }
    
});
