import * as THREE from 'three';

import {Ground, Cube, Graphics, Meta, on} from '../../src';

//new Ground();

on('touch', (data) => {


    new Cube()  
    
    new Graphics({

        geometry: new THREE.BoxGeometry(1,1,1)

    })
    
    new Meta({

        graphics: new Graphics({

            geometry: new THREE.BoxGeometry(1,1,1),
            material: new THREE.MeshPhongMaterial({color: 0xff0000})

        }, true)

    })
    
});