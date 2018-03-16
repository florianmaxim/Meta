Date.prototype.plus = function(unit, value) {

  const _unit = unit!==undefined?unit:'h';

  switch(_unit){
    case 'h':
      this.setHours(this.getHours() + value);
    break;
    case 'm':
      this.setMinutes(this.getMinutes() + value);
    break;
    case 's':
      this.setSeconds(this.getSeconds() + value);
    break;
    case 'ms':
      this.setMilliseconds(this.getMilliseconds() + value);
    break;
  }

  return this;

};
Date.prototype.minus = function(unit, value) {

  const _unit = unit!==undefined?unit:'h';

  switch(_unit){
    case 'h':
      this.setHours(this.getHours() - value);
    break;
    case 'm':
      this.setMinutes(this.getMinutes() - value);
    break;
    case 's':
      this.setSeconds(this.getSeconds() - value);
    break;
    case 'ms':
      this.setMilliseconds(this.getMilliseconds() - value);
    break;
  }

  return this;

};

/** This class represents a Meta's existence.
*
* @example
* new Meta({
*  existence: new Existence({
*   start: new Date().plus('m', 1),
*   end: new Date().plus('m', 2),
*  }),
*  graphics: new Graphics({
*    geometry: new Cube(true)
*  }, true)
* });
*
* @constructor
* @param {Object} props
* @param {String} props.start Start of the existence (Date object).
* @param {String} props.end End of the existence (Date object).
*/

export default class Existence {

  constructor(props){

    /**
     * Existence has started. (Current date is higher than start date)
     * @param {Boolean}
    */
    this.started = false;

    /**
     * Existence has ended. (Current date is lower than start date)
     * @param {Boolean}
    */
    this.ended = false;

    /**
     * Start date of existence.
     * @param {Date} start
    */
    this.start = props!==undefined&&props.start!==undefined?props.start:null;

    /**
     * End date of existence.
     * @param {Date} end
    */
    this.end = props!==undefined&&props.end!==undefined?props.end:null;

    // //console.log('[Existence] - Start:'+this.start)
    // //console.log('[Existence] - End:'+this.end)

  }
}
