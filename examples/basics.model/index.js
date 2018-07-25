import * as THREE from 'three'
import {on, Meta, Graphics, Physics, Body} from '../../src'

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
                y:-2,
                z:0
            },
            type: 'box',
            move: false
        })
    }),
})

on('touch', (data) => {

    new Meta({

        position: data.position,

        graphics: new Graphics({
            model: 'helmet.gltf'
        }, true)
    })

})