import * as THREE from 'three';

import {on, Graphics, Meta} from '../../src';

class P {
    constructor(){
        this.name = "Papa"
    }
    intro(){
        console.log(`I am ${this.name}.`)
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
        super(props = {
            geometry: new THREE.SphereGeometry(.5,16,16),
            material: new THREE.MeshPhongMaterial({color:0xff0000}),
            position: props.position
        })
    }
}

class Blue extends Meta {
    constructor(props){
        super(props = {
            position: props.position,
            graphics: new Graphics({
                geometry: new THREE.SphereGeometry(.5,16,16),
                material: new THREE.MeshPhongMaterial({color:0x0000ff}),              
            }, true)
        })
    }
}

class Yellow extends Meta {
    constructor(props){
        super(props = {
            graphics: new Graphics({
                geometry: new THREE.SphereGeometry(.5,16,16),
                material: new THREE.MeshPhongMaterial({color:0xffff00}),              
            }, true)
        })
    }
}

on('touch', (data) => {

    const r = 
    new Red({
        position: data.position
    })

    const b = 
    new Blue({
        position: data.position
    })

    const y =
    new Yellow()
    .setPosition(data.position)

    console.log(r,b,y)
    
});
