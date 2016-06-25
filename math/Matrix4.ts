import {Prototype} from '../common/reflect/Prototype';
import {Euler} from './Euler';
import {MathUtil} from './MathUtil';
import {MatrixUtil} from './MatrixUtil';
import {Quaternion} from './Quaternion';
import {Vector3} from './Vector3';

/**
 * 四维矩阵。
 */
export class Matrix4 {
   // 数据
   public elements: Array<number>;

   /**
    * 四维矩阵。
    */
   public constructor() {
      this.elements = [
         1, 0, 0, 0,
         0, 1, 0, 0,
         0, 0, 1, 0,
         0, 0, 0, 1
      ];
   }

   /**
    * 是否为单位化数据。
    *
    * @return 是否单位化
    */
   public isIdentityData(): boolean {
      var elements = this.elements;
      var value = MatrixUtil.identity4x4;
      for (var i = 0; i < 16; i++) {
         if (elements[i] != value[i]) {
            return false;
         }
      }
      return true;
   }

   /**
    * 单位化处理。
    *
    * @return 矩阵
    */
   public identity() {
      this.set(
         1, 0, 0, 0,
         0, 1, 0, 0,
         0, 0, 1, 0,
         0, 0, 0, 1
      );
      return this;
   }

   /**
    * 判断数据内容是否相等。
    *
    * @param data 数据
    * @return 是否相等
    */
   public equalsData(values: Array<number>): boolean {
      var elements = this.elements;
      for (var i = 0; i < 16; i++) {
         if (elements[i] != values[i]) {
            return false;
         }
      }
      return true;
   }

   /**
    * 判断矩阵是否相等。
    *
    * @param matrix 矩阵
    * @return 是否相等
    */
   public equals(matrix: Matrix4): boolean {
      return this.equalsData(matrix.elements);
   }

   /**
    * 接收数据内容。
    *
    * @param data 数据
    * @return 矩阵
    */
   public assignData(data: Array<number>): Matrix4 {
      var elements = this.elements;
      for (var i = 0; i < 16; i++) {
         elements[i] = data[i];
      }
      return this;
   }

   /**
    * 接收数据内容。
    *
    * @param values:Array 数据
    * @return 矩阵
    */
   public assign(value: Matrix4): Matrix4 {
      return this.assignData(value.elements);
   }

   /**
    * 获得平移信息。
    *
    * @return 平移信息
    */
   public getTranslation(): Vector3 {
      var elements = this.elements;
      return new Vector3(elements[12], elements[13], elements[14]);
   }

