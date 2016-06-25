import {Objects} from '../../../runtime/common/lang/Objects';
import {Line2d} from '../../math/Line2d';
import {Math2dUtil} from '../../math/Math2dUtil';
import {Vector2} from '../../math/Vector2';

/**
 * 2D线段相交。
 */
export class Intersect2d {
   // 线集合
   public lines: Objects<Line2d>;

   /**
    * 构造处理。
    */
   public constructor() {
      this.lines = new Objects<Line2d>();
   }

   /**
    * 增加一个线段。
    *
    * @param line 线段
    */
   public pushLine(line: Line2d) {
      this.lines.push(line);
   }

   /**
    * 相交运算。
    */
   public intersectLine(start: Vector2, end: Vector2): boolean {
      var lines = this.lines;
      var count = lines.count();
      for (var i = 0; i < count; i++) {
         var line = lines.at(i);
         var lineStart = line.start();
         var lineEnd = line.end();
         if (Math2dUtil.isSameLineSegment(start, end, lineStart, lineEnd)) {
            return true;
         }
      }
      return false;
   }

   /**
    * 相交运算。
    */
   public intersect(start: Vector2, end: Vector2): Array<Vector2> {
      var points = new Array<Vector2>();
      var lines = this.lines;
      var count = lines.count();
      for (var i = 0; i < count; i++) {
         var line = lines.at(i);
         var lineStart = line.start();
         var lineEnd = line.end();
         if (!Math2dUtil.isSameLineSegment(start, end, lineStart, lineEnd)) {
            if (!Math2dUtil.isParallel(start, end, lineStart, lineEnd)) {
               var point = Math2dUtil.lineLineIntersection(start, end, lineStart, lineEnd);
               points.push(point);
            }
         }
      }
      points.sort(function(point1: Vector2, point2: Vector2) {
         var length1 = Math2dUtil.getSegmentLength(start, point1);
         var length2 = Math2dUtil.getSegmentLength(start, point2);
         return length1 - length2;
      });
      return points;
   }

   /**
    * 相交运算。
    */
   public intersectPoint(start: Vector2, end: Vector2): Vector2 {
      var points = this.intersect(start, end);
      if (points.length) {
         return points[0];
      }
      return null;
   }
}
