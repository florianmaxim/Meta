import config from '../../../../config';
import log from '../../../Utilities/log';

import {DoubleSide, CubeGeometry, PlaneGeometry, Vector2, Vector3, Object3D, Raycaster, Plane, Mesh, MeshBasicMaterial, SphereGeometry} from 'three';

import PointerLockControls from './Controls/PointerLockControls';

const name = 'DesktopDeviceController'

let scope;

const raycaster = new Raycaster();
const raycasterGlobe = new Raycaster();

const mouse     = new Vector2();
      mouse.x   = null;
      mouse.y   = null;

const offset       = new Vector3();
const intersection = new Vector3();

let onMouseMove, onMouseDown, onMouseUp, onKeyDown, onKeyUp;

let selected = null, hovered = null;
let selectedGlobe = null;
let selectedGlobePoint = null;
let intersectsGlobePlane = null;

let MetaPosition = null;

let globePlane = null;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

let prevTime = performance.now();
let velocity = new Vector3();

let metaEntered = false;
let metaEnteredData = null;

let keys = {
  enter: false,
  space: false,
  esc: false
}

let globe;
let plane;

let data;

function prepare(event){

  event.preventDefault();
  event.stopPropagation();

}

/** This class represents a desktop device controller.
* @constructor
* @param {Object} space
*/
export default class DesktopDeviceController {

  constructor(space){

    scope = this;

    this.space = space;

    //Add a globe as an 'interaction radius'
    globe = new Mesh(new SphereGeometry(Math.abs(config.device.desktop.camera.position.z),32,32), new MeshBasicMaterial({color: config.device.desktop.globe.color, wireframe: config.device.desktop.globe.wireframe, transparent: config.device.desktop.globe.transparency, opacity: config.device.desktop.globe.opacity, side: DoubleSide}));
    space.camera.add(globe);

		//Adjust space (device specifically).
    space.container.position
    .copy(config.device.desktop.container.position);

    space.camera.position
    .copy(config.device.desktop.camera.position);

    space.scene.fog.far = Math.abs(config.device.desktop.camera.position.z*5);

    //Set up controls.
    this.controls = new PointerLockControls(space.camera);
    space.scene.add( scope.controls.getObject() );
    this.controls.enabled = false;

    space.device = this;

    //Handle Pointerlock.
    const havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

    if ( havePointerLock ) {

      var element = document.body;

      var pointerlockchange = function ( event ) {

        if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

          scope.controls.enabled = true;

        } else {

          scope.controls.enabled = false;

        }

      };

      var pointerlockerror = ( event ) => {
        log('[DesktopDevice] - Controls - Pointerlock error.', name);
      };

      // Hook pointer lock state change events
      document.addEventListener( 'pointerlockchange', pointerlockchange, false );
      document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
      document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

      document.addEventListener( 'pointerlockerror', pointerlockerror, false );
      document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
      document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

    }


    onKeyDown = ( event ) => {

			switch ( event.keyCode ) {

        case 13: //enter
          keys.enter = true;
        break;

        case 27: //escape
          keys.esc = true;
        break;

        case 32: //space
          keys.space = true;
        break;

				case 38: // up
				case 87: // w
					moveForward = true;
					break;

				case 37: // left
				case 65: // a
					moveLeft = true; break;

				case 40: // down
				case 83: // s
					moveBackward = true;
					break;

				case 39: // right
				case 68: // d
					moveRight = true;
					break;

				case 86: // v
          moveUp = true;
					break;

				case 16: // shift
          moveDown = true;
					break;

      }
      
      switch ( event.charCode ) {

        case 32: // space
          moveUp = true;
        break;

      }  

      if(keys.enter&&keys.space){
        //@todo fire a 'release' event in space, since this is not possible anymore from now on
        scope.space.go('release');

        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
        element.requestPointerLock();

      }

		};

		onKeyUp = ( event ) => {

			switch( event.keyCode ) {

        case 13: //enter
          keys.enter = false;
        break;

        case 27: //escape
          keys.esc = false;
        break;

        case 32: //space
          keys.space = false;
        break;

				case 38: // up
				case 87: // w
					moveForward = false;
					break;

				case 37: // left
				case 65: // a
					moveLeft = false;
					break;

				case 40: // down
				case 83: // s
					moveBackward = false;
					break;

				case 39: // right
				case 68: // d
					moveRight = false;
					break;

        case 86: // v
          moveUp = false;
					break;

        case 16: // shift
          moveDown = false;
					break;

      }
      
      switch ( event.charCode ) {

        case 32: // space
          moveUp = false;
        break;

      }  

		};

