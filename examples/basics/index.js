import {Ground, Cube, on} from '../../src';
new Ground();
on('touch', (data) => new Cube().set(data.position));
