import config from '../../../../config';
import log from '../../../Utilities/log';

import {Vector3,
		TextureLoader,
		Mesh,
		IcosahedronGeometry,
		SphereGeometry,
		Box3,
		MeshBasicMaterial} from 'three';

import {ViveController} from './Controls/ViveController';

import OBJLoader from './Loaders/OBJLoader';

import Cube from '../../Meta/Graphics/Geometries/Cube';

import Space from '../../../Space/Space';


let hints;

let scope;

let touch1 = false;
let touch2 = false;

let _touch0 = false;
let _touch1 = false;

let _release0 = false;

let _touch = {
	0:false,
	1:false
}

let keys = {
	esc: false,
	enter:false,
	space:false
}

const _DEFAULT = {
  FOG: {
    FAR: 6.25
  },
  LOG: false
}

let touchedMeta1 = false;
let touchedMetaData1 = false;

let touchedMeta2 = false;
let touchedMetaData2 = false;

let intersected = [];

/** This class represents a HMD(Head Mounted Display) Controller.
* @constructor
* @param {Object} space The space instance
*/
export default class HeadMountedDisplay {

	constructor(space){

		scope = this;

		this.name = 'HeadMountedDisplay';

		this.space = space;

		navigator.getVRDisplays()

			.then( function ( displays ) {

				if ( displays.length > 0 ) {

					const display = displays[ 0 ];

					space.renderer.vr.setDevice( display );
					space.renderer.vr.enabled = true;

					space.scene.fog.far = _DEFAULT.FOG.FAR;

					//Important!
					space.device = scope;

					log(`[${scope.name}] - Press (Space) + (Enter) to enter VR`, scope.name, true) 

					document.addEventListener('dblclick', (event) => {
						event.stopPropagation();
						event.preventDefault();
						display.isPresenting ? display.exitPresent() : display.requestPresent( [ { source: space.renderer.domElement } ] );						
					});

					addEventListener('dblclick', (event) => {
						event.stopPropagation();
						event.preventDefault();
						display.isPresenting ? display.exitPresent() : display.requestPresent( [ { source: space.renderer.domElement } ] );						
					})

					document.addEventListener( 'keydown', (event) => {

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
						}
			
						if(keys.enter&&keys.space){

							log(`[${scope.name}] - ${!display.isPresenting?'Entered':'Exited'} VR`, scope.name, true)							
							
							display.isPresenting ? display.exitPresent() : display.requestPresent( [ { source: space.renderer.domElement } ] );				
					
						}
			
					}, false );
			
					document.addEventListener( 'keyup', (event) => {
			
						switch ( event.keyCode ) {
			
							case 13: //enter
								keys.enter = false;
							break;
			
							case 27: //escape
								keys.esc = false;
							break;
			
							case 32: //space
								keys.space = false;
							break;
						}
			
					}, false );


				} else {

					//No VR

				}

			} );




 
		function onThumbpadDown0(){

			console.log(this.name+' - onThumbpadDown0')

		}
		function onThumbpadUp0(){

			console.log('onThumbpadUp0')

		}
		function onMenuDown0(){

			console.log('onMenuDown0')

		}
		function onMenuUp0(){

			console.log('onMenuUp0')

		}
		function onGripsDown0(){

			console.log('onGripsDown0')

		}
		function onGripsUp0(){

			console.log('onGripsUp0')

		}

		this.controller1 = new ViveController( 0 );
		this.controller1.standingMatrix = scope.space.renderer.vr.getStandingMatrix();

		//console.log(scope.space.renderer.vr.getStandingMatrix())

		this.controller1.addEventListener( 'triggerdown', scope.onTriggerDown1 );
		this.controller1.addEventListener( 'triggerup', scope.onTriggerUp1);

		this.controller1.addEventListener( 'thumbpaddown', onThumbpadDown0 );
		this.controller1.addEventListener( 'thumbpadup', onThumbpadUp0 );

		this.controller1.addEventListener( 'menudown', onMenuDown0 );
		this.controller1.addEventListener( 'menuup', ()=>{Space.clear({events:false})} );

		this.controller1.addEventListener( 'gripsdown', onGripsDown0 );
		this.controller1.addEventListener( 'gripsup', onGripsUp0 );

		scope.space.scene.add(scope.controller1);

		this.controller2 = new ViveController( 1 );
		this.controller2.standingMatrix = scope.space.renderer.vr.getStandingMatrix();

		this.controller2.addEventListener( 'triggerdown', scope.onTriggerDown2 );
		this.controller2.addEventListener( 'triggerup', scope.onTriggerUp2);

		this.controller2.addEventListener( 'thumbpaddown', onThumbpadDown0 );
		this.controller2.addEventListener( 'thumbpadup', onThumbpadUp0 );

		this.controller2.addEventListener( 'menudown', onMenuDown0 );
		this.controller2.addEventListener( 'menuup', ()=>{Space.clear({events:false})} );

		this.controller2.addEventListener( 'gripsdown', onGripsDown0 );
		this.controller2.addEventListener( 'gripsup', onGripsUp0 );

		scope.space.scene.add(scope.controller2);

