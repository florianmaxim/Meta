import {version} from './package.json';

export default {

    version: version,
    
    log: false,

    space: {
        color: 0xdddddd
    },

    device: {

        headMountedDisplay: {
            controllerModels: false
        },

        desktop: {
            container: {
                position: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            },   
            camera: {
                position: {
                    x: 0,
                    y: 1.6,
                    z: 5
                }
            },  
            globe: {
                opacity: 0,
                color: 0xff0000,
                wireframe: true,
                transparency: true
            },
            acceleration: 125
        },

        mobile: {
            container: {
                position: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            },   
            camera: {
                position: {
                    x: 0,
                    y: 1.6,
                    z: 7.5
                }
            },  
            globe:{
                opacity: 0,
                color: 0xff0000,
                wireframe: true,
                transparency: true
            }
        }
    }
}