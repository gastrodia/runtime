import {Curve} from '../brep/Curve';

/**
 * 线段。
 *
 * @author maocy
 * @version 160422
 */
export class LineCurve extends Curve {
   /** 开始点 */
   public begin: any;
   /** 结束点 */
   public end: any;
   /** 颜色 */
   public color: number;

   /**
    * 构造处理。
    *
    * @param begin 开始点
    * @param end 结束点
    */
   public constructor(begin?: any, end?: any) {
      super();
      this.begin = begin;
      this.end = end;
   }

   /**
    * 获得指定步长的点信息。
    *
    * @param step 步长
    * @return 点坐标
    */
   public getPoint(step: number): any {
      var point = this.end.clone().sub(this.begin);
      point.multiplyScalar(step).add(this.begin);
      return point;
   }

   /**
    * 获得指定步长的点信息。
    *
    * @param step 步长
    * @return 点坐标
    */
   public getPointAt(u) {
      return this.getPoint(u);
   }

   /**
    * 获得切线方向。
    *
    * @param step 步长
    * @return 方向
    */
   public getTangent(step: number) {
      var tangent = this.end.clone().sub(this.begin);
      return tangent.normalize();
   }
}