    onMouseDown = (event) => {

      prepare(event);

      if(scope.controls.enabled === true) return;

      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      raycaster.setFromCamera(mouse, space.camera);

      /*
        Meta
      */

      //Check for reached any Meta.
      const intersects = raycaster.intersectObjects(scope.space.container.children);

      //Any intersections?
      if(intersects.length>0){

        selected = intersects[0].object;

        scope.space.Meta.forEach(Meta => {

          if(Meta.graphics.mesh.id === selected.id){

            MetaPosition = intersects[0].point;

            MetaPosition.z  = MetaPosition.z+Math.abs(config.device.desktop.container.position.z);
            MetaPosition.y  = MetaPosition.y+Math.abs(config.device.desktop.container.position.y);

            const data = {
              position: MetaPosition
            };

            Meta.go('touch', data);

            //Set up plane
            plane = new Mesh(new PlaneGeometry(100,100,10,10), new MeshBasicMaterial({wireframe:true, transparent:true, opacity: false}));
            plane.position.copy(MetaPosition);
            scope.space.container.add(plane);

          }

        });

      }else{

        log('Looking for space reaches', name)

        /*
          Space
        */

        //And always, we're also 'reaching into space'.
        //So, set up a raycaster for the globe.

        //Check for intersections on globe.
        const _intersectsGlobe = raycaster.intersectObject(globe);

        //Any hits?
        if(_intersectsGlobe.length>0){

          selectedGlobe         = _intersectsGlobe[0].object;
          selectedGlobePoint    = _intersectsGlobe[0].point;

          //Substract container's position
          selectedGlobePoint.z  = selectedGlobePoint.z+Math.abs(config.device.desktop.container.position.z);
          selectedGlobePoint.y  = selectedGlobePoint.y+Math.abs(config.device.desktop.container.position.y);
    
          //Set up helper plane
          globePlane = new Mesh(new PlaneGeometry(100,100,10,10), new MeshBasicMaterial({wireframe:config.device.desktop.globe.wireframe, transparent: true, opacity:config.device.desktop.globe.opacity}));
          globePlane.position.copy(selectedGlobePoint);
          scope.space.scene.add(globePlane);

          const data = {
            position : selectedGlobePoint
          };

          log('about to trigger space touch')

          scope.space.go('touch', data);

        };

      }

    };

    onMouseMove = (event) => {

      prepare(event);

      if(scope.controls.enabled === true) return;

    	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      raycaster.setFromCamera(mouse, space.camera);

      /*
        Space
      */

      //Take the intersection on the globe.
      //Draw a plane from there.
      //Send rays.

      if(globePlane){

        log('Intersected globe', name)

        intersectsGlobePlane = raycaster.intersectObject(globePlane);

        if(intersectsGlobePlane.length>0){

          let position = intersectsGlobePlane[0].point;

          position.z  = position.z+Math.abs(config.device.desktop.container.position.z);
          position.y  = position.y+Math.abs(config.device.desktop.container.position.y);

          const data =  {
            position: position
          };

          scope.space.go('touch', data);
        }

      }else{

        log('Intersected space', name);
        //The rest is just reaching around in space...

        let _intersectsGlobe = raycaster.intersectObject(globe);

        //Any objects hit?
        if(_intersectsGlobe.length>0){

          const position = _intersectsGlobe[0].point;

          position.z  = position.z+Math.abs(config.device.desktop.container.position.z);
          position.y  = position.y+Math.abs(config.device.desktop.container.position.y);

          const data = {
            position : position
          };

          scope.space.go('point', data);

        }

      }

      /*
        Meta
      */

      /*
        Meta was selected before and its being moved on the plane now
      */

     if(selected){

       const intersects = raycaster.intersectObject(plane);

       if(intersects.length>0){

          const object = intersects[0].object;

          MetaPosition = intersects[0].point;

          MetaPosition.z  = MetaPosition.z+Math.abs(config.device.desktop.container.position.z);
          MetaPosition.y  = MetaPosition.y+Math.abs(config.device.desktop.container.position.y);

          scope.space.Meta.forEach(Meta => {

            if(Meta.graphics.mesh.id === selected.id){

              const data = {
                position: MetaPosition
              };

              Meta.go('touch', data);

            }

          });

       }

     }

      /*
        Check for any in intersections with Meta
      */
      const intersects = raycaster.intersectObjects(scope.space.container.children);

      //There ARE intersections with Meta
      if(intersects.length>0){

        log('Intersected Meta', name);

        let position = intersects[0].point;

        //Substract the container's position
        position.z  = position.z+Math.abs(config.device.desktop.container.position.z);
        position.y  = position.y+Math.abs(config.device.desktop.container.position.y);
  
        const data = {
          position: position
        };

        scope.space.Meta.forEach(Meta => {

          if(Meta.graphics.mesh.id === intersects[0].object.id){

            //console.log(Meta.graphics.mesh.id+'-'+intersects[0].object.id)

            Meta.go('point', data);  

            if(!Meta._entered){
              Meta.go('enter', data);      
              Meta._entered = true;
            }else{
              Meta.go('leave', data);      
              Meta._entered = false;
            }

          }

        });

      //NO intersections with Meta
      }else{

         //That means existing ones have to be cleared as well
        scope.space.Meta.forEach(Meta => {

            if(Meta._entered){
              Meta.go('leave', data);      
              Meta._entered = false;
             }

        });

      }

    };

