import config from '../../config';

const _DEFAULT = {
  COLOR: {
    PRIMARY: '#ff0000',
    SECONDARY: '#0000ff',
    TEXT: '#ffffff'
  }
}

export default function log (msg, name = 'Meta' , mode = config.log, style = `background: linear-gradient(${_DEFAULT.COLOR.PRIMARY}, ${_DEFAULT.COLOR.SECONDARY});color: ${_DEFAULT.COLOR.TEXT};`){
  if(mode) console.log(` %c [Meta][${name}] - ${msg}`, style);
}
