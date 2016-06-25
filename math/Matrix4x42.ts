import {FloatUtil} from '../common/lang/FloatUtil';
import {StringBuffer} from '../common/lang/StringBuffer';
import {MatrixUtil} from './MatrixUtil';
import {Vector3} from './Vector3';

//==========================================================
// <T>四维矩阵。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
export class Matrix4x42 {
   // 数据
   protected _data: Array<number> = new Array<number>(16);

   //============================================================
   // <T>构造处理。</T>
   //============================================================
   public constructor() {
      var value = MatrixUtil.identity4x4;
      var data = this._data;
      for (var i = 0; i < 16; i++) {
         data[i] = value[i];
      }
   }

   //============================================================
   // <T>接收一个数据内容，返回是否修改。</T>
   //
   // @method
   // @param p:data:Array 数据
   //============================================================
   public attachData(p) {
      var r = false;
      var data = this._data;
      for (var i = 0; i < 16; i++) {
         var v = p[i];
         if (!r) {
            if (data[i] != v) {
               r = true;
            }
         }
         data[i] = v;
      }
      return r;
   }

   //==========================================================
   // <T>变换顶点数据。</T>
   //
   // @param outputData 输出数据
   // @param outputIndex 输出位置
   // @param inputData 输入数据
   // @param inputIndex 输入位置
   // @param count 个数
   //==========================================================
   public transformData(outputData: Array<number>, outputIndex: number, inputData: Array<number>, inputIndex: number, count: number) {
      var data = this._data;
      for (var i = 0; i < count; i++) {
         var x = inputData[inputIndex++];
         var y = inputData[inputIndex++];
         var z = inputData[inputIndex++];
         outputData[outputIndex++] = (x * data[0]) + (y * data[4]) + (z * data[8]) + data[12];
         outputData[outputIndex++] = (x * data[1]) + (y * data[5]) + (z * data[9]) + data[13];
         outputData[outputIndex++] = (x * data[2]) + (y * data[6]) + (z * data[10]) + data[14];
      }
   }

   // //==========================================================
   // // <T>变换顶点数据。</T>
   // //
   // // @method
   // // @param x:Number X坐标
   // // @param y:Number Y坐标
   // // @param z:Number Z坐标
   // // @param output:SPoint3 输出顶点
   // //==========================================================
   // public transformValue3(x, y, z, output) {
   //    // 计算数据
   //    var data = this._data;
   //    var rx = (x * data[0]) + (y * data[4]) + (z * data[8]) + data[12];
   //    var ry = (x * data[1]) + (y * data[5]) + (z * data[9]) + data[13];
   //    var rz = (x * data[2]) + (y * data[6]) + (z * data[10]) + data[14];
   //    // 设置结果
   //    var result = null;
   //    if (output) {
   //       result = output;
   //    } else {
   //       result = new Point3();
   //    }
   //    result.set(rx, ry, rz);
   //    return result;
   // }

   //============================================================
   // <T>构建一个矩阵。</T>
   //
   // @method
   // @param t:translation:SPoint3 位移
   // @param r:quaternion:SQuaternion 旋转
   // @param s:scale:SVector3 缩放
   //============================================================
   public buildQuaternion(r) {
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
      d[3] = 0;
      d[4] = 2 * (xy + wz);
      d[5] = 1 - 2 * (x2 + z2);
      d[6] = 2 * (yz - wx);
      d[7] = 0;
      d[8] = 2 * (xz - wy);
      d[9] = 2 * (yz + wx);
      d[10] = 1 - 2 * (x2 + y2);
      d[11] = 0;
      d[12] = 0;
      d[13] = 0;
      d[14] = 0;
      d[15] = 1;
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
      d[i++] = pd[4];
      d[i++] = pd[8];
      d[i++] = pd[12];
      d[i++] = pd[1];
      d[i++] = pd[5];
      d[i++] = pd[9];
      d[i++] = pd[13];
      d[i++] = pd[2];
      d[i++] = pd[6];
      d[i++] = pd[10];
      d[i++] = pd[14];
      d[i++] = pd[3];
      d[i++] = pd[7];
      d[i++] = pd[11];
      d[i++] = pd[15];
   }

   //==========================================================
   // <T>写入数据。</T>
   //
   // @method
   // @param d:data:Array 数组
   // @param i:offset:Integer 索引位置
   //==========================================================
   public writeData4x3(d, i) {
      var o = this;
      var pd = o._data;
      d[i++] = pd[0];
      d[i++] = pd[4];
      d[i++] = pd[8];
      d[i++] = pd[12];
      d[i++] = pd[1];
      d[i++] = pd[5];
      d[i++] = pd[9];
      d[i++] = pd[13];
      d[i++] = pd[2];
      d[i++] = pd[6];
      d[i++] = pd[10];
      d[i++] = pd[14];
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
      for (var y = 0; y < 4; y++) {
         if (y > 0) {
            r.append('|');
         }
         for (var x = 0; x < 4; x++) {
            var i = y * 4 + x;
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
