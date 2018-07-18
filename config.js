import {version} from './package.json';

export default {

    version: version,
    log: false,

    console: {
        colors: {
            primary: '#548adf',
            secondary: '#9aa9fe',
            text: '#ffffff'
        }
    },

    space: {
        color: 0xe0e0e0
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
                    y: 2.5,
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