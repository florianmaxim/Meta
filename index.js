import {Ground, Cube, on} from 'meta-client';
new Ground();
on('touch', (data) => new Cube().set(data.position));
