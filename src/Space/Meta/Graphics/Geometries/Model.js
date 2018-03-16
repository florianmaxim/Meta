import {ObjectLoader, Box3} from 'three';

import Space from '../../../Space'
import Graphics from '../Graphics'

export default class Model {

  constructor(fileName){

    var loader = new ObjectLoader();

    loader.load( `/static/models/${fileName}.json` , ( obj ) => {

      //console.log('[Model] - Model loaded');

      Space.getScene().add(obj);

    });

  }

}
