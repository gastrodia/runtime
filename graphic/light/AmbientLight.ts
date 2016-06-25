import {Light} from './Light';

export class AmbientLight extends Light {
   public constructor(color, intensity) {
      super(color, intensity);
      // this.type = 'AmbientLight';
      // this.castShadow = undefined;
   }
}
