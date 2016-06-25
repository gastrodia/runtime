import {AssertUtil} from '../common/AssertUtil';
import {MathUtil} from './MathUtil';
import {Vector2} from './Vector2';

/**
 * 二维线段。
 */
export class Line2 {
   // 起点
   public from: Vector2;
   // 终点
   public to: Vector2;

   /**
    * 构造处理。
    *
    * @param x0 起点X坐标
    * @param y0 起点Y坐标
    * @param x1 终点X坐标
    * @param y1 终点Y坐标
    */
   public constructor(from: Vector2, to: Vector2) {
      this.from = from || new Vector2();
      this.to = to || new Vector2();
   }

   /**
    * 判断是否相等。
    *
    * @param value 内容
    * @param tolerance 误差
    * @return 是否相等
    */
   public equals(value: Line2, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      if (this.from.nearlyEquals(value.from, tolerance) && this.to.nearlyEquals(value.to, tolerance)) {
         return true;
      }
      if (this.from.nearlyEquals(value.to, tolerance) && this.to.nearlyEquals(value.from, tolerance)) {
         return true;
      }
      return false;
   }

   /**
   * 判断是否近似相等。
    *
    * @param value 内容
    * @param tolerance 误差
    * @return 是否相等
   */
   public nearlyEquals(value: Line2, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      if (this.from.nearlyEquals(value.from, tolerance) && this.to.nearlyEquals(value.to, tolerance)) {
         return true;
      }
      if (this.from.nearlyEquals(value.to, tolerance) && this.to.nearlyEquals(value.from, tolerance)) {
         return true;
      }
      return false;
   }

   /**
    * 判断一个点是否在一条线段的内部。
    *
    * @param point 点坐标
    * @param tolerance 精度
    * @return 是否平行
    */
   public isPointInLine(point: Vector2, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      var distance = this.closestDistance(point);
      return distance < tolerance;
   }

   /**
    * 判断一个点是否在线段上。
    *
    * @param point 点
    * @param point1 开始点
    * @param point2 结束点
    * @param tolerance 公差
    * @return 是否落在
    */
   public isPointInLineSegment(point: Vector2, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      // 获得最近点
      var closestPoint = this.getClosestPoint(point);
      if (!closestPoint.nearlyEquals(point, tolerance)) {
         return false;
      }
      var length = this.getSegmentLength();
      var lengthTolerance = -tolerance / length;
      var lerp1 = Vector2.lerp(this.from, this.to, lengthTolerance);
      var lerp2 = Vector2.lerp(this.to, this.from, lengthTolerance);
      // 比较结果
      var e1 = Math.min(lerp1.x, lerp2.x) <= closestPoint.x;
      var e2 = Math.max(lerp1.x, lerp2.x) >= closestPoint.x;
      var e3 = Math.min(lerp1.y, lerp2.y) <= closestPoint.y;
      var e4 = Math.max(lerp1.y, lerp2.y) >= closestPoint.y;
      var result = e1 && e2 && e3 && e4;
      return result;
   }

   /**
    * 获得指定点到线段的最近点的距离。
    *
    * @param point 点
    * @return 距离
    */
   public closestDistance(point: Vector2): number {
      var closestPoint = this.getClosestPoint(point);
      var cx = point.x - closestPoint.x;
      var cy = point.y - closestPoint.y;
      var length = Math.sqrt(cx * cx + cy * cy);
      return length;
   }

   /**
    * 获得长度的平放。
    *
    * @param value 内容
    * @return 是否相等
    */
   public getSegmentLengthSquared(): number {
      var cx = this.to.x - this.from.x;
      var cy = this.to.y - this.from.y;
      return cx * cx + cy * cy;
   }

   /**
   * 获得长度。
   */
   public getSegmentLength(): number {
      return Math.sqrt(this.getSegmentLengthSquared());
   }

   /**
    * 获得到插值点。
    *
    * @param rate 比率
    * @return 插值点
    */
   public getInterpolatedPoint(rate: number): Vector2 {
      var x = MathUtil.lerp(this.from.x, this.to.x, rate);
      var y = MathUtil.lerp(this.from.y, this.to.y, rate);
      return new Vector2(x, y);
   }

   /**
   * 获得最近的线性插值。
   *
   * @param rate 比率
   * @return 插值点
   */
   public getClosestLinearInterpolation(point: Vector2): number {
      var from = this.from;
      var to = this.to;
      var lengthSquared = this.getSegmentLengthSquared();
      return ((point.x - from.x) * (to.x - from.x) + (point.y - from.y) * (to.y - from.y)) / lengthSquared;
   }

   /**
    * 获得线段上的最近点。
    *
    * @param point 点
    * @return 最近点
    */
   public getClosestSegmentPoint(point: Vector2): Vector2 {
      var interpolation = this.getClosestLinearInterpolation(point);
      var interpolationClamp = MathUtil.clamp(interpolation, 0, 1);
      return this.getInterpolatedPoint(interpolationClamp);
   }

   /**
    * 获得最近点。
    *
    * @param point 点
    * @return 最近点
    */
   public getClosestPoint(point: Vector2): Vector2 {
      var interpolation = this.getClosestLinearInterpolation(point);
      return this.getInterpolatedPoint(interpolation);
   }

   /**
    * 克隆一份数据。
    */
   public clone(): Line2 {
      return new Line2(this.from.clone(), this.to.clone());
   }

   /**
    * 从参数中获得一个线段。
    *
    * @return 线段
    */
   public static from(value1?: any, value2?: any, value3?: any, value4?: any): Line2 {
      var x0 = null;
      var y0 = null;
      var x1 = null;
      var y1 = null;
      var count = arguments.length;
      if (count == 1) {
         var value = arguments[0];
         if (Array.isArray(value)) {
            x0 = value[0];
            y0 = value[1];
            x1 = value[2];
            y1 = value[3];
         } else {
            x0 = value.x0;
            y0 = value.y0;
            x1 = value.x1;
            y1 = value.y1;
         }
      } else if (count == 2) {
         var value1 = arguments[0];
         if (Array.isArray(value1)) {
            x0 = value1[0];
            y0 = value1[1];
         } else {
            x0 = value1.x;
            y0 = value1.y;
         }
         var value2 = arguments[1];
         if (Array.isArray(value2)) {
            x1 = value2[0];
            y1 = value2[1];
         } else {
            x1 = value2.x;
            y1 = value2.y;
         }
      } else if (count == 4) {
         x0 = arguments[0];
         y0 = arguments[1];
         x1 = arguments[2];
         y1 = arguments[3];
      }
      AssertUtil.debugNumber(x0, y0, x1, y1);
      return new Line2(new Vector2(x0, y0), new Vector2(x1, y1));
   }
}
