import config from '../../config';

import {WebGLRenderer,
        Scene,
        Fog,
        PerspectiveCamera,
        AmbientLight,
        DirectionalLight,
        PointLight,
        Mesh,
        Object3D,
        Vector3,
        GridHelper,
        Clock} from 'three';

import Device   from './Device/Device';

import Meta   from './Meta/Meta';
import Graphics from './Meta/Graphics/Graphics';
import Physics from './Meta/Physics/Physics';

import Cube     from './Meta/Graphics/Geometries/Cube';

let scope;

let renderer, scene, camera, controls, container;

let animate;

let stop = false;

let instance = false;

let clock;

let _default;

/** This class represents a relative space.
* @constructor
* @param {Object} props
* @param {String} props.color  The space's color.
* @param {String} props.Meta   Meta that should come with the space.
*/

export default class Space {

  constructor(props){

    _default = {
      color: config.space.color
    }

    //Handle Props
    const _Meta = props&&props.Meta!==undefined?props.Meta:false;
    const _color = props&&props.color!==undefined?props.color:_default.color;

    //Reset clock
    clock = new Clock();

    //If we already have a space just reassign the props
    if(instance){
      
      Space.clear();

      Space.get().renderer.setClearColor(_color);
      Space.get().scene.fog = new Fog( _color, 0, 5 );

      return Space.get();
    }

    scope = this;

    instance = this;

    /**
    * Contains all Events in space.
    */
    this.events = [];

    /**
    * Contains all Meta in space.
    */
    this.Meta = [];


    /**
    * Contains all Intervals in space. (Should Go To Void later)
    */
    this.intervals = [];

    /*
    Init Renderer
    */

    document.body.style.margin = '0';

    this.renderer = new WebGLRenderer({antialias: true});
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setViewport ( 0, 0, innerWidth, innerHeight );
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(_color);

    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;

    this.renderer.autoClear = true;

    this.renderer.domElement.id = "renderer";
    this.renderer.domElement.style.position = 'fixed';
    this.renderer.domElement.style.zIndex = '0';
    this.renderer.domElement.style.left = '0';
    this.renderer.domElement.style.top = '0';

    this.renderer.setAnimationLoop( scope.render );

    document.body.appendChild(this.renderer.domElement);

    this.scene = new Scene();
    this.scene.fog = new Fog( _color, 0, 6.25 );

    this.camera = new PerspectiveCamera(55, innerWidth / innerHeight, .01, 1000);
    this.scene.add(this.camera);

    let light = new AmbientLight(0xffffff, .25)
    this.scene.add(light);

        light = new PointLight(0xffffff, 1)
        light.position.set(25,25,25);
    this.scene.add(light);

        light = new PointLight(0xffffff, 1)
        light.position.set(-25,25,-25);
    this.scene.add(light);

    addEventListener('resize', (event) => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( window.innerWidth, window.innerHeight );
    })

    /*
      Container
      The container is adjusted buy this the specifix device controller
      (Move everything down a little on desktop and mobile,
      to hava a human point of view)
    */

    this.container = new Object3D();
    this.scene.add(this.container);

    /*
     Detect and initialize device
    */
    this.device = new Device(this);

    //Was any Meta already provided instantiating this space add it.
    if(_Meta) this.add(_Meta)

    //Run
    this.render();

    //Add to window object
    window.__SPACE__ = this;

    return this;

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

  add(Meta){

    /*
      Handle Library Systems: (3rd, self - pattern: First handle 3rd party and self system
    */

    /*
      Graphics (three.js)
    */

    /*
      Physics (oimo.js) TODO This should happen in here! Not in Meta!
    */

    /*
      Add to Meta System:
    */

    this.Meta.push(Meta);

  }

  start(Meta){
    this.container.add(Meta.graphics.mesh);
  }

  remove(Meta){

    /*
      Handle Library Systems: (3rd, self - pattern: First handle 3rd party and self system
    */
    /*
      Graphics (three.js)
    */

    /*
      Physics (oimo.js) TODO This should happen in here! Not in Meta!
    */

    /*
      Remove from Meta System:
      @TODO IMPORTANT
    */

    // this.Meta.push(Meta);

  }

  end(Meta){
    this.container.remove(Meta.graphics.mesh);
  }


  /**
   * This is literally the space's lifecylce. Everything in here lives.
   */
  life(){

    let time = clock.getElapsedTime()

    this.Meta.forEach((Meta, index) => {

      //Physics
      if(Meta.physics!==undefined&&Meta.physics!==null&&Meta.physics.body!==undefined){
        Meta.graphics.mesh.position.copy( Meta.physics.body.getPosition() );
        Meta.graphics.mesh.quaternion.copy( Meta.physics.body.getQuaternion() );
      }else{

        //Lifes
        Meta.lifes.map((life) => {
          life(Meta,time);
        })

      }

      //Existence
      Meta.life();

    });

  }

  render(){

    if(stop) return;

    //Run Life (everything affected by the two (all the Meta so far)
    scope.life();

    //Run Device Controller
    if(scope!==undefined&&scope.device!==undefined&&scope.device.render!==undefined)
    scope.device.render();

    //Run physics system (oimo lybrary)
    Physics.getWorlds().forEach((world) => {
      world.step()
    })

    //Run graphics system (three.js libraray)
    scope.renderer.render(scope.scene, scope.camera);
    
  }

  static get(){

    if(!instance) new Space();

    return instance;

  }

  static clear(options){

    /*
      As always: Go by 3rd-self-pattern:
      Handle 3rd party libraries first,
      than your own code.
    */

    //If there hasn't been any space yet leave directly.
    if(!instance) return;


    const _Meta = options!==undefined&&options.Meta!==undefined?options.Meta:true;
    const _events = options!==undefined&&options.events!==undefined?options.events:true;
    const _intervals = options!==undefined&&options.intervals!==undefined?options.intervals:true;


    /*
      Handle Library Systems(3rd):
    */

    //Graphics (three)
    //@todo should be Graphics.clear()
    if(scope&&scope.container&&scope.container.children){
      //console.log('[Space] - Clear() - Container children before: '+scope.container.children.length)
      for (var i = scope.container.children.length - 1; i >= 0; i--) {
        scope.container.remove(scope.container.children[i]);
      }
      //console.log('[Space] - Clear() - Container children after: '+scope.container.children.length)
    }

    //Physics (oimo)
    //@todo should be Physics.clear()
    Meta.clear();

    /*
      Handle Meta System (self):
    */

    //Drop all Meta
     //@todo should be Meta.clear()
    if(_Meta)
    scope.Meta = [];
    //Drop all events
    if(_events)
    scope.events = [];
    //Drop all intervals
    if(_intervals)
    scope.intervals.forEach((interval)=>{
      clearInterval(interval)
    })
    scope.intervals = [];
  }

  timer(fun, interval){
    fun();
    const _interval = setInterval(fun, interval);
    this.intervals.push(_interval)
  }

}

const on = (eventName, callback) => {
  return Space.get().on(eventName, callback);
}

const timer = (fun, interval) => {
  return Space.get().timer(fun, interval);
}

export {on, timer};