    onMouseUp   = (event) => {

      prepare(event);

      if(scope.controls.enabled === true) return;

      /*
        Space
      */
      if(globePlane){
        scope.space.container.remove(globePlane);
        globePlane = false;
      }

      //First of all,
      //we're always 'reaching into space'.
      //So, set up a raycaste for the globe.
      raycaster.setFromCamera(mouse, space.camera);

      //Check for intersections on globe
      const _intersectsGlobe = raycaster.intersectObjects(scope.space.camera.children);

      //Any objects hit?
      if(_intersectsGlobe.length>0){

        log('Intersected globe (onMouseDown)', name)

         selectedGlobe  = _intersectsGlobe[0].object;
         let point      = _intersectsGlobe[0].point;

         point.z  = point.z+Math.abs(config.device.desktop.container.position.z);
         point.y  = point.y+Math.abs(config.device.desktop.container.position.y);

        //if(selectedGlobe.name==='globe'){
          const data = {
            position : point
          };
          scope.space.go('release', data);
        //}

      }

      /*
        Meta
      */

      if (selected) {

        scope.space.container.remove(plane);
        plane = null;

        space.Meta.find(Meta => {
          if(Meta.graphics.mesh.id === selected.id){
          const data = {
            position: MetaPosition
          };
            Meta.go('release', data);
          }
        });

        selected = null;

      }else{

      }

    };

    this.init();

    return this;
  }

  init(){

    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );

    addEventListener( 'mousemove', onMouseMove, false );
    addEventListener( 'mousedown', onMouseDown, false );
    addEventListener( 'mouseup', onMouseUp, false );

  }

  deactivate(){

    document.removeEventListener( 'keydown', onKeyDown, false );
    document.removeEventListener( 'keyup', onKeyUp, false );

    removeEventListener( 'mousemove', onMouseMove, false );
    removeEventListener( 'mousedown', onMouseDown, false );
    removeEventListener( 'mouseup', onMouseUp, false );

  }

  render(space){

    if(!this.controls.enabled) return;

    const time = performance.now();
    const delta = ( time - prevTime ) / 1000;
    const acceleration = config.device.desktop.acceleration;    

		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;
		velocity.y -= velocity.y * 10.0 * delta;

		if ( moveForward ) velocity.z -= acceleration * delta;
		if ( moveBackward ) velocity.z += acceleration * delta;

		if ( moveLeft ) velocity.x -= acceleration * delta;
		if ( moveRight ) velocity.x += acceleration * delta;

    if ( moveDown ) velocity.y -= acceleration * delta;
		if ( moveUp ) velocity.y += acceleration * delta;

		scope.controls.getObject().translateX( velocity.x * delta );
		scope.controls.getObject().translateY( velocity.y * delta );
		scope.controls.getObject().translateZ( velocity.z * delta );

		prevTime = time;

  }

}