		if(config.device.headMountedDisplay.controllerModels){

			var loader = new OBJLoader();
			loader.setPath( '/static/models/vive-controller/' );

			loader.load( 'vr_controller_vive_1_5.obj', function ( object ) {

				var loader = new TextureLoader();
				loader.setPath( '/static/models/vive-controller/' );
				var controller = object.children[ 0 ];
				controller.material.map = loader.load( 'onepointfive_texture.png' );
				controller.material.specularMap = loader.load( 'onepointfive_spec.png' );
				controller.castShadow = true;
				controller.receiveShadow = true;

				var pivot = new Mesh( new IcosahedronGeometry( 0.01, 2 ) );
				pivot.name = 'pivot';
				pivot.position.y = -0.016;
				pivot.position.z = -0.043;
				pivot.rotation.x = Math.PI / 5.5;

				controller.add( pivot );
				pivot.material = pivot.material.clone();

				scope.controller1.add( controller.clone() );
				scope.controller2.add( controller.clone() );

			});

		}else{

			var pivot = new Mesh( new SphereGeometry( .025, 2, 2 ), new MeshBasicMaterial({color:0x0000ff}) );
			pivot.name = 'pivot';

			scope.controller1.add( pivot );
			scope.controller2.add( pivot.clone() );
			
		}

	}



	onTriggerDown2(controller){
	
		let data = [{
			position : new Vector3().setFromMatrixPosition(scope.controller2.matrixWorld)
		}];
		
		if(scope.controller2)
		data.push(
			{
				position : new Vector3().setFromMatrixPosition(scope.controller1.matrixWorld)
			}
		);

		if(touchedMeta2){
			touchedMeta2.go('touch', data, touchedMeta2);
		}else{
			scope.space.go('touch', data[0], scope.space);
		}

	}
	
	onTriggerUp2(controller){

		let data = [{
			position : new Vector3().setFromMatrixPosition(scope.controller2.matrixWorld)
		}];
		
		if(scope.controller2)
		data.push(
			{
				position : new Vector3().setFromMatrixPosition(scope.controller1.matrixWorld)
			}
		);

		if(touchedMeta2){
			touchedMeta2.go('release', data, touchedMeta2);
		}else{
			scope.space.go('release', data[0], scope.space);
		}

	}

	onTriggerDown1(){

		let	position = new Vector3().setFromMatrixPosition(scope.controller1.matrixWorld)

		let data = [{
			position: position
		}];
		
		if(scope.controller2)
		data.push(
			{
				position : new Vector3().setFromMatrixPosition(scope.controller2.matrixWorld)
			}
		);

		if(touchedMeta1){
			touchedMeta1.go('touch', data, touchedMeta1);
		}else{
			scope.space.go('touch', data[0], scope.space);
		}

	}
			
	onTriggerUp1(mode = true){

		let data = [{
			position : new Vector3().setFromMatrixPosition(scope.controller1.matrixWorld)
		}];
		
		if(scope.controller2)
		data.push(
			{
				position : new Vector3().setFromMatrixPosition(scope.controller2.matrixWorld)
			}
		);

		if(touchedMeta1){
			touchedMeta1.go('release', data, touchedMeta1);
		}else{
			scope.space.go('release', data[0], scope.space);
		}

	}

	intersect1(){

	   scope.space.Meta.forEach((Meta) => {

			let point = new Vector3().setFromMatrixPosition(scope.controller1.matrixWorld);
			let box = new Box3().setFromObject(Meta.graphics.mesh);
			let distance = box.distanceToPoint(point);

			const data = [{
				hand:0,
				distance: distance,
				position: point
			}]

			if(scope.controller2){

				let point = new Vector3().setFromMatrixPosition(scope.controller2.matrixWorld);
				let box = new Box3().setFromObject(Meta.graphics.mesh);
				let distance = box.distanceToPoint(point);
				
				data.push({
					hand:1,
					distance: distance,
					position: point
				});
			}

			if(distance<=0){

				touchedMeta1 = Meta;
				touchedMetaData1 = data;

				if(!Meta._entered1){
					Meta.go('touch', data, Meta)
					Meta.go('enter', data, Meta)
					Meta._entered1 = true;
				}

			}else{	

				if(Meta._entered1){

					touchedMeta1 = false;
					touchedMetaData1 = data;

					Meta.go('leave', data, Meta)
					Meta._entered1 = false;

				}

				
			}


		});

	}


	intersect2(){

		scope.space.Meta.forEach((Meta) => {

			let point = new Vector3().setFromMatrixPosition(scope.controller2.matrixWorld);
			let box = new Box3().setFromObject(Meta.graphics.mesh);
			let distance = box.distanceToPoint(point);

			const data = [{
				distance: distance,
				position: point
			}]

			if(scope.controller2){

				let point = new Vector3().setFromMatrixPosition(scope.controller1.matrixWorld);
				let box = new Box3().setFromObject(Meta.graphics.mesh);
				let distance = box.distanceToPoint(point);
				
				data.push({
					distance: distance,
					position: point
				});
			}

			if(distance<=0){

				touchedMeta2 = Meta;
				touchedMetaData2 = data;

				if(!Meta._entered2){
					Meta.go('enter', data, Meta)
					Meta._entered2= true;
				}

			}else{	

				if(Meta._entered2){

					touchedMeta2 = false;
					touchedMetaData2 = data;

					Meta.go('leave', data, Meta)
					Meta._entered2 = false;

				};
			};
		});
	};

	render(){

		scope.controller1.update();
		scope.controller2.update();

		if(scope.controller1)
			scope.intersect1();
		
		if(scope.controller2)
			scope.intersect2();

	}

}