import * as OIMO  from 'oimo';

let worlds = [];
let bodies = [];

class Body {

    constructor(props){

        //props
        this.scale = {
            x:props!==undefined&&props.scale!==undefined&&props.scale.x!==undefined?props.scale.x:1,
            y:props!==undefined&&props.scale!==undefined&&props.scale.y!==undefined?props.scale.y:1,
            z:props!==undefined&&props.scale!==undefined&&props.scale.z!==undefined?props.scale.z:1
        };
        this.rotation = {
            x:props!==undefined&&props.rotation!==undefined&&props.rotation.x!==undefined?props.rotation.x:0,
            y:props!==undefined&&props.rotation!==undefined&&props.rotation.y!==undefined?props.rotation.y:0,
            z:props!==undefined&&props.rotation!==undefined&&props.rotation.z!==undefined?props.rotation.z:0
        };
        this.position = {
            x:props!==undefined&&props.position!==undefined&&props.position.x!==undefined?props.position.x:0,
            y:props!==undefined&&props.position!==undefined&&props.position.y!==undefined?props.position.y:0,
            z:props!==undefined&&props.position!==undefined&&props.position.z!==undefined?props.position.z:0
        };

        this.type = props!==undefined&&props.type!==undefined?props.type:'box'

        const body = {

            type: this.type,
      
            size: [this.scale.x,this.scale.y,this.scale.z],
            pos: [this.position.x,this.position.y,this.position.z],
            rot: [this.rotation.x,this.rotation.y,this.rotation.z],
            
            move: props!==undefined&&props.move!==undefined?props.move:true,
            density: 1,
            friction: 0.2,
            restitution: 0.2,
            belongsTo: 1, // The bits of the collision groups to which the shape belongs.
            collidesWith: 0xffffffff
          
        }

        console.log(body)

        return body;
    }

}

class World extends OIMO.World {}

export default class Physics {

    constructor(props){

        this.body = props!==undefined&&props.body!==undefined?props.body:new Body(props);

        if(worlds.length===0){
            this.world = props!==undefined&&props.world===undefined?new World():props.world;
            worlds.push(this.world);                
        }

        if(worlds.length>0){
            this.world = props!==undefined&&props.world===undefined?worlds[worlds.length-1]:props.world;            
        }

        this.body = this.world.add(this.body);

        return this;
    }

    static getWorlds(){
        return worlds;
    }

    static getBodies(){
        return bodies;
    }

}

export {Body, World};
