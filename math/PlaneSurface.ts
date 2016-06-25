import {ClassUtil} from '../common/reflect/ClassUtil';

//==========================================================
// <T>平面。</T>
//
// @struct
// @author maocy
// @version 150116
//==========================================================
export class PlaneSurface {
   // A数值
   public a: number;
   // B数值
   public b: number;
   // C数值
   public c: number;
   // D数值
   public d: number;

   //============================================================
   // <T>构造处理。</T>
   //============================================================
   public constructor(a: number = 0, b: number = 0, c: number = 0, d: number = 0) {
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
   }

   //============================================================
   // <T>接收平面数据。</T>
   //
   // @param value 平面
   //============================================================
   public assign(value: PlaneSurface) {
      this.a = value.a;
      this.b = value.b;
      this.c = value.c;
      this.d = value.d;
   }

   //============================================================
   // <T>设置数据内容。</T>
   //
   // @param a 数据
   // @param b 数据
   // @param c 数据
   // @param d 数据
   //============================================================
   public set(a, b, c, d) {
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
   }

   //============================================================
   // <T>单位标准化处理。</T>
   //============================================================
   public normalize() {
      var r = 1 / Math.sqrt((this.a * this.a) + (this.b * this.b) + (this.c * this.c));
      this.a *= r;
      this.b *= r;
      this.c *= r;
      this.d *= r;
   }

   //============================================================
   // <T>点乘处理。</T>
   //
   // @param x 数据
   // @param y 数据
   // @param z 数据
   //============================================================
   public dot(x, y, z) {
      return (x * this.a) + (y * this.b) + (z * this.c) + this.d;
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @return 字符串
   //============================================================
   public toString() {
      return this.a + ',' + this.b + ',' + this.c + ',' + this.d;
   }

   //============================================================
   // <T>获得运行信息。</T>
   //
   // @return 运行信息
   //============================================================
   public dump() {
      return ClassUtil.dump(this) + ' [' + this.toString() + ']';
   }
}
