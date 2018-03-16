import log from '../../Utilities/log';
import isMobile from '../../Utilities/isMobile';

import DesktopDeviceController from './Desktop/DesktopDeviceController';
import MobileDeviceController from './Mobile/MobileDeviceController';
import HeadMountedDisplay from './HeadMountedDisplay/HeadMountedDisplay';

let instance = null;

export default class Device {

  constructor(space){

    this.name = `DeviceManager`

    if ( navigator.getVRDisplays !== undefined ) {

      navigator.getVRDisplays().then((displays) => {

        if(displays.length>0){

          log(`Detected: Desktop, VR: true`, this.name, true)

          instance = new HeadMountedDisplay(space);
    
          return instance;

        }else{

          if(isMobile.any()){

            log(`Detected: Mobile, VR: false`, this.name, true);
    
            return new MobileDeviceController(space)
    
          }else{
    
            log(`Detected: Desktop, VR: false`, this.name, true);
            
            instance = new DesktopDeviceController(space);
    
            return instance;
    
          }

        }
      
      })


    } else {

       if(isMobile.any()){

           log(`Detected: Mobile, VR: false`, this.name, true);
    
            return new MobileDeviceController(space);
    
          }else{

            log(`Detected: Desktop, VR: false`, this.name, true);
    
            instance = new DesktopDeviceController(space);
    
            return instance;
    
          }
      
    }

  }

  static get(){
    return instance;
  }

}
