import {ExtrudeGeometry} from '../geometry/ExtrudeGeometry';
import {ShapeGeometry} from '../geometry/ShapeGeometry';
import {Path} from './Path';

/**
 * 形状。
 */
export class Shape extends Path {

   /**
    * 洞数据。
    */
   public holes: Array<any>;


   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this.holes = new Array<any>();
   }

   public extrude = function (options) {
      return new ExtrudeGeometry(this, options);
   }

   public makeGeometry(options?: any) {
      return new ShapeGeometry(this, options);
   }

   public getPointsHoles(divisions: number) {
      var holesPts = [];
      var holes = this.holes;
      var count = this.holes.length;
      for (var i = 0; i < count; i++) {
         holesPts[i] = holes[i].getPoints(divisions);
      }
      return holesPts;
   }

   public extractAllPoints(divisions: number) {
      return {
         shape: this.getPoints(divisions),
         holes: this.getPointsHoles(divisions)
      }
   }

   public extractPoints(divisions: number) {
      return this.extractAllPoints(divisions);
   }


}
