/* 
    Example: Meta objects without graphics but physical bodies
    
    'Filling imaginary volumes' 

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

        geometry: new THREE.BoxGeometry(1,1,1),
        material: new THREE.MeshPhongMaterial({color: 0xffff00, transparent: true, opacity:0})

    }, true),

    physics: new Physics({

        body: new Body({
            scale: {
                x:1,
                y:1,
                z:1
            },
            position: {
                x:0,
                y:-1,
                z:0
            },
            rotation: {
                x:0,
                y:0,
                z:0
            },
            type: 'box',
            move: false
        })
    })
})

new Meta({

    graphics: new Graphics({

        geometry: new THREE.BoxGeometry(1,1,1),
        material: new THREE.MeshPhongMaterial({color: 0xffff00, transparent: true, opacity:0})

    }, true),

    physics: new Physics({

        body: new Body({
            scale: {
                x:1,
                y:10,
                z:1
            },
            position: {
                x:-1,
                y:1,
                z:0
            },
            type: 'box',
            move: false
        })
    })
})

new Meta({

    graphics: new Graphics({

        geometry: new THREE.BoxGeometry(1,1,1),
        material: new THREE.MeshPhongMaterial({color: 0xffff00, transparent: true, opacity:0})

    }, true),

    physics: new Physics({

        body: new Body({
            scale: {
                x:1,
                y:10,
                z:1
            },
            position: {
                x:1,
                y:1,
                z:0
            },
            type: 'box',
            move: false
        })
    })
})

new Meta({

    graphics: new Graphics({

        geometry: new THREE.BoxGeometry(1,1,1),
        material: new THREE.MeshPhongMaterial({color: 0xffff00, transparent: true, opacity:0})
        
    }, true),

    physics: new Physics({

        body: new Body({
            scale: {
                x:1,
                y:10,
                z:1
            },
            position: {
                x:0,
                y:1,
                z:-1
            },
            type: 'box',
            move: false
        })
    })
})

new Meta({

    graphics: new Graphics({

        geometry: new THREE.BoxGeometry(1,1,1),
        material: new THREE.MeshPhongMaterial({color: 0xffff00, transparent: true, opacity:0})
        
    }, true),

    physics: new Physics({

        body: new Body({
            scale: {
                x:1,
                y:5,
                z:1
            },
            position: {
                x:0,
                y:1,
                z:1
            },
            type: 'box',
            move: false
        })
    })
})

setInterval(() => { 

//on('touch', (data) => {

    mode=!mode

    new Meta({

        //position: data.position,

        graphics: new Graphics({

            geometry: new THREE.SphereGeometry(.1,32,32),
            material: new THREE.MeshPhongMaterial({color: mode?0x0000ff:0xff0000})

        }, true),

        physics: new Physics({

            body: new Body({
                scale: {
                    x:.1,
                    y:.1,
                    z:.1
                },
                position: {
                    x:Math.random()*0.1,
                    y:5,
                    z:0,
                },
                type: 'sphere',
                move: true
            })
        }),

    })
    
//});

}, 100)
