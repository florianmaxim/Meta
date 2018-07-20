import * as THREE from 'three';

import {on, Cube, Graphics, Meta} from '../../src';

class P {
    constructor(){
        this.name = "Papa"
    }
    intro(){
        console.log(`${this.name}`)
    }
}

new P().intro()

class F extends P {
    constructor(){
        super()
        this.name = "Flo"
    }
}

new F().intro()

class Red extends Graphics {
    constructor(props){
        super(props)
        this.geometry = new THREE.BoxGeometry(1,1,1),
        this.material = new THREE.MeshPhongMaterial({color:0xff0000}) 
    }
}

on('touch', (data) => {

    console.log(new Red({
        position: data.position
    }))

});
