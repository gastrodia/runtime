import {FloatUtil} from '../common/lang/FloatUtil';
import {StringBuffer} from '../common/lang/StringBuffer';
import {MathUtil} from './MathUtil';
import {Point3} from './Point3';

//==========================================================
// <T>三维矩阵。</T>
//
// @struct
// @author maocy
// @version 150207
//==========================================================
export class Matrix3x3 {
   // 数据
   public _data = new Array(9);

   //============================================================
   // <T>获得数据。</T>
   //
   // @method
   // @return Float32Array 数据
   //============================================================
   public data() {
      return this._data;
   }

   //============================================================
   // <T>判断数据内容是否相等。</T>
   //
   // @method
   // @param p:data:Array 数据
   // @return Boolean 是否相等
   //============================================================
   public equalsData(p) {
      var d = this._data;
      for (var i = 0; i < 9; i++) {
         if (d[i] != p[i]) {
            return false;
         }
      }
      return true;
   }

   //============================================================
   // <T>接收一个数据内容。</T>
   //
   // @method
   // @param valueData:Array 数据
   //============================================================
   public assignData(valueData) {
      var o = this;
      var data = o._data;
      for (var n = 0; n < 9; n++) {
         data[n] = valueData[n];
      }
      return o;
   }

   //============================================================
   // <T>接收一个数据内容。</T>
   //
   // @method
   // @param value:SMatrix4x4 四维矩阵
   //============================================================
   public assign4x4(value) {
      var o = this;
      var data = o._data;
      var valueData = value.data();
      data[0] = valueData[0];
      data[1] = valueData[1];
      data[2] = valueData[2];
      data[3] = valueData[4];
      data[4] = valueData[5];
      data[5] = valueData[6];
      data[6] = valueData[8];
      data[7] = valueData[9];
      data[8] = valueData[10];
      return o;
   }

   //============================================================
   // <T>追加一个数据内容。</T>
   //
   // @method
   // @param p:data:Array 数据
   //============================================================
   public appendData(p) {
      var d = this._data;
      // 矩阵计算
      var v0 = (d[0] * p[0]) + (d[1] * p[3]) + (d[2] * p[6]);
      var v1 = (d[0] * p[1]) + (d[1] * p[4]) + (d[2] * p[7]);
      var v2 = (d[0] * p[2]) + (d[1] * p[5]) + (d[2] * p[8]);
      var v3 = (d[3] * p[0]) + (d[4] * p[3]) + (d[5] * p[6]);
      var v4 = (d[3] * p[1]) + (d[4] * p[4]) + (d[5] * p[7]);
      var v5 = (d[3] * p[2]) + (d[4] * p[5]) + (d[5] * p[8]);
      var v6 = (d[6] * p[0]) + (d[7] * p[3]) + (d[8] * p[6]);
      var v7 = (d[6] * p[1]) + (d[7] * p[4]) + (d[8] * p[7]);
      var v8 = (d[6] * p[2]) + (d[7] * p[5]) + (d[8] * p[8]);
      // 复制内容
      d[0] = v0;
      d[1] = v1;
      d[2] = v2;
      d[3] = v3;
      d[4] = v4;
      d[5] = v5;
      d[6] = v6;
      d[7] = v7;
      d[8] = v8;
   }

   //============================================================
   // <T>X轴旋转内容。</T>
   //  1    0   0 0
   //  0  cos sin 0
   //  0 -sin cos 0
   //  0    0   0 1
   //
   // @method
   // @param p:value:Float 弧度
   //============================================================
   public rotationX(p) {
      // 计算旋转
      var rs = Math.sin(p);
      var rc = Math.cos(p);
      // 追加内容
      var v = MathUtil.VALUE_9;
      v[0] = 1;
      v[1] = 0;
      v[2] = 0;
      v[3] = 0;
      v[4] = rc;
      v[5] = rs;
      v[6] = 0;
      v[7] = -rs;
      v[8] = rc;
      this.appendData(v);
   }

   //============================================================
   // <T>Y轴旋转内容。</T>
   //  cos   0  sin  0
   //  0     1    0  0
   //  -sin  0  cos  0
   //  0     0    0  1
   //
   // @method
   // @param p:value:Float 弧度
   //============================================================
   public rotationY(p) {
      // 计算旋转
      var rs = Math.sin(p);
      var rc = Math.cos(p);
      // 追加内容
      var v = MathUtil.VALUE_9;
      v[0] = rc;
      v[1] = 0;
      v[2] = rs;
      v[3] = 0;
      v[4] = 1;
      v[5] = 0;
      v[6] = -rs;
      v[7] = 0;
      v[8] = rc;
      this.appendData(v);
   }

   //============================================================
   // <T>Z轴旋转内容。</T>
   //  cos  sin  0 0
   //  -sin cos  1 0
   //  0      0  1 0
   //  0      0  0 1
   //
   // @method
   // @param p:value:Float 弧度
   //============================================================
   public rotationZ(p) {
      // 计算旋转
      var rs = Math.sin(p);
      var rc = Math.cos(p);
      // 追加内容
      var v = MathUtil.VALUE_9;
      v[0] = rc;
      v[1] = rs;
      v[2] = 0;
      v[3] = -rs;
      v[4] = rc;
      v[5] = 1;
      v[6] = 0;
      v[7] = 0;
      v[8] = 1;
      this.appendData(v);
   }

