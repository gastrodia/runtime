import {AssertUtil} from '../common/AssertUtil';
import {MathUtil} from './MathUtil';
import {Vector2} from './Vector2';

/**
 * 二维线段。
 */
export class Line2d {
   // 起点X坐标
   public x0: number;
   // 起点Y坐标
   public y0: number;
   // 终点X坐标
   public x1: number;
   // 终点Y坐标
   public y1: number;

   /**
    * 构造处理。
    *
    * @param x0 起点X坐标
    * @param y0 起点Y坐标
    * @param x1 终点X坐标
    * @param y1 终点Y坐标
    */
   public constructor(x0: number = 0, y0: number = 0, x1: number = 0, y1: number = 0) {
      this.x0 = x0;
      this.y0 = y0;
      this.x1 = x1;
      this.y1 = y1;
   }

   /**
   * 判断是否相等。
   *
   * @param value 内容
   * @return 是否相等
   */
   public equals(value: Line2d, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      if (!MathUtil.nearlyEquals(this.x0, value.x0, tolerance)) {
         return false;
      }
      if (!MathUtil.nearlyEquals(this.y0, value.y0, tolerance)) {
         return false;
      }
      if (!MathUtil.nearlyEquals(this.x1, value.x1, tolerance)) {
         return false;
      }
      if (!MathUtil.nearlyEquals(this.y1, value.y1, tolerance)) {
         return false;
      }
      return true;
   }

   /**
   * 获得开始点。
   */
   public start(): Vector2 {
      return new Vector2(this.x0, this.y0);
   }

   /**
   * 获得结束点。
   */
   public end(): Vector2 {
      return new Vector2(this.x1, this.y1);
   }

   /**
    * 获得长度的平放。
    *
    * @param value 内容
    * @return 是否相等
    */
   public getSegmentLengthSquared(): number {
      var cx = this.x1 - this.x0;
      var cy = this.y1 - this.y0;
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
      var x = MathUtil.lerp(this.x0, this.x1, rate);
      var y = MathUtil.lerp(this.y0, this.y1, rate);
      return new Vector2(x, y);
   }

   /**
   * 获得最近的线性插值。
   *
   * @param rate 比率
   * @return 插值点
   */
   public getClosestLinearInterpolation(point): number {
      var lengthSquared = this.getSegmentLengthSquared();
      return ((point.x - this.x0) * (this.x1 - this.x0) + (point.y - this.y0) * (this.y1 - this.y0)) / lengthSquared;
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
   public clone(): Line2d {
      return new Line2d(this.x0, this.y0, this.x1, this.y1);
   }

   /**
    * 从参数中获得一个线段。
    *
    * @return 线段
    */
   public static from(value1?: any, value2?: any, value3?: any, value4?: any): Line2d {
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
      AssertUtil.debugNumber(x0);
      AssertUtil.debugNumber(y0);
      AssertUtil.debugNumber(x1);
      AssertUtil.debugNumber(y1);
      return new Line2d(x0, y0, x1, y1)
   }
}