   /**
    * 设置数据。
    *
    * @return 矩阵
    */
   public set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44): Matrix4 {
      var elements = this.elements;
      elements[0] = n11; elements[1] = n12; elements[2] = n13; elements[3] = n14;
      elements[4] = n21; elements[5] = n22; elements[6] = n23; elements[7] = n24;
      elements[8] = n31; elements[9] = n32; elements[10] = n33; elements[11] = n34;
      elements[12] = n41; elements[13] = n42; elements[14] = n43; elements[15] = n44;
      return this;
   }

   /**
    * 设置数据。
    *
    * @param translation 位移
    * @param euler 角度
    * @param scale 缩放
    * @return 矩阵
    */
   public setTranslationEulerScale(translation: Vector3, euler: Euler, scale: Vector3): Matrix4 {
      var elements = this.elements;
      var rsx = Math.sin(euler.x);
      var rcx = Math.cos(euler.x);
      var rsy = Math.sin(euler.y);
      var rcy = Math.cos(euler.y);
      var rsz = Math.sin(euler.z);
      var rcz = Math.cos(euler.z);
      elements[0] = rcy * rcz * scale.x;
      elements[1] = rcy * rsz * scale.x;
      elements[2] = -rsy * scale.x;
      elements[3] = 0;
      elements[4] = (rsx * rsy * rcz - rcx * rsz) * scale.y;
      elements[5] = (rsx * rsy * rsz + rcx * rcz) * scale.y;
      elements[6] = rsx * rcy * scale.y;
      elements[7] = 0;
      elements[8] = (rcx * rsy * rcz + rsx * rsz) * scale.z;
      elements[9] = (rcx * rsy * rsz - rsx * rcz) * scale.z;
      elements[10] = rcx * rcy * scale.z;
      elements[11] = 0;
      elements[12] = translation.x;
      elements[13] = translation.y;
      elements[14] = translation.z;
      elements[15] = 1;
      return this;
   }

   /**
    * 设置数据。
    *
    * @param translation 位移
    * @param quaternion 旋转
    * @param scale 缩放
    * @return 矩阵
    */
   public setTranslationQuaternionScale(translation: Vector3, quaternion: Quaternion, scale: Vector3): Matrix4 {
      var elements = this.elements;
      var x2 = quaternion.x * quaternion.x;
      var y2 = quaternion.y * quaternion.y;
      var z2 = quaternion.z * quaternion.z;
      var xy = quaternion.x * quaternion.y;
      var xz = quaternion.x * quaternion.z;
      var yz = quaternion.y * quaternion.z;
      var wx = quaternion.w * quaternion.x;
      var wy = quaternion.w * quaternion.y;
      var wz = quaternion.w * quaternion.z;
      elements[0] = (1 - 2 * (y2 + z2)) * scale.x;
      elements[1] = 2 * (xy - wz) * scale.x;
      elements[2] = 2 * (xz + wy) * scale.x;
      elements[3] = 0;
      elements[4] = 2 * (xy + wz) * scale.y;
      elements[5] = (1 - 2 * (x2 + z2)) * scale.y;
      elements[6] = 2 * (yz - wx) * scale.y;
      elements[7] = 0;
      elements[8] = 2 * (xz - wy) * scale.z;
      elements[9] = 2 * (yz + wx) * scale.z;
      elements[10] = (1 - 2 * (x2 + y2)) * scale.z;
      elements[11] = 0;
      elements[12] = translation.x;
      elements[13] = translation.y;
      elements[14] = translation.z;
      elements[15] = 1;
      return this;
   }

   // /**
   //  * 追加矩阵数据。
   //  *
   //  * @param a 左矩阵
   //  * @param b 右矩阵
   //  * @return 矩阵
   //  */
   // public multiplyMatrices(left: Matrix4, right: Matrix4): Matrix4 {
   //    var te = this.elements;
   //    var ae = left.elements;
   //    var be = right.elements;
   //    var a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
   //    var a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
   //    var a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
   //    var a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];
   //    var b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
   //    var b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
   //    var b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
   //    var b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];
   //    te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
   //    te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
   //    te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
   //    te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
   //    te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
   //    te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
   //    te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
   //    te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
   //    te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
   //    te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
   //    te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
   //    te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
   //    te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
   //    te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
   //    te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
   //    te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
   //    return this;
   // }

   /**
    * 追加矩阵数据。
    *
    * @param value 矩阵
    * @return 矩阵
    */
   // public multiply(value: Matrix4): Matrix4 {
   //    return this.multiplyMatrices(this, value);
   // }

   /**
    * 追加矩阵数据。
    *
    * @param values 矩阵数据
    * @return 矩阵
    */
   public appendData(values?: Array<any>): Matrix4 {
      var data = this.elements;
      // 矩阵计算
      var v00 = (data[0] * values[0]) + (data[1] * values[4]) + (data[2] * values[8]) + (data[3] * values[12]);
      var v01 = (data[0] * values[1]) + (data[1] * values[5]) + (data[2] * values[9]) + (data[3] * values[13]);
      var v02 = (data[0] * values[2]) + (data[1] * values[6]) + (data[2] * values[10]) + (data[3] * values[14]);
      var v03 = (data[0] * values[3]) + (data[1] * values[7]) + (data[2] * values[11]) + (data[3] * values[15]);
      var v04 = (data[4] * values[0]) + (data[5] * values[4]) + (data[6] * values[8]) + (data[7] * values[12]);
      var v05 = (data[4] * values[1]) + (data[5] * values[5]) + (data[6] * values[9]) + (data[7] * values[13]);
      var v06 = (data[4] * values[2]) + (data[5] * values[6]) + (data[6] * values[10]) + (data[7] * values[14]);
      var v07 = (data[4] * values[3]) + (data[5] * values[7]) + (data[6] * values[11]) + (data[7] * values[15]);
      var v08 = (data[8] * values[0]) + (data[9] * values[4]) + (data[10] * values[8]) + (data[11] * values[12]);
      var v09 = (data[8] * values[1]) + (data[9] * values[5]) + (data[10] * values[9]) + (data[11] * values[13]);
      var v10 = (data[8] * values[2]) + (data[9] * values[6]) + (data[10] * values[10]) + (data[11] * values[14]);
      var v11 = (data[8] * values[3]) + (data[9] * values[7]) + (data[10] * values[11]) + (data[11] * values[15]);
      var v12 = (data[12] * values[0]) + (data[13] * values[4]) + (data[14] * values[8]) + (data[15] * values[12]);
      var v13 = (data[12] * values[1]) + (data[13] * values[5]) + (data[14] * values[9]) + (data[15] * values[13]);
      var v14 = (data[12] * values[2]) + (data[13] * values[6]) + (data[14] * values[10]) + (data[15] * values[14]);
      var v15 = (data[12] * values[3]) + (data[13] * values[7]) + (data[14] * values[11]) + (data[15] * values[15]);
      // 复制内容
      data[0] = v00;
      data[1] = v01;
      data[2] = v02;
      data[3] = v03;
      data[4] = v04;
      data[5] = v05;
      data[6] = v06;
      data[7] = v07;
      data[8] = v08;
      data[9] = v09;
      data[10] = v10;
      data[11] = v11;
      data[12] = v12;
      data[13] = v13;
      data[14] = v14;
      data[15] = v15;
      return this;
   }

   /**
    * 追加矩阵。
    *
    * @param matrix 矩阵
    * @return 矩阵
    */
   public append(matrix: Matrix4): Matrix4 {
      return this.appendData(matrix.elements);
   }

   /**
    * 追加平移处理。
    *  1  0  0  0
    *  0  1  0  0
    *  0  0  1  0
    *  x  y  z  1
    *
    * @param x X分量
    * @param y Y分量
    * @param z Z分量
    * @return 矩阵
    */
   public addTranslate(x: number, y: number, z: number): Matrix4 {
      var data = MatrixUtil.Value16;
      data[0] = 1;
      data[1] = 0;
      data[2] = 0;
      data[3] = 0;
      data[4] = 0;
      data[5] = 1;
      data[6] = 0;
      data[7] = 0;
      data[8] = 0;
      data[9] = 0;
      data[10] = 1;
      data[11] = 0;
      data[12] = x;
      data[13] = y;
      data[14] = z;
      data[15] = 1;
      return this.appendData(data);
   }

   /**
    * 追加绕X轴旋转处理。
    *  1    0   0  0
    *  0  cos sin  0
    *  0 -sin cos  0
    *  0    0   0  1
    *
    * @param rad 弧度
    * @return 矩阵
    */
   public addRotationX(rad: number): Matrix4 {
      // 计算旋转
      var rs = Math.sin(rad);
      var rc = Math.cos(rad);
      // 追加内容
      var data = MathUtil.VALUE_16;
      data[0] = 1;
      data[1] = 0;
      data[2] = 0;
      data[3] = 0;
      data[4] = 0;
      data[5] = rc;
      data[6] = rs;
      data[7] = 0;
      data[8] = 0;
      data[9] = -rs;
      data[10] = rc;
      data[11] = 0;
      data[12] = 0;
      data[13] = 0;
      data[14] = 0;
      data[15] = 1;
      return this.appendData(data);
   }

   /**
    * 追加绕Y轴旋转处理。
    *  cos  0  sin  0
    *    0  1    0  0
    * -sin  0  cos  0
    *    0  0    0  1
    *
    * @param rad 弧度
    * @return 矩阵
    */
   public addRotationY(rad: number): Matrix4 {
      // 计算旋转
      var rs = Math.sin(rad);
      var rc = Math.cos(rad);
      // 追加内容
      var data = MathUtil.VALUE_16;
      data[0] = rc;
      data[1] = 0;
      data[2] = rs;
      data[3] = 0;
      data[4] = 0;
      data[5] = 1;
      data[6] = 0;
      data[7] = 0;
      data[8] = -rs;
      data[9] = 0;
      data[10] = rc;
      data[11] = 0;
      data[12] = 0;
      data[13] = 0;
      data[14] = 0;
      data[15] = 1;
      return this.appendData(data);
   }

   /**
    * 追加绕Z轴旋转处理。
    *  cos sin  0  0
    * -sin cos  0  0
    *    0   0  1  0
    *    0   0  0  1
    *
    * @param rad 弧度
    * @return 矩阵
    */
   public addRotationZ(rad: number): Matrix4 {
      // 计算旋转
      var rs = Math.sin(rad);
      var rc = Math.cos(rad);
      // 追加内容
      var data = MathUtil.VALUE_16;
      data[0] = rc;
      data[1] = rs;
      data[2] = 0;
      data[3] = 0;
      data[4] = -rs;
      data[5] = rc;
      data[6] = 0;
      data[7] = 0;
      data[8] = 0;
      data[9] = 0;
      data[10] = 1;
      data[11] = 0;
      data[12] = 0;
      data[13] = 0;
      data[14] = 0;
      data[15] = 1;
      return this.appendData(data);
   }

   /**
    * 追加旋转处理。
    *
    * @param x X弧度
    * @param y Y弧度
    * @param z Z弧度
    * @return 矩阵
    */
   public addRotation(x: number, y: number, z: number): Matrix4 {
      // 计算旋转
      var rsx = Math.sin(x);
      var rcx = Math.cos(x);
      var rsy = Math.sin(y);
      var rcy = Math.cos(y);
      var rsz = Math.sin(z);
      var rcz = Math.cos(z);
      // 追加内容
      var data = MathUtil.VALUE_16;
      data[0] = rcy * rcz;
      data[1] = rcy * rsz;
      data[2] = -rsy;
      data[3] = 0;
      data[4] = rsx * rsy * rcz - rcx * rsz;
      data[5] = rsx * rsy * rsz + rcx * rcz;
      data[6] = rsx * rcy;
      data[7] = 0;
      data[8] = rcx * rsy * rcz + rsx * rsz;
      data[9] = rcx * rsy * rsz - rsx * rcx;
      data[10] = rcx * rcy;
      data[11] = 0;
      data[12] = 0;
      data[13] = 0;
      data[14] = 0;
      data[15] = 1;
      return this.appendData(data);
   }

   /**
    * 追加绕轴旋转处理。
    *
    * @param axis 轴
    * @param angle 旋转角
    * @return 矩阵
    */
   public addRotationAxis(axis: Vector3, rad: number): Matrix4 {
      // 计算旋转
      var c = Math.cos(rad);
      var s = Math.sin(rad);
      var t = 1 - c;
      var x = axis.x;
      var y = axis.y;
      var z = axis.z;
      var tx = t * x;
      var ty = t * y;
      // 追加内容
      var data = MathUtil.VALUE_16;
      data[0] = tx * x + c;
      data[1] = tx * y - s * z;
      data[2] = tx * z + s * y;
      data[3] = 0;
      data[4] = tx * y + s * z;
      data[5] = ty * y + c;
      data[6] = ty * z - s * x;
      data[7] = 0;
      data[8] = tx * z - s * y;
      data[9] = ty * z + s * x;
      data[10] = t * z * z + c;
      data[11] = 0;
      data[12] = 0;
      data[13] = 0;
      data[14] = 0;
      data[15] = 1;
      return this.appendData(data);
   }

   /**
    * 追加缩放处理。
    *  x  0  0  0
    *  0  y  0  0
    *  0  0  z  0
    *  0  0  0  1
    *
    * @param sx X比例
    * @param sy Y比例
    * @param sz Z比例
    * @return 矩阵
    */
   public addScale(x: number, y: number, z: number): Matrix4 {
      var data = MathUtil.VALUE_16;
      data[0] = x;
      data[1] = 0;
      data[2] = 0;
      data[3] = 0;
      data[4] = 0;
      data[5] = y;
      data[6] = 0;
      data[7] = 0;
      data[8] = 0;
      data[9] = 0;
      data[10] = z;
      data[11] = 0;
      data[12] = 0;
      data[13] = 0;
      data[14] = 0;
      data[15] = 1;
      return this.appendData(data);
   }

   /**
    * 单位化矩阵。
    *
    * @return 是否成功
    */
   public normalize(): boolean {
      var elements = this.elements;
      var m44 = elements[15];
      if (m44 == 0) {
         return false;
      } else if (m44 == 1) {
         return true;
      } else {
         var scale = 1 / m44;
         for (var i = 0; i < 16; i++) {
            elements[i] = elements[i] * scale;
         }
         return true
      }
   }

   /**
    * 计算逆矩阵。
    *
    * @return 是否成功
    */
   public invert(): boolean {
      var data = this.elements;
      var value = MatrixUtil.Value16;
      // 计算矩阵
      value[0] = (data[5] * data[10] * data[15]) - (data[5] * data[11] * data[14]) - (data[9] * data[6] * data[15]) + (data[9] * data[7] * data[14]) + (data[13] * data[6] * data[11]) - (data[13] * data[7] * data[10]);
      value[4] = -(data[4] * data[10] * data[15]) + (data[4] * data[11] * data[14]) + (data[8] * data[6] * data[15]) - (data[8] * data[7] * data[14]) - (data[12] * data[6] * data[11]) + (data[12] * data[7] * data[10]);
      value[8] = (data[4] * data[9] * data[15]) - (data[4] * data[11] * data[13]) - (data[8] * data[5] * data[15]) + (data[8] * data[7] * data[13]) + (data[12] * data[5] * data[11]) - (data[12] * data[7] * data[9]);
      value[12] = -(data[4] * data[9] * data[14]) + (data[4] * data[10] * data[13]) + (data[8] * data[5] * data[14]) - (data[8] * data[6] * data[13]) - (data[12] * data[5] * data[10]) + (data[12] * data[6] * data[9]);
      value[1] = -(data[1] * data[10] * data[15]) + (data[1] * data[11] * data[14]) + (data[9] * data[2] * data[15]) - (data[9] * data[3] * data[14]) - (data[13] * data[2] * data[11]) + (data[13] * data[3] * data[10]);
      value[5] = (data[0] * data[10] * data[15]) - (data[0] * data[11] * data[14]) - (data[8] * data[2] * data[15]) + (data[8] * data[3] * data[14]) + (data[12] * data[2] * data[11]) - (data[12] * data[3] * data[10]);
      value[9] = -(data[0] * data[9] * data[15]) + (data[0] * data[11] * data[13]) + (data[8] * data[1] * data[15]) - (data[8] * data[3] * data[13]) - (data[12] * data[1] * data[11]) + (data[12] * data[3] * data[9]);
      value[13] = (data[0] * data[9] * data[14]) - (data[0] * data[10] * data[13]) - (data[8] * data[1] * data[14]) + (data[8] * data[2] * data[13]) + (data[12] * data[1] * data[10]) - (data[12] * data[2] * data[9]);
      value[2] = (data[1] * data[6] * data[15]) - (data[1] * data[7] * data[14]) - (data[5] * data[2] * data[15]) + (data[5] * data[3] * data[14]) + (data[13] * data[2] * data[7]) - (data[13] * data[3] * data[6]);
      value[6] = -(data[0] * data[6] * data[15]) + (data[0] * data[7] * data[14]) + (data[4] * data[2] * data[15]) - (data[4] * data[3] * data[14]) - (data[12] * data[2] * data[7]) + (data[12] * data[3] * data[6]);
      value[10] = (data[0] * data[5] * data[15]) - (data[0] * data[7] * data[13]) - (data[4] * data[1] * data[15]) + (data[4] * data[3] * data[13]) + (data[12] * data[1] * data[7]) - (data[12] * data[3] * data[5]);
      value[14] = -(data[0] * data[5] * data[14]) + (data[0] * data[6] * data[13]) + (data[4] * data[1] * data[14]) - (data[4] * data[2] * data[13]) - (data[12] * data[1] * data[6]) + (data[12] * data[2] * data[5]);
      value[3] = -(data[1] * data[6] * data[11]) + (data[1] * data[7] * data[10]) + (data[5] * data[2] * data[11]) - (data[5] * data[3] * data[10]) - (data[9] * data[2] * data[7]) + (data[9] * data[3] * data[6]);
      value[7] = (data[0] * data[6] * data[11]) - (data[0] * data[7] * data[10]) - (data[4] * data[2] * data[11]) + (data[4] * data[3] * data[10]) + (data[8] * data[2] * data[7]) - (data[8] * data[3] * data[6]);
      value[11] = -(data[0] * data[5] * data[11]) + (data[0] * data[7] * data[9]) + (data[4] * data[1] * data[11]) - (data[4] * data[3] * data[9]) - (data[8] * data[1] * data[7]) + (data[8] * data[3] * data[5]);
      value[15] = (data[0] * data[5] * data[10]) - (data[0] * data[6] * data[9]) - (data[4] * data[1] * data[10]) + (data[4] * data[2] * data[9]) + (data[8] * data[1] * data[6]) - (data[8] * data[2] * data[5]);
      // 计算内容
      var scale = data[0] * value[0] + data[1] * value[4] + data[2] * value[8] + data[3] * value[12];
      if (scale == 0) {
         return false;
      }
      // 设置内容
      var rate = 1 / scale;
      for (var i = 0; i < 16; i++) {
         data[i] = value[i] * rate;
      }
      return true;
   }

   /**
    * 变换三维数据。
    *
    * @param input 输入数据
    * @param output 输出数据
    * @return 输出数据
    */
   public transform(input: Vector3, output?: Vector3): Vector3 {
      var ix = input.x;
      var iy = input.y;
      var iz = input.z;
      // 计算数据
      var elements = this.elements;
      var x = (ix * elements[0]) + (iy * elements[4]) + (iz * elements[8]) + elements[12];
      var y = (ix * elements[1]) + (iy * elements[5]) + (iz * elements[9]) + elements[13];
      var z = (ix * elements[2]) + (iy * elements[6]) + (iz * elements[10]) + elements[14];
      // 设置结果
      var result = null;
      if (output) {
         result = output.set(x, y, z);
      } else {
         result = new Vector3(x, y, z);
      }
      return result;
   }

   /**
    * 分解三维数据。
    *
    * @param input 输入数据
    * @param output 输出数据
    * @return 输出数据
    */
   // public decompose(position: Vector3, quaternion: Quaternion, scale: Vector3) {
   //    var vector = new Vector3();
   //    var matrix = new Matrix4();
   //    var te = this.data;
   //    var sx = vector.set(te[0], te[1], te[2]).length();
   //    var sy = vector.set(te[4], te[5], te[6]).length();
   //    var sz = vector.set(te[8], te[9], te[10]).length();
   //    var det = this.determinant();
   //    if (det < 0) {
   //       sx = - sx;
   //    }
   //    position.x = te[12];
   //    position.y = te[13];
   //    position.z = te[14];
   //    matrix.data.set(this.data);
   //    var invSX = 1 / sx;
   //    var invSY = 1 / sy;
   //    var invSZ = 1 / sz;
   //    matrix.data[0] *= invSX;
   //    matrix.data[1] *= invSX;
   //    matrix.data[2] *= invSX;
   //    matrix.data[4] *= invSY;
   //    matrix.data[5] *= invSY;
   //    matrix.data[6] *= invSY;
   //    matrix.data[8] *= invSZ;
   //    matrix.data[9] *= invSZ;
   //    matrix.data[10] *= invSZ;
   //    quaternion.setFromRotationMatrix(matrix);
   //    scale.x = sx;
   //    scale.y = sy;
   //    scale.z = sz;
   //    return this;
   // }

   /**
    * 写入数据。
    *
    * @param data 数组
    * @param offset 索引位置
    * @return 矩阵
    */
   public writeData(data: Array<number>, offset: number = 0) {
      var elements = this.elements;
      data[offset++] = elements[0];
      data[offset++] = elements[4];
      data[offset++] = elements[8];
      data[offset++] = elements[12];
      data[offset++] = elements[1];
      data[offset++] = elements[5];
      data[offset++] = elements[9];
      data[offset++] = elements[13];
      data[offset++] = elements[2];
      data[offset++] = elements[6];
      data[offset++] = elements[10];
      data[offset++] = elements[14];
      data[offset++] = elements[3];
      data[offset++] = elements[7];
      data[offset++] = elements[11];
      data[offset++] = elements[15];
      return this;
   }

   /**
    * 写入4x3数据。
    *
    * @param data 数组
    * @param offset 索引位置
    * @return 矩阵
    */
   public writeData4x3(data: Array<number>, index: number) {
      var elements = this.elements;
      data[index++] = elements[0];
      data[index++] = elements[4];
      data[index++] = elements[8];
      data[index++] = elements[12];
      data[index++] = elements[1];
      data[index++] = elements[5];
      data[index++] = elements[9];
      data[index++] = elements[13];
      data[index++] = elements[2];
      data[index++] = elements[6];
      data[index++] = elements[10];
      data[index++] = elements[14];
      return this;
   }

   /**
    * 从数组中接收数据。
    *
    * @param array 数组
    * @param offset 索引位置
    * @return 矩阵
    */
   public fromArray(array: Array<number>, offset: number = 0) {
      var elements = this.elements;
      for (var i = 0; i < 16; i++) {
         elements[i] = array[offset++];
      }
      return this;
   }

   /**
    * 写入数据到数组中。
    *
    * @param array 数组
    * @param offset 索引位置
    * @return 数组
    */
   public toArray(array: Array<number>, offset: number = 0) {
      var data = array || new Array<number>();
      var elements = this.elements;
      for (var i = 0; i < 16; i++) {
         data[offset++] = elements[i];
      }
      return data;
   }

   /**
    * 克隆数据。
    *
    * @return 矩阵
    */
   public clone() {
      var matrix = new Matrix4();
      matrix.assign(this);
      return matrix;
   }

   // public copy(m) {
   //    this.elements.set(m.elements);
   //    return this;
   // }

   // public copyPosition(m) {
   //    var te = this.elements;
   //    var me = m.elements;
   //    te[12] = me[12];
   //    te[13] = me[13];
   //    te[14] = me[14];
   //    return this;
   // }

   // public extractBasis(xAxis, yAxis, zAxis) {
   //    xAxis.setFromMatrixColumn(this, 0);
   //    yAxis.setFromMatrixColumn(this, 1);
   //    zAxis.setFromMatrixColumn(this, 2);
   //    return this;
   // }

   // public makeBasis(xAxis, yAxis, zAxis) {
   //    this.set(
   //       xAxis.x, yAxis.x, zAxis.x, 0,
   //       xAxis.y, yAxis.y, zAxis.y, 0,
   //       xAxis.z, yAxis.z, zAxis.z, 0,
   //       0, 0, 0, 1
   //    );
   //    return this;
   // }

   // @Prototype()
   // public extractRotation() {
   //    var v1;
   //    return function (m) {
   //       if (v1 === undefined) v1 = new Vector3();
   //       var te = this.elements;
   //       var me = m.elements;
   //       var scaleX = 1 / v1.setFromMatrixColumn(m, 0).length();
   //       var scaleY = 1 / v1.setFromMatrixColumn(m, 1).length();
   //       var scaleZ = 1 / v1.setFromMatrixColumn(m, 2).length();
   //       te[0] = me[0] * scaleX;
   //       te[1] = me[1] * scaleX;
   //       te[2] = me[2] * scaleX;
   //       te[4] = me[4] * scaleY;
   //       te[5] = me[5] * scaleY;
   //       te[6] = me[6] * scaleY;
   //       te[8] = me[8] * scaleZ;
   //       te[9] = me[9] * scaleZ;
   //       te[10] = me[10] * scaleZ;
   //       return this;
   //    };
   // }

   // public makeRotationFromEuler(euler) {
   //    if (euler instanceof Euler === false) {
   //       console.error('THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.');
   //    }
   //    var te = this.elements;
   //    var x = euler.x, y = euler.y, z = euler.z;
   //    var a = Math.cos(x), b = Math.sin(x);
   //    var c = Math.cos(y), d = Math.sin(y);
   //    var e = Math.cos(z), f = Math.sin(z);
   //    if (euler.order === 'XYZ') {
   //       var ae = a * e, af = a * f, be = b * e, bf = b * f;
   //       te[0] = c * e;
   //       te[4] = - c * f;
   //       te[8] = d;
   //       te[1] = af + be * d;
   //       te[5] = ae - bf * d;
   //       te[9] = - b * c;
   //       te[2] = bf - ae * d;
   //       te[6] = be + af * d;
   //       te[10] = a * c;
   //    } else if (euler.order === 'YXZ') {
   //       var ce = c * e, cf = c * f, de = d * e, df = d * f;
   //       te[0] = ce + df * b;
   //       te[4] = de * b - cf;
   //       te[8] = a * d;
   //       te[1] = a * f;
   //       te[5] = a * e;
   //       te[9] = - b;
   //       te[2] = cf * b - de;
   //       te[6] = df + ce * b;
   //       te[10] = a * c;
   //    } else if (euler.order === 'ZXY') {
   //       var ce = c * e, cf = c * f, de = d * e, df = d * f;
   //       te[0] = ce - df * b;
   //       te[4] = - a * f;
   //       te[8] = de + cf * b;
   //       te[1] = cf + de * b;
   //       te[5] = a * e;
   //       te[9] = df - ce * b;
   //       te[2] = - a * d;
   //       te[6] = b;
   //       te[10] = a * c;
   //    } else if (euler.order === 'ZYX') {
   //       var ae = a * e, af = a * f, be = b * e, bf = b * f;
   //       te[0] = c * e;
   //       te[4] = be * d - af;
   //       te[8] = ae * d + bf;
   //       te[1] = c * f;
   //       te[5] = bf * d + ae;
   //       te[9] = af * d - be;
   //       te[2] = - d;
   //       te[6] = b * c;
   //       te[10] = a * c;
   //    } else if (euler.order === 'YZX') {
   //       var ac = a * c, ad = a * d, bc = b * c, bd = b * d;
   //       te[0] = c * e;
   //       te[4] = bd - ac * f;
   //       te[8] = bc * f + ad;
   //       te[1] = f;
   //       te[5] = a * e;
   //       te[9] = - b * e;
   //       te[2] = - d * e;
   //       te[6] = ad * f + bc;
   //       te[10] = ac - bd * f;
   //    } else if (euler.order === 'XZY') {
   //       var ac = a * c, ad = a * d, bc = b * c, bd = b * d;
   //       te[0] = c * e;
   //       te[4] = - f;
   //       te[8] = d * e;
   //       te[1] = ac * f + bd;
   //       te[5] = a * e;
   //       te[9] = ad * f - bc;
   //       te[2] = bc * f - ad;
   //       te[6] = b * e;
   //       te[10] = bd * f + ac;
   //    }
   //    // last column
   //    te[3] = 0;
   //    te[7] = 0;
   //    te[11] = 0;
   //    // bottom row
   //    te[12] = 0;
   //    te[13] = 0;
   //    te[14] = 0;
   //    te[15] = 1;
   //    return this;
   // }

   // public makeRotationFromQuaternion(q) {
   //    var te = this.elements;
   //    var x = q.x, y = q.y, z = q.z, w = q.w;
   //    var x2 = x + x, y2 = y + y, z2 = z + z;
   //    var xx = x * x2, xy = x * y2, xz = x * z2;
   //    var yy = y * y2, yz = y * z2, zz = z * z2;
   //    var wx = w * x2, wy = w * y2, wz = w * z2;
   //    te[0] = 1 - (yy + zz);
   //    te[4] = xy - wz;
   //    te[8] = xz + wy;
   //    te[1] = xy + wz;
   //    te[5] = 1 - (xx + zz);
   //    te[9] = yz - wx;
   //    te[2] = xz - wy;
   //    te[6] = yz + wx;
   //    te[10] = 1 - (xx + yy);
   //    // last column
   //    te[3] = 0;
   //    te[7] = 0;
   //    te[11] = 0;
   //    // bottom row
   //    te[12] = 0;
   //    te[13] = 0;
   //    te[14] = 0;
   //    te[15] = 1;
   //    return this;
   // }

   // @Prototype()
   // public lookAt(eye, target, up) {
   //    var x, y, z;
   //    return function (eye, target, up) {
   //       if (x === undefined) x = new Vector3();
   //       if (y === undefined) y = new Vector3();
   //       if (z === undefined) z = new Vector3();
   //       var te = this.elements;
   //       z.subVectors(eye, target).normalize();
   //       if (z.lengthSq() === 0) {
   //          z.z = 1;
   //       }
   //       x.crossVectors(up, z).normalize();
   //       if (x.lengthSq() === 0) {
   //          z.x += 0.0001;
   //          x.crossVectors(up, z).normalize();
   //       }
   //       y.crossVectors(z, x);
   //       te[0] = x.x; te[4] = y.x; te[8] = z.x;
   //       te[1] = x.y; te[5] = y.y; te[9] = z.y;
   //       te[2] = x.z; te[6] = y.z; te[10] = z.z;
   //       return this;
   //    };
   // }

   // public multiplyToArray(a, b, r) {
   //    var te = this.elements;
   //    this.multiplyMatrices(a, b);
   //    r[0] = te[0]; r[1] = te[1]; r[2] = te[2]; r[3] = te[3];
   //    r[4] = te[4]; r[5] = te[5]; r[6] = te[6]; r[7] = te[7];
   //    r[8] = te[8]; r[9] = te[9]; r[10] = te[10]; r[11] = te[11];
   //    r[12] = te[12]; r[13] = te[13]; r[14] = te[14]; r[15] = te[15];
   //    return this;
   // }

   // public multiplyScalar(s) {
   //    var te = this.elements;
   //    te[0] *= s; te[4] *= s; te[8] *= s; te[12] *= s;
   //    te[1] *= s; te[5] *= s; te[9] *= s; te[13] *= s;
   //    te[2] *= s; te[6] *= s; te[10] *= s; te[14] *= s;
   //    te[3] *= s; te[7] *= s; te[11] *= s; te[15] *= s;
   //    return this;
   // }

   // @Prototype()
   // public applyToVector3Array() {
   //    var v1;
   //    return function (array, offset, length) {
   //       if (v1 === undefined) v1 = new Vector3();
   //       if (offset === undefined) offset = 0;
   //       if (length === undefined) length = array.length;
   //       for (var i = 0, j = offset; i < length; i += 3, j += 3) {
   //          v1.fromArray(array, j);
   //          v1.applyMatrix4(this);
   //          v1.toArray(array, j);
   //       }
   //       return array;
   //    };
   // }

   // @Prototype()
   // public applyToBuffer() {
   //    var v1;
   //    return function applyToBuffer(buffer, offset, length) {
   //       if (v1 === undefined) v1 = new Vector3();
   //       if (offset === undefined) offset = 0;
   //       if (length === undefined) length = buffer.length / buffer.itemSize;
   //       for (var i = 0, j = offset; i < length; i++ , j++) {
   //          v1.x = buffer.getX(j);
   //          v1.y = buffer.getY(j);
   //          v1.z = buffer.getZ(j);
   //          v1.applyMatrix4(this);
   //          buffer.setXYZ(v1.x, v1.y, v1.z);
   //       }
   //       return buffer;
   //    };
   // }

   // public determinant() {
   //    var te = this.elements;
   //    var n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
   //    var n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
   //    var n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
   //    var n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];
   //    return (
   //       n41 * (
   //          + n14 * n23 * n32
   //          - n13 * n24 * n32
   //          - n14 * n22 * n33
   //          + n12 * n24 * n33
   //          + n13 * n22 * n34
   //          - n12 * n23 * n34
   //       ) +
   //       n42 * (
   //          + n11 * n23 * n34
   //          - n11 * n24 * n33
   //          + n14 * n21 * n33
   //          - n13 * n21 * n34
   //          + n13 * n24 * n31
   //          - n14 * n23 * n31
   //       ) +
   //       n43 * (
   //          + n11 * n24 * n32
   //          - n11 * n22 * n34
   //          - n14 * n21 * n32
   //          + n12 * n21 * n34
   //          + n14 * n22 * n31
   //          - n12 * n24 * n31
   //       ) +
   //       n44 * (
   //          - n13 * n22 * n31
   //          - n11 * n23 * n32
   //          + n11 * n22 * n33
   //          + n13 * n21 * n32
   //          - n12 * n21 * n33
   //          + n12 * n23 * n31
   //       )
   //    );
   // }

   // public transpose() {
   //    var te = this.elements;
   //    var tmp;
   //    tmp = te[1]; te[1] = te[4]; te[4] = tmp;
   //    tmp = te[2]; te[2] = te[8]; te[8] = tmp;
   //    tmp = te[6]; te[6] = te[9]; te[9] = tmp;
   //    tmp = te[3]; te[3] = te[12]; te[12] = tmp;
   //    tmp = te[7]; te[7] = te[13]; te[13] = tmp;
   //    tmp = te[11]; te[11] = te[14]; te[14] = tmp;
   //    return this;
   // }

   // public flattenToArrayOffset(array, offset) {
   //    var te = this.elements;
   //    array[offset] = te[0];
   //    array[offset + 1] = te[1];
   //    array[offset + 2] = te[2];
   //    array[offset + 3] = te[3];
   //    array[offset + 4] = te[4];
   //    array[offset + 5] = te[5];
   //    array[offset + 6] = te[6];
   //    array[offset + 7] = te[7];
   //    array[offset + 8] = te[8];
   //    array[offset + 9] = te[9];
   //    array[offset + 10] = te[10];
   //    array[offset + 11] = te[11];
   //    array[offset + 12] = te[12];
   //    array[offset + 13] = te[13];
   //    array[offset + 14] = te[14];
   //    array[offset + 15] = te[15];
   //    return array;
   // }

   // @Prototype()
   // public getPosition() {
   //    var v1;
   //    return function () {
   //       if (v1 === undefined) v1 = new Vector3();
   //       console.warn('THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.');
   //       return v1.setFromMatrixColumn(this, 3);
   //    };
   // }

   // public setPosition(v) {
   //    var te = this.elements;
   //    te[12] = v.x;
   //    te[13] = v.y;
   //    te[14] = v.z;
   //    return this;
   // }

   // public getInverse(m, throwOnDegenerate?: any) {
   //    var te = this.elements,
   //       me = m.elements,
   //       n11 = me[0], n21 = me[1], n31 = me[2], n41 = me[3],
   //       n12 = me[4], n22 = me[5], n32 = me[6], n42 = me[7],
   //       n13 = me[8], n23 = me[9], n33 = me[10], n43 = me[11],
   //       n14 = me[12], n24 = me[13], n34 = me[14], n44 = me[15],
   //       t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
   //       t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
   //       t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
   //       t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
   //    var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;
   //    if (det === 0) {
   //       var msg = "THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0";
   //       if (throwOnDegenerate || false) {
   //          throw new Error(msg);
   //       } else {
   //          console.warn(msg);
   //       }
   //       return this.identity();
   //    }
   //    te[0] = t11;
   //    te[1] = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
   //    te[2] = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
   //    te[3] = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
   //    te[4] = t12;
   //    te[5] = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
   //    te[6] = n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
   //    te[7] = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
   //    te[8] = t13;
   //    te[9] = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
   //    te[10] = n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
   //    te[11] = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
   //    te[12] = t14;
   //    te[13] = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
   //    te[14] = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
   //    te[15] = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;
   //    return this.multiplyScalar(1 / det);
   // }

   // public scale(v) {
   //    var te = this.elements;
   //    var x = v.x, y = v.y, z = v.z;
   //    te[0] *= x; te[4] *= y; te[8] *= z;
   //    te[1] *= x; te[5] *= y; te[9] *= z;
   //    te[2] *= x; te[6] *= y; te[10] *= z;
   //    te[3] *= x; te[7] *= y; te[11] *= z;
   //    return this;
   // }

   // public getMaxScaleOnAxis() {
   //    var te = this.elements;
   //    var scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
   //    var scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
   //    var scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
   //    return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
   // }

   // public makeTranslation(x, y, z) {
   //    this.set(
   //       1, 0, 0, x,
   //       0, 1, 0, y,
   //       0, 0, 1, z,
   //       0, 0, 0, 1
   //    );
   //    return this;
   // }

   // public makeRotationX(theta) {
   //    var c = Math.cos(theta), s = Math.sin(theta);
   //    this.set(
   //       1, 0, 0, 0,
   //       0, c, - s, 0,
   //       0, s, c, 0,
   //       0, 0, 0, 1
   //    );
   //    return this;
   // }

   // public makeRotationY(theta) {
   //    var c = Math.cos(theta), s = Math.sin(theta);
   //    this.set(
   //       c, 0, s, 0,
   //       0, 1, 0, 0,
   //       - s, 0, c, 0,
   //       0, 0, 0, 1
   //    );
   //    return this;
   // }

   // public makeRotationZ(theta) {
   //    var c = Math.cos(theta), s = Math.sin(theta);
   //    this.set(
   //       c, - s, 0, 0,
   //       s, c, 0, 0,
   //       0, 0, 1, 0,
   //       0, 0, 0, 1
   //    );
   //    return this;
   // }

   // public makeRotationAxis(axis, angle) {
   //    var c = Math.cos(angle);
   //    var s = Math.sin(angle);
   //    var t = 1 - c;
   //    var x = axis.x, y = axis.y, z = axis.z;
   //    var tx = t * x, ty = t * y;
   //    this.set(
   //       tx * x + c, tx * y - s * z, tx * z + s * y, 0,
   //       tx * y + s * z, ty * y + c, ty * z - s * x, 0,
   //       tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
   //       0, 0, 0, 1
   //    );
   //    return this;
   // }

   // public makeScale(x, y, z) {
   //    this.set(
   //       x, 0, 0, 0,
   //       0, y, 0, 0,
   //       0, 0, z, 0,
   //       0, 0, 0, 1
   //    );
   //    return this;
   // }

   // public compose(position, quaternion, scale) {
   //    this.makeRotationFromQuaternion(quaternion);
   //    this.scale(scale);
   //    this.setPosition(position);
   //    return this;
   // }

   // public makeFrustum(left, right, bottom, top, near, far) {
   //    var te = this.elements;
   //    var x = 2 * near / (right - left);
   //    var y = 2 * near / (top - bottom);
   //    var a = (right + left) / (right - left);
   //    var b = (top + bottom) / (top - bottom);
   //    var c = - (far + near) / (far - near);
   //    var d = - 2 * far * near / (far - near);
   //    te[0] = x; te[4] = 0; te[8] = a; te[12] = 0;
   //    te[1] = 0; te[5] = y; te[9] = b; te[13] = 0;
   //    te[2] = 0; te[6] = 0; te[10] = c; te[14] = d;
   //    te[3] = 0; te[7] = 0; te[11] = - 1; te[15] = 0;
   //    return this;
   // }

   // public makePerspective(fov, aspect, near, far) {
   //    var ymax = near * Math.tan(MathUtil.degToRad(fov * 0.5));
   //    var ymin = - ymax;
   //    var xmin = ymin * aspect;
   //    var xmax = ymax * aspect;
   //    return this.makeFrustum(xmin, xmax, ymin, ymax, near, far);
   // }

   // public makeOrthographic(left, right, top, bottom, near, far) {
   //    var te = this.elements;
   //    var w = 1.0 / (right - left);
   //    var h = 1.0 / (top - bottom);
   //    var p = 1.0 / (far - near);
   //    var x = (right + left) * w;
   //    var y = (top + bottom) * h;
   //    var z = (far + near) * p;
   //    te[0] = 2 * w; te[4] = 0; te[8] = 0; te[12] = - x;
   //    te[1] = 0; te[5] = 2 * h; te[9] = 0; te[13] = - y;
   //    te[2] = 0; te[6] = 0; te[10] = - 2 * p; te[14] = - z;
   //    te[3] = 0; te[7] = 0; te[11] = 0; te[15] = 1;
   //    return this;
   // }

   // public equals(matrix) {
   //    var te = this.elements;
   //    var me = matrix.elements;
   //    for (var i = 0; i < 16; i++) {
   //       if (te[i] !== me[i]) return false;
   //    }
   //    return true;
   // }
}
