import {AssertUtil} from '../common/AssertUtil';
import {Line2d} from './Line2d';
import {MathUtil} from './MathUtil';
import {Vector2} from './Vector2';

/**
* 数学2D工具类。
*/
export class Math2dUtil {

   /**
    * 判断两个点是否近似相等。
    *
    * @param source 来源点
    * @param target 目标点
    * @param tolerance 近似值
    * @return 是否相等
    */
   public static isSamePoint(source: Vector2, target: Vector2, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      if (source == target) {
         return true;
      }
      var ex = MathUtil.nearlyEquals(source.x, target.x, tolerance);
      var ey = MathUtil.nearlyEquals(source.y, target.y, tolerance);
      return ex && ey;
   }

   /**
    * 判断两条线段是否相同。
    *
    * @param point1 线段1开始点
    * @param point2 线段1结束点
    * @param point3 线段2开始点
    * @param point4 线段2结束点
    * @param tolerance 精度
    * @return 是否重合
    */
   public static isSameLineSegment(point1: Vector2, point2: Vector2, point3: Vector2, point4: Vector2, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      var equals1 = this.isSamePoint(point1, point3, tolerance) && this.isSamePoint(point2, point4, tolerance);
      var equals2 = this.isSamePoint(point1, point4, tolerance) && this.isSamePoint(point2, point3, tolerance);
      return equals1 || equals2;
   }

   /**
    * 判断两条线段是否平行。
    *
    * @param point1 线段1开始点
    * @param point2 线段1结束点
    * @param point3 线段2开始点
    * @param point4 线段2结束点
    * @param tolerance 精度
    * @return 是否平行
    */
   public static isParallel(point1: Vector2, point2: Vector2, point3: Vector2, point4: Vector2, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      var value = (point1.x - point2.x) * (point3.y - point4.y) - (point1.y - point2.y) * (point3.x - point4.x);
      return MathUtil.nearlyEquals(value, 0, tolerance);
   }

   /**
    * 计算两个线段的长度。
    *
    * @param point1 点1
    * @param point2 点2
    * @return 长度
    */
   public static getSegmentLength(point1: Vector2, point2: Vector2): number {
      var cx = point1.x - point2.x;
      var cy = point1.y - point2.y;
      return Math.sqrt(cx * cx + cy + cy);
   }

   /**
    * 获得垂直相交点。
    *
    * @param point1 线点1
    * @param point2 线点2
    * @param point 点
    * @return 交点
    */
   public static getPerpendicularIntersect(point1: Vector2, point2: Vector2, point: Vector2): Vector2 {
      return new Line2d(point1.x, point1.y, point2.x, point2.y).getClosestPoint(point);
   }

   /**
    * 获得点的离最近点的插值。
    *
    * @param point1 线点1
    * @param point2 线点1
    * @param point 点
    * @return 插值
    */
   public static getLerpNumber(point1: Vector2, point2: Vector2, point: Vector2): number {
      var intersectPoint = this.getPerpendicularIntersect(point1, point2, point);
      return Math.abs(point1.x - point2.x) > Math.abs(point1.y - point2.y) ? (intersectPoint.x - point1.x) / (point2.x - point1.x) : (intersectPoint.y - point1.y) / (point2.y - point1.y);
   }

   /**
    * 获得水平逆时针旋转角。
    *
    * @param start 开始点
    * @param end 结束点
    * @return 旋转角
    */
   public static getAngleHorizontaleCCW(start: Vector2, end: Vector2): number {
      return MathUtil.toDegrees(Math.atan2(end.y - start.y, end.x - start.x));
   }

   /**
    * 获得两条线的逆时针旋转角。
    *
    * @param start1 开始点1
    * @param end1 结束点1
    * @param start2 开始点2
    * @param end2 结束点2
    * @return 旋转角
    */
   public static lineLineAngleCCW(start1: Vector2, end1: Vector2, start2: Vector2, end2: Vector2): number {
      var angle1 = this.getAngleHorizontaleCCW(start1, end1);
      var angle2 = this.getAngleHorizontaleCCW(start2, end2);
      return angle1 - angle2;
   }

   /**
    * 计算两个线的相交点。
    *
    * @param point1 线1点1
    * @param point2 线1点2
    * @param point3 线2点1
    * @param point4 线2点2
    * @return 相交点
    */
   public static lineLineIntersection(point1: Vector2, point2: Vector2, point3: Vector2, point4: Vector2): Vector2 {
      var cx1 = point1.x - point2.x;
      var cy1 = point1.y - point2.y;
      var cx2 = point3.x - point4.x;
      var cy2 = point3.y - point4.y;
      // 两条线平行，没有交点
      var rate = cx1 * cy2 - cy1 * cx2;
      if (Math.abs(rate) < MathUtil.DEFAULT_TOLERANCE) {
         return null;
      }
      // 计算交点
      var r = 1 / rate;
      var rx = point1.x * point2.y - point1.y * point2.x;
      var ry = point3.x * point4.y - point3.y * point4.x;
      var x = (cx2 * rx - cx1 * ry) * r;
      var y = (cy2 * rx - cy1 * ry) * r;
      AssertUtil.debugNumber(x, y);
      return new Vector2(x, y);
   }

   /**
    * 计算两个线段的相交点。
    *
    * @param point1 线1点1
    * @param point2 线1点2
    * @param point3 线2点1
    * @param point4 线2点2
    * @return 相交点
    */
   public static segmentSegmentIntersection(point1: Vector2, point2: Vector2, point3: Vector2, point4: Vector2, tolerance: number = MathUtil.DEFAULT_TOLERANCE): Vector2 {
      var point = this.lineLineIntersection(point1, point2, point3, point4);
      var lerp1 = this.getLerpNumber(point1, point2, point);
      var lerp2 = this.getLerpNumber(point3, point4, point);
      if ((lerp1 > -tolerance) && (lerp1 < 1 + tolerance) && (lerp2 > -tolerance) && (lerp2 < 1 + tolerance)) {
         return point;
      }
   }

   /**
    * 计算射线和线段的交点。
    *
    * @param point1 射线点1
    * @param point2 射线点2
    * @param point3 线段点1
    * @param point4 线段点2
    * @return 相交点
    */
   public static raySegmentIntersection(point1: Vector2, point2: Vector2, point3: Vector2, point4: Vector2, tolerance: number = MathUtil.DEFAULT_TOLERANCE) {
      var intersectionPoint = this.lineLineIntersection(point1, point2, point3, point4);
      if (intersectionPoint) {
         var direction1 = Vector2.direction(point1, point2);
         var direction2 = Vector2.direction(point1, intersectionPoint);
         var lerp = this.getLerpNumber(point3, point4, intersectionPoint);
         var ex = MathUtil.nearlyEquals(direction1.x, direction2.x, tolerance);
         var ey = MathUtil.nearlyEquals(direction1.y, direction2.y, tolerance);
         if (ex && ey && (lerp > -tolerance && lerp < 1 + tolerance)) {
            return intersectionPoint;
         }
      }
   }
}
