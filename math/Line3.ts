import {Prototype} from '../common/reflect/Prototype';
import {MathUtil} from './MathUtil';
import {Vector3} from './Vector3';

/**
 * 三维线段。
 */
export class Line3 {
   // 起点坐标
   public start;
   // 终点坐标
   public end;

   public constructor(start, end) {
      this.start = (start !== undefined) ? start : new Vector3();
      this.end = (end !== undefined) ? end : new Vector3();
   }

   public set(start, end) {
      this.start.copy(start);
      this.end.copy(end);
      return this;
   }

   public clone() {
      return new (this as any).constructor().copy(this);
   }

   public copy(line) {
      this.start.copy(line.start);
      this.end.copy(line.end);
      return this;
   }

   public center(optionalTarget) {
      var result = optionalTarget || new Vector3();
      return result.addVectors(this.start, this.end).multiplyScalar(0.5);
   }

   public delta(optionalTarget) {
      var result = optionalTarget || new Vector3();
      return result.subVectors(this.end, this.start);
   }

   public distanceSq() {
      return this.start.distanceToSquared(this.end);
   }

   public distance() {
      return this.start.distanceTo(this.end);
   }

   public at(t, optionalTarget) {
      var result = optionalTarget || new Vector3();
      return this.delta(result).multiplyScalar(t).add(this.start);
   }

   @Prototype()
   public closestPointToPointParameter(point, clampToLine) {
      var startP = new Vector3();
      var startEnd = new Vector3();
      return function(point, clampToLine): any {
         startP.subVectors(point, this.start);
         startEnd.subVectors(this.end, this.start);
         var startEnd2 = startEnd.dot(startEnd);
         var startEnd_startP = startEnd.dot(startP);
         var t = startEnd_startP / startEnd2;
         if (clampToLine) {
            t = MathUtil.clamp(t, 0, 1);
         }
         return t;
      }
   }

   public closestPointToPoint(point, clampToLine, optionalTarget) {
      var t = this.closestPointToPointParameter(point, clampToLine);
      var result = optionalTarget || new Vector3();
      return this.delta(result).multiplyScalar(t).add(this.start);
   }

   public applyMatrix4(matrix) {
      this.start.applyMatrix4(matrix);
      this.end.applyMatrix4(matrix);
      return this;
   }

   public equals(line) {
      return line.start.equals(this.start) && line.end.equals(this.end);
   }
}
