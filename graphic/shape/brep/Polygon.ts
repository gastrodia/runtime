import {Types} from '../../../../runtime/common/lang/Types';
import {Vector2} from '../../../math/Vector2';
import {ShapeUtils} from '../ShapeUtils';
import {Curve} from './Curve';

/**
 * 多边形。
 *
 * @author maocy
 * @history 160506
 */
export class Polygon extends Curve {
   // 坐标集合
   public positions: Types<Vector2>;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this.positions = new Types<Vector2>();
   }

   public getPoint(t) {
   }

   public getPoints() {
      return this.positions;
   }

   /**
    * 增加一个顶点。
    * 如果和最后一个顶点近似相等，则不增加。
    *
    * @param point 顶点
    */
   public push(point: Vector2) {
      var positions = this.positions;
      var count = positions.length;
      if (count) {
         var first = positions[0];
         if (point.nearlyEquals(first)) {
            return;
         }
         var last = positions[count - 1];
         if (point.nearlyEquals(last)) {
            return;
         }
      }
      this.positions.push(point);
   }

   /**
    * 设定时针方向。
    */
   public setClockWise(flag: boolean) {
      var positions = this.positions;
      if (ShapeUtils.isClockWise(positions)) {
         if (!flag) {
            positions.reverse();
         }
      } else {
         if (flag) {
            positions.reverse();
         }
      }
   }
}
