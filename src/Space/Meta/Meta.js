import config from '../../../config';

import log from '../../Utilities/log';

import {CubeGeometry,
        MeshBasicMaterial,
        Mesh,
        Box3} from 'three';

import Space    from '../Space';
// import Physics  from '../Physics/Physics';

import Graphics  from './Graphics/Graphics';
import Existence from './Existence/Existence';

import Cube     from './Graphics/Geometries/Cube';
import Sphere   from './Graphics/Geometries/Sphere';

import * as OIMO  from 'oimo';

const name = 'Meta';

let set = false;

let scope;

let world = new OIMO.World();
let bodies = [];

/** This class represents a Meta object.
* @constructor
* @param {Object} props
* @param {String} props.life Represents the Meta object's lifecycle.
* @param {String} props.graphics Represents the Meta object's visual appearance.
* @param {String} props.physics Represents the Meta object's physics body.
* @param {Array} lifes Includes the Meta object's lifes.
* @param {Array} events  Includes the Meta object's events.
*/
export default class Meta {

  constructor(props){

      scope = this;

      this.name = 'Meta';

      //lifes
      this.lifes = [];

      //events
      this.events = [];

      //states (merge into {state})
      this._entered = null;
      this._touched = false;

      //e,g,p existence, graphics, physics
      this.existence = props!==undefined&&props.existence!==undefined?props.existence:new Existence();
      this.graphics  = props!==undefined&&props.graphics!==undefined?props.graphics:new Graphics();

      this._physics = props!==undefined&&props.p!==undefined?props.p:true;
      this._physics = props!==undefined&&props.physics!==undefined?props.physics:true;

      this.color();

      this.rotation = {x:0,y:0,z:0};
      this.position = {x:0,y:0,z:0};

      //Get properties from visual representation (mesh)
      this.setSize();

      //Start Physics (with properties fetched above)
      this.physics();

      //Start Presence
      Space.get().add(this);

      //Start Existence
      if(this.existence.start===null&&this.existence.end===null)
      Space.get().start(this);

  }

  o(eventName, callback){
    return this.on(eventName, callback)
  }
  on(eventName, callback){
    if(typeof(eventName)=="function"){
      callback  = eventName;
      eventName = 'p';
    }

    if(eventName=='t')
       eventName='touch';
    if(eventName=='r')
       eventName='release';
    if(eventName=='p')
       eventName='point';

    if(this.events[eventName]){
      this.events[eventName].push(callback);
    }else{
      this.events[eventName] = [callback];
    }
    return this;
  }

  go(eventName, ...rest){
    if(this.events[eventName]){
      this.events[eventName].forEach(cb =>{
        cb(...rest, this);
      })
    }
    return this;
  }


  setPosition(){ 
    //Get position from visual representation (mesh)
    //and assign it to this  

   this.position = {
    x: this.graphics.mesh.position.x,
    y: this.graphics.mesh.position.y,
    z: this.graphics.mesh.position.z
  }

   //console.log('[this.position]'+this.position)
   return this;
  }

  setRotation(){
    //Get rotation from visual representation (mesh)
    //and assign it to this 

    this.rotation = {
      x: this.graphics.mesh.rotation._x.x,
      y: this.graphics.mesh.rotation._x.y,
      z: this.graphics.mesh.rotation._x.z
    }

    log(JSON.stringify(this.rotation), name)
    return this;
  }

  setSize(){
    //Define Meta's Size According To Graphic's Dimensions
    let box3 = new Box3().setFromObject(this.graphics.mesh);

    let x = box3.max.x - box3.min.x;
    let y = box3.max.y - box3.min.y;
    let z = box3.max.z - box3.min.z;

    switch(this.graphics.type){
      case 'box':
        this.size = [x,y,z]
      break;
      case 'sphere':
        this.size = [x/2]
      break;
      case 'cylinder':
        this.size = [x/2,y,z/2]
      break;
    }

    //console.log('[Size]'+this.size);

  }


  p(m){
    return this.physics(m);
  }
  physics(_physics){

    //If physics have been set already and the same parameter was passed leave directly
    if(this.body!==undefined&&_physics===this._physics) return;

    _physics = _physics!==undefined?_physics:this._physics;

    if(_physics===null){
      this._physics = null;
      return this;
    }

    let mode = _physics;

    //Meaning it had physics before, which were stopped setting _physics to false.
    if(this.body!==undefined){
      this.body.remove();
      ////console.log('[Meta].physics() - Already have a body, so set this.body = null to get a new one]')
    }

    // console.log('[Meta].physics()-this._physics:'+this._physics);
    // console.log('[Meta].physics()-_mode:'+mode);

    //alert(this.rotation.y)

    const body = {

      type: this.graphics.type,

      size: this.size,

      pos: [this.position.x,this.position.y,this.position.z],
      rot: [this.rotation.x,this.rotation.y,this.rotation.z],
      
      move: mode,
      density: mode!==undefined&&mode.density!==undefined?mode.density:1,
      friction: mode!==undefined&&mode.friction!==undefined?mode.friction:.5,
      restitution: mode!==undefined&&mode.restitution!==undefined?mode.restitution:.5,
      belongsTo: mode!==undefined&&mode.belongsTo!==undefined?mode.belongsTo:1,
      collidesWith: mode!==undefined&&mode.collidesWith!==undefined?mode.collidesWith:0xffffffff,
    
    }

    //log(body, name);

    //@todo Should be: Physics.add(body);
    this.body = world.add(body); //CLUE: This constantly add the current body position into this.body

    //IMPORTANT: Save the new state!
    this._physics = _physics;
    return this;
  }