   //============================================================
   // <T>设置旋转内容。</T>
   //  1    0   0 0
   //  0  cos sin 0
   //  0 -sin cos 0
   //  0    0   0 1
   //
   // @method
   // @param x:Float X弧度
   // @param y:Float Y弧度
   // @param z:Float Z弧度
   //============================================================
   public rotation(x, y, z) {
      // 计算旋转
      var rsx = Math.sin(x);
      var rcx = Math.cos(x);
      var rsy = Math.sin(y);
      var rcy = Math.cos(y);
      var rsz = Math.sin(z);
      var rcz = Math.cos(z);
      // 追加内容
      var v = MathUtil.VALUE_9;
      v[0] = rcy * rcz;
      v[1] = rcy * rsz;
      v[2] = -rsy;
      v[3] = rsx * rsy * rcz - rcx * rsz;
      v[4] = rsx * rsy * rsz + rcx * rcz;
      v[5] = rsx * rcy;
      v[6] = rcx * rsy * rcz + rsx * rsz;
      v[7] = rcx * rsy * rsz - rsx * rcx;
      v[8] = rcx * rcy;
      this.appendData(v);
   }

   //============================================================
   // <T>计算逆矩阵。</T>
   //
   // @method
   // @return Boolean 是否成功
   //============================================================
   public invert() {
      var o = this;
      var d = o._data;
      var v = MathUtil.VALUE_9;
      // 计算矩阵
      v[0] = (d[4] * d[8]) - (d[5] * d[7]);
      v[1] = (d[2] * d[7]) - (d[1] * d[8]);
      v[2] = (d[1] * d[5]) - (d[2] * d[4]);
      v[3] = (d[5] * d[6]) - (d[3] * d[8]);
      v[4] = (d[0] * d[8]) - (d[2] * d[6]);
      v[5] = (d[2] * d[3]) - (d[0] * d[5]);
      v[6] = (d[3] * d[7]) - (d[4] * d[6]);
      v[7] = (d[1] * d[6]) - (d[0] * d[7]);
      v[8] = (d[0] * d[4]) - (d[1] * d[3]);
      // 计算内容
      var r = (d[0] * v[0]) + (d[1] * v[3]) + (d[2] * v[6]);
      if (r == 0) {
         return false;
      }
      r = 1 / r;
      // 设置内容
      for (var i = 0; i < 9; i++) {
         d[i] = v[i] * r;
      }
      return true;
   }

   //==========================================================
   // <T>变换顶点数据。</T>
   //
   // @method
   // @param po:outputData:Array 输出数据
   // @param pi:inputData:Array 输入数据
   // @param pc:count:Integer 个数
   //==========================================================
   public transform(po, pi, pc) {
      var d = this._data;
      for (var i = 0; i < pc; i++) {
         var n = (i << 1) + i;
         po[n] = (pi[n] * d[0]) + (pi[n + 1] * d[3]) + (pi[n + 2] * d[6]);
         po[n + 1] = (pi[n] * d[1]) + (pi[n + 1] * d[4]) + (pi[n + 2] * d[7]);
         po[n + 2] = (pi[n] * d[2]) + (pi[n + 1] * d[5]) + (pi[n + 2] * d[8]);
      }
   }

   //==========================================================
   // <T>变换顶点数据。</T>
   //
   // @method
   // @param inputPoint:SPoint3 输入顶点
   // @param outputPoint:SPoint3 输出顶点
   //==========================================================
   public transformPoint3(inputPoint, outputPoint) {
      var d = this._data;
      // 计算内容
      var x = (inputPoint.x * d[0]) + (inputPoint.y * d[3]) + (inputPoint.z * d[6]);
      var y = (inputPoint.x * d[1]) + (inputPoint.y * d[4]) + (inputPoint.z * d[7]);
      var z = (inputPoint.x * d[2]) + (inputPoint.y * d[5]) + (inputPoint.z * d[8]);
      // 输出结果
      var value = null;
      if (outputPoint) {
         value = outputPoint;
      } else {
         value = new Point3();
      }
      value.set(x, y, z);
      return value;
   }

   //============================================================
   // <T>构建一个矩阵。</T>
   //
   // @method
   // @param t:translation:SPoint3 位移
   // @param r:quaternion:SQuaternion 旋转
   // @param s:scale:SVector3 缩放
   //============================================================
   public build(r) {
      var d = this._data;
      var x2 = r.x * r.x;
      var y2 = r.y * r.y;
      var z2 = r.z * r.z;
      var xy = r.x * r.y;
      var xz = r.x * r.z;
      var yz = r.y * r.z;
      var wx = r.w * r.x;
      var wy = r.w * r.y;
      var wz = r.w * r.z;
      d[0] = 1 - 2 * (y2 + z2);
      d[1] = 2 * (xy - wz);
      d[2] = 2 * (xz + wy);
      d[3] = 2 * (xy + wz);
      d[4] = 1 - 2 * (x2 + z2);
      d[5] = 2 * (yz - wx);
      d[6] = 2 * (xz - wy);
      d[7] = 2 * (yz + wx);
      d[8] = 1 - 2 * (x2 + y2);
   }

   //==========================================================
   // <T>写入数据。</T>
   //
   // @method
   // @param d:data:Array 数组
   // @param i:offset:Integer 索引位置
   //==========================================================
   public writeData(d, i) {
      var o = this;
      var pd = o._data;
      d[i++] = pd[0];
      d[i++] = pd[3];
      d[i++] = pd[6];
      d[i++] = pd[1];
      d[i++] = pd[4];
      d[i++] = pd[7];
      d[i++] = pd[2];
      d[i++] = pd[5];
      d[i++] = pd[8];
   }

   //==========================================================
   // <T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   public toString() {
      var d = this._data;
      var r = new StringBuffer();
      for (var y = 0; y < 3; y++) {
         if (y > 0) {
            r.append('|');
         }
         for (var x = 0; x < 3; x++) {
            var i = y * 3 + x;
            var v = d[i];
            if (x > 0) {
               r.append(',');
            }
            r.append(FloatUtil.format(v, 0, null, 3, null));
         }
      }
      return r.flush();
   }
}
