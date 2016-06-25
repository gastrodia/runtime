import {FloatUtil} from '../common/lang/FloatUtil';
import {Vector3} from './Vector3';

//==========================================================
// <T>四元数。</T>
//
// @struct
// @author maocy
// @version 150109
//==========================================================
export class Quaternion2 {
   // @attribute
   public x: number;
   public y: number;
   public z: number;
   public w: number;

   //============================================================
   // <T>构造处理。</T>
   //
   // @method
   // @param l:width:Number 宽度
   // @param t:height:Number 高度
   // @param r:deep:Number 深度
   // @param b:deep:Number 深度
   //============================================================
   constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
   }

   //============================================================
   // <T>单位化处理。</T>
   //
   // @method
   //============================================================
   public identity() {
      this.x = this.y = this.z = 0;
      this.w = 1;
      return this;
   }

   //============================================================
   // <T>接收一个四元数。</T>
   //
   // @method
   // @param value:SQuaternion 四元数
   //============================================================
   public assign(value) {
      this.x = value.x;
      this.y = value.y;
      this.z = value.z;
      this.w = value.w;
   }

   //============================================================
   // <T>设置数据内容。</T>
   //
   // @method
   // @param x:Number X分量
   // @param y:Number Y分量
   // @param z:Number Z分量
   // @param w:Number W分量
   //============================================================
   public set(x, y, z, w) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
   }

   //============================================================
   // <T>获得绝对值。</T>
   //
   // @method
   // @return Number 绝对值
   //============================================================
   public absolute() {
      return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w));
   }

   //============================================================
   // <T>单位化处理。</T>
   //
   // @method
   //============================================================
   public normalize() {
      var value = this.absolute();
      if (value != 0) {
         var rate = 1 / value;
         this.x *= rate;
         this.y *= rate;
         this.z *= rate;
         this.w *= rate;
      }
   }

   //============================================================
   // <T>获得反方向。</T>
   //
   // @method
   // @param value:SQuaternion 四元数
   // @return SQuaternion 四元数
   //============================================================
   public conjugate(value: Quaternion2 = null) {
      var result = null;
      if (value) {
         result = value;
      } else {
         result = new Quaternion2();
      }
      result.x = -this.x;
      result.y = -this.y;
      result.z = -this.z;
      result.w = this.w;
      return result;
   }

   //============================================================
   // <T>乘法处理。</T>
   //
   // @method
   // @param value:SQuaternion 四元数
   //============================================================
   public mul(value) {
      var x = this.x;
      var y = this.y;
      var z = this.z;
      var w = this.w;
      this.x = (w * value.x) + (x * value.w) + (y * value.z) - (z * value.y);
      this.y = (w * value.y) + (y * value.w) + (z * value.x) - (x * value.z);
      this.z = (w * value.z) + (z * value.w) + (x * value.y) - (y * value.x);
      this.w = (w * value.w) - (x * value.x) - (y * value.y) - (z * value.z);
   }

   //============================================================
   // <T>乘法处理。</T>
   //
   // @method
   // @param value1:SQuaternion 四元数1
   // @param value2:SQuaternion 四元数2
   //============================================================
   public mul2(value1, value2) {
      this.x = (value1.w * value2.x) + (value1.x * value2.w) + (value1.y * value2.z) - (value1.z * value2.y);
      this.y = (value1.w * value2.y) + (value1.y * value2.w) + (value1.z * value2.x) - (value1.x * value2.z);
      this.z = (value1.w * value2.z) + (value1.z * value2.w) + (value1.x * value2.y) - (value1.y * value2.x);
      this.w = (value1.w * value2.w) - (value1.x * value2.x) - (value1.y * value2.y) - (value1.z * value2.z);
   }

   //============================================================
   // <T>变换三维矢量。</T>
   //
   // @method
   // @param input:SVector3 输入方向
   // @param output:SVector3 输出方向
   //============================================================
   public translate(input, output) {
      // 计算内容
      var q1 = new Quaternion2();
      q1.set(input.x, input.y, input.z, 0);
      q1.normalize();
      var q2 = this.conjugate();
      q1.mul(q2);
      var q = this.clone();
      q.mul(q1);
      // 返回结果
      var result = null;
      if (output) {
         result = output;
      } else {
         result = new Vector3();
      }
      result.set(q.x, q.y, q.z);
      return result;
   }

   //============================================================
   // <T>计算插值。</T>
   //
   // @method
   // @param value1:SQuaternion 开始四元数
   // @param value2:SQuaternion 结束四元数
   // @param rate:Float 比率
   //============================================================
   public slerp(value1, value2, rate) {
      var rv = (value1.x * value2.x) + (value1.y * value2.y) + (value1.z * value2.z) + (value1.w * value2.w);
      var rf = false;
      if (rv < 0) {
         rf = true;
         rv = -rv;
      }
      var r1 = 0;
      var r2 = 0;
      if (rv > 0.999999) {
         r1 = 1 - rate;
         r2 = rf ? -rate : rate;
      } else {
         var ra = Math.acos(rv);
         var rb = 1 / Math.sin(ra);
         r1 = Math.sin((1 - rate) * ra) * rb;
         r2 = rf ? (-Math.sin(rate * ra) * rb) : (Math.sin(rate * ra) * rb);
      }
      this.x = (r1 * value1.x) + (r2 * value2.x);
      this.y = (r1 * value1.y) + (r2 * value2.y);
      this.z = (r1 * value1.z) + (r2 * value2.z);
      this.w = (r1 * value1.w) + (r2 * value2.w);
   }

   //==========================================================
   // <T>用轴向量和旋转角创建一个四元组。</T>
   //
   // @method
   // @param axis:SVector3 方向轴
   // @param angle:Number 弧度
   //==========================================================
   public fromAxisAngle(axis, angle) {
      var r = angle * 0.5;
      var s = Math.sin(r);
      this.x = axis.x * s;
      this.y = axis.y * s;
      this.z = axis.z * s;
      this.w = Math.cos(r);
   }

   //==========================================================
   // <T>从欧拉角获得四元数。</T>
   //
   // @method
   // @param p:pitch:Number X转角
   // @param y:yaw:Number Y转角
   // @param r:roll:Number Z转角
   //==========================================================
   public fromEuler(p, y, r) {
      var sr = Math.sin(r * 0.5);
      var cr = Math.cos(r * 0.5);
      var sp = Math.sin(p * 0.5);
      var cp = Math.cos(p * 0.5);
      var sy = Math.sin(y * 0.5);
      var cy = Math.cos(y * 0.5);
      this.x = cr * sp * cy + sr * cp * sy;
      this.y = cr * cp * sy - sr * sp * cy;
      this.z = sr * cp * cy - cr * sp * sy;
      this.w = cr * cp * cy + sr * sp * sy;
   }

   //==========================================================
   // <T>从四元数获得欧拉角。</T>
   //
   // @method
   // @param p:pitch:Number X转角
   // @param y:yaw:Number Y转角
   // @param r:roll:Number Z转角
   //==========================================================
   public parseEuler(p) {
      var x2 = this.x * this.x;
      var y2 = this.y * this.y;
      var z2 = this.z * this.z;
      // 输出内容
      var r = null;
      if (p) {
         r = p;
      } else {
         r = new Vector3();
      }
      r.x = Math.asin(FloatUtil.toRange((this.w * this.x - this.y * this.z) * 2, -1, 1));
      r.y = Math.atan2(2 * (this.w * this.y + this.z * this.x), 1 - 2 * (x2 + y2));
      r.z = Math.atan2(2 * (this.w * this.z + this.x * this.y), 1 - 2 * (z2 + x2));
      return r;
   }

   //==========================================================
   // <T>序列化数据到输出流里。</T>
   //
   // @param output 数据流
   //==========================================================
   public serialize(output) {
      output.writeFloat(this.x);
      output.writeFloat(this.y);
      output.writeFloat(this.z);
      output.writeFloat(this.w);
   }

   //==========================================================
   // <T>从输入流里反序列化数据。</T>
   //
   // @param input 数据流
   //==========================================================
   public unserialize(input) {
      this.x = input.readFloat();
      this.y = input.readFloat();
      this.z = input.readFloat();
      this.w = input.readFloat();
   }

   //============================================================
   // <T>获得克隆对象。</T>
   //
   // @method
   // @return SQuaternion 克隆对象
   //============================================================
   public clone() {
      var result = new Quaternion2();
      result.x = this.x;
      result.y = this.y;
      result.z = this.z;
      result.w = this.w;
      return result;
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //============================================================
   public toString() {
      return this.x + ',' + this.y + ',' + this.z + ',' + this.w;
   }
}