  //Add life to Meta's life.
  l(life){
    return this.live(life);
  }
  live(mode = 'on', life){

    switch(mode) {
      case 'on': case 'o': case 1:
        this.lifes.push(life);
      break;
      case 'again': case 'a': case 0:
        this.lifes = [];
        this.lifes.push(life);
      break;
    }
   
    return this;
  }

  appear(){return this.end()}
  start(){
    Space.get().start(this);
    this.existence.started = true;
  }

  die(){return this.end()}
  disappear(){return this.end()}
  end(){
    Space.get().end(this);
    this.existence.ended = true;
  }

  //A Meta's Life
  life(){

    //Run ([E]existence, [G]raphics, [P]hysics)

    //Run Existence
    //start
    if(this.existence.start!==null)
      if(new Date(this.existence.start)<new Date()){
        if(!this.existence.started)
          this.start()
      }

    //end
    if(this.existence.end!==null)
    if(new Date()>new Date(this.existence.start)){
        if(new Date()>new Date(this.existence.end)){
          if(!this.existence.ended)
            this.end();
        }
    }

  }

  /*
    Color (set)
  */
  c(color){return this.color(color);}
  color(color = Math.random()*0xffffff ){

      switch(color){
        case 0: case 'g': case 'gold':
        color = 0xffd700;
        break;
        case 1: case 'r': case 'red':
        color = 0xff0000;
        break;
        case 2: case 'g': case 'green':
        color = 0x00ff00;
        break;
        case 3: case 'b': case 'blue':
        color = 0x0000ff;
        break;
        case 4: case 'y': case 'yellow':
        color = 0xffff00;
        break;
        case 5: case 'w': case 'white':
        color = 0xffffff;
        break;
      }

    this.graphics.color(color);
    this._color = color;

    return this;
  }

  s(props){
    return this.set(props)
  }
  set(position){

    position = position.position || position;

    // log(position, name);

    //Set graphics
    this.graphics.mesh.position.copy(position);

    this.setSize();
    this.setPosition();
    this.physics();
    return this;
  }

  /*
    Move (set)
  */
  m(direction, amount){
    return(this.move(direction, amount))
  }
  move(direction, amount){

    switch (direction) {
      default:
       case 0: case 'f': case 'forward': case 'forwards':
        this.graphics.mesh.position.z -= amount;
        break;
       case 1: case 'b': case 'backward': case 'backwards':
        this.graphics.mesh.position.z += amount;
        break;
       case 2: case 'l': case 'left':
        this.graphics.mesh.position.x -= amount;
        break;
       case 3: case 'r': case 'right':
        this.graphics.mesh.position.x += amount;
        break;
       case 4: case 'd': case 'down':
        this.graphics.mesh.position.y -= amount;
        break;
       case 5: case 'u': case 'up':
        this.graphics.mesh.position.y += amount;
        break;
    }

    this.setSize();    
    this.setPosition();
    this.physics();
    return this;
  }

  r(direction, amount){
    return this.rotate(direction, amount);
  }
  rotate(direction, amount){

    switch (direction) {
      default:
       case 0: case 'f': case 'forward': case 'forwards':
          this.graphics.mesh.rotation.set({x:amount, y:0, z:0});
        break;
       case 1: case 'b': case 'backward': case 'backwards':
          this.graphics.mesh.rotation.set({x:-amount, y:0, z:0});
        break;
       case 2: case 'l': case 'left':
          this.graphics.mesh.rotation.set({x:0, y:-amount, z:0});
        break;
       case 3: case 'r': case 'right':
          this.graphics.mesh.rotation.set({x:0, y:amount, z:0});
        break;
       case 4: case 'd': case 'down':
          this.graphics.mesh.rotation.set({x:0, y: 0, z:amount});
        break;
       case 5: case 'u': case 'up':
          this.graphics.mesh.rotation.set({x:0, y: 0, z:-amount});
        break;
    }

    this.setRotation();
    this.physics();
    return this;
  }

  add(instance){
    this.graphics = instance;
  }

  i(ms,f){return this.in(ms,f)}
  in(ms,f){
    setTimeout(()=>{
      f();
    },ms)
  }

  e(ms,f){return this.every(ms,f)}
  ev(ms,f){return this.every(ms,f)}
  every(ms,f){
    f();
    setInterval(()=>{
      f();
    },ms)
  }


  static getWorld(){
    return world;
  }

  static getBodies(){
    return bodies;
  }

  static clear (){
    bodies = [];
    world = new OIMO.World();
  }
}