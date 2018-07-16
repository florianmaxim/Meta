import {Meta, Graphics} from '~/src';

export default class Model{

    constructor(file){

        return new Meta({

            graphics: new Graphics({

                model: file

            }, true)

        })

    }

}