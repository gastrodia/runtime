var Canvas = null;
declare var require;
if (typeof document === 'undefined' && typeof require !== 'undefined') {
   Canvas = require('canvas');
}

export class CanvasProvider {
   public getCanvas(size?: { w: number, h: number }): HTMLCanvasElement {
      var width = 1024, height = 1024;
      if (size) {
         width = size.w;
         height = size.h;
      }
      return new Canvas(width, height);
   }

   public getImage(){
      return new Canvas.Image();
   }
}
