'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}Date.prototype.plus=function(unit,value){var _unit=unit!==undefined?unit:'h';switch(_unit){case'h':this.setHours(this.getHours()+value);break;case'm':this.setMinutes(this.getMinutes()+value);break;case's':this.setSeconds(this.getSeconds()+value);break;case'ms':this.setMilliseconds(this.getMilliseconds()+value);break;}return this};Date.prototype.minus=function(unit,value){var _unit=unit!==undefined?unit:'h';switch(_unit){case'h':this.setHours(this.getHours()-value);break;case'm':this.setMinutes(this.getMinutes()-value);break;case's':this.setSeconds(this.getSeconds()-value);break;case'ms':this.setMilliseconds(this.getMilliseconds()-value);break;}return this};var Existence=function Existence(props){_classCallCheck(this,Existence);this.started=false;this.ended=false;this.start=props!==undefined&&props.start!==undefined?props.start:null;this.end=props!==undefined&&props.end!==undefined?props.end:null};exports.default=Existence;