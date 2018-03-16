import {Object3D, Vector3, Euler} from 'three';

let onMouseMove = null;

let scope;

export default class PointerLockControls {

  constructor( camera ) {

  	scope = this;

    this.camera = camera;

  	this.pitchObject = new Object3D();
  	this.pitchObject.add( camera );

  	this.yawObject = new Object3D();
  	this.yawObject.add( this.pitchObject );

  	onMouseMove = ( event ) => {

  		if ( scope.enabled === false ) return;

  		const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
  		const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

  		scope.yawObject.rotation.y -= movementX * 0.002;
  		scope.pitchObject.rotation.x -= movementY * 0.002;
  		scope.pitchObject.rotation.x = Math.max( - Math.PI / 2, Math.min( Math.PI / 2, scope.pitchObject.rotation.x ) );

  	};

    document.addEventListener( 'mousemove', onMouseMove, false );

    this.getDirection();

  	this.enabled = false;

  }

	disable () {

    this.enabled = false;

    // (yaw and pitch) rotation
    // -> to camera rotation
    scope.camera.rotation.set(0,scope.yawObject.rotation.y,0);

    this.pitchObject.rotation.set(0,0,0);
    this.yawObject.rotation.set(0,0,0);

		document.removeEventListener( 'mousemove', onMouseMove, false );

	};

	enable () {

    this.enabled = true;

    // (camera) rotation
    // -> (yaw and pitch) rotation

    this.pitchObject.rotation.x = scope.camera.rotation.x;
    this.pitchObject.rotation.z = 0;
    this.yawObject.rotation.y   = scope.camera.rotation.y;

    scope.camera.rotation.set(0,0,0);

		document.addEventListener( 'mousemove', onMouseMove, false );

	};


	getObject () {

		return this.yawObject;

	};

	getDirection () {

		// assumes the camera itself is not rotated

		var direction = new Vector3( 0, 0, - 1 );
		var rotation  = new Euler( 0, 0, 0, "YXZ" );

		return ( v ) => {

			rotation.set( this.pitchObject.rotation.x, this.yawObject.rotation.y, 0 );

			v.copy( direction ).applyEuler( rotation );

			return v;

		};

	}

};
